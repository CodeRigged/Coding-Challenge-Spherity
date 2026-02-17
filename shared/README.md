# Shared Package

This package contains shared types, enums, and configuration files used across the `fullstack-app-template` pnpm monorepo. It is intended to provide a single source of truth for common definitions, ensuring consistency and reducing duplication between packages.

## Example Usage

The `types/enums/index.ts` file demonstrates how to define and export enums for use in other packages. For example, the `Locales` enum provides a set of language codes:

```ts
export enum Locales {
  ENGLISH = "en-US",
  FRENCH = "fr-FR",
  GERMAN = "de-DE",
  // add more locales here
}
```

You can import shared types/enums in the backend and frontend like this:

```ts
import { Locales } from "shared/types";
```

## Rebuilding

If you change or add types/enums, rebuild the shared package:

```bash
pnpm --filter shared build
```

## Note

> Defining an enum of languages in this way is generally **not advisable** for production code, as it can be inflexible and hard to maintain. This is provided here purely as an example of how to use the shared package.
