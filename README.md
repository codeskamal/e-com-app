# E-Commerce Multi-Vendor Platform

B2C E-Commerce Multi-Vendor Platform built with MERN stack + Turborepo monorepo.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo + pnpm workspaces |
| Language | TypeScript (strict mode) |
| API | Express.js 5 + Prisma ORM 7 + MySQL |
| Frontend | Next.js 16 + Tailwind CSS 4 |
| Validation | Zod |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Session Store | Redis (ioredis) — JWT blacklist for logout revocation |

## Project Structure

```
e-com-app/
├── apps/
│   ├── api/                    # Express.js REST API
│   │   ├── prisma/             # Prisma schema + migrations
│   │   ├── prisma.config.ts    # Prisma CLI config
│   │   └── src/
│   │       ├── common/         # Shared middleware + utils
│   │       │   ├── middleware/  # error-handler, validate, not-found, async-handler, auth, rbac
│   │       │   ├── types/      # Express Request augmentation (express.d.ts)
│   │       │   └── utils/      # AppError hierarchy
│   │       ├── config/         # Env vars, Prisma client singleton, Redis client singleton
│   │       ├── modules/        # Feature-based N-tier modules
│   │       │   ├── auth/       # Register, login, logout, getMe
│   │       │   ├── users/      # User CRUD, profile update, password change
│   │       │   ├── products/   # Product CRUD
│   │       │   ├── orders/     # Order management
│   │       │   ├── vendors/    # Vendor profiles
│   │       │   ├── reviews/    # Product reviews
│   │       │   └── cart/       # Shopping cart
│   │       ├── routes/         # Route aggregator
│   │       ├── app.ts          # Express app setup
│   │       └── server.ts       # Entry point
│   └── web/                    # Next.js 16 frontend
└── packages/
    ├── eslint-config/          # Shared ESLint 9 flat config
    ├── tsconfig/               # Shared TypeScript configs
    └── types/                  # Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- MySQL 8.0+
- Redis 7.0+

### Installation

```bash
pnpm install
```

### Database Setup

```bash
# Create database
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS e_com_app_0826;"

# Copy environment file
cp apps/api/.env.example apps/api/.env

# Generate Prisma client
pnpm --filter api exec prisma generate

# Run migrations
pnpm --filter api exec prisma migrate dev
```

### Redis Setup

Redis is used for JWT blacklist (logout token revocation). Ensure Redis is running locally:

```bash
# Windows (if installed as service)
# Redis runs on 127.0.0.1:6379 by default
```

### Environment Variables (`apps/api/.env`)

```
PORT=5000
DATABASE_URL="mysql://root:root@localhost:3306/e_com_app_0826"
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=e_com_app_0826
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

- `DATABASE_URL` — Used by Prisma CLI for migrations (via `prisma.config.ts`)
- `DATABASE_HOST/USER/PASSWORD/NAME` — Used by the MariaDB adapter at runtime
- `REDIS_HOST/PORT` — Redis connection for JWT blacklist

### Development

```bash
# Start all apps in dev mode
pnpm turbo dev

# Start API only
pnpm --filter api dev

# Start web only
pnpm --filter web dev
```

### Build & Verify

```bash
pnpm turbo build        # Build all packages
pnpm turbo type-check   # Type-check all packages
pnpm turbo lint         # Lint all packages
```

### Prisma Commands

```bash
pnpm --filter api exec prisma generate     # Regenerate Prisma client
pnpm --filter api exec prisma migrate dev  # Run pending migrations
pnpm --filter api exec prisma studio       # Open Prisma Studio
```

## API Architecture

The API uses a **feature-based N-tier layered architecture**:

```
Request → Route → validate(Zod) → Controller → Service → Repository → Prisma → MySQL
```

| Layer | Responsibility |
|-------|---------------|
| **Route** | HTTP endpoints, validation middleware, auth middleware |
| **Controller** | req/res translation, delegates to service |
| **Service** | Business logic, throws domain errors |
| **Repository** | All Prisma queries, data access |
| **Schema** | Zod validation schemas + inferred TS types |

### Middleware

| Middleware | Purpose |
|------------|---------|
| `auth` | JWT verification + Redis blacklist check. Attaches `req.user` with `{ sub, email }` |
| `rbac` | Role-based authorization. Usage: `authorize("ADMIN", "VENDOR")` |
| `validate` | Zod schema validation for body, params, query |
| `error-handler` | Global error handler — maps AppError hierarchy to HTTP status codes |
| `async-handler` | Wraps async route handlers to catch promise rejections |
| `not-found` | 404 catch-all for unmatched routes |

### API Endpoints

All endpoints are prefixed with `/api/v1`.

| Module | Endpoints |
|--------|-----------|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout` 🔒, `GET /auth/me` 🔒 |
| Users | `GET /users` 🔒ADMIN, `GET /users/:id` 🔒ADMIN, `PUT /users/profile` 🔒, `PUT /users/password` 🔒, `DELETE /users/:id` 🔒ADMIN |
| Products | `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id` |
| Orders | `GET /orders`, `GET /orders/:id`, `POST /orders` |
| Vendors | `GET /vendors`, `GET /vendors/:id`, `POST /vendors`, `PUT /vendors/:id` |
| Reviews | `GET /reviews`, `GET /reviews/:id`, `POST /reviews`, `PUT /reviews/:id`, `DELETE /reviews/:id` |
| Cart | `GET /cart`, `POST /cart`, `PUT /cart/:id`, `DELETE /cart/:id`, `DELETE /cart` |

🔒 = Requires `Authorization: Bearer <token>` header
ADMIN = Requires ADMIN role

### JWT Blacklist (Logout Revocation)

When a user logs out, their JWT is stored in Redis with a TTL matching the token's remaining expiry. The `auth` middleware checks Redis before verifying the token — if found, the request is rejected with `401 Unauthorized`.

## Database Schema (RBAC)

### Role-Based Access Control

| Table | Purpose |
|-------|---------|
| `permissions` | Granular `resource:action` pairs (e.g. `product:create`) |
| `roles` | Named roles: ADMIN, VENDOR, CUSTOMER |
| `role_permissions` | Many-to-many: role ↔ permission |
| `user_roles` | Many-to-many: user ↔ role |

### Domain Models

User, VendorProfile, Category, Product, Order, OrderItem, Review, CartItem

See `apps/api/prisma/schema.prisma` for the full schema.
