import { describe, it, expect } from "vitest";
import { formatCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
  it("USD uchun to'g'ri formatlaydi", () => {
    const result = formatCurrency(19.99, "USD");
    expect(result).toContain("19.99");
  });

  it("UZS uchun kasr qismisiz formatlaydi", () => {
    const result = formatCurrency(55000, "UZS");
    expect(result).not.toContain(".");
  });
});