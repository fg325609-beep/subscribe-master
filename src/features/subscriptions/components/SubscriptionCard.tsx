"use client";

import Link from "next/link";
import { MoreVertical, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Subscription } from "@/types/subscription.types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate, daysUntil } from "@/utils/formatDate";
import { PAYMENT_WARNING_DAYS } from "@/config/constants";
import { cn } from "@/utils/cn";

interface SubscriptionCardProps {
  subscription: Subscription;
  onDeleteClick: (subscription: Subscription) => void;
}

export function SubscriptionCard({ subscription, onDeleteClick }: SubscriptionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const remainingDays = daysUntil(subscription.nextPaymentDate);
  const isPaymentSoon = remainingDays >= 0 && remainingDays <= PAYMENT_WARNING_DAYS;

  return (
    <Card
      className={cn(
        "relative transition-shadow hover:shadow-md",
        isPaymentSoon && "border-amber-300 bg-amber-50/40"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{subscription.name}</h3>
          <p className="text-xs text-slate-500">{subscription.category}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Amallar menyusi"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <Link
                href={`/subscriptions/${subscription.id}`}
                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Tahrirlash
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDeleteClick(subscription);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                O'chirish
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {formatCurrency(subscription.price, subscription.currency)}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <Badge status={subscription.status} />
        <span
          className={cn(
            "flex items-center gap-1 text-xs",
            isPaymentSoon ? "font-medium text-amber-700" : "text-slate-500"
          )}
        >
          {isPaymentSoon && <AlertCircle className="h-3.5 w-3.5" />}
          {formatDate(subscription.nextPaymentDate)}
        </span>
      </div>
    </Card>
  );
}