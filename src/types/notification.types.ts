export interface AppNotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  subscriptionId?: string;
  createdAt: string;
}