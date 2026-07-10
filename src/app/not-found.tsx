import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-lg font-medium text-slate-900">Sahifa topilmadi</p>
      <p className="max-w-sm text-sm text-slate-500">
        Siz izlagan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
      </p>
      <Link href="/dashboard">
        <Button>Bosh sahifaga qaytish</Button>
      </Link>
    </div>
  );
}