# Implementation Tasks

## Phase 1: Monorepo Foundation & Scaffolding

- [x] Task 1.1: Initialize root `package.json`, `pnpm-workspace.yaml`, and `turbo.json`.
- [x] Task 1.2: Create shared base config packages (`packages/tsconfig`, `packages/eslint-config`).
- [x] Task 1.3: Create `packages/types` for shared TypeScript models and DTOs.
- [x] Task 1.4: Scaffold `apps/api` (Express + TS + Mongoose setup with base script wiring).
- [x] Task 1.5: Scaffold `apps/web` (Next.js 16 + Tailwind CSS 4 + TS referencing `packages/types`).
- [x] Task 1.6: Verify full workspace build via `pnpm turbo build` & `pnpm turbo lint`.
- [x] Task 1.7: Add prisma dependencies into `apps/api`. And Design Database schema with full RABC control.
  - [x] 1.7.1: Remove Mongoose, install Prisma + Zod + bcryptjs + jsonwebtoken dependencies.
  - [x] 1.7.2: Create `.env` / `.env.example` with MySQL `DATABASE_URL` and JWT config.
  - [x] 1.7.3: Create `prisma/schema.prisma` — MySQL RBAC schema (Permission, Role, RolePermission, UserRole) + domain models (User, VendorProfile, Category, Product, Order, OrderItem, Review, CartItem).
  - [x] 1.7.4: Create `src/config/prisma.ts` — Prisma client singleton with global caching.
  - [x] 1.7.5: Create `src/common/utils/errors.ts` — AppError, NotFoundError, ConflictError, ValidationError, ForbiddenError, UnauthorizedError.
  - [x] 1.7.6: Create `src/common/middleware/` — error-handler, validate (Zod), not-found, async-handler.
  - [x] 1.7.7: Create N-tier feature modules — `auth`, `users`, `products`, `orders`, `vendors`, `reviews`, `cart` (Route → Controller → Service → Repository → Schema).
  - [x] 1.7.8: Create `src/routes/index.ts` — route aggregator mounting all modules under `/api/v1`.
  - [x] 1.7.9: Update `app.ts` and `server.ts` — new middleware stack, remove Mongoose connection.
  - [x] 1.7.10: Run `prisma generate` + `prisma migrate dev --name init` against local MySQL.
  - [x] 1.7.11: Verify — `pnpm turbo build` (3/3), `pnpm turbo type-check` (2/2), `pnpm turbo lint` (2/2, 0 errors).
  - [x] 1.7.12: Update `README.md` and `TASKS.md` with Prisma setup, schema overview, and N-tier architecture docs.
  - [x] 1.7.13: Upgrade Prisma 6 → 7 — bump `prisma` + `@prisma/client` to `^7.9.0`, add `@prisma/adapter-mariadb` driver adapter, switch to `prisma-client` generator with required output path, create `prisma.config.ts`, update `src/config/prisma.ts` with adapter instantiation using individual DB env vars (`DATABASE_HOST/USER/PASSWORD/NAME`).

## Phase 2: Authentication & Authorization

- [x] Task 2.1: In `apps/web` There will be four portals one for customer, admin, vendor, public pages. Set folder structure accordingly. Design own Ui components. Animation will be used Motion (Framer Motion). Brand colors will be --color-1: #DC095E;,--color-2: #09DC88;
- [] Task 2.2: Design should be mobile first and responsive for all devices.
- [x] Task 2.3: In `apps/api` build api for getting logged user details, authentication and authorization middleware, profile change, password change, also radis because we can expire jwt after logout but we can prevent to access routes using loggedout token.
- [] Task 2.4: Design public pages like home page, product listing page, cart pages.
- [x] Task 2.5: In `apps/api` build api and schema for product variations. Treat as clothing for men, women, kids e commerece website. Add some dummy record for all tables. Also create some user
