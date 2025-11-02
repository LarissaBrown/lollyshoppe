# 🍭 Lollyshoppe

**Get a sweet fix for your product**

A professional web platform for low-code MVP development services. Manage clients, showcase your portfolio, track projects, and handle payments all in one place.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** Clerk
- **Payments:** Stripe
- **Deployment:** Vercel

---

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL database (local or hosted)
- npm or yarn

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication (get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe (get from https://stripe.com)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
lollyshoppe/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (marketing)/         # Public marketing site
│   ├── (dashboard)/         # Protected dashboards
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── marketing/           # Marketing components
│   ├── dashboard/           # Dashboard components
│   └── shared/              # Shared components
├── lib/                     # Utilities and helpers
├── prisma/                  # Database schema
├── types/                   # TypeScript types
└── public/                  # Static assets
```

---

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - Admin and client accounts
- **Projects** - Client projects with status tracking
- **Milestones** - Project milestones and deadlines
- **Invoices** - Payment tracking with Stripe integration
- **Deliverables** - Project deliverables and files

---

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations

---

## 🔐 Authentication Setup

This app uses [Clerk](https://clerk.com) for authentication:

1. Create a Clerk account
2. Create a new application
3. Copy your publishable and secret keys to `.env.local`
4. Configure sign-in/sign-up pages

---

## 💳 Payment Setup

This app uses [Stripe](https://stripe.com) for payments:

1. Create a Stripe account
2. Get your API keys (test mode for development)
3. Add keys to `.env.local`
4. Configure webhooks for production

---

## 📝 Development Phases

See [TECHNICAL_PLAN.md](./TECHNICAL_PLAN.md) for detailed development roadmap.

**Current Phase:** Phase 1 - Foundation & Setup ✅

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Database Hosting

Recommended options:
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)

---

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

## 📄 License

Private - All Rights Reserved

---

## 🤝 Contributing

This is a private project. If you have suggestions or find issues, please contact the owner.

---

Built with 💖 and a sweet tooth for great code 🍭

