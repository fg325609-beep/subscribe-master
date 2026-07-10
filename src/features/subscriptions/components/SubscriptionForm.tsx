"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscriptionSchema,
  SubscriptionFormValues,
} from "../schemas/subscription.schema";
import { useSubscriptionForm } from "../hooks/useSubscriptionForm";
import { Input } from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { Subscription } from "@/types/subscription.types";
import { CURRENCIES, BILLING_CYCLES } from "@/config/constants";

const CATEGORIES = ["Streaming", "Musiqa", "Dasturiy ta'minot", "Fitnes", "Ta'lim", "Boshqa"];

interface SubscriptionFormProps {
  existing?: Subscription;
  onSuccess: (subscription: Subscription) => void;
  onCancel: () => void;
}

export function SubscriptionForm({ existing, onSuccess, onCancel }: SubscriptionFormProps) {
  const { submit, isSubmitting, error } = useSubscriptionForm(existing);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: existing
      ? {
          name: existing.name,
          price: existing.price,
          currency: existing.currency,
          category: existing.category,
          billingCycle: existing.billingCycle,
          startDate: existing.startDate.slice(0, 10),
        }
      : { currency: "UZS", billingCycle: "MONTHLY" },
  });

  const onSubmit = async (values: SubscriptionFormValues) => {
    const result = await submit(values);
    if (result) onSuccess(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <Input label="Nomi" error={errors.name?.message} {...register("name")} />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Narxi"
          type="number"
          step="0.01"
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
        />
        <Dropdown
          label="Valyuta"
          error={errors.currency?.message}
          options={CURRENCIES.map((c) => ({ label: c, value: c }))}
          {...register("currency")}
        />
      </div>

      <Dropdown
        label="Kategoriya"
        placeholder="Tanlang"
        error={errors.category?.message}
        options={CATEGORIES.map((c) => ({ label: c, value: c }))}
        {...register("category")}
      />

      <div className="grid grid-cols-2 gap-3">
        <Dropdown
          label="Davriylik"
          error={errors.billingCycle?.message}
          options={BILLING_CYCLES.map((b) => ({ label: b, value: b }))}
          {...register("billingCycle")}
        />
        <Input
          label="Boshlanish sanasi"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Bekor qilish
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {existing ? "Saqlash" : "Qo'shish"}
        </Button>
      </div>
    </form>
  );
}