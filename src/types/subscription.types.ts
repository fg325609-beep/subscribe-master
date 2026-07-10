import { Currency } from "./auth.types";

export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED";
export type BillingCycle = "WEEKLY" | "MONTHLY" | "YEARLY";

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  category: string;
  billingCycle: BillingCycle;
  startDate: string;       // ISO string
  nextPaymentDate: string; // ISO string
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionPayload {
  name: string;
  price: number;
  currency: Currency;
  category: string;
  billingCycle: BillingCycle;
  startDate: string;
}

export type UpdateSubscriptionPayload = Partial<CreateSubscriptionPayload> & {
  status?: SubscriptionStatus;
};

export interface SubscriptionFilters {
  status?: SubscriptionStatus;
  currency?: Currency;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}