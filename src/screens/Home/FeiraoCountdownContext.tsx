"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getFeiraoCountdown, type FeiraoCountdownParts } from "@/lib/feiraoCountdown";

const FeiraoCountdownContext = createContext<FeiraoCountdownParts | null>(null);

const EMPTY_PARTS: FeiraoCountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function FeiraoCountdownProvider({ children }: { children: ReactNode }) {
  /** Estado estável SSR + 1ª hidratação; valores reais só após montagem no cliente */
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
