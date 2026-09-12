# Incident Tracker

A workflow-driven incident tracking system for enterprise use, built as a capstone project for the Netcracker Frontend School course. Covers the full incident lifecycle — creation, assignment, and status transitions through a configurable workflow — backed by a custom REST API.

Original assignment spec (Russian): [ТЗ.md](./ТЗ.md)

## Demo

> TODO: live demo link, once deployed to Vercel.

## Screenshots

> TODO: add after deployment.

## Highlights

- State management follows the Redux pattern via NgRx (Store + Effects + Selectors), applied consistently across three independent feature modules — incidents, users, process.
- The status workflow is data, not code: allowed transitions between statuses are configured at runtime rather than hardcoded.
- Custom REST API (no BaaS) built with Express and the native MongoDB driver.

## Tech stack

**Frontend**
- Angular 13, TypeScript (strict mode, no `any`)
- NgRx (Store, Effects, DevTools)
- Less — hand-written styles, no UI framework (per assignment requirements)

**Backend**
- Node.js, Express
- MongoDB (native driver, no ORM)

## Architecture

Each feature module (`incident`, `user`, `process`) is a self-contained NgRx slice: `actions` → `effects` (API calls) → `reducer` (state updates) → `selector` (state reads by components). See [project/src/app/modules](./project/src/app/modules).

## Features

- Incident list as a table: status icon, title, assignee, area, start/due dates, status
- Incident creation with validation (required fields, due date can't be in the past)
- Incident detail view with editable due date / assignee / description / status
- Configurable workflow: define statuses and which transitions between them are allowed
- User directory and user creation form (login, date of birth, position)
- Validation: required fields, due date not in the past, full names must not contain digits

## Project history

The app was first built against `localStorage` (see the [`localStorage`](../../tree/localStorage) branch) — no backend required. This branch (`mongoDb`) is the next iteration: a custom REST API on Express + MongoDB replaces client-only storage.

## Getting started

Requirements: Node.js, MongoDB (local or Atlas).

```bash
git clone <repo-url>
cd netcracker-projects

# backend
cd server
npm install
cp .env.example .env   # set MONGODB_URI if not using localhost
npm start              # runs on http://localhost:3000
```

```bash
# frontend (in a separate terminal)
cd project
npm install
npm start              # runs on http://localhost:4200
```

## API

Base path: `/api`

| Method | Path | Description |
|---|---|---|
| GET | `/incidents` | list incidents |
| GET | `/incidents/:id` | get incident by id |
| POST | `/incidents` | create incident |
| PUT | `/incidents` | update incident (dueDate, assignee, status, description) |
| PATCH | `/incidents` | update incident assignee |
| DELETE | `/incidents/:id` | delete incident |
| GET | `/users` | list users |
| GET | `/users/:id` | get user by id |
| POST | `/users` | create user |
| PUT | `/users` | update user |
| PATCH | `/users/assignee/add` | add an incident to a user |
| PATCH | `/users/assignee/delete` | remove an incident from a user |
| DELETE | `/users/:id` | delete user |
| GET | `/process` | list workflow statuses |
| PATCH | `/process` | update an allowed status transition |

## Notes

This was a mentored learning project. The assignment offered a choice between localStorage, a BaaS service, or a custom backend for data persistence (the latter two counted as bonus points) — a custom Express/MongoDB backend was implemented as the primary path.
