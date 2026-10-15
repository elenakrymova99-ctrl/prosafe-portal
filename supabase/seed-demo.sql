-- Optional sample data for a disposable development project only.
-- Never run this file against production: it inserts fictitious employee and company data.

insert into public.org_units (code, name)
values ('office', 'Офис'), ('warehouse', 'Склад'), ('production', 'Производство')
on conflict (code) do update set name = excluded.name;

insert into public.org_units (code, name, parent_id)
select source.code, source.name, parent.id
from (values
  ('hr', 'HR', 'office'),
  ('production-team', 'Производство', 'production')
) as source(code, name, parent_code)
join public.org_units parent on parent.code = source.parent_code
on conflict (code) do update
set name = excluded.name, parent_id = excluded.parent_id;

insert into public.employees
  (seed_key, display_name, job_title, org_unit_id, start_date, status, adaptation_enabled)
select source.seed_key, source.display_name, source.job_title, unit.id,
       source.start_date::date, source.status, source.adaptation_enabled
from (values
  ('anna-mikhailova', 'Анна Михайлова', 'Менеджер по адаптации', 'hr', '2026-09-12', 'active', true),
  ('igor-kuznetsov', 'Игорь Кузнецов', 'Старший инженер', 'production-team', '2026-09-22', 'active', true),
  ('olga-petrova', 'Ольга Петрова', 'Руководитель участка', 'production-team', null, 'active', false),
  ('elena-soloveva', 'Елена Соловьева', 'HRBP', 'hr', null, 'active', false)
) as source(seed_key, display_name, job_title, unit_code, start_date, status, adaptation_enabled)
join public.org_units unit on unit.code = source.unit_code
on conflict (seed_key) do update
set display_name = excluded.display_name,
    job_title = excluded.job_title,
    org_unit_id = excluded.org_unit_id,
    start_date = excluded.start_date,
    status = excluded.status,
    adaptation_enabled = excluded.adaptation_enabled;

update public.employees employee
set manager_id = manager.id
from (values
  ('anna-mikhailova', 'elena-soloveva'),
  ('igor-kuznetsov', 'olga-petrova'),
  ('olga-petrova', 'elena-soloveva')
) as reporting(employee_key, manager_key)
join public.employees manager on manager.seed_key = reporting.manager_key
where employee.seed_key = reporting.employee_key;

insert into public.employee_contacts (employee_id, phone, email, visible_to_employees)
select employee.id, source.phone, source.email, true
from (values
  ('anna-mikhailova', '+7 (495) 111-22-33', 'a.mikhaylova@prosafe.ru'),
  ('igor-kuznetsov', '+7 (495) 222-44-55', 'i.kuznetsov@prosafe.ru'),
  ('olga-petrova', '+7 (495) 333-66-77', 'o.petrova@prosafe.ru'),
  ('elena-soloveva', '+7 (495) 444-88-99', 'e.soloveva@prosafe.ru')
) as source(employee_key, phone, email)
join public.employees employee on employee.seed_key = source.employee_key
on conflict (employee_id) do update
set phone = excluded.phone,
    email = excluded.email,
    visible_to_employees = true;

insert into public.company_history (slug, title, body, is_published)
values (
  'company',
  'История компании',
  'Компания ProSafe работает по модели «первый месяц — приоритет». Для новых сотрудников важно быстро понять регламенты, роли и культуру команды.',
  true
)
on conflict (slug) do nothing;

insert into public.faqs (slug, question, answer, sort_order, is_published)
values
  ('vacation-request', 'Кому подать заявку на отпуск?', 'Заявку оформляет руководитель подразделения через портал HR и согласует с HRBP.', 10, true),
  ('change-password', 'Как сменить пароль?', 'После первого входа система предложит сменить пароль. В случае проблем — обратитесь в HR.', 20, true),
  ('access-problem', 'Что делать при проблеме с доступом?', 'Напишите в чат HR или свяжитесь с коллегой из IT через запрос в поддержку.', 30, true)
on conflict (slug) do nothing;

insert into public.materials
  (slug, kind, title, category, version, audience_unit_id, featured, is_published)
values
  ('adaptation-policy', 'document', 'Положение об адаптации', 'Политика', 'v4.2', null, true, true),
  ('safety-instruction', 'document', 'Инструкция по технике безопасности', 'Локальные регламенты', 'v1.8',
    (select id from public.org_units where code = 'production'), true, true),
  ('engineer-adaptation-plan', 'template', 'План адаптации инженера', 'Шаблон', 'v2.0', null, true, true),
  ('manager-adaptation-plan', 'template', 'План адаптации менеджера', 'Шаблон', 'v3.0', null, true, true),
  ('ethics-code', 'corporate', 'Кодекс корпоративной этики', 'Корпоративные документы', 'v8.1', null, true, true),
  ('work-support-policy', 'corporate', 'Политика поддержки труда', 'Корпоративные документы', 'v2.4',
    (select id from public.org_units where code = 'warehouse'), false, true)
on conflict (slug) do nothing;
