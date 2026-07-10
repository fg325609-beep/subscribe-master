"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CategoryExpense } from "@/types/analytics.types";
import { Currency } from "@/types/auth.types";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

const COLORS = ["#4f46e5", "#06b6d4", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

interface CategoryPieChartProps {
  data: CategoryExpense[];
  currency: Currency;
}

export function CategoryPieChart({ data, currency }: CategoryPieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kategoriya bo'yicha taqsimot</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}