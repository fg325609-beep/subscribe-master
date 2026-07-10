"use client";

import { Menu, LogOut, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { authService } from "@/services/auth.service";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { Dropdown } from "@/components/ui/Dropdown";
import { useCurrencyStore } from "@/store/currencyStore";
import { CURRENCIES } from "@/config/constants";
import { cn } from "@/utils/cn";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUiStore();
  const { baseCurrency, setBaseCurrency } = useCurrencyStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      router.replace("/login");
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 sticky top-0 z-40">
      <button
        onClick={toggleSidebar}
        aria-label="Menyuni ochish/yopish"
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors duration-150"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3">
        <Dropdown
          aria-label="Asosiy valyuta"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value as typeof baseCurrency)}
          options={CURRENCIES.map((c) => ({ label: c, value: c }))}
          className="h-9 w-24 text-sm"
        />

        <NotificationBell />

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-slate-900 leading-tight">
              {user?.fullName}
            </span>
            <span className="text-xs text-slate-500">
              {user?.email}
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <button
            onClick={handleLogout}
            aria-label="Chiqish"
            className={cn(
              "rounded-lg p-2 text-slate-500 transition-all duration-150",
              "hover:bg-red-50 hover:text-red-600 hover:scale-105"
            )}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}