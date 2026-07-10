import { Dropdown } from "@/components/ui/Dropdown";
import { SubscriptionFilters as Filters } from "@/types/subscription.types";
import { CURRENCIES, SUBSCRIPTION_STATUSES } from "@/config/constants";

interface SubscriptionFiltersProps {
  filters: Filters;
  onChange: (partial: Partial<Filters>) => void;
}

export function SubscriptionFilters({ filters, onChange }: SubscriptionFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Dropdown
        aria-label="Status bo'yicha filtr"
        value={filters.status ?? ""}
        onChange={(e) =>
          onChange({ status: (e.target.value || undefined) as Filters["status"] })
        }
        placeholder="Barcha statuslar"
        options={SUBSCRIPTION_STATUSES.map((s) => ({ label: s, value: s }))}
        className="w-40"
      />
      <Dropdown
        aria-label="Valyuta bo'yicha filtr"
        value={filters.currency ?? ""}
        onChange={(e) =>
          onChange({ currency: (e.target.value || undefined) as Filters["currency"] })
        }
        placeholder="Barcha valyutalar"
        options={CURRENCIES.map((c) => ({ label: c, value: c }))}
        className="w-40"
      />
    </div>
  );
}