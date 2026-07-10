import { z } from "zod";
import { CURRENCIES } from "@/config/constants";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Ism kamida 2 belgidan iborat bo'lishi kerak"),
  baseCurrency: z.enum(CURRENCIES),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Joriy parolni kiriting"),
    newPassword: z
      .string()
      .min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak")
      .regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lishi kerak")
      .regex(/[0-9]/, "Parolda kamida bitta raqam bo'lishi kerak"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmNewPassword"],
  });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;