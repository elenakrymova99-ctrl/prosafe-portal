# ProSafe Portal

Прототип портала HR для адаптации сотрудников и операций с документами.

## Что включено
- статические страницы HTML/CSS/JS
- локальное сохранение в `localStorage`
- демо-данные для HR-процесса
- GitHub Pages deployment workflow

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
