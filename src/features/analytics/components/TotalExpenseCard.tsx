import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatCurrency";
import { Currency } from "@/types/auth.types";

interface TotalExpenseCardProps {
  label: string;
  amount: number;
  currency: Currency;
}

export function TotalExpenseCard({ label, amount, currency }: TotalExpenseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <p className="text-3xl font-bold text-slate-900">
        {formatCurrency(amount, currency)}
      </p>
    </Card>
  );
}