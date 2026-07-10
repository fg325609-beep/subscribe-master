"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { Spinner } from "@/components/ui/Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "ADMIN";
}

/**
 * Route Guard: foydalanuvchi sessiyasini tekshiradi.
 * Sahifa yangilanganda accessToken xotiradan o'chgani uchun,
 * /auth/me chaqirib refresh-cookie orqali sessiyani tiklashga harakat qiladi.
 */
export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, setAuth, accessToken, logout } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (isAuthenticated && accessToken) {
        setIsChecking(false);
        return;
      }
      try {
        const currentUser = await authService.getCurrentUser();
        // getCurrentUser muvaffaqiyatli bo'lsa, interceptor allaqachon
        // accessToken'ni yangilagan bo'ladi (401 -> refresh oqimi orqali)
        useAuthStore.getState().setUser(currentUser);
      } catch {
        logout();
        router.replace("/login");
      } finally {
        setIsChecking(false);
      }
    };
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isChecking) {
    return <Spinner size="lg" label="Sessiya tekshirilmoqda..." />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-xl font-semibold text-slate-900">Ruxsat yo'q</h2>
        <p className="mt-2 text-sm text-slate-500">
          Bu sahifani ko'rish uchun kerakli huquqingiz yo'q.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}