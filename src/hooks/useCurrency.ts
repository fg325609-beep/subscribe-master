import { useCurrencyStore } from '@/store/currencyStore';
import { formatCurrency } from '@/utils/formatCurrency';

export function useCurrency() {
  const { baseCurrency, setBaseCurrency } = useCurrencyStore();

  const format = (amount: number) => formatCurrency(amount, baseCurrency);

  return {
    currency: baseCurrency,
    setCurrency: setBaseCurrency,
    format,
  };
}