# Incident Tracker

[English](README.md) | **Русский**

Система учёта инцидентов для команды внутри компании на Angular 12, NgRx и TypeScript: инциденты, пользователи и связи между ними, данные хранятся в `localStorage` браузера. Интерфейс на русском.

> 🏁 **Course capstone** · Netcracker Frontend School · 2021. Итоговый проект под руководством ментора: в ТЗ на выбор было хранение в localStorage, BaaS или свой бэкенд, в этой ветке — localStorage. Исправления 2026 года перечислены в разделе [Что изменено позже](#что-изменено-позже).

**Live demo:** https://netcracker-projects-eta.vercel.app

<p>
  <img src="./screenshots/incidents.webp" alt="Список инцидентов со статусом, исполнителем, датами и приоритетом" width="100%">
</p>

## Ключевое

- **Хранение без бэкенда и без Effects.** Небольшой сервис синхронизации в каждом модуле подписан на свой срез NgRx, записывает его в `localStorage` при каждом изменении и восстанавливает при загрузке.
- **Синхронизация между вкладками.** Тот же сервис слушает событие `storage`, поэтому изменение в одной вкладке появляется в остальных.
- **Свой срез NgRx у каждого модуля.** У `incident` и `user` собственные `actions` → `reducer` → `selector`.
- **Без UI-библиотеки.** Селект, поиск с автодополнением и пайп для ФИО написаны с нуля в `modules/cdk/`, стили — на Less вручную.

## Возможности

- Список инцидентов в виде таблицы: ID, название, исполнитель, область, даты начала и дедлайна, статус, приоритет.
- Создание инцидента в попапе; исполнитель выбирается поиском по имени или ID.
- Страница инцидента: можно изменить дедлайн, исполнителя, описание и статус.
- Список пользователей, попап создания пользователя (ФИО, логин, дата рождения, должность) и страница пользователя.
- Привязка инцидентов к пользователю на его странице.
- Валидация: обязательные поля, дедлайн не в прошлом, ФИО без цифр.

<p>
  <img src="./screenshots/new-incident.webp" alt="Попап создания инцидента" width="49%">
  <img src="./screenshots/user-edit.webp" alt="Страница пользователя с привязанными инцидентами" width="49%">
</p>

## Стек

| Область | Инструменты |
| --- | --- |
| Фреймворк | Angular 12, TypeScript 4.3 |
| Состояние | NgRx Store, Store DevTools |
| Хранение | `localStorage` |
| Стили | Less, без UI-библиотеки |
| Хостинг | Vercel (статическое SPA) |

## Архитектура

```
component ──► store.dispatch(action) ──► reducer ──► selector ──► component
                                            │
                                            ▼
                         sync service ──► localStorage ──► other tabs ('storage' event)
```

1. Каждый модуль хранит свой срез NgRx в `store/`, например [incident.actions.ts](project/src/app/modules/incident/store/incident.actions.ts), [incident.reducer.ts](project/src/app/modules/incident/store/incident.reducer.ts), [incident.selector.ts](project/src/app/modules/incident/store/incident.selector.ts).
2. Начальное состояние берётся из демо-данных в `data/` ([incidents.ts](project/src/app/modules/incident/data/incidents.ts), [users.ts](project/src/app/modules/user/data/users.ts)).
3. [incident-sync-storage.service.ts](project/src/app/modules/incident/service/incident-sync-storage.service.ts) и [user-sync-storage.service.ts](project/src/app/modules/user/service/user-sync-storage.service.ts) при старте загружают сохранённое состояние в store, а затем записывают каждое изменение обратно в `localStorage`.

```
project/src/app/modules/
├── incident/     # список, попап и страница инцидента, срез NgRx, сервис синхронизации
├── user/         # список, попап и страница пользователя, срез NgRx, сервис синхронизации
├── process/      # заглушка для настройки процесса
├── cdk/          # общие селект, поиск и пайп для ФИО
└── not-found/    # страница 404
```

### Ключевые решения

- **Сервис синхронизации вместо Effects.** API нет, поэтому для сохранения состояния достаточно подписки на store.
- **Свои компоненты.** ТЗ запрещало UI-библиотеки, поэтому селект и поиск написаны вручную.

### Другие ветки

- [`mongoDb`](https://github.com/BarbaraFromTonshaevo/netcracker-projects/tree/mongoDb) — следующая итерация того же проекта: вместо `localStorage` свой REST API на Express + MongoDB. Пока не задеплоена, статус — в README этой ветки.

## Что изменено позже

- Добавлены недостающие зависимости `@ngrx/store` и `@ngrx/store-devtools`, Node 16 закреплена через Volta, чтобы проект снова собирался.
- Настроена маршрутизация SPA для Vercel в [project/vercel.json](project/vercel.json).
- Исправлено форматирование дат в формах редактирования: вместо `getDate()` использовался `getDay()`, а даты, восстановленные из `localStorage` строками, ломали форму.
- Исправлена привязка инцидентов к пользователю: после добавления одного инцидента кнопка «Добавить» оставалась заблокированной.
- Удалены отладочные `console.log`; добавлены этот README и скриншоты.

## Запуск

Нужна Node.js 16 (закреплена через Volta в [project/package.json](project/package.json)). Бэкенд и база данных не нужны.

```bash
cd project
npm install
npm start            # http://localhost:4200
```

Другие скрипты:

```bash
npm run build        # production-сборка в dist/
npm test             # Karma + Jasmine
```

## Деплой

Задеплоено на Vercel из папки `project/`. [project/vercel.json](project/vercel.json) перенаправляет все пути на `index.html`, чтобы маршруты вроде `/users` открывались напрямую.

## Известные ограничения

- Вкладка **Процесс** (настраиваемый workflow статусов) в этой ветке — заглушка.
- Нет мобильной вёрстки.
- Валидация форм навешивает CSS-классы через `document.querySelector`, а не через формы Angular.
- Тесты — только заглушки, сгенерированные Angular CLI.
- Angular 12 устарел и требует Node 16, отсюда закрепление версии через Volta.

## Что бы я улучшила

- **Reactive Forms** для валидации вместо ручной работы с DOM.
- **Effects и API** вместо сервисов синхронизации, как в ветке [`mongoDb`](https://github.com/BarbaraFromTonshaevo/netcracker-projects/tree/mongoDb).
- **Обновление Angular** до актуальной версии.
- **Модуль «Процесс»:** настраиваемые статусы и переходы между ними.
- **Адаптивная вёрстка** для планшетов и телефонов.
