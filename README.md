# E‑Commerce App (Next.js)


visit [live-demo]:(https://ecommerce-mohamad.vercel.app)

Modern, production‑ready e‑commerce application built with Next.js App Router, Prisma, Tailwind CSS v4, Zod, React Hook Form, Zustand, and Better Auth. This project is designed as a portfolio/resume showcase focused on clean architecture, accessibility, and practical commerce features.

![Main page](public/readme/lightMode.png)
## Highlights

- Authentication‑guarded flows using Better Auth with Prisma adapter (`app/invoice/page.tsx:6–10`, `lib/auth.ts:9–31`)
  ![Login](public/readme/login.png)

- Robust form validation and RTL UI for Persian language (`app/components/invoice/invoiceForm.tsx:15–21`, `app/globals.css:34–35`)
- Cart state persisted with Zustand and derived totals (`app/stores/CartStore.tsx:22–48`)
  ![cart](public/readme/cart.png)

- Typed data access via Prisma with Postgres (`prisma/schema.prisma:11–14`)
- Mobile‑first, accessible components and consistent design tokens (Tailwind v4 in `app/globals.css:1–3`, `@theme inline` tokens)

## Features

- Product listing, category pages, and detail view (`app/products/page.tsx`, `app/products/[id]/page.tsx`, `app/products/category/[category]/page.tsx`)
- Client‑side search backed by API (`app/api/search/route.ts:4–29`)
- Combined product feed with pagination and sorting (`app/api/data/route.ts:37–129`)
- Shopping cart with add/remove/increment/decrement and total (`app/stores/CartStore.tsx:10–18`, `app/stores/CartStore.tsx:59–86`)
- Checkout and invoice flows, including invoice history (`app/checkout/page.tsx`, `app/invoice/page.tsx`, `app/invoices/page.tsx`, `app/invoices/[id]/page.tsx`)
- Profile pages with editable forms and theming (`app/profile/page.tsx`, `app/components/profile/*`, `app/components/providers/Themeprovider.tsx`)
- Dark mode and responsive navigation (`app/components/navbar/*`, `app/components/DarkmodeToggle.tsx`)
- ![Main page](public/readme/darkmode.png)

## Tech Stack

- Framework: `next@15` (App Router)
- Language: TypeScript
- Styling: `tailwindcss@4` with design tokens (`app/globals.css`)
- State: `zustand@5` with `persist`
- Forms: `react-hook-form@7` + `zod@4` + `@hookform/resolvers`
- Data: `prisma@6` with Postgres (`DATABASE_URL`)
- Auth: `better-auth@1` with Prisma adapter and optional Google OAuth (`lib/auth.ts`)
- Data Fetching: `@tanstack/react-query@5` (`app/components/providers/ReactQueryProvider.tsx`)
- UI: Custom components built with Radix primitives (`app/components/ui/*`)

## Architecture

- App Router pages in `app/*` with route groups for `products`, `cart`, `checkout`, `invoice`, `profile`, `login`, `signup`
- Server routes in `app/api/*` for products aggregation, search, single product, and auth
- UI components organized by domain (`components/products`, `components/navbar`, `components/invoice`, `components/review`)
- Global tokens and RTL setup in `app/globals.css`
- Providers for theme and React Query in `app/components/providers/*`

## Database Schema (Prisma)

- Users, Accounts, Sessions for auth (`prisma/schema.prisma:16–91`)
- Invoices and InvoiceItems for checkout records (`prisma/schema.prisma:33–58`)
- Two product sources: `FakeProduct` and `DummyProduct` (`prisma/schema.prisma:106–161`)

## API Endpoints

- `GET /api/data` — paginated & sortable combined product feed (`app/api/data/route.ts`)
- `GET /api/search?q=` — quick category search (`app/api/search/route.ts`)
- `GET /api/single?id=` — single product by id (`app/api/single/route.ts`)
- `GET|POST /api/auth/[...all]` — Better Auth handler (`app/api/auth/[...all]/route.ts`)

## Getting Started

1. Prerequisites
   - Node.js 18+
   - Postgres database (local or hosted)
2. Install
   - `npm install`
3. Environment
   - Create `.env` with at least:
     - `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"`
     - `GOOGLE_CLIENT_ID="..."` (optional, for Google OAuth)
     - `GOOGLE_CLIENT_SECRET="..."` (optional)
4. Generate Prisma Client
   - `npm run prepare` (or `npm run postinstall` runs automatically)
5. Migrate & Seed
   - `npx prisma migrate dev`
   - `npm run prisma:seed` (or `npm run prisma:seed` via `prisma.seed` → `tsx prisma/seed.ts`)
6. Develop
   - `npm run dev`

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint
- `npm run prepare` / `npm run postinstall` — generate Prisma client

## Notable Implementations

- Auth guard on sensitive routes with redirect to login (`app/invoice/page.tsx:6–10`)
- Accessible and validated invoice form using Zod + RHF (`app/components/invoice/invoiceForm.tsx:15–46`)
- Persisted cart with derived `totalPrice` and pure update functions (`app/stores/CartStore.tsx:20–48`, `app/stores/CartStore.tsx:59–86`)
- Responsive, RTL‑friendly UI built on Radix and Tailwind tokens (`app/components/ui/*`, `app/globals.css`)

## Environment & Integration Notes

- Better Auth Google OAuth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (`lib/auth.ts:17–21`)
- Optional phone number plugin is scaffolded (`lib/auth.ts:23–31`); implement SMS sending in `sendOTP`
- Prisma datasource is Postgres (`prisma/schema.prisma:11–14`)

## Accessibility & UX

- Semantic labels and ARIA attributes for forms
- Disabled inputs during submission and mobile‑friendly input modes
- Sticky header on mobile; purchase bar can be made `fixed` at bottom on small screens for consistent UX (`app/components/invoice/invoiceForm.tsx:147`)

## License

This project is provided for portfolio demonstration purposes.
