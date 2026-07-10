'use client';

import { useAdminStats } from '@/features/admin/hooks/useAdminStats';
import { TopServicesTable } from '@/features/admin/components/TopServicesTable';
import { Spinner } from '@/components/ui/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Users, CreditCard, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

export default function AdminPage() {
  const { stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-500">System overview and statistics.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Users className="h-4 w-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <CreditCard className="h-4 w-4" />
              Total Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalSubscriptions ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              {stats ? formatCurrency(stats.totalRevenue, 'USD') : '$0.00'}
            </p>
          </CardContent>
        </Card>
      </div>

      {stats?.topServices && (
        <TopServicesTable services={stats.topServices} />
      )}
    </div>
  );
}