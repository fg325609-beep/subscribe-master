import { apiClient } from "./api/client";
import {
  Subscription,
  CreateSubscriptionPayload,
  UpdateSubscriptionPayload,
  SubscriptionFilters,
} from "@/types/subscription.types";
import { PaginatedResponse } from "@/types/api.types";

export const subscriptionsService = {
  getAll: async (
    filters: SubscriptionFilters
  ): Promise<PaginatedResponse<Subscription>> => {
    const { data } = await apiClient.get<PaginatedResponse<Subscription>>(
      "/subscriptions",
      { params: filters }
    );
    return data;
  },

  getById: async (id: string): Promise<Subscription> => {
    const { data } = await apiClient.get<Subscription>(`/subscriptions/${id}`);
    return data;
  },

  create: async (payload: CreateSubscriptionPayload): Promise<Subscription> => {
    const { data } = await apiClient.post<Subscription>("/subscriptions", payload);
    return data;
  },

  update: async (
    id: string,
    payload: UpdateSubscriptionPayload
  ): Promise<Subscription> => {
    const { data } = await apiClient.patch<Subscription>(
      `/subscriptions/${id}`,
      payload
    );
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/subscriptions/${id}`);
  },
};