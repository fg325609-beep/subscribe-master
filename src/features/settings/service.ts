import { apiClient } from "@/services/api/client";
import { User, Currency } from "@/types/auth.types";

export const settingsService = {
  updateProfile: async (payload: {
    fullName: string;
    baseCurrency: Currency;
  }): Promise<User> => {
    const { data } = await apiClient.patch<User>("/users/me", payload);
    return data;
  },
  changePassword: async (payload: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    await apiClient.post("/users/me/change-password", payload);
  },
};