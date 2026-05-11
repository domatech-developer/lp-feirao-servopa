/**
 * Alvo único para o countdown do Feirão (hero + barra sticky).
 * Defina `NEXT_PUBLIC_FEIRAO_END` (ISO 8601) para produção — ex.: 2026-06-03T23:59:59-03:00
 */
export const FEIRAO_COUNTDOWN_END_MS = (() => {
  const env = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_FEIRAO_END : undefined;
  if (env) {
    const t = Date.parse(env);
    if (!Number.isNaN(t)) {
      return t;
    }
  }
  return Date.parse("2026-06-03T23:59:59-03:00");
})();

export type FeiraoCountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getFeiraoCountdown(nowMs: number): FeiraoCountdownParts {
  const diff = Math.max(0, FEIRAO_COUNTDOWN_END_MS - nowMs);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
