"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { useReportDownload } from "../hooks/useReportDownload";
import { Button } from "@/components/ui/Button";

export function DownloadReportButton() {
  const { download, isDownloading, error } = useReportDownload();

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Button variant="secondary" isLoading={isDownloading} onClick={() => download("excel")}>
          <FileSpreadsheet className="h-4 w-4" />
          Excel formatida yuklab olish
        </Button>
        <Button variant="secondary" isLoading={isDownloading} onClick={() => download("csv")}>
          <FileText className="h-4 w-4" />
          CSV formatida yuklab olish
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}