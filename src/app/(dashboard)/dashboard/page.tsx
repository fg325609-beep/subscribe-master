"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";
import { subscriptionsService } from "@/services/subscriptions.service";
import { Subscription } from "@/types/subscription.types";
import { TotalExpenseCard } from "@/features/analytics/components/TotalExpenseCard";
import { MostExpensiveWidget } from "@/features/analytics/components/MostExpensiveWidget";
import { SubscriptionCard } from "@/features/subscriptions/components/SubscriptionCard";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { PAYMENT_WARNING_DAYS } from "@/config/constants";
import { daysUntil } from "@/utils/formatDate";

export default function DashboardPage() {
  const router = useRouter();
  const { summary, isLoading: isAnalyticsLoading } = useAnalytics();
  const [upcoming, setUpcoming] = useState<Subscription[]>([]);
  const [isSubsLoading, setIsSubsLoading] = useState(true);

  useEffect(() => {
    subscriptionsService
      .getAll({ status: "ACTIVE", limit: 50, page: 1 })
      .then((res) => {
        const soon = res.items.filter(
          (s) => daysUntil(s.nextPaymentDate) <= PAYMENT_WARNING_DAYS + 3
        );
        setUpcoming(soon.slice(0, 6));
      })
      .finally(() => setIsSubsLoading(false));
  }, []);

  if (isAnalyticsLoading || !summary) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Button onClick={() => router.push("/subscriptions/new")}>
          <Plus className="h-4 w-4" />
          Yangi obuna
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TotalExpenseCard
          label="Jami oylik xarajat"
          amount={summary.totalMonthly}
          currency={summary.currency}
        />
        <TotalExpenseCard
          label="Jami yillik xarajat"
          amount={summary.totalYearly}
          currency={summary.currency}
        />
        <MostExpensiveWidget
          data={summary.mostExpensiveSubscription}
          currency={summary.currency}
        />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Yaqinlashayotgan to'lovlar
        </h2>
        {isSubsLoading ? (
          <Spinner />
        ) : upcoming.length === 0 ? (
          <EmptyState
            title="Yaqin kunlarda to'lovlar yo'q"
            description="Barcha obunalaringiz bo'yicha hozircha muddati yaqinlashgan to'lov mavjud emas."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((sub) => (
              <SubscriptionCard key={sub.id} subscription={sub} onDeleteClick={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}