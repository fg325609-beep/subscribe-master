"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/features/auth/schemas/settings.schema";
import { settingsService } from "@/services/settings.service";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setIsSubmitting(true);
    setMessage(null);
    try {
      await settingsService.changePassword(values);
      setMessage({ type: "success", text: "Parol muvaffaqiyatli o'zgartirildi" });
      reset();
    } catch {
      setMessage({ type: "error", text: "Joriy parol noto'g'ri kiritildi" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {message && (
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <Input
        label="Joriy parol"
        type="password"
        error={errors.currentPassword?.message}
        {...register("currentPassword")}
      />
      <Input
        label="Yangi parol"
        type="password"
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <Input
        label="Yangi parolni tasdiqlang"
        type="password"
        error={errors.confirmNewPassword?.message}
        {...register("confirmNewPassword")}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Parolni o'zgartirish
      </Button>
    </form>
  );
}