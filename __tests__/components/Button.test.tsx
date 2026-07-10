import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("bosilganda onClick chaqiriladi", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Bosish</Button>);
    fireEvent.click(screen.getByText("Bosish"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("isLoading=true bo'lganda disabled bo'ladi", () => {
    render(<Button isLoading>Yuborish</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disabled=true bo'lganda onClick chaqirilmaydi", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Bosish
      </Button>
    );
    fireEvent.click(screen.getByText("Bosish"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});