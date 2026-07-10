import { format, differenceInCalendarDays, parseISO } from "date-fns";

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "dd.MM.yyyy");
}

export function daysUntil(dateStr: string): number {
  return differenceInCalendarDays(parseISO(dateStr), new Date());
}