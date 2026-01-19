---
applyTo: 'app/hackathon-frontend/**'
---
# Hackathon Frontend Instructions

This directory contains the "Hackathon Frontend", a React 19 application built with TanStack Start, specialized for compliance assessment workflows.

## Architecture
- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (React 19, TypeScript).
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) file-based routing in `src/routes/`.
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI) + Tailwind CSS v4.
- **State Management**: React Context (`DashboardContext.tsx`) for feature-specific state (Documents, History).

## Code Organization
- `src/routes/`: File-based routes. `__root.tsx` defines the main layout/providers.
- `src/components/ui/`: Reusable UI components (shadcn/ui). **Do not modify these unless necessary.**
- `src/components/dashboard/`: Feature-specific components (e.g., `ComplianceQueryForm`, `KnowledgeBaseView`).
- `src/lib/api.ts`: API client. Handles auth tokens automatically via `auth.ts`.
- `src/context/`: Context providers (e.g., `DashboardContext`).

## Key Patterns & Conventions
- **Imports**: Use absolute paths with `@/` alias (e.g., `import { Button } from '@/components/ui/button'`).
- **Data Fetching**: 
  - Use `lib/api.ts` functions which handle `Authorization` headers.
  - Contexts (`DashboardContext`) generally manage the fetching and state of key entities.
- **Routing**: 
  - Create new pages by adding files to `src/routes/`.
  - Use `createFileRoute` for type-safe routing.
- **Styling**: 
  - Use Tailwind CSS utility classes.
  - Use `cn()` utility for conditional class merging.

## Workflows
- **Development**: `npm run dev` (Runs on port 3000).
- **Build**: `npm run build` (Outputs to `../backend/static` for integration with backend).
- **Testing**: `npm run test` (Vitest).

## Common Tasks
- **Adding a new shadcn component**: 
  - Usually added via CLI, but here manually add to `src/components/ui/`.
- **Connecting to Backend**:
  - Add function to `src/lib/api.ts`.
  - Ensure backend endpoint exists in `app/backend/app.py`.
  - Update `DashboardContext` if global state is needed.
