import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("qiymatni belgilangan vaqtdan keyin yangilaydi", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: "a" },
    });

    expect(result.current).toBe("a");

    rerender({ value: "ab" });
    // Vaqt o'tmaguncha eski qiymat qoladi
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe("ab");
  });
});