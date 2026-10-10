# Nova E-Commerce

A modern full-stack e-commerce platform designed to deliver a seamless online shopping experience, with a premium user interface and a scalable backend architecture.

## Overview

**Nova E-Commerce** is a full-stack web application project focused on modern online shopping, product management, secure authentication, order processing, and administrative control.

The project keeps the frontend and backend in separate directories, making development, maintenance, testing, and deployment easier.

## Project Structure

```text
Nova-Ecommerce/
├── ecommerce-frontend/   # Customer-facing web application
├── ecommerce-backend/    # REST API and business logic
└── README.md             # Project documentation
```

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Redux Toolkit & RTK Query
- React Hook Form & Zod

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- Zod validation

### Supporting Services
- Stripe for payment processing
- Cloudinary for image management
- Vercel for frontend deployment
- Render, Railway, or a VPS for backend deployment

*The technologies and integrations listed above represent the intended project stack; availability depends on the current implementation and configuration.*

## Key Features

The platform is designed to support the following functionality as development progresses:

### Customer Experience
- Modern, responsive shopping interface
- Product browsing, search, filtering, and sorting
- Product details, images, variants, and stock information
- Shopping cart and wishlist
- Secure authentication and profile management
- Checkout and online payments
- Order history and order tracking
- Product reviews and ratings

### Administration
- Product and category management
- Brand and inventory management
- Order management
- Customer management
- Coupon and discount management
- Sales analytics and reporting
- Role-based access control

### Engineering
- Separate frontend and backend projects
- RESTful API architecture
- Relational database design
- Server-side business logic and validation
- Centralized error handling
- Secure environment configuration
- Responsive design and performance optimization

## Architecture

The frontend and backend operate as independent applications.

```text
Customer
   |
   v
Next.js Frontend
   |
   | HTTPS / REST API
   v
Express.js Backend
   |
   v
Prisma ORM
   |
   v
PostgreSQL Database
```

The frontend handles the user interface and user interactions. The backend manages API requests, authentication, authorization, business rules, and database operations.

Sensitive operations, including price verification, inventory changes, order processing, and payment verification, must be handled or verified by the backend.

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js (LTS version recommended)
- npm
- PostgreSQL
- Git

Additional service credentials may be required for payment processing and image uploads.

### 1. Clone the Repository

```bash
git clone https://github.com/Ali-Ahmed-Rahi/Nova-Ecommerce.git
cd Nova-Ecommerce
```

### 2. Set Up the Backend

```bash
cd ecommerce-backend
npm install
```

Configure the backend environment variables using the project's `.env.example` file.

For example:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=
CLIENT_URL=http://localhost:3000
JWT_SECRET=
```

Add other variables required by the backend configuration.

Run the database migrations and start the development server using the scripts defined in the backend's `package.json`.

### 3. Set Up the Frontend

Open another terminal:

```bash
cd ecommerce-frontend
npm install
```

Create `.env.local` using the frontend's `.env.example` file.

For example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend using the development script defined in its `package.json`.

The default local development URLs are expected to be:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

Actual ports and commands depend on the project configuration.

## Environment Variables

Never commit real credentials or secret keys to GitHub.

Keep local environment files private, and configure production environment variables through the relevant hosting providers.

Typical configuration includes:

- Database connection URL
- Authentication secrets
- Frontend origin for CORS
- Payment provider credentials
- Image storage credentials

Refer to each application's `.env.example` for the complete configuration.

## Deployment

The applications can be deployed independently.

| Component | Suggested platform |
|---|---|
| Frontend | Vercel |
| Backend API | Render, Railway, or VPS |
| PostgreSQL | Neon, Supabase, or another PostgreSQL provider |
| Image storage | Cloudinary |

For production, configure the frontend to use the deployed backend API URL and configure backend CORS to allow the production frontend domain.

## Repository Structure

- **`ecommerce-frontend`** — frontend application and user interface.
- **`ecommerce-backend`** — backend API, business logic, and database integration.

Each application should maintain its own dependencies, environment configuration, scripts, and setup documentation.

## Project Status

**Status:** Initial setup / development in progress.

Features will become available as their implementation is completed. Please refer to the source code and application documentation for the current implementation status.

## Author

**Ali Ahmed Rahi**

Full-Stack Web Developer

GitHub: [Ali-Ahmed-Rahi](https://github.com/Ali-Ahmed-Rahi)

---

Built with a focus on clean architecture, modern user experience, maintainability, and scalable full-stack development.
