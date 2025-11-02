# 🍭 Lollyshoppe - Setup Guide

This guide will walk you through setting up the Lollyshoppe application from scratch.

---

## ✅ Completed Setup Steps

- [x] Next.js 15 project initialized with TypeScript
- [x] Tailwind CSS configured with custom theme
- [x] Project structure created (app router, components, lib)
- [x] Prisma schema defined
- [x] Essential dependencies installed
- [x] Basic UI components created (Button, Card)
- [x] Marketing layout and home page
- [x] Authentication pages scaffolded (Clerk)
- [x] Middleware configured for protected routes

---

## 🚀 Next Steps

### 1. Setup Clerk Authentication

Clerk provides authentication with beautiful, customizable UI components.

**Steps:**

1. Go to [https://clerk.com](https://clerk.com) and create an account
2. Create a new application in the Clerk dashboard
3. Choose your sign-in methods (Email, Google, GitHub, etc.)
4. Get your API keys from the dashboard
5. Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/client
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/client
```

6. Configure appearance and branding in Clerk dashboard to match Lollyshoppe theme

---

### 2. Setup PostgreSQL Database

You need a PostgreSQL database for the application. Choose one of these options:

#### Option A: Vercel Postgres (Recommended for production)
1. Go to [Vercel](https://vercel.com)
2. Create a project or use existing
3. Navigate to Storage → Create Database → Postgres
4. Copy the `DATABASE_URL` connection string
5. Add to `.env.local`

#### Option B: Supabase (Recommended for development)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (Direct connection)
5. Add to `.env.local`: `DATABASE_URL="postgresql://..."`

#### Option C: Local PostgreSQL
```bash
# Install PostgreSQL (macOS)
brew install postgresql@14

# Start PostgreSQL
brew services start postgresql@14

# Create database
createdb lollyshoppe

# Add to .env.local
DATABASE_URL="postgresql://localhost:5432/lollyshoppe"
```

---

### 3. Initialize Database

Once you have your `DATABASE_URL` in `.env.local`:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

---

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the Lollyshoppe landing page! 🎉

---

### 5. Test Authentication

1. Click "Get Started" or "Sign In"
2. Create a test account
3. Sign in with your test account
4. You'll be redirected (currently to `/client` which needs to be built)

---

## 🎨 Customization

### Update Brand Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 330 81% 60%;        /* Pink */
  --secondary: 271 91% 65%;       /* Purple */
  --accent: 187 92% 42%;          /* Cyan */
}
```

### Update Site Metadata

Edit `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your Description",
};
```

---

## 📦 Additional Services (For Later Phases)

### Stripe Setup (Phase 5)
1. Create account at [Stripe](https://stripe.com)
2. Get API keys (test mode)
3. Add to `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Email Setup (Phase 6)
1. Create account at [Resend](https://resend.com)
2. Get API key
3. Add to `.env.local`:
```env
RESEND_API_KEY=re_...
```

### File Upload Setup (Phase 7)
1. Create account at [Uploadthing](https://uploadthing.com)
2. Get API keys
3. Add to `.env.local`:
```env
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run db:generate
```

### Database connection errors
- Check your `DATABASE_URL` is correct
- Ensure database is running
- Check network connectivity

### Clerk authentication not working
- Verify API keys in `.env.local`
- Check Clerk dashboard for error logs
- Ensure URLs are configured correctly

### Port already in use
```bash
# Use different port
npm run dev -- -p 3001
```

---

## 📝 Current Status

**Phase 1: Foundation & Setup** - IN PROGRESS

Completed:
- ✅ Project initialization
- ✅ Basic UI components
- ✅ Marketing layout
- ✅ Auth scaffolding

Next up:
- ⏳ Setup Clerk authentication
- ⏳ Setup PostgreSQL database
- ⏳ Create dashboard layouts
- ⏳ Build About, Services, Portfolio pages

---

## 🆘 Need Help?

If you run into issues:
1. Check the [Next.js docs](https://nextjs.org/docs)
2. Check the [Clerk docs](https://clerk.com/docs)
3. Check the [Prisma docs](https://www.prisma.io/docs)
4. Review the TECHNICAL_PLAN.md for architecture details

---

Happy coding! 🍭

