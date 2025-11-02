export const APP_NAME = "Lollyshoppe";
export const APP_TAGLINE = "Get a sweet fix for your product";
export const APP_DESCRIPTION = "Low-code MVP development for startups";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PORTFOLIO: "/portfolio",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  CLIENT_DASHBOARD: "/client",
  ADMIN_DASHBOARD: "/admin",
} as const;

export const PROJECT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const INVOICE_STATUS = {
  DRAFT: "draft",
  SENT: "sent",
  PAID: "paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  CLIENT: "client",
} as const;

