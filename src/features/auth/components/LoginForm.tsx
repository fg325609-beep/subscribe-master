"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const { login, isLoading, serverError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(login)} className="w-full max-w-sm space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Xush kelibsiz</h1>
        <p className="mt-1 text-sm text-slate-500">Hisobingizga kiring</p>
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="siz@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Parol"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" {...register("rememberMe")} className="rounded" />
          Eslab qolish
        </label>
        <Link href="/forgot-password" className="text-indigo-600 hover:underline">
          Parolni unutdingizmi?
        </Link>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Kirish
      </Button>

      <p className="text-center text-sm text-slate-500">
        Hisobingiz yo'qmi?{" "}
        <Link href="/register" className="text-indigo-600 hover:underline">
          Ro'yxatdan o'ting
        </Link>
      </p>
    </form>
  );
}
