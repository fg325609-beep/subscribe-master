"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useSubscriptions } from "@/features/subscriptions/hooks/useSubscriptions";
import { SubscriptionTable } from "@/features/subscriptions/components/SubscriptionTable";
import { SearchBar } from "@/features/subscriptions/components/SearchBar";
import { SubscriptionFilters } from "@/features/subscriptions/components/SubscriptionFilters";
import { Button } from "@/components/ui/Button";

export default function SubscriptionsPage() {
  const router = useRouter();
  const {
    subscriptions,
    filters,
    totalPages,
    isLoading,
    updateFilters,
    removeSubscription,
  } = useSubscriptions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Obunalar</h1>
        <Button onClick={() => router.push("/subscriptions/new")}>
          <Plus className="h-4 w-4" />
          Yangi obuna
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <SearchBar
          value={filters.search ?? ""}
          onChange={(search) => updateFilters({ search })}
        />
        <SubscriptionFilters filters={filters} onChange={updateFilters} />
      </div>

      <SubscriptionTable
        subscriptions={subscriptions}
        isLoading={isLoading}
        page={filters.page ?? 1}
        totalPages={totalPages}
        onPageChange={(page) => updateFilters({ page })}
        onDelete={removeSubscription}
      />
    </div>
  );
}