# Lollyshoppe - Technical Plan

**Version:** 1.0  
**Last Updated:** November 2, 2025  
**Project:** Low-Code MVP Development Service Platform

---

## 🎯 Project Overview

Lollyshoppe is a professional web platform for finding, managing, and retaining clients for low-code MVP development services. The platform includes portfolio showcase, project management, payment processing, and client communication features.

**Brand Message:** "Get a sweet fix for your product" - Hire a developer to create low-code MVPs for startups.

---

## 📚 Tech Stack

### Core Framework
- **Next.js 14+** (App Router with React Server Components)
- **TypeScript** (Strict mode)
- **React 18+**

### Database & ORM
- **PostgreSQL** (Production database)
- **Prisma** (Type-safe ORM)
- **Vercel Postgres** or **Supabase** (Hosting)

### Authentication
- **Clerk** (Modern, easy-to-use, great UX)
  - Alternative: NextAuth.js v5 (if you prefer self-hosted)

### UI/UX
- **Tailwind CSS** (Utility-first styling)
- **shadcn/ui** (Beautiful, accessible component library)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

### Payments
- **Stripe** (Payment processing, invoicing, subscriptions)

### Additional Services
- **Vercel** (Deployment & hosting)
- **Resend** (Transactional emails)
- **Uploadthing** (File uploads)
- **React Hook Form** + **Zod** (Form validation)

### Development Tools
- **ESLint** (Linting)
- **Prettier** (Code formatting)
- **Husky** (Git hooks)
- **TypeScript** (Type checking)

---

## 🗂️ Project Structure

```
lollyshoppe/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth group routes
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (marketing)/       # Public marketing site
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   └── portfolio/
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── client/        # Client dashboard
│   │   │   └── admin/         # Admin dashboard
│   │   ├── api/               # API routes
│   │   │   ├── webhooks/      # Stripe webhooks
│   │   │   └── trpc/          # tRPC endpoints (optional)
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── marketing/         # Marketing components
│   │   ├── dashboard/         # Dashboard components
│   │   └── shared/            # Shared components
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── utils.ts           # Utility functions
│   │   ├── validations/       # Zod schemas
│   │   └── constants.ts       # Constants
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   └── config/                # Configuration files
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/
│   ├── images/
│   └── fonts/
├── .env.local                 # Environment variables
├── .eslintrc.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🗄️ Database Schema (Initial)

### Phase 1: Core Entities

```prisma
model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  email         String    @unique
  firstName     String?
  lastName      String?
  role          UserRole  @default(CLIENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  projects      Project[]
  invoices      Invoice[]
}

enum UserRole {
  ADMIN
  CLIENT
}

model Project {
  id            String        @id @default(cuid())
  title         String
  description   String
  status        ProjectStatus @default(PENDING)
  budget        Decimal?
  startDate     DateTime?
  endDate       DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  // Relations
  clientId      String
  client        User          @relation(fields: [clientId], references: [id])
  milestones    Milestone[]
  invoices      Invoice[]
  deliverables  Deliverable[]
}

enum ProjectStatus {
  PENDING
  IN_PROGRESS
  REVIEW
  COMPLETED
  CANCELLED
}

model Milestone {
  id            String    @id @default(cuid())
  title         String
  description   String?
  dueDate       DateTime?
  completedAt   DateTime?
  order         Int
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])
}

model Invoice {
  id            String        @id @default(cuid())
  invoiceNumber String        @unique
  amount        Decimal
  status        InvoiceStatus @default(DRAFT)
  dueDate       DateTime?
  paidAt        DateTime?
  stripeInvoiceId String?     @unique
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  // Relations
  clientId      String
  client        User          @relation(fields: [clientId], references: [id])
  projectId     String?
  project       Project?      @relation(fields: [projectId], references: [id])
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELLED
}

