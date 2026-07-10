import { apiClient } from "./api/client";
import { AnalyticsSummary, AnalyticsPeriod } from "@/types/analytics.types";
import { Currency } from "@/types/auth.types";

export const analyticsService = {
  getSummary: async (
    currency: Currency,
    period: AnalyticsPeriod
  ): Promise<AnalyticsSummary> => {
    const { data } = await apiClient.get<AnalyticsSummary>("/analytics/summary", {
      params: { currency, period },
    });
    return data;
  },
};