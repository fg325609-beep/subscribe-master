"use client";

import { useEffect, useState } from "react";
import { analyticsService } from "@/services/analytics.service";
import { AnalyticsSummary, AnalyticsPeriod } from "@/types/analytics.types";
import { useCurrencyStore } from "@/store/currencyStore";

export function useAnalytics() {
  const { baseCurrency } = useCurrencyStore();
  const [period, setPeriod] = useState<AnalyticsPeriod>(6);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    analyticsService
      .getSummary(baseCurrency, period)
      .then(setSummary)
      .finally(() => setIsLoading(false));
  }, [baseCurrency, period]);

  return { summary, isLoading, period, setPeriod };
}