model Deliverable {
  id            String    @id @default(cuid())
  title         String
  description   String?
  fileUrl       String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])
}
```

---

## 🚀 Development Phases

### **Phase 1: Foundation & Setup** (Week 1-2)
**Goal:** Get the project running with authentication and basic UI

#### Tasks:
- [x] Initialize Next.js project with TypeScript
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Configure Clerk authentication
- [ ] Setup Prisma + PostgreSQL
- [ ] Create database schema
- [ ] Build basic layouts (marketing, dashboard)
- [ ] Create reusable UI components
- [ ] Setup environment variables

#### Deliverables:
- Working Next.js app
- Authentication flow (sign up/sign in)
- Basic navigation
- Database connected

---

### **Phase 2: Marketing Site** (Week 3)
**Goal:** Create public-facing pages to attract clients

#### Tasks:
- [ ] Landing page with hero section
- [ ] Services/pricing page
- [ ] About page
- [ ] Contact form
- [ ] Basic portfolio showcase
- [ ] Responsive design
- [ ] SEO optimization (metadata, sitemap)

#### Deliverables:
- Complete marketing site
- Mobile responsive
- Contact form working

---

### **Phase 3: Client Dashboard** (Week 4-5)
**Goal:** Allow clients to view their projects and interact

#### Tasks:
- [ ] Client dashboard home
- [ ] View assigned projects
- [ ] Project detail page (timeline, milestones)
- [ ] View/download deliverables
- [ ] View invoices
- [ ] Profile management

#### Deliverables:
- Functional client portal
- Project viewing capabilities
- Profile management

---

### **Phase 4: Admin Dashboard** (Week 6-7)
**Goal:** Build tools for you to manage clients and projects

#### Tasks:
- [ ] Admin dashboard overview (stats, charts)
- [ ] Client management (CRUD)
- [ ] Project management (CRUD)
  - Create projects
  - Assign to clients
  - Update status
- [ ] Milestone tracking
- [ ] Deliverable uploads
- [ ] Time tracking (optional)

#### Deliverables:
- Admin CRM functionality
- Project creation/management
- Client assignment

---

### **Phase 5: Payment Integration** (Week 8)
**Goal:** Handle invoicing and payments

#### Tasks:
- [ ] Stripe integration
- [ ] Invoice creation/management
- [ ] Payment links
- [ ] Payment status tracking
- [ ] Webhook handling (payment confirmation)
- [ ] Email notifications on payment

#### Deliverables:
- Working payment system
- Invoice generation
- Payment tracking

---

### **Phase 6: Communication & Notifications** (Week 9)
**Goal:** Keep clients informed

#### Tasks:
- [ ] Email service setup (Resend)
- [ ] Email templates
- [ ] Notification system:
  - Project status changes
  - New deliverables
  - Payment reminders
  - Milestone completions
- [ ] In-app notification center (optional)

#### Deliverables:
- Email notification system
- Automated client updates

---

### **Phase 7: Portfolio & Content** (Week 10)
**Goal:** Showcase your work professionally

#### Tasks:
- [ ] Portfolio CMS (create/edit case studies)
- [ ] Project showcase pages
- [ ] Image optimization
- [ ] Testimonials section
- [ ] Blog (optional)

#### Deliverables:
- Dynamic portfolio
- Case study templates

---

### **Phase 8: Polish & Launch** (Week 11-12)
**Goal:** Prepare for production

#### Tasks:
- [ ] Error handling & validation
- [ ] Loading states & skeletons
- [ ] Animations (Framer Motion)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Testing (manual/automated)
- [ ] Analytics setup (Vercel Analytics)
- [ ] Production deployment
- [ ] Domain setup
- [ ] SSL certificate

#### Deliverables:
- Production-ready app
- Live on custom domain

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Email (Resend)
RESEND_API_KEY=""

# Uploadthing
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🎨 Design System

### Colors (Candy/Sweet Theme)
- **Primary:** Pink/Magenta (#EC4899)
- **Secondary:** Purple (#A855F7)
- **Accent:** Cyan (#06B6D4)
- **Success:** Mint Green (#10B981)
- **Warning:** Orange (#F59E0B)
- **Error:** Red (#EF4444)

### Typography
- **Headings:** Inter (Bold, 600+)
- **Body:** Inter (Regular, 400)
- **Code:** JetBrains Mono

### Components Style
- Rounded corners (rounded-lg, rounded-xl)
- Subtle shadows
- Gradient accents
- Smooth animations
- Modern, clean aesthetic

---

## 📝 Coding Standards

### TypeScript
- Use strict mode
- Avoid `any` types
- Define interfaces for all props
- Use type imports: `import type { ... }`

### React
- Use Server Components by default
- Client Components only when needed
- Prefer composition over props drilling
- Use custom hooks for reusable logic

### Styling
- Tailwind utility classes
- Use `cn()` helper for conditional classes
- Avoid inline styles
- Mobile-first responsive design

### File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE

---

## 🚦 Next Steps

1. ✅ Initialize Next.js project
2. ⏳ Install dependencies
3. ⏳ Configure Tailwind + shadcn/ui
4. ⏳ Setup authentication with Clerk
5. ⏳ Setup Prisma with PostgreSQL
6. ⏳ Create initial database schema
7. ⏳ Build basic layouts

Let's start building! 🍭

