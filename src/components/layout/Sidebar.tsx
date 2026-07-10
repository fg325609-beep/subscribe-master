"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  FileDown,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subscriptions", label: "Obunalar", icon: ListChecks },
  { href: "/analytics", label: "Statistika", icon: BarChart3 },
  { href: "/reports", label: "Hisobotlar", icon: FileDown },
  { href: "/settings", label: "Sozlamalar", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { isSidebarOpen } = useUiStore();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300",
        "sticky top-0",
        isSidebarOpen ? "w-64" : "w-0 overflow-hidden lg:w-20"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className={cn(
            "text-lg font-bold text-slate-900 transition-opacity duration-200",
            !isSidebarOpen && "lg:hidden"
          )}>
            SubScribe
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                "group relative",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-150",
                "group-hover:scale-110"
              )} />
              <span className={cn(!isSidebarOpen && "lg:hidden")}>{label}</span>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" />
              )}
            </Link>
          );
        })}

        {/* RBAC: faqat ADMIN uchun link ko'rinadi */}
        {user?.role === "ADMIN" && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
              "group relative",
              pathname.startsWith("/admin")
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <ShieldCheck className={cn(
              "h-5 w-5 shrink-0 transition-transform duration-150",
              "group-hover:scale-110"
            )} />
            <span className={cn(!isSidebarOpen && "lg:hidden")}>Admin panel</span>
            {pathname.startsWith("/admin") && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" />
            )}
          </Link>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 p-4">
        <div className={cn(
          "flex items-center gap-3",
          !isSidebarOpen && "lg:justify-center"
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className={cn("flex-1 min-w-0", !isSidebarOpen && "lg:hidden")}>
            <p className="text-sm font-medium text-slate-900 truncate">
              {user?.fullName || "Foydalanuvchi"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.role === "ADMIN" ? "Administrator" : "Foydalanuvchi"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}