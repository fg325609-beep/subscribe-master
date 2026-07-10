import { TopService } from "@/services/admin.service";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface TopServicesTableProps {
  services: TopService[];
}

export function TopServicesTable({ services }: TopServicesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eng ko'p ishlatiladigan xizmatlar</CardTitle>
      </CardHeader>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-slate-500">
            <th className="pb-2 font-medium">Xizmat</th>
            <th className="pb-2 font-medium text-right">Obunachilar soni</th>
          </tr>
        </thead>
        <tbody>
          {services.map((item) => (
            <tr key={item.name} className="border-b border-slate-50">
              <td className="py-2 text-slate-900">{item.name}</td>
              <td className="py-2 text-right font-medium text-slate-900">
                {item.subscriberCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}