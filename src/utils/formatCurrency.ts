import { Currency } from "@/types/auth.types";

const CURRENCY_LOCALES: Record<Currency, string> = {
  UZS: "uz-UZ",
  USD: "en-US",
  EUR: "de-DE",
};

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "UZS" ? 0 : 2,
  }).format(amount);
}