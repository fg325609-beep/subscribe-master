"use client";

import { useEffect, useState } from "react";
import { adminService, TopService } from "@/services/admin.service";

interface AdminStats {
  totalUsers: number;
  totalSubscriptions: number;
  totalRevenue: number;
  topServices: TopService[];
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getTopServices(),
      // Mock data for stats - in production these would come from the API
      Promise.resolve({ totalUsers: 0, totalSubscriptions: 0, totalRevenue: 0 }),
    ])
      .then(([topServices, mockStats]) => {
        setStats({ ...mockStats, topServices });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { stats, isLoading, topServices: stats?.topServices ?? [] };
}