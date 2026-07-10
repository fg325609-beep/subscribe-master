import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Subscription } from "@/types/subscription.types";

interface DeleteConfirmModalProps {
  subscription: Subscription | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmModal({
  subscription,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={!!subscription} onClose={onClose} title="Obunani o'chirish" size="sm">
      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-900">{subscription?.name}</span>{" "}
        obunasini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Bekor qilish
        </Button>
        <Button variant="danger" isLoading={isDeleting} onClick={onConfirm}>
          Ha, o'chirish
        </Button>
      </div>
    </Modal>
  );
}