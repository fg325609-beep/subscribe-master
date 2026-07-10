import { apiClient } from "./api/client";

export type ReportFormat = "excel" | "csv";

export const reportsService = {
  download: async (format: ReportFormat) => {
    const response = await apiClient.get(`/reports/download?format=${format}`, {
      responseType: "blob",
    });
    return {
      blob: response.data as Blob,
      contentDisposition: response.headers["content-disposition"] as string,
    };
  },
};