"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlyExpense } from "@/types/analytics.types";
import { Currency } from "@/types/auth.types";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface MonthlyLineChartProps {
  data: MonthlyExpense[];
  currency: Currency;
}

export function MonthlyLineChart({ data, currency }: MonthlyLineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oylar bo'yicha xarajat dinamikasi</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value), currency)}
            contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0", fontSize: 13 }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}