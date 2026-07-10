import { Currency } from "./auth.types";

export interface MonthlyExpense {
  month: string;   // "2026-01"
  total: number;
}

export interface CategoryExpense {
  category: string;
  total: number;
  percentage: number;
}

export interface AnalyticsSummary {
  totalMonthly: number;
  totalYearly: number;
  mostExpensiveSubscription: {
    id: string;
    name: string;
    price: number;
  } | null;
  currency: Currency;
  monthlyBreakdown: MonthlyExpense[];
  categoryBreakdown: CategoryExpense[];
}

export type AnalyticsPeriod = 3 | 6 | 12;