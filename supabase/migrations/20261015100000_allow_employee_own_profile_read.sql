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
