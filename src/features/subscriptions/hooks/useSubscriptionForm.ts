"use client";

import { useState } from "react";
import { subscriptionsService } from "@/services/subscriptions.service";
import {
  CreateSubscriptionPayload,
  Subscription,
  UpdateSubscriptionPayload,
} from "@/types/subscription.types";

export function useSubscriptionForm(existing?: Subscription) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    values: CreateSubscriptionPayload | UpdateSubscriptionPayload
  ) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (existing) {
        return await subscriptionsService.update(existing.id, values);
      }
      return await subscriptionsService.create(values as CreateSubscriptionPayload);
    } catch {
      setError("Ma'lumotlarni saqlashda xatolik yuz berdi");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
}