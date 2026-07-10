import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("ACTIVE status uchun to'g'ri label ko'rsatadi", () => {
    render(<Badge status="ACTIVE" />);
    expect(screen.getByText("Faol")).toBeInTheDocument();
  });

  it("CANCELLED status uchun to'g'ri label ko'rsatadi", () => {
    render(<Badge status="CANCELLED" />);
    expect(screen.getByText("Bekor qilingan")).toBeInTheDocument();
  });
});