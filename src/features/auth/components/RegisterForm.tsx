"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const { register: registerUser, isLoading, serverError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...payload } = values;
    void confirmPassword;
    registerUser({ ...payload, confirmPassword: values.confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ro'yxatdan o'tish</h1>
        <p className="mt-1 text-sm text-slate-500">Yangi hisob yarating</p>
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <Input label="To'liq ism" error={errors.fullName?.message} {...register("fullName")} />
      <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
      <Input
        label="Parol"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Parolni tasdiqlang"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Ro'yxatdan o'tish
      </Button>

      <p className="text-center text-sm text-slate-500">
        Hisobingiz bormi?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline">
          Kiring
        </Link>
      </p>
    </form>
  );
}