import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Currency } from "@/types/auth.types";

interface CurrencyState {
  baseCurrency: Currency;
  setBaseCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: "UZS",
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
    }),
    { name: "sm-currency-storage" }
  )
);