# Test-Driven Development (TDD) Guide - Lollyshoppe

## 🎯 Overview

Lollyshoppe follows **Test-Driven Development (TDD)** principles. Write tests first, then implement code to make them pass.

This guide is tailored for the Lollyshoppe project management platform, covering testing strategies for projects, clients, invoices, milestones, and deliverables.

---

## 🔄 The TDD Cycle (Red-Green-Refactor)

### 1. 🔴 RED - Write a Failing Test

Write a test for the next bit of functionality you want to add.

```typescript
// ❌ Test fails because function doesn't exist yet
it('should return all projects sorted by creation date', async () => {
  const projects = await getProjects()
  expect(projects).toBeDefined()
  expect(projects[0].status).toBe('IN_PROGRESS')
})
```

### 2. 🟢 GREEN - Make the Test Pass

Write the minimum code needed to make the test pass.

```typescript
// ✅ Implement just enough to pass
export async function getProjects() {
  return await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
}
```

### 3. 🔵 REFACTOR - Improve the Code

Clean up the code while keeping tests green.

```typescript
// ♻️ Refactor for better performance/readability
export async function getProjects() {
  return await db.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      client: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          milestones: true,
          deliverables: true,
        },
      },
    },
  })
}
```

### 4. 🔁 REPEAT

Move on to the next test!

---

## 🧪 Testing Stack

### Core Testing Tools

```json
{
  "vitest": "^1.0.0",                      // Test runner (fast, Vite-powered)
  "@testing-library/react": "^14.0.0",     // React component testing
  "@testing-library/jest-dom": "^6.1.0",   // DOM matchers
  "@testing-library/user-event": "^14.5.0", // User interaction simulation
  "@vitejs/plugin-react": "^4.2.0",        // React support for Vitest
  "msw": "^2.0.0"                          // API mocking
}
```

### Test Types

| Type            | Tool                  | Purpose                      | When to Use               |
| --------------- | --------------------- | ---------------------------- | ------------------------- |
| **Unit**        | Vitest                | Test individual functions    | Always - TDD foundation   |
| **Component**   | React Testing Library | Test React components        | For all UI components     |
| **Integration** | Vitest + MSW          | Test multiple units together | Server actions, complex flows |
| **E2E**         | Playwright (future)   | Test full user flows         | Critical paths            |

---

## 📁 Test File Organization

```
lollyshoppe/
├── app/
│   ├── actions/
│   │   ├── projects.ts
│   │   ├── projects.test.ts       # ✅ Co-located with server actions
│   │   ├── invoices.ts
│   │   └── invoices.test.ts
│   └── (dashboard)/
│       └── admin/
│           └── projects/
│               ├── page.tsx
│               └── page.test.tsx   # ✅ Co-located with page
├── components/
│   ├── dashboard/
│   │   ├── project-form.tsx
│   │   └── project-form.test.tsx  # ✅ Co-located with component
│   └── ui/
│       ├── button.tsx
│       └── button.test.tsx
├── lib/
│   ├── utils.ts
│   ├── utils.test.ts              # ✅ Co-located with utilities
│   └── validations/
│       ├── project.ts
│       └── project.test.ts
└── tests/
    ├── integration/                # Integration tests
    ├── e2e/                        # E2E tests (future)
    └── setup.ts                    # Test setup/config
```

**Convention:** Test files live next to the code they test, with `.test.ts` or `.test.tsx` extension.

---

## ✍️ Writing Good Tests

### Test Structure (AAA Pattern)

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectForm } from './project-form'

