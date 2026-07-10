"use client";

import { useState } from "react";
import { reportsService, ReportFormat } from "@/services/reports.service";
import { downloadBlob, extractFilename } from "@/utils/downloadFile";

export function useReportDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async (format: ReportFormat) => {
    setIsDownloading(true);
    setError(null);
    try {
      const { blob, contentDisposition } = await reportsService.download(format);
      const filename = extractFilename(
        contentDisposition,
        `hisobot.${format === "excel" ? "xlsx" : "csv"}`
      );
      downloadBlob(blob, filename);
    } catch {
      setError("Hisobotni yuklab olishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsDownloading(false);
    }
  };

  return { download, isDownloading, error };
}