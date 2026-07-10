import { apiClient } from "./api/client";
import { AppNotification } from "@/types/notification.types";

export const notificationsService = {
  getAll: async (): Promise<AppNotification[]> => {
    const { data } = await apiClient.get<AppNotification[]>("/notifications");
    return data;
  },
  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`);
  },
};