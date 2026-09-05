# Course Platform

Monorepo foundation for a course-selling platform. Architecture and tooling only — no product features yet.

## Apps and packages

| Workspace | Name | Stack |
| --- | --- | --- |
| `apps/web` | `web` | Next.js App Router (customer-facing) |
| `apps/admin` | `admin` | React + Vite + React Router (admin) |
| `packages/ui` | `@repo/ui` | Shared shadcn primitives and tokens |
| `packages/types` | `@repo/types` | Shared TypeScript types (empty for now) |

```text
web   → @repo/ui, @repo/types
admin → @repo/ui, @repo/types
```

Applications do not depend on each other.

## Requirements

- Node.js 20+
- npm 11+

Do not use pnpm or yarn.

## Commands

```bash
npm install
npm run dev        # web :3000, admin :5173
npm run build
npm run lint
npm run typecheck
```

## shadcn (hybrid)

Shared primitives live in `@repo/ui`. Import them with deep paths:

```ts
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
```

Add a primitive to the shared package (default):

```bash
npx shadcn@latest add button -c packages/ui
```

Running the same command from an app also writes primitives into `@repo/ui`, because each app `components.json` points `ui` at `@repo/ui/components`.

App-exclusive primitives (only when the other app will never use them):

- `apps/web/components/ui/`
- `apps/admin/src/components/ui/`

Composed screens and shadcn blocks stay in the app (`components/`, `features/`), not in `@repo/ui`.

## Feature folders

Routes stay thin. Product code goes in feature modules.

```text
apps/web/features/<name>/index.ts
apps/admin/src/features/<name>/index.ts
```

- Pages/routes import a feature only through its `index.ts`
- Features import `@repo/ui` and `@repo/types`
- Features do not import other features' internals or `app/`
- Shared domain types go in `@repo/types`; feature-local types stay in the feature

## Notes

- npm workspaces + Turborepo orchestrate tasks.
- Shared packages export TypeScript source; Next.js and Vite transpile them.
- Both apps import `@repo/ui/styles.css` (Tailwind v4 + shadcn tokens).
