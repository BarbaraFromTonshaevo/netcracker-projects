# Incident Tracker

A workflow-driven incident tracking system for enterprise use, built as a capstone project for the Netcracker Frontend School course. Covers the full incident lifecycle — creation, assignment, and status transitions through a configurable workflow.

## Demo

> TODO: live demo link, once deployed to Vercel.

## Screenshots

> TODO: add after deployment.

## About this version

This branch persists data in the browser's **`localStorage`** — there's no backend or database to run. NgRx state is rehydrated from `localStorage` on load and kept in sync on every change.

There's also a [`mongoDb`](../../tree/mongoDb) branch with a custom REST API (Express + MongoDB) replacing `localStorage` with a real backend — a later iteration of the same project, demonstrating full-stack skills. It isn't deployed yet (see that branch's own README for status).

## Tech stack

- Angular 12, TypeScript
- NgRx (Store, Store DevTools) — Redux pattern
- Less — hand-written styles, no UI framework (per assignment requirements)

## Architecture

Each feature module (`incident`, `user`) keeps its own NgRx slice: `actions` → `reducer` → `selector`. Instead of Effects calling an API, a small sync service per module (e.g. [`incident-sync-storage.service.ts`](./project/src/app/modules/incident/service/incident-sync-storage.service.ts)) subscribes to the store, mirrors state into `localStorage` on every change, and rehydrates it on load.

## Features

- Incident list as a table: status icon, title, assignee, area, start/due dates, status
- Incident creation with validation (required fields, due date can't be in the past)
- Incident detail view with editable due date / assignee / description / status
- User directory and user creation form (login, date of birth, position)
- Validation: required fields, due date not in the past, full names must not contain digits

## Known limitations

- The **Process** tab (configurable status workflow) is a placeholder on this branch — it isn't implemented yet. It's structurally present on the [`mongoDb`](../../tree/mongoDb) branch.

## Getting started

Requirements: Node.js.

```bash
git clone <repo-url>
cd netcracker-projects/project
npm install
npm start
```

App runs at `http://localhost:4200` — no backend or database required.

## Related branches

- [`mongoDb`](../../tree/mongoDb) — full-stack variant with a custom Express + MongoDB REST API (in progress, not yet deployed)

## Notes

This was a mentored learning project. The assignment offered a choice between localStorage, a BaaS service, or a custom backend for data persistence — this branch implements the localStorage path.
