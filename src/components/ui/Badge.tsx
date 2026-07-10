import { cn } from "@/utils/cn";
import { SubscriptionStatus } from "@/types/subscription.types";

interface BadgeProps {
  status: SubscriptionStatus;
}

const statusConfig: Record<SubscriptionStatus, { label: string; className: string }> = {
  ACTIVE: { label: "Faol", className: "bg-emerald-100 text-emerald-700" },
  PAUSED: { label: "To'xtatilgan", className: "bg-amber-100 text-amber-700" },
  CANCELLED: { label: "Bekor qilingan", className: "bg-slate-100 text-slate-500" },
};

export function Badge({ status }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}