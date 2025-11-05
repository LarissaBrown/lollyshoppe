# TDD Implementation Sprint - Lollyshoppe

## 🎯 Sprint Overview

**Goal:** Implement comprehensive Test-Driven Development practices for Lollyshoppe, including retroactive testing for existing code and establishing TDD workflow for all future development.

**Duration:** 2-3 weeks

**Status:** Planning Phase

---

## 📊 Current State Assessment

### ✅ What We Have
- ✅ Functional application with core features
- ✅ TypeScript for type safety
- ✅ Zod schemas for validation
- ✅ Server actions architecture
- ✅ Component-based UI
- ✅ Prisma ORM with database models

### ❌ What We're Missing
- ❌ No test framework installed
- ❌ No test files created
- ❌ No CI/CD testing pipeline
- ❌ No code coverage tracking
- ❌ No testing best practices documented (now resolved with TDD_GUIDE.md)

---

## 🏗️ Implementation Strategy

Since we've already built functionality without tests, we'll take a **hybrid approach**:

1. **Phase 1:** Setup testing infrastructure
2. **Phase 2:** Write tests for critical existing code (retroactive)
3. **Phase 3:** Establish TDD workflow for new features
4. **Phase 4:** Improve coverage incrementally

This approach is pragmatic and won't block ongoing development.

---

## 📋 Phase 1: Testing Infrastructure Setup (Days 1-2)

### Task 1.1: Install Testing Dependencies

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom msw happy-dom
```

**Estimated Time:** 30 minutes

**Acceptance Criteria:**
- [ ] All packages installed successfully
- [ ] No version conflicts
- [ ] Dependencies added to package.json

---

### Task 1.2: Create Vitest Configuration

**File:** `vitest.config.ts`

```typescript
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
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/*.test.*',
        '.next/',
        'prisma/',
        'public/',
        'DOCS/',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70,
      },
    },
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

**Estimated Time:** 1 hour

**Acceptance Criteria:**
- [ ] Config file created
- [ ] Can run `npx vitest` without errors
- [ ] Alias paths work correctly

---

### Task 1.3: Create Test Setup File

**File:** `tests/setup.ts`

```typescript
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_123'
process.env.CLERK_SECRET_KEY = 'sk_test_123'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

// Mock Next.js
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  redirect: vi.fn(),
}))

// Mock Clerk
vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
  auth: vi.fn(() => ({ userId: 'test-user-123' })),
}))
```

**Estimated Time:** 1 hour

---

### Task 1.4: Update package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

**Estimated Time:** 10 minutes

---

### Task 1.5: Update TypeScript Configuration

Add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

**Estimated Time:** 10 minutes

---

### Task 1.6: Create Test Utilities

**File:** `tests/utils.tsx`

```typescript
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Add any providers here (e.g., ThemeProvider, etc.)
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

**Estimated Time:** 30 minutes

---

## 📋 Phase 2: Retroactive Testing (Days 3-10)

Priority order based on **business criticality** and **bug risk**.

### 🔴 Priority 1: Critical Business Logic (Days 3-5)

#### Task 2.1: Test Server Actions - Projects

**File:** `app/actions/projects.test.ts`

**Test Coverage:**
- ✅ `createProject()` - happy path
- ✅ `createProject()` - validation errors
- ✅ `createProject()` - unauthorized access
- ✅ `createProject()` - database errors
- ✅ `updateProject()` - all scenarios
- ✅ `deleteProject()` - cascade behavior
- ✅ `getProjects()` - with filters
- ✅ `getProject()` - with relations

**Estimated Time:** 4 hours

**Minimum Coverage:** 85%

---

#### Task 2.2: Test Server Actions - Invoices

**File:** `app/actions/invoices.test.ts`

**Test Coverage:**
- ✅ `createInvoice()` - unique invoice number generation
- ✅ `updateInvoice()` - status transitions
- ✅ Payment tracking (`markAsPaid()`)
- ✅ Invoice filtering by status
- ✅ Overdue invoice detection

**Estimated Time:** 4 hours

**Minimum Coverage:** 85%

---

#### Task 2.3: Test Server Actions - Milestones

**File:** `app/actions/milestones.test.ts`

**Test Coverage:**
- ✅ Milestone ordering
- ✅ Completion tracking
- ✅ Due date validation
- ✅ Project association

**Estimated Time:** 3 hours

**Minimum Coverage:** 85%

---

#### Task 2.4: Test Server Actions - Deliverables

**File:** `app/actions/deliverables.test.ts`

**Test Coverage:**
- ✅ File upload handling
- ✅ Project association
- ✅ CRUD operations

**Estimated Time:** 2 hours

**Minimum Coverage:** 85%

---

#### Task 2.5: Test Server Actions - Users

**File:** `app/actions/users.test.ts`

**Test Coverage:**
- ✅ User role management
- ✅ Client filtering
- ✅ User lookup by Clerk ID

**Estimated Time:** 2 hours

**Minimum Coverage:** 85%

---

### 🟡 Priority 2: Validation & Utilities (Day 6)

#### Task 2.6: Test Validation Schemas

**File:** `lib/validations/project.test.ts`

**Test Coverage:**
- ✅ Valid project data acceptance
- ✅ Required field validation
- ✅ Status enum validation
- ✅ Date validation
- ✅ Budget validation (positive numbers, decimal places)

**Estimated Time:** 2 hours

**Minimum Coverage:** 90%

---

#### Task 2.7: Test Utility Functions

**File:** `lib/utils.test.ts`

**Test Coverage:**
- ✅ `formatCurrency()` - various amounts
- ✅ `formatDate()` - various date formats
- ✅ `cn()` - className merging
- ✅ Edge cases (null, undefined, empty)

**Estimated Time:** 2 hours

**Minimum Coverage:** 90%

---

### 🟢 Priority 3: UI Components (Days 7-9)

#### Task 2.8: Test Form Components

**Files:**
- `components/dashboard/project-form.test.tsx`
- `components/dashboard/invoice-form.test.tsx`
- `components/dashboard/milestone-form.test.tsx`
- `components/dashboard/deliverable-form.test.tsx`

**Test Coverage for Each:**
- ✅ Renders in create mode
- ✅ Renders in edit mode with pre-filled data
- ✅ Shows validation errors
- ✅ Submits form correctly
- ✅ Handles cancel action
- ✅ Loading states

**Estimated Time:** 8 hours (2 hours per form)

**Minimum Coverage:** 75%

---

#### Task 2.9: Test UI Components

**Files:** Test critical UI components from `components/ui/`

Priority components to test:
- `components/ui/button.test.tsx`
- `components/ui/input.test.tsx`
- `components/ui/select.test.tsx`
- `components/ui/dialog.test.tsx`

**Test Coverage:**
- ✅ Renders correctly
- ✅ Handles different variants
- ✅ Handles disabled state
- ✅ Keyboard interactions
- ✅ Accessibility (ARIA attributes)

**Estimated Time:** 4 hours

**Minimum Coverage:** 70%

---

### 🔵 Priority 4: Page Components (Day 10)

#### Task 2.10: Test Page Components

**Files:**
- `app/(dashboard)/admin/projects/projects-client.test.tsx`
- `app/(dashboard)/admin/invoices/invoices-client.test.tsx`
- `app/(dashboard)/client/page.test.tsx`

**Test Coverage:**
- ✅ Renders with data
- ✅ Renders empty state
- ✅ Opens create/edit dialogs
- ✅ Handles delete confirmations
- ✅ Displays correct status badges

**Estimated Time:** 6 hours

**Minimum Coverage:** 70%

---

## 📋 Phase 3: Establish TDD Workflow (Days 11-12)

### Task 3.1: Create TDD Template Scripts

**File:** `scripts/create-test.sh`

```bash
#!/bin/bash
# Creates a test file template

if [ -z "$1" ]; then
  echo "Usage: ./scripts/create-test.sh <file-path>"
  exit 1
fi

TEST_FILE="${1%.ts}.test.ts"

cat > "$TEST_FILE" << 'EOF'
import { describe, it, expect, beforeEach } from 'vitest'

describe('FeatureName', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', () => {
    // Arrange
    
    // Act
    
    // Assert
    expect(true).toBe(true)
  })
})
EOF

echo "Created test file: $TEST_FILE"
```

**Estimated Time:** 1 hour

---

### Task 3.2: Update Development Workflow Documentation

Add to project README or create `DOCS/DEVELOPMENT_WORKFLOW.md`:

```markdown
## Development Workflow with TDD

### For New Features:

1. **Write the test first** (Red)
   ```bash
   # Create test file
   touch app/actions/feature.test.ts
   
   # Write failing test
   npm run test:watch
   ```

2. **Implement minimum code** (Green)
   - Write just enough code to pass the test

3. **Refactor** (Blue)
   - Clean up code
   - Ensure tests still pass

4. **Commit**
   ```bash
   git add .
   git commit -m "feat: add feature with tests"
   ```

### Pre-commit Checklist:
- [ ] All tests pass (`npm run test`)
- [ ] Coverage meets minimum (70%+)
- [ ] No linter errors
- [ ] Types check passes
```

**Estimated Time:** 2 hours

---

### Task 3.3: Setup Pre-commit Hooks (Optional)

Install Husky and lint-staged:

```bash
npm install -D husky lint-staged
npx husky init
```

**File:** `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:run
npm run lint
npm run type-check
```

**Estimated Time:** 1 hour

---

## 📋 Phase 4: Continuous Improvement (Ongoing)

### Task 4.1: Monitor Coverage

**Weekly Task:**
- Run `npm run test:coverage`
- Review coverage report
- Identify areas below threshold
- Create issues to improve coverage

**Target Progression:**
- Week 1: 40% coverage
- Week 2: 55% coverage
- Week 3: 70% coverage
- Week 4: 80% coverage

---

### Task 4.2: Add Integration Tests

**File:** `tests/integration/project-lifecycle.test.ts`

Test complete user workflows:
- Create project → Add milestones → Mark complete
- Create invoice → Send to client → Mark paid
- Client views their projects and deliverables

**Estimated Time:** 4 hours per workflow

---

### Task 4.3: Add E2E Tests (Future)

Consider Playwright for critical paths:
- Admin creates project flow
- Client login and view dashboard
- Invoice payment flow

**Estimated Time:** TBD (Future sprint)

---

## 📊 Success Metrics

### Definition of Done (Sprint Complete)

- [x] Testing infrastructure setup complete
- [ ] 70%+ code coverage overall
- [ ] 85%+ coverage on server actions
- [ ] 90%+ coverage on validation/utilities
- [ ] 75%+ coverage on forms
- [ ] All critical business logic tested
- [ ] TDD workflow documented
- [ ] Team trained on TDD practices

### Weekly Check-ins

**Week 1 Goals:**
- Infrastructure setup complete
- 3 server action files tested
- 40% overall coverage

**Week 2 Goals:**
- All server actions tested
- Validation schemas tested
- 4 form components tested
- 60% overall coverage

**Week 3 Goals:**
- All forms tested
- UI components tested
- Page components tested
- 70%+ overall coverage
- TDD workflow established

---

## 🎯 Test Priority Matrix

| Component                  | Priority | Est. Time | Coverage Target | Status  |
| -------------------------- | -------- | --------- | --------------- | ------- |
| `actions/projects.ts`      | 🔴 High  | 4h        | 85%             | Pending |
| `actions/invoices.ts`      | 🔴 High  | 4h        | 85%             | Pending |
| `actions/milestones.ts`    | 🔴 High  | 3h        | 85%             | Pending |
| `actions/deliverables.ts`  | 🔴 High  | 2h        | 85%             | Pending |
| `actions/users.ts`         | 🔴 High  | 2h        | 85%             | Pending |
| `validations/project.ts`   | 🟡 Med   | 2h        | 90%             | Pending |
| `lib/utils.ts`             | 🟡 Med   | 2h        | 90%             | Pending |
| `project-form.tsx`         | 🟡 Med   | 2h        | 75%             | Pending |
| `invoice-form.tsx`         | 🟡 Med   | 2h        | 75%             | Pending |
| `milestone-form.tsx`       | 🟡 Med   | 2h        | 75%             | Pending |
| `deliverable-form.tsx`     | 🟡 Med   | 2h        | 75%             | Pending |
| UI Components              | 🟢 Low   | 4h        | 70%             | Pending |
| Page Components            | 🟢 Low   | 6h        | 70%             | Pending |

**Total Estimated Time:** ~41 hours

---

## 🚀 Getting Started - Quick Start Checklist

### Day 1 Morning: Setup (2-3 hours)
```bash
# 1. Install dependencies
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom msw happy-dom

# 2. Create config files
# - vitest.config.ts
# - tests/setup.ts
# - tests/utils.tsx

# 3. Update package.json scripts

# 4. Test the setup
npm run test

# Should show "No test files found"
```

### Day 1 Afternoon: First Test (2-3 hours)
```bash
# 5. Create first test file
touch lib/utils.test.ts

# 6. Write simple tests for formatCurrency and formatDate

# 7. Run tests
npm run test:watch

# 8. Achieve first passing tests! 🎉
```

### Day 2-3: Critical Server Actions
- Focus on `actions/projects.test.ts` first
- This is the most critical business logic
- Aim for 85%+ coverage

---

## 💡 Best Practices During Retroactive Testing

### DO ✅
- Start with the most critical, bug-prone code
- Write tests that document expected behavior
- Fix bugs you discover while testing
- Keep tests focused and simple
- Run entire test suite frequently
- Celebrate small wins (every passing test!)

### DON'T ❌
- Try to test everything at once
- Get blocked by perfect coverage
- Skip testing because "it's working"
- Test implementation details
- Write tests without understanding the code
- Let tests become outdated

---

## 📈 Progress Tracking

### Week 1 Retrospective Questions
1. What % coverage did we achieve?
2. What blockers did we encounter?
3. What testing patterns are working well?
4. What needs adjustment?

### Week 2 Retrospective Questions
1. Are we maintaining tests as we add features?
2. Has TDD slowed down or sped up development?
3. Have we caught any bugs with tests?
4. What's our confidence level in the code?

### Week 3 Retrospective Questions
1. Have we reached our coverage goals?
2. Is the team comfortable with TDD?
3. What additional testing tools do we need?
4. Are tests catching regressions?

---

## 🎓 Team Training Plan

### Training Session 1: TDD Fundamentals (1 hour)
- Red-Green-Refactor cycle
- Writing good test names
- AAA pattern (Arrange, Act, Assert)
- **Hands-on:** Write first test together

### Training Session 2: Testing React Components (1 hour)
- React Testing Library philosophy
- User-centric testing
- Common pitfalls
- **Hands-on:** Test a form component

### Training Session 3: Testing Server Actions (1 hour)
- Mocking Prisma
- Testing async functions
- Error handling
- **Hands-on:** Test a CRUD action

---

## 🔗 Related Documents

- [TDD_GUIDE.md](../TDD_GUIDE.md) - Comprehensive TDD guide
- [TECHNICAL_PLAN.md](../TECHNICAL_PLAN.md) - Overall technical architecture
- [SETUP_GUIDE.md](../SETUP_GUIDE.md) - Development setup instructions

---

## 📝 Notes & Learnings

### Lessons Learned
*(Update as sprint progresses)*

- **What worked well:**
  - TBD

- **What could be improved:**
  - TBD

- **Unexpected challenges:**
  - TBD

---

## 🆘 Help & Resources

### Common Issues

**Issue:** Tests can't resolve `@/` imports
**Solution:** Check `vitest.config.ts` alias configuration

**Issue:** "Cannot find module '@testing-library/jest-dom'"
**Solution:** Ensure it's imported in `tests/setup.ts`

**Issue:** Clerk mocks not working
**Solution:** Check mock setup in `tests/setup.ts`

**Issue:** Prisma mocks are complex
**Solution:** Consider using `vitest.mock()` with factory functions

### Where to Get Help
- Vitest Discord
- React Testing Library Docs
- Team pair programming sessions
- Weekly TDD office hours

---

**Sprint Started:** [DATE]  
**Sprint Target End:** [DATE]  
**Sprint Owner:** [NAME]  
**Last Updated:** [DATE]

---

## ✅ Sprint Completion Checklist

- [ ] All Phase 1 tasks complete (infrastructure)
- [ ] All Priority 1 tests complete (server actions)
- [ ] All Priority 2 tests complete (validations)
- [ ] 50% of Priority 3 tests complete (forms)
- [ ] Overall coverage >= 70%
- [ ] CI/CD pipeline includes test runs
- [ ] Team trained on TDD workflow
- [ ] Documentation updated
- [ ] Retrospective conducted
- [ ] Next sprint planned

---

**Let's ship with confidence! 🚀✅**