describe('ProjectForm', () => {
  const mockClients = [
    {
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  ]

  it('should display all form fields', () => {
    // 🎬 ARRANGE - Set up test data
    const onOpenChange = vi.fn()

    // 🎬 ACT - Perform the action
    render(<ProjectForm open={true} onOpenChange={onOpenChange} clients={mockClients} />)

    // 🎬 ASSERT - Check the results
    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/client/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
  })

  it('should call createProject when form is submitted', async () => {
    const user = userEvent.setup()
    
    render(<ProjectForm open={true} onOpenChange={vi.fn()} clients={mockClients} />)

    await user.type(screen.getByLabelText(/project title/i), 'New Website')
    await user.type(screen.getByLabelText(/description/i), 'Build a new website')
    await user.click(screen.getByRole('button', { name: /create project/i }))

    // Assert creation was called
    await waitFor(() => {
      expect(mockCreateProject).toHaveBeenCalledWith({
        title: 'New Website',
        description: 'Build a new website',
        // ... other fields
      })
    })
  })
})
```

### Test Naming Convention

**Format:** `should [expected behavior] when [condition]`

**Good Examples:**

```typescript
✅ it('should return empty array when no projects exist')
✅ it('should filter projects by client ID')
✅ it('should throw error when database connection fails')
✅ it('should display loading state while fetching projects')
✅ it('should calculate invoice total correctly')
✅ it('should mark milestone as completed when completedAt is set')
```

**Bad Examples:**

```typescript
❌ it('test project function')
❌ it('works correctly')
❌ it('renders')
```

---

## 🎯 TDD Workflow for Each Feature

### Step-by-Step Process

#### 1. **Create Test File First**

```bash
# Before writing any code, create test file
touch app/actions/projects.test.ts
```

#### 2. **Write Failing Tests**

```typescript
// app/actions/projects.test.ts
import { describe, it, expect } from 'vitest'
import { getProject } from './projects'

describe('getProject', () => {
  it('should return project with client details when ID exists', async () => {
    const result = await getProject('project-123')

    expect(result.success).toBe(true)
    expect(result.data?.title).toBeDefined()
    expect(result.data?.client).toBeDefined()
  })

  it('should return error when project does not exist', async () => {
    const result = await getProject('invalid-id')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Project not found')
  })

  it('should include milestones and deliverables count', async () => {
    const result = await getProject('project-123')

    expect(result.success).toBe(true)
    expect(result.data?._count?.milestones).toBeDefined()
    expect(result.data?._count?.deliverables).toBeDefined()
  })
})
```

#### 3. **Run Tests (They Should Fail)**

```bash
npm run test
# ❌ FAIL  app/actions/projects.test.ts
#   ● getProject › should return project with client details when ID exists
#     Cannot find module './projects'
```

#### 4. **Implement Minimum Code**

```typescript
// app/actions/projects.ts
import { db } from '@/lib/db'

export async function getProject(id: string) {
  try {
    const project = await db.project.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            milestones: true,
            deliverables: true,
          },
        },
      },
    })

    if (!project) {
      return { success: false, error: 'Project not found' }
    }

    return { success: true, data: project }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch project' 
    }
  }
}
```

#### 5. **Run Tests Again (Should Pass)**

```bash
npm run test
# ✅ PASS  app/actions/projects.test.ts
#   ✓ should return project with client details when ID exists (45ms)
#   ✓ should return error when project does not exist (12ms)
#   ✓ should include milestones and deliverables count (8ms)
```

#### 6. **Refactor & Repeat**

Improve code quality, add more tests, continue cycle.

---

## 🧪 Testing Different Layers

### 1. **Validation Functions (Zod Schemas)**

```typescript
// lib/validations/project.test.ts
import { describe, it, expect } from 'vitest'
import { projectSchema } from './project'

describe('projectSchema', () => {
  it('should validate correct project data', () => {
    const validData = {
      title: 'MVP Development',
      description: 'Build a minimum viable product',
      status: 'PENDING',
      budget: '25000',
      clientId: 'client-123',
    }

    const result = projectSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject project without title', () => {
    const invalidData = {
      description: 'Build a minimum viable product',
      status: 'PENDING',
      clientId: 'client-123',
    }

    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject invalid status', () => {
    const invalidData = {
      title: 'MVP Development',
      description: 'Build a minimum viable product',
      status: 'INVALID_STATUS',
      clientId: 'client-123',
    }

    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
```

### 2. **React Components**

```typescript
// components/dashboard/project-form.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectForm } from './project-form'

describe('ProjectForm', () => {
  const mockClients = [
    { id: '1', email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
    { id: '2', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith' },
  ]

  it('should render create mode correctly', () => {
    render(<ProjectForm open={true} onOpenChange={vi.fn()} clients={mockClients} />)

    expect(screen.getByText('Create New Project')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create project/i })).toBeInTheDocument()
  })

  it('should render edit mode correctly', () => {
    const mockProject = {
      id: '1',
      title: 'Existing Project',
      description: 'Description',
      status: 'IN_PROGRESS',
      budget: '25000',
      clientId: '1',
    }

    render(
      <ProjectForm 
        open={true} 
        onOpenChange={vi.fn()} 
        clients={mockClients} 
        project={mockProject}
      />
    )

    expect(screen.getByText('Edit Project')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Existing Project')).toBeInTheDocument()
  })

  it('should show validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ProjectForm open={true} onOpenChange={vi.fn()} clients={mockClients} />)

    const submitButton = screen.getByRole('button', { name: /create project/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument()
      expect(screen.getByText(/description is required/i)).toBeInTheDocument()
    })
  })
})
```

### 3. **Server Actions**

```typescript
// app/actions/projects.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createProject, updateProject, deleteProject } from './projects'
import { db } from '@/lib/db'

// Mock Clerk
vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn().mockResolvedValue({ id: 'user-123' }),
}))

describe('createProject', () => {
  it('should create project successfully', async () => {
    const projectData = {
      title: 'New Website',
      description: 'Build a new company website',
      status: 'PENDING' as const,
      budget: '25000',
      clientId: 'client-123',
    }

    const result = await createProject(projectData)

    expect(result.success).toBe(true)
    expect(result.data?.title).toBe('New Website')
  })

  it('should return error when user is not authenticated', async () => {
    vi.mocked(currentUser).mockResolvedValueOnce(null)

    const result = await createProject({} as any)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Unauthorized')
  })

  it('should validate data with schema', async () => {
    const invalidData = {
      title: '', // Empty title should fail
      description: 'Description',
      status: 'PENDING' as const,
      clientId: 'client-123',
    }

    const result = await createProject(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toContain('title')
  })
})
```

### 4. **Utility Functions**

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate, cn } from './utils'

describe('formatCurrency', () => {
  it('should format USD currency correctly', () => {
    expect(formatCurrency(25000)).toBe('$25,000.00')
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('should handle negative numbers', () => {
    expect(formatCurrency(-100)).toBe('-$100.00')
  })
})

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('Jan 15, 2024')
  })

  it('should handle different date formats', () => {
    const dateString = '2024-03-20'
    expect(formatDate(dateString)).toBe('Mar 20, 2024')
  })
})

describe('cn (className merger)', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'active', false && 'disabled')).toBe('base active')
  })
})
```

---

## 🎭 Mocking

### Mock External Dependencies

```typescript
import { vi } from 'vitest'

// Mock database
vi.mock('@/lib/db', () => ({
  db: {
    project: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: '1', title: 'Test' }),
      update: vi.fn().mockResolvedValue({ id: '1', title: 'Updated' }),
      delete: vi.fn().mockResolvedValue({ id: '1' }),
    },
  },
}))

// Mock Clerk authentication
vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn().mockResolvedValue({
    id: 'user-123',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
  }),
  auth: vi.fn().mockResolvedValue({
    userId: 'user-123',
  }),
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    pathname: '/admin/projects',
  }),
  usePathname: () => '/admin/projects',
  redirect: vi.fn(),
}))

// Mock React Hook Form
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    formState: { errors: {} },
  }),
}))
```

---

## 📊 Coverage Goals

### Minimum Coverage Requirements

| Type           | Minimum | Target | Notes                 |
| -------------- | ------- | ------ | --------------------- |
| **Statements** | 70%     | 80%+   | Overall code coverage |
| **Branches**   | 65%     | 75%+   | All code paths tested |
| **Functions**  | 70%     | 80%+   | All functions tested  |
| **Lines**      | 70%     | 80%+   | Lines executed        |

### Priority Coverage Areas

1. **Critical Business Logic** (90%+ coverage required)
   - Server actions (`app/actions/*.ts`)
   - Validation schemas (`lib/validations/*.ts`)
   - Payment processing (future)

2. **User-Facing Components** (80%+ coverage)
   - Forms (`components/dashboard/*-form.tsx`)
   - Dashboard pages
   - Client portal pages

3. **Utility Functions** (90%+ coverage)
   - `lib/utils.ts`
   - Formatters and helpers

### Check Coverage

```bash
npm run test:coverage

# Output:
# -------------------------|---------|----------|---------|---------|
# File                     | % Stmts | % Branch | % Funcs | % Lines |
# -------------------------|---------|----------|---------|---------|
# All files                |   82.5  |   76.3   |   85.1  |   82.1  |
#  actions/projects.ts     |   95.2  |   88.9   |   100   |   95.0  |
#  components/project-form |   78.3  |   71.4   |   80.0  |   78.0  |
# -------------------------|---------|----------|---------|---------|
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom msw
```

### 2. Configure Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/*.test.*',
        '.next/',
        'prisma/',
      ],
    },
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### 3. Create Test Setup

```typescript
// tests/setup.ts
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'test-key'
process.env.CLERK_SECRET_KEY = 'test-secret'
```

### 4. Add Scripts to package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### 5. Configure TypeScript

```json
// tsconfig.json (add to compilerOptions)
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

---

## 🎯 TDD Checklist for Each Feature

Before marking a feature as "Done":

- [ ] **Tests written first** (before implementation)
- [ ] **All tests pass** (`npm run test`)
- [ ] **Coverage meets minimum** (70%+ for new code)
- [ ] **Edge cases tested** (errors, empty states, loading)
- [ ] **Happy path tested** (normal user flow)
- [ ] **Authentication tested** (unauthorized access handled)
- [ ] **Database errors handled** (connection failures, constraints)
- [ ] **Tests are readable** (clear test names and structure)
- [ ] **No flaky tests** (tests pass consistently)
- [ ] **Fast execution** (unit tests < 100ms each)

---

## 💡 TDD Best Practices for Lollyshoppe

### DO ✅

- **Write tests first** - This is TDD!
- **Test behavior, not implementation** - Focus on what, not how
- **Keep tests simple** - One assertion per test ideally
- **Use descriptive test names** - Clear what's being tested
- **Test edge cases** - Null, undefined, empty, errors, unauthorized
- **Mock external dependencies** - Tests should be isolated (Clerk, Prisma, etc.)
- **Run tests frequently** - After every change
- **Test error states** - Network failures, validation errors, auth failures
- **Test with realistic data** - Use data that matches your Prisma schema

### DON'T ❌

- **Don't skip tests** - "I'll add them later" = never
- **Don't test implementation details** - Test public API only
- **Don't write brittle tests** - Avoid testing exact HTML structure
- **Don't mock everything** - Only mock external dependencies
- **Don't write slow tests** - Keep unit tests fast
- **Don't duplicate tests** - Each test should be unique
- **Don't commit failing tests** - Green before push
- **Don't test third-party libraries** - Trust that Clerk, Prisma work

---

## 🚀 Quick Reference

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run coverage report
npm run test:coverage

# Run specific test file
npm run test app/actions/projects.test.ts

# Run tests matching pattern
npm run test -- project

# Run tests for changed files only
npm run test -- --changed
```

---

## 📚 Lollyshoppe Test Examples

### Example 1: Testing Invoice Creation

```typescript
// app/actions/invoices.test.ts
describe('createInvoice', () => {
  it('should generate unique invoice number', async () => {
    const result = await createInvoice({
      amount: '5000',
      clientId: 'client-123',
      projectId: 'project-123',
    })

    expect(result.success).toBe(true)
    expect(result.data?.invoiceNumber).toMatch(/^INV-\d{6}$/)
  })

  it('should set status to DRAFT by default', async () => {
    const result = await createInvoice({
      amount: '5000',
      clientId: 'client-123',
    })

    expect(result.data?.status).toBe('DRAFT')
  })
})
```

### Example 2: Testing Milestone Completion

```typescript
// app/actions/milestones.test.ts
describe('completeMilestone', () => {
  it('should set completedAt timestamp when marking complete', async () => {
    const result = await completeMilestone('milestone-123')

    expect(result.success).toBe(true)
    expect(result.data?.completedAt).toBeInstanceOf(Date)
  })

  it('should not allow completing already completed milestone', async () => {
    const result = await completeMilestone('completed-milestone')

    expect(result.success).toBe(false)
    expect(result.error).toContain('already completed')
  })
})
```

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Next.js Applications](https://nextjs.org/docs/testing)
- [Prisma Testing Guide](https://www.prisma.io/docs/guides/testing)
- [Test-Driven Development by Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)

---

**Remember:** If it's not tested, it's broken. Write tests first, ship with confidence! 🧪✅
