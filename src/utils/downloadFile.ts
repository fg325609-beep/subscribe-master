/**
 * Backend qaytargan Blob'ni Content-Disposition header'dagi fayl nomi bilan
 * browser orqali yuklab olish uchun ishlatiladi.
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function extractFilename(contentDisposition: string | undefined, fallback: string): string {
  if (!contentDisposition) return fallback;
  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match?.[1] ?? fallback;
}