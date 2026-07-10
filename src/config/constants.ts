export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

export const TOKEN_STORAGE_KEY = "sm_access_token";
export const REFRESH_STORAGE_KEY = "sm_refresh_token";

export const CURRENCIES = ["UZS", "USD", "EUR"] as const;

export const SUBSCRIPTION_STATUSES = ["ACTIVE", "PAUSED", "CANCELLED"] as const;

export const BILLING_CYCLES = ["WEEKLY", "MONTHLY", "YEARLY"] as const;

// To'lov muddatiga necha kun qolganda ogohlantirish ko'rsatish
export const PAYMENT_WARNING_DAYS = 2;