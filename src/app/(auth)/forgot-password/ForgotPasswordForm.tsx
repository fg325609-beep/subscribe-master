"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ForgotPasswordForm() {
  const { requestReset, isLoading, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  if (isSuccess) {
    return (
      <div className="w-full max-w-sm space-y-4 text-center">
        <div className="mx-auto w-fit rounded-full bg-emerald-100 p-3 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Xat yuborildi</h1>
        <p className="text-sm text-slate-500">
          Agar bu email tizimda mavjud bo'lsa, parolni tiklash havolasi yuborildi.
          Pochta qutingizni tekshiring.
        </p>
        <Link href="/login" className="inline-block text-sm text-indigo-600 hover:underline">
          Kirish sahifasiga qaytish
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((v) => requestReset(v.email))}
      className="w-full max-w-sm space-y-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Parolni unutdingizmi?</h1>
        <p className="mt-1 text-sm text-slate-500">
          Emailingizni kiriting, tiklash havolasini yuboramiz.
        </p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="siz@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Havola yuborish
      </Button>

      <p className="text-center text-sm text-slate-500">
        <Link href="/login" className="text-indigo-600 hover:underline">
          Kirish sahifasiga qaytish
        </Link>
      </p>
    </form>
  );
}