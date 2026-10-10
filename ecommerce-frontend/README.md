# NOVA Premium E-Commerce Frontend

A premium storefront built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit, RTK Query, and Framer Motion. The project follows a clean App Router structure and is designed to integrate with a separate backend through REST API endpoints.

## Features

- Premium responsive storefront
- Product listing and category-driven browsing
- Product detail, cart, wishlist, and checkout flows
- Auth screens for login, sign-up, and password reset
- Orders, dashboard, and admin overview views
- Centralized RTK Query API layer
- Clean TypeScript architecture and responsive UI design

## Environment

Create a `.env.local` file based on `.env.example` and configure your backend URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```
