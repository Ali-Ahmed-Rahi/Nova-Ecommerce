# Ecommerce Backend

A modular e-commerce REST API built with Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT, Zod, and Stripe-ready payment infrastructure.

## Features

- Authentication with JWT and HTTP-only cookies
- Role-based authorization for customer, manager, and admin
- Product catalog with categories, brands, variants, and images
- Cart, wishlist, coupons, reviews, and order management
- Inventory transactions and stock validation
- Payment session creation and secure webhook verification
- Centralized error handling and validation
- Prisma schema for PostgreSQL
- Seeded demo data

## Tech stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- JWT + bcrypt
- Helmet + CORS + rate limiting
- Stripe
- Pino

## Setup

1. Install dependencies:
   npm install
2. Copy environment variables:
   cp .env.example .env
3. Update PostgreSQL connection string in .env
4. Generate Prisma client:
   npx prisma generate
5. Run database migration:
   npx prisma migrate dev --name init
6. Seed demo data:
   npm run prisma:seed
7. Start the API:
   npm run dev

## API base URL

http://localhost:5000/api

## Frontend connection

Set the frontend environment variable to:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

## Main routes

- /api/auth
- /api/products
- /api/categories
- /api/brands
- /api/cart
- /api/wishlist
- /api/orders
- /api/payments
- /api/coupons
- /api/reviews
- /api/analytics

## Production notes

- Keep JWT secrets and Stripe webhook secrets in environment variables
- Use HTTPS in production
- Set CORS to the real frontend domain
- Never trust frontend price, stock, role, or coupon values; validate everything server-side
