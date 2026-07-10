"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";
import { ApiErrorResponse } from "@/types/api.types";

export function useAuth() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await authService.login(payload);
      setAuth(response);
      router.push("/dashboard");
    } catch (err) {
      const axiosErr = err as AxiosError<ApiErrorResponse>;
      setServerError(
        axiosErr.response?.data?.message ?? "Email yoki parol noto'g'ri"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await authService.register(payload);
      setAuth(response);
      router.push("/dashboard");
    } catch (err) {
      const axiosErr = err as AxiosError<ApiErrorResponse>;
      setServerError(
        axiosErr.response?.data?.message ?? "Ro'yxatdan o'tishda xatolik yuz berdi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading, serverError };
}