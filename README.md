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
| Animations | Motion (Framer Motion rebrand) |

## Project Structure

```
e-com-app/
├── apps/
│   ├── api/                            # Express.js REST API
│   │   ├── prisma/                     # Prisma schema + migrations + seed
│   │   │   ├── schema.prisma           # Full RBAC + e-commerce + variations schema
│   │   │   ├── seed.ts                 # Seed script (clothing dummy data)
│   │   │   └── prisma.config.ts        # Prisma CLI config with seed command
│   │   └── src/
│   │       ├── common/                 # Shared middleware + utils
│   │       │   ├── middleware/          # auth, rbac, error-handler, validate, not-found, async-handler
│   │       │   ├── types/              # Express Request augmentation (express.d.ts)
│   │       │   └── utils/              # AppError hierarchy
│   │       ├── config/                 # Env vars, Prisma client, Redis client
│   │       ├── modules/                # Feature-based N-tier modules (all function-based)
│   │       │   ├── auth/               # Register, login, logout, getMe
│   │       │   ├── users/              # User CRUD, profile update, password change
│   │       │   ├── products/           # Product CRUD
│   │       │   ├── attributes/         # Attribute CRUD (Size, Color, Material)
│   │       │   ├── variants/           # Product variant CRUD (linked to products)
│   │       │   ├── orders/             # Order management
│   │       │   ├── vendors/            # Vendor profiles
│   │       │   ├── reviews/            # Product reviews
│   │       │   └── cart/               # Shopping cart (with variant support)
│   │       ├── routes/                 # Route aggregator
│   │       ├── app.ts                  # Express app setup
│   │       └── server.ts               # Entry point
│   └── web/                            # Next.js 16 frontend
│       └── src/
│           ├── app/                    # App Router with 4 portal route groups
│           │   ├── (public)/           # Public pages: /, /products, /cart
│           │   ├── (customer)/         # Customer portal: /customer/*
│           │   ├── (admin)/            # Admin portal: /admin/*
│           │   └── (vendor)/           # Vendor portal: /vendor/*
│           ├── components/
│           │   ├── ui/                 # Button, Input, Card, Badge, Modal, Skeleton
│           │   ├── layout/             # Navbar, Sidebar, Footer
│           │   └── shared/             # PageTransition, FadeIn
│           └── lib/                    # utils.ts (cn helper)
└── packages/
    ├── eslint-config/                  # Shared ESLint 9 flat config
    ├── tsconfig/                       # Shared TypeScript configs
    └── types/                          # Shared TypeScript interfaces
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

# Apply schema to database
pnpm --filter api exec prisma db push

# Seed dummy data
pnpm --filter api exec prisma db seed
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

### Development

```bash
pnpm turbo dev          # Start all apps in dev mode
pnpm --filter api dev   # Start API only
pnpm --filter web dev   # Start web only
```

### Build & Verify

```bash
pnpm turbo build        # Build all packages
pnpm turbo type-check   # Type-check all packages
pnpm turbo lint         # Lint all packages
```

### Seed Data

The seed script creates:

| Table | Records |
|-------|---------|
| Roles | 3 (ADMIN, VENDOR, CUSTOMER) |
| Permissions | 26 |
| Users | 5 (1 admin, 2 vendors, 2 customers) |
| Vendor Profiles | 2 |
| Categories | 6 (Men's, Women's, Kids' Clothing + Shoes, Accessories, Sale) |
| Products | 12 (clothing, shoes, accessories) |
| Attributes | 3 (Size, Color, Material) |
| Attribute Values | 15 (XS-XXL, 5 colors, 3 materials) |
| Product Variants | 64 (size × color combos with SKU, price, inventory) |
| Orders | 3 |
| Reviews | 8 |
| Cart Items | 5 |

**Sample Credentials:** `admin@e-com.com` / `password123` (+ vendor/customer variants)

## API Architecture

All API code follows a **function-based** N-tier pattern:

```
Request → Route → validate(Zod) → Controller → Service → Repository → Prisma → MySQL
```

| Layer | Pattern |
|-------|---------|
| **Repository** | `export async function findById(id) { ... }` |
| **Service** | `import * as repo from "./x.repository.js"; export async function getById(id) { ... }` |
| **Controller** | `import * as svc from "./x.service.js"; export async function getById(req, res, next) { ... }` |
| **Routes** | `import * as ctrl from "./x.controller.js"; router.get("/", ctrl.getById)` |

### API Endpoints (`/api/v1`)

| Module | Endpoints |
|--------|-----------|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout` 🔒, `GET /auth/me` 🔒 |
| Users | `GET /users` 🔒ADMIN, `GET /users/:id` 🔒ADMIN, `PUT /users/profile` 🔒, `PUT /users/password` 🔒, `DELETE /users/:id` 🔒ADMIN |
| Products | `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id` |
| Attributes | `GET /attributes`, `GET /attributes/:id`, `POST /attributes` 🔒ADMIN, `PUT /attributes/:id` 🔒ADMIN, `DELETE /attributes/:id` 🔒ADMIN |
| Variants | `GET /variants/products/:productId/variants`, `GET /variants/:id`, `POST /variants/products/:productId/variants` 🔒VENDOR, `PUT /variants/:id` 🔒VENDOR, `DELETE /variants/:id` 🔒VENDOR |
| Orders | `GET /orders`, `GET /orders/:id`, `POST /orders` |
| Vendors | `GET /vendors`, `GET /vendors/:id`, `POST /vendors`, `PUT /vendors/:id` |
| Reviews | `GET /reviews`, `GET /reviews/:id`, `POST /reviews`, `PUT /reviews/:id`, `DELETE /reviews/:id` |
| Cart | `GET /cart`, `POST /cart`, `PUT /cart/:id`, `DELETE /cart/:id`, `DELETE /cart` |

🔒 = Requires `Authorization: Bearer <token>` | ADMIN/VENDOR = Requires role

### Product Variations (Clothing)

For clothing e-commerce (men/women/kids), products have **variants** by Size × Color:

- **Attribute** → Size (XS/S/M/L/XL/XXL), Color (Red/Blue/Black/White/Green), Material (Cotton/Polyester/Denim)
- **ProductVariant** → specific SKU with its own price, inventory, weight
- **VariantAttribute** → links variant to attribute values (e.g., "Size=L" + "Color=Red")

Each variant has a unique SKU and can be ordered independently.

## Frontend Portals

| Portal | URL Prefix | Layout |
|--------|-----------|--------|
| **Public** | `/`, `/products`, `/cart` | Navbar + Footer |
| **Customer** | `/customer/*` | Navbar + Sidebar |
| **Admin** | `/admin/*` | Navbar + Sidebar |
| **Vendor** | `/vendor/*` | Navbar + Sidebar |

### UI Components

| Component | Description |
|-----------|-------------|
| `Button` | 5 variants (primary/secondary/outline/ghost/danger), motion animations |
| `Input` | Label + error state, focus ring |
| `Card` | Container with optional hover |
| `Badge` | Pill-shaped tag |
| `Modal` | AnimatePresence dialog |
| `Skeleton` | Pulse loading placeholder |

### Brand Colors (Tailwind CSS v4)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-1` | `#DC095E` | Primary CTA |
| `brand-2` | `#09DC88` | Success/secondary |

## Database Schema (RBAC + Variations)

### Core RBAC Tables
`permissions`, `roles`, `role_permissions`, `user_roles`

### Domain Tables
`users`, `vendor_profiles`, `categories`, `products`, `orders`, `order_items`, `reviews`, `cart_items`

### Variation Tables
`attributes`, `attribute_values`, `product_variants`, `variant_attributes`

See `apps/api/prisma/schema.prisma` for the full schema.
