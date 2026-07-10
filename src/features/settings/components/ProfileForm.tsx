"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/features/auth/schemas/settings.schema";
import { settingsService } from "@/services/settings.service";
import { useAuthStore } from "@/store/authStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { Input } from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { CURRENCIES } from "@/config/constants";

export function ProfileForm() {
  const { user, setUser } = useAuthStore();
  const { setBaseCurrency } = useCurrencyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName ?? "",
      baseCurrency: user?.baseCurrency ?? "UZS",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    setSuccessMsg(null);
    try {
      const updatedUser = await settingsService.updateProfile(values);
      setUser(updatedUser);
      setBaseCurrency(values.baseCurrency);
      setSuccessMsg("Profil muvaffaqiyatli yangilandi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {successMsg && (
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {successMsg}
        </div>
      )}
      <Input label="To'liq ism" error={errors.fullName?.message} {...register("fullName")} />
      <Dropdown
        label="Asosiy valyuta"
        error={errors.baseCurrency?.message}
        options={CURRENCIES.map((c) => ({ label: c, value: c }))}
        {...register("baseCurrency")}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Saqlash
      </Button>
    </form>
  );
}