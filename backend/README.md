# NestJS + TypeScript + MongoDB

This is the backend package of a fullstack monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces). It provides a minimal REST API template using NestJS, TypeScript, and MongoDB (via Mongoose).

## Features

- Built with [NestJS](https://nestjs.com/) for scalable, modular architecture
- RESTful API for Todos
- MongoDB integration with [mongoose](https://mongoosejs.com/)
- TypeScript-first development
- Shares types and logic with other packages in the monorepo

## Prerequisites

- **Node.js** (see root package.json for required version)
- **MongoDB**: You must have a running MongoDB instance (default: mongodb://localhost:27017/todos). You can use a local install or Docker:
  - Local: [Install MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Docker: `docker run -d -p 27017:27017 --name mongo mongo`

## Usage in Monorepo

This package is intended to be used as part of the monorepo. To install dependencies and run the backend in development mode, use the root workspace commands:

```bash
pnpm install
pnpm --filter nestjs-template dev
```

You can also build or start the backend specifically:

```bash
pnpm --filter nestjs-template build
pnpm --filter nestjs-template start
```

## Project Structure

- `src/` – Application source code
  - `app.module.ts` – Main NestJS application module
  - `main.ts` – Application entry point
  - `models/todo/` – Todo module, controller, service, schema
  - `base/` – Health check module
- `package.json` – Project metadata and scripts

## API Endpoints

- `GET /todos` – List all todos
- `POST /todos` – Add a new todo (body: `{ text: string }`)
- `PATCH /todos/:id` – Edit a todo's text (body: `{ text: string }`)
- `DELETE /todos/:id` – Delete a todo by ID
- `GET /health` – Health check endpoint (returns 200 if DB is connected)

Example todo object:

```json
{
  "_id": "...",
  "text": "Buy milk",
  "completed": false
}
```

## Testing

This backend supports automated testing using [Vitest](https://vitest.dev/) and [Supertest](https://www.npmjs.com/package/supertest) for HTTP endpoint testing. Example tests can be found in `src/models/todo/todo.controller.test.ts`.

To run the tests:

```bash
pnpm --filter express-ts-template test
```

Tests cover all main API endpoints and error cases. You can add your own tests in the same style for additional coverage.

---

Happy coding!

> **Note:** This backend was migrated from Express to NestJS. See the commit history for details.
