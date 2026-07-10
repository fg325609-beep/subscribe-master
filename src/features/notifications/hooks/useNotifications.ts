"use client";

import { useEffect, useState } from "react";
import { notificationsService } from "@/services/notifications.service";
import { AppNotification } from "@/types/notification.types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationsService
      .getAll()
      .then(setNotifications)
      .finally(() => setIsLoading(false));
  }, []);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    await notificationsService.markAsRead(id);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { notifications, unreadCount, isLoading, markAsRead };
}