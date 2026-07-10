import { Crown } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatCurrency";
import { Currency } from "@/types/auth.types";

interface MostExpensiveWidgetProps {
  data: { name: string; price: number } | null;
  currency: Currency;
}

export function MostExpensiveWidget({ data, currency }: MostExpensiveWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eng qimmat obuna</CardTitle>
      </CardHeader>
      {data ? (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-amber-100 p-2 text-amber-600">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{data.name}</p>
            <p className="text-sm text-slate-500">{formatCurrency(data.price, currency)}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400">Ma'lumot yo'q</p>
      )}
    </Card>
  );
}