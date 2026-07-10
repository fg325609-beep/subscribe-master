"use client";

import { useRouter } from "next/navigation";
import { SubscriptionForm } from "@/features/subscriptions/components/SubscriptionForm";

export default function NewSubscriptionPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Yangi obuna qo'shish</h1>
      <SubscriptionForm
        onSuccess={() => router.push("/subscriptions")}
        onCancel={() => router.push("/subscriptions")}
      />
    </div>
  );
}