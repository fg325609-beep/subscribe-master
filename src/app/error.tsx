"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <h1 className="text-xl font-bold text-slate-900">Nimadir noto'g'ri ketdi</h1>
      <p className="max-w-sm text-sm text-slate-500">
        Kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
      </p>
      <Button onClick={reset}>Qayta urinish</Button>
    </div>
  );
}