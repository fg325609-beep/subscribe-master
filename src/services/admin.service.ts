import { apiClient } from "./api/client";

export interface TopService {
  name: string;
  subscriberCount: number;
}

export const adminService = {
  getTopServices: async (): Promise<TopService[]> => {
    const { data } = await apiClient.get<TopService[]>("/admin/top-services");
    return data;
  },
};