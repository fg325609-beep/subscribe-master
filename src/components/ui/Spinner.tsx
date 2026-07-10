import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };

export function Spinner({ size = "md", className, label = "Yuklanmoqda..." }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8" role="status">
      <Loader2 className={cn("animate-spin text-indigo-600", sizeMap[size], className)} />
      {label && <span className="text-sm text-slate-500">{label}</span>}
    </div>
  );
}