# Project Overview

- Type: B2C E-Commerce Multi-Vendor Platform (MERN + Turborepo)
- Goal: High-scale modular e-commerce supporting real-time inventory, auth, and payments.

# OpenCode Rules: TypeScript Turborepo

### Core Stack

- Monorepo: Turborepo + pnpm workspaces
- Language: TypeScript (Strict mode across all apps/packages)
- Backend: Express.js (Node.js) + Mongoose (MongoDB)
- Frontend: Next 16 + Tailwind CSS 4 version
- Shared Packages: Shared TS config, ESLint config, UI components, Types

### Execution Rules

1. Work STRICTLY on the single assigned task from `TASKS.md`. Do not build ahead.
2. After completing a task, run `pnpm type-check` and `pnpm lint` before marking it done `[x]`.
3. Never install global dependencies; always target specific packages via `pnpm --filter`.
4. At every change or implmentation update `README.md` file. And STRICTLY create git branch for every feature also put comment before pushing. Before creating any branch take pull from master then create new branch.
