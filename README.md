# Детская студия «Открытие» — макет

Быстрый демонстрационный монорепозиторий: интерфейс на React + Ant Design и статический API на Django + Django REST Framework. Данные вымышлены и хранятся в коде. Авторизации, базы данных, записи изменений и тестов нет.

## Запуск

Терминал 1 — API (Python 3.11+):

```bash
cd services/api
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Терминал 2 — интерфейс (Node.js 20+):

```bash
npm install
npm run dev
```

Откройте http://localhost:5173. Vite перенаправляет запросы `/api` на http://127.0.0.1:8000. На стартовом экране можно войти как педагог или ученик; любые введённые данные служат только для вида.

Для проверки сборки: `npm run build`. Для проверки конфигурации API: `python manage.py check` из `services/api`. Миграции не требуются.
