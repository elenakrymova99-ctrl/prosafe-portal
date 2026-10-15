-- ProSafe employee-facing content and directory schema for Supabase.
-- Run once in Supabase Dashboard -> SQL Editor. Do not expose the service_role key in the website.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('hr', 'employee', 'employee_onboarding', 'adaptation_manager')),
  employee_id uuid unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.org_units (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  parent_id uuid references public.org_units(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  seed_key text unique,
  display_name text not null,
  job_title text not null default '',
  org_unit_id uuid references public.org_units(id) on delete set null,
  manager_id uuid references public.employees(id) on delete set null,
  start_date date,
  status text not null default 'active',
  adaptation_enabled boolean not null default false,
  directory_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  drop constraint if exists profiles_employee_id_fkey;
alter table public.profiles
  add constraint profiles_employee_id_fkey
  foreign key (employee_id) references public.employees(id) on delete set null;

create table if not exists public.employee_contacts (
  employee_id uuid primary key references public.employees(id) on delete cascade,
  phone text,
  email text,
  visible_to_employees boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.company_history (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  kind text not null check (kind in ('document', 'template', 'corporate')),
  title text not null,
  category text not null default '',
  version text not null default 'v1',
  storage_path text unique,
  audience_unit_id uuid references public.org_units(id) on delete set null,
  featured boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists employees_org_unit_idx on public.employees(org_unit_id);
create index if not exists materials_kind_published_idx on public.materials(kind, is_published);
create index if not exists materials_title_search_idx
  on public.materials using gin (to_tsvector('russian', title || ' ' || category));
create index if not exists faqs_order_idx on public.faqs(sort_order, question);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'org_units', 'employees', 'employee_contacts',
    'company_history', 'faqs', 'materials'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', table_name);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name
    );
  end loop;
end;
$$;

create or replace function public.is_hr()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'hr'
  );
$$;

grant execute on function public.is_hr() to authenticated;

alter table public.profiles enable row level security;
alter table public.org_units enable row level security;
alter table public.employees enable row level security;
alter table public.employee_contacts enable row level security;
alter table public.company_history enable row level security;
alter table public.faqs enable row level security;
alter table public.materials enable row level security;

grant select, insert, update, delete on
  public.profiles, public.org_units, public.employees, public.employee_contacts,
  public.company_history, public.faqs, public.materials
to authenticated;

drop policy if exists "profiles_read_self_or_hr" on public.profiles;
create policy "profiles_read_self_or_hr" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_hr()));
drop policy if exists "profiles_hr_manage" on public.profiles;
create policy "profiles_hr_manage" on public.profiles
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

drop policy if exists "org_units_read_authenticated" on public.org_units;
create policy "org_units_read_authenticated" on public.org_units
  for select to authenticated using (true);
drop policy if exists "org_units_hr_manage" on public.org_units;
create policy "org_units_hr_manage" on public.org_units
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

drop policy if exists "employees_read_directory" on public.employees;
create policy "employees_read_directory" on public.employees
  for select to authenticated
  using (
    directory_visible
    or (select public.is_hr())
    or exists (
      select 1
      from public.profiles
      where profiles.id = (select auth.uid())
        and profiles.employee_id = employees.id
    )
  );
drop policy if exists "employees_hr_manage" on public.employees;
create policy "employees_hr_manage" on public.employees
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

drop policy if exists "employee_contacts_read_allowed" on public.employee_contacts;
create policy "employee_contacts_read_allowed" on public.employee_contacts
  for select to authenticated
  using (
    visible_to_employees
    or employee_id in (
      select employee_id from public.profiles
      where id = (select auth.uid()) and employee_id is not null
    )
    or (select public.is_hr())
  );
drop policy if exists "employee_contacts_hr_manage" on public.employee_contacts;
create policy "employee_contacts_hr_manage" on public.employee_contacts
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

drop policy if exists "company_history_read_published" on public.company_history;
create policy "company_history_read_published" on public.company_history
  for select to authenticated
  using (is_published or (select public.is_hr()));
drop policy if exists "company_history_hr_manage" on public.company_history;
create policy "company_history_hr_manage" on public.company_history
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

drop policy if exists "faqs_read_published" on public.faqs;
create policy "faqs_read_published" on public.faqs
  for select to authenticated
  using (is_published or (select public.is_hr()));
drop policy if exists "faqs_hr_manage" on public.faqs;
create policy "faqs_hr_manage" on public.faqs
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

drop policy if exists "materials_read_published_for_audience" on public.materials;
create policy "materials_read_published_for_audience" on public.materials
  for select to authenticated
  using (
    (is_published and (
      audience_unit_id is null
      or exists (
        select 1
        from public.profiles p
        join public.employees e on e.id = p.employee_id
        where p.id = (select auth.uid())
          and e.org_unit_id = materials.audience_unit_id
      )
    ))
    or (select public.is_hr())
  );
drop policy if exists "materials_hr_manage" on public.materials;
create policy "materials_hr_manage" on public.materials
  for all to authenticated
  using ((select public.is_hr()))
  with check ((select public.is_hr()));

-- Uploaded files are private. Upload actual files to this bucket, then set materials.storage_path
-- to the matching object path; the employee client can then request an authorized download.
insert into storage.buckets (id, name, public)
values ('prosafe-documents', 'prosafe-documents', false)
on conflict (id) do update set name = excluded.name, public = false;

drop policy if exists "prosafe_documents_read_published" on storage.objects;
create policy "prosafe_documents_read_published" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'prosafe-documents'
    and (
      (select public.is_hr())
      or exists (
        select 1
        from public.materials material
        where material.storage_path = storage.objects.name
          and material.is_published
          and (
            material.audience_unit_id is null
            or exists (
              select 1
              from public.profiles profile
              join public.employees employee on employee.id = profile.employee_id
              where profile.id = (select auth.uid())
                and employee.org_unit_id = material.audience_unit_id
            )
          )
      )
    )
  );
drop policy if exists "prosafe_documents_hr_insert" on storage.objects;
create policy "prosafe_documents_hr_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'prosafe-documents' and (select public.is_hr()));
drop policy if exists "prosafe_documents_hr_update" on storage.objects;
create policy "prosafe_documents_hr_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'prosafe-documents' and (select public.is_hr()))
  with check (bucket_id = 'prosafe-documents' and (select public.is_hr()));
drop policy if exists "prosafe_documents_hr_delete" on storage.objects;
create policy "prosafe_documents_hr_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'prosafe-documents' and (select public.is_hr()));
