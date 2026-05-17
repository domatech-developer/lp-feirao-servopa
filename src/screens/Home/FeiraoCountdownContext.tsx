"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getFeiraoCountdown, type FeiraoCountdownParts } from "@/lib/feiraoCountdown";

const EMPTY_PARTS: FeiraoCountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const FeiraoCountdownContext = createContext<FeiraoCountdownParts | null>(null);

export function FeiraoCountdownProvider({ children }: { children: ReactNode }) {
  const [parts, setParts] = useState<FeiraoCountdownParts>(EMPTY_PARTS);

  useEffect(() => {
    const tick = () => setParts(getFeiraoCountdown(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <FeiraoCountdownContext.Provider value={parts}>{children}</FeiraoCountdownContext.Provider>
  );
}

export function useFeiraoCountdown(): FeiraoCountdownParts {
  const ctx = useContext(FeiraoCountdownContext);
  if (!ctx) {
    throw new Error("useFeiraoCountdown must be used within FeiraoCountdownProvider");
  }
  return ctx;
}
