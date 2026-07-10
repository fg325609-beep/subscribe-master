"use client";

import { ReactNode, useEffect, useState } from "react";

export function MSWProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const { worker } = await import("@/mocks/browser");
        await worker.start({ onUnhandledRequest: "bypass" });
      }
      setReady(true);
    };
    init();
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}