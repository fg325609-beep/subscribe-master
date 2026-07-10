"use client";

import { useCallback, useEffect, useState } from "react";
import { subscriptionsService } from "@/services/subscriptions.service";
import { Subscription, SubscriptionFilters } from "@/types/subscription.types";
import { useDebounce } from "@/hooks/useDebounce";

export function useSubscriptions(initialFilters: SubscriptionFilters = {}) {
  const [filters, setFilters] = useState<SubscriptionFilters>({
    page: 1,
    limit: 10,
    ...initialFilters,
  });
  const [items, setItems] = useState<Subscription[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Qidiruv so'zini debounce qilamiz — har harfda API chaqirilmasligi uchun
  const debouncedSearch = useDebounce(filters.search, 400);

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await subscriptionsService.getAll({
        ...filters,
        search: debouncedSearch,
      });
      setItems(result.items);
      setTotalPages(result.meta.totalPages);
    } catch {
      setError("Obunalarni yuklashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const updateFilters = (partial: Partial<SubscriptionFilters>) => {
    // Filtr o'zgarganda sahifani 1ga qaytaramiz (agar page o'zi o'zgarmayotgan bo'lsa)
    setFilters((prev) => ({
      ...prev,
      ...partial,
      page: partial.page ?? 1,
    }));
  };

  const removeSubscription = async (id: string) => {
    await subscriptionsService.remove(id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    subscriptions: items,
    filters,
    totalPages,
    isLoading,
    error,
    updateFilters,
    refetch: fetchSubscriptions,
    removeSubscription,
  };
}