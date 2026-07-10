"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { subscriptionsService } from "@/services/subscriptions.service";
import { Subscription } from "@/types/subscription.types";
import { SubscriptionForm } from "@/features/subscriptions/components/SubscriptionForm";
import { Spinner } from "@/components/ui/Spinner";

export default function SubscriptionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    subscriptionsService
      .getById(id)
      .then(setSubscription)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <Spinner size="lg" />;
  if (!subscription) return <p className="text-slate-500">Obuna topilmadi.</p>;

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Obunani tahrirlash</h1>
      <SubscriptionForm
        existing={subscription}
        onSuccess={() => router.push("/subscriptions")}
        onCancel={() => router.push("/subscriptions")}
      />
    </div>
  );
}