import { z } from "zod";
import { CURRENCIES, BILLING_CYCLES } from "@/config/constants";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Nomi kiritilishi shart"),
  price: z.number().positive("Narx musbat son bo'lishi kerak"),
  currency: z.enum(CURRENCIES),
  category: z.string().min(1, "Kategoriya tanlanishi shart"),
  billingCycle: z.enum(BILLING_CYCLES),
  startDate: z.string().min(1, "Boshlanish sanasi kiritilishi shart"),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;
