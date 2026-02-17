# NestJS + TypeScript + MongoDB

This is the backend package of a fullstack monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces). It provides a minimal REST API template using NestJS, TypeScript, and MongoDB (via Mongoose).

## Features

- Built with [NestJS](https://nestjs.com/) for scalable, modular architecture
- RESTful API for Credentials
- MongoDB integration with [mongoose](https://mongoosejs.com/)
- TypeScript-first development
- Shares types and logic with other packages in the monorepo

## Prerequisites

- **Node.js** (see root package.json for required version)
- **MongoDB**: You must have a running MongoDB instance (default: mongodb://localhost:27017/credential_db). You can use a local install or Docker:
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
  - `models/credential/` – Credential module, controller, service, schema
  - `base/` – Health check module
- `package.json` – Project metadata and scripts

## API Endpoints

### Credential Endpoints

- `POST /credentials/issue` – Issue a new credential (body: `{ type, issuer, subject, claims }`)
- `GET /credentials` – List all credentials in the wallet
- `GET /credentials/:id` – Fetch a credential by ID
- `POST /credentials/verify` – Verify a credential JWT (body: `{ jwt }`)
- `DELETE /credentials/:id` – Delete a credential by ID

Example credential object:

```json
{
  "_id": "...",
  "type": "TestCredential",
  "issuer": "did:example:issuer",
  "subject": "did:example:subject",
  "claims": { "name": "Alice" },
  "jwt": "..."
}
```

## Testing

This backend supports automated testing using [Vitest](https://vitest.dev/) and [Supertest](https://www.npmjs.com/package/supertest) for HTTP endpoint testing. Example tests can be found in `src/models/credential/credential.controller.test.ts`.

To run the tests:

```bash
pnpm --filter express-ts-template test
```

Tests cover all main API endpoints and error cases. You can add your own tests in the same style for additional coverage.

---

Happy coding!

> **Note:** This backend was migrated from Express to NestJS. See the commit history for details.
