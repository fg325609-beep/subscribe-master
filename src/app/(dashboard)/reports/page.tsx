import { DownloadReportButton } from "@/features/reports/components/DownloadReportButton";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Hisobotlar</h1>
      <Card>
        <CardHeader>
          <CardTitle>Barcha obunalar bo'yicha hisobot</CardTitle>
        </CardHeader>
        <p className="mb-4 text-sm text-slate-500">
          Barcha obunalaringiz va xarajatlaringiz haqidagi to'liq hisobotni tanlangan
          formatda yuklab oling.
        </p>
        <DownloadReportButton />
      </Card>
    </div>
  );
}