# PetFinder — поиск потерянных животных по фото

Учебный проект по курсу «Fullstack». Пользователь загружает снимок животного, а система находит похожих животных в базе объявлений.

## Назначение и сценарии

1. **Потерял питомца** — загружаю фото, получаю список найденных похожих животных, открываю карточку и связываюсь с нашедшим.
2. **Нашёл животное** — добавляю объявление с фото, чтобы владелец мог его обнаружить.
3. **Просмотр каталога** — фильтрую объявления по статусу, виду и городу.

## Экраны

| Маршрут | Экран | Назначение |
|---|---|---|
| `/` | Главная | Описание сервиса и входы в основные сценарии |
| `/search` | Поиск по фото | Загрузка снимка, предпросмотр, список совпадений с % сходства |
| `/animals` | Каталог | Список объявлений с фильтрами |
| `/animals/:id` | Карточка животного | Подробности и контакты |
| `/add` | Новое объявление | Форма добавления потерянного/найденного животного |
| `*` | 404 | Несуществующий адрес |

## Стек

React 18 + TypeScript, Vite, React Router 6, **MUI (Material UI)** как библиотека UI-компонентов. Backend: Python, FastAPI, SQLAlchemy 2, PostgreSQL.

## Структура frontend

```
src/
  components/   общие компоненты (Layout, AnimalCard)
  pages/        страницы по маршрутам
  data/         демонстрационные данные
  types.ts      типы предметной области
```

## Запуск frontend

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # проверка типов и сборка
```
## Скриншоты

Каталог `docs/screenshots/`: `home.png`, `search.png`, `catalog.png`, `animal-details.png`, `add.png`. 

## Backend

### Структура

```
backend/
  app/
    main.py        точка входа, CORS, раздача загруженных фото
    config.py      настройки из переменных окружения (.env)
    database.py    подключение к PostgreSQL, сессии SQLAlchemy
    models.py      модели таблиц
    schemas.py     схемы валидации запросов и ответов (Pydantic)
    crud.py        операции с данными
    routers/animals.py   маршруты API
  requirements.txt
  .env.example     пример настроек без секретов
```

### Модель данных

- **animals** — объявление: `id`, `name`, `species` (cat/dog), `breed`, `color`, `status` (lost/found), `city`, `event_date`, `description`, `contact`, `created_at`.
- **photos** — фотография: `id`, `animal_id` (внешний ключ на `animals.id`, `ON DELETE CASCADE`), `file_name`, `created_at`.

Связь «один ко многим»: у животного может быть несколько фото; при удалении животного его фото удаляются из БД и с диска.

### API

| Метод | Адрес | Назначение |
|---|---|---|
| GET | `/animals` | список; фильтры `status`, `species`, `city`, пагинация `skip`, `limit` |
| POST | `/animals` | создать (201) |
| GET | `/animals/{id}` | получить (404, если нет) |
| PATCH | `/animals/{id}` | изменить отдельные поля |
| DELETE | `/animals/{id}` | удалить (204) |
| POST | `/animals/{id}/photos` | загрузить фото (JPEG/PNG/WebP, до 5 МБ) |
| DELETE | `/photos/{id}` | удалить фото (204) |
| GET | `/health` | проверка работы сервера |

Ошибки: 404 — запись не найдена; 422 — некорректные данные (с описанием поля); 413/415 — слишком большой файл / неподдерживаемый тип. Интерактивная документация: http://localhost:8000/docs

### Запуск backend

1. Установите Python 3.11+ и PostgreSQL.
2. Создайте базу: в pgAdmin ПКМ на Databases → Create → Database `petfinder`, либо `psql -U postgres -c "CREATE DATABASE petfinder;"`.
3. Настройте окружение:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env      # впишите свой пароль в DATABASE_URL
```
4. Запустите: `uvicorn app.main:app --reload`. Таблицы создаются автоматически при старте.


