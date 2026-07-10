"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription.types";
import { SubscriptionCard } from "./SubscriptionCard";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => Promise<void>;
}

export function SubscriptionTable({
  subscriptions,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onDelete,
}: SubscriptionTableProps) {
  const router = useRouter();
  const [toDelete, setToDelete] = useState<Subscription | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(toDelete.id);
      setToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <Spinner size="lg" label="Obunalar yuklanmoqda..." />;

  if (subscriptions.length === 0) {
    return (
      <EmptyState
        title="Birinchi obunangizni qo'shing"
        description="Hozircha hech qanday obunangiz yo'q. Xarajatlaringizni kuzatishni boshlash uchun yangi obuna qo'shing."
        action={
          <Button onClick={() => router.push("/subscriptions/new")}>
            Obuna qo'shish
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub) => (
          <SubscriptionCard key={sub.id} subscription={sub} onDeleteClick={setToDelete} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />

      <DeleteConfirmModal
        subscription={toDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setToDelete(null)}
      />
    </div>
  );
}