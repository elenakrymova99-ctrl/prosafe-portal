# ProSafe Portal

Прототип портала HR для адаптации сотрудников и операций с документами.

## Что включено
- статические страницы HTML/CSS/JS
- локальное сохранение в `localStorage`
- демо-данные для HR-процесса
- страница входа с отдельным кабинетом сотрудника
- общая дизайн-система экранов и адаптивная прокрутка таблиц на узких экранах
- GitHub Pages deployment workflow
- Supabase/PostgreSQL schema for employee directory, company history, FAQ and searchable documents/templates

## Вход и роли
Страница входа использует Supabase Auth: пользователи входят корпоративным email и паролем, созданными в Supabase Authentication. Роль и связь с профилем сотрудника читаются из `public.profiles`; поддерживаемые роли БД: `hr`, `employee`, `employee_onboarding`, `adaptation_manager`. HR создаёт пользователей в Supabase, а не в демонстрационном разделе локальных доступов.

В HR-кабинете есть пункт «Моя визитка». В справочнике HR может редактировать карточки сотрудников и задачи их индивидуальных планов; на главной показываются задачи адаптации, назначенные на текущий день, а название задачи открывает редактор. Сотрудники могут просматривать историю компании, оргструктуру и FAQ, искать и скачивать доступные документы и шаблоны, оставлять анонимные идеи и отправлять личные обращения HR. На главной сотрудника показываются его задачи на сегодня и открытые поручения, где он назначен ответственным. HR просматривает анонимные идеи и обращения в разделе «Опросы и результаты → Сообщения сотрудников».

Supabase Auth и RLS защищают доступ к подключённым материалам. Остальные HR-функции, планы адаптации и обратная связь всё ещё используют локальное хранилище прототипа, пока для них не создано и не подключено серверное хранилище. Не используйте эти незаписанные в Supabase функции для реальных конфиденциальных данных.

## Supabase: схема базы данных

SQL-схема находится в [`supabase/schema.sql`](./supabase/schema.sql). Она создаёт таблицы сотрудников и подразделений, публикаций истории компании, FAQ, материалов/шаблонов и профилей ролей; включает тестовые записи и Row Level Security. Сотрудники могут только читать опубликованные материалы, а изменять их могут только профили с ролью `hr`. Файлы документов хранятся в закрытом Supabase Storage bucket `prosafe-documents`.

1. Создайте проект в Supabase.
2. В Supabase откройте `SQL Editor -> New query`, вставьте содержимое `supabase/schema.sql` и нажмите `Run`.
   Убедитесь, что выбран именно тот Supabase-проект, URL которого настроен в `js/app.js`. Проверить создание таблиц можно так:

   ```sql
   select to_regclass('public.org_units') as org_units,
          to_regclass('public.employees') as employees,
          to_regclass('public.materials') as materials;
   ```

   Для всех трёх полей ожидаются имена таблиц, не `NULL`.
3. Создайте пользователей в `Authentication -> Users`. В `SQL Editor` свяжите учётную запись HR с профилем (замените адрес на адрес созданного пользователя):

   ```sql
   insert into public.profiles (id, role)
   select id, 'hr' from auth.users where email = 'hr@example.com'
   on conflict (id) do update set role = excluded.role;
   ```

   Для сотрудника с адаптацией замените email на email пользователя Supabase:

   ```sql
   insert into public.profiles (id, role, employee_id)
   select auth_user.id, 'employee_onboarding', employee.id
   from auth.users auth_user
   join public.employees employee on employee.seed_key = 'igor-kuznetsov'
   where auth_user.email = 'employee@example.com'
   on conflict (id) do update
   set role = excluded.role, employee_id = excluded.employee_id;
   ```

   Используйте `employee` для обычного сотрудника и `adaptation_manager` для руководителя адаптации. Роль HR должна назначаться только из доверенной административной среды.
4. Загрузите реальные PDF/DOCX-файлы в закрытый bucket `prosafe-documents` и укажите путь объекта в `materials.storage_path`. В SQL добавлены только демонстрационные метаданные материалов, сами файлы не приложены.

Вход в портал и чтение/изменение истории, FAQ и материалов подключены к Supabase. Список сотрудников и оргструктура также загружаются из Supabase. Остальные данные (задачи адаптации, опросы, отклики и часть HR-операций) пока локальные. На клиент помещён только publishable key; `service_role` key нельзя помещать в HTML, JavaScript или GitHub Pages.

В кабинете сотрудника история, оргструктура, FAQ и документы/шаблоны доступны для просмотра и поиска. Они не показывают HR-кнопки редактирования; ветвь оргструктуры подсвечивается при наведении или клавиатурном фокусе.

## Запуск локально
Откройте проект в браузере через локальный сервер, например:

```bash
python -m http.server 8000
```

После этого откройте:

```text
http://localhost:8000/
```

## Развёртывание на GitHub Pages
1. Создайте репозиторий на GitHub.
2. Загрузите код в ветку `main`.
3. В настройках репозитория откройте `Settings -> Pages`.
4. Источник: `GitHub Actions`.
5. После push workflow автоматически задеплоит сайт.

Сайт будет доступен по адресу:

```text
https://<username>.github.io/<repository-name>/
```
