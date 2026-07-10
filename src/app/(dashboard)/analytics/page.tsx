"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAdminStats } from "@/features/admin/hooks/useAdminStats";
import { TopServicesTable } from "@/features/admin/components/TopServicesTable";
import { Spinner } from "@/components/ui/Spinner";

function AdminContent() {
  const { topServices, isLoading } = useAdminStats();

  if (isLoading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin panel</h1>
      <TopServicesTable services={topServices ?? []} />
    </div>
  );
}

// RBAC: bu sahifa faqat ADMIN roli uchun ochiladi (ProtectedRoute requiredRole orqali)
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminContent />
    </ProtectedRoute>
  );
}