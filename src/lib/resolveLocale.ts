export async function resolveLocaleFromParams(params: any, { debug = false } = {}) {
  const resolved = await params;

  // normalizar segs
  const segs = Array.isArray(resolved?.page) ? [...resolved.page] : [];

  // fallback para "/"
  if (segs.length === 0) {
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "pt-br";
    segs.push(defaultLocale);
  }

  const rawSegment = segs[0] || "";

  const validLocales = (process.env.NEXT_PUBLIC_OTHER_LOCALES || "")
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

  const locale = validLocales.includes(rawSegment) ? rawSegment : "";

  if (debug) {
    const debugLog: any = {
      inputParams: resolved || null,
      segs,
      rawSegment,
      locale
    };
    console.groupCollapsed("[resolveLocale][DEBUG] SUMMARY");
    console.dir(debugLog, { depth: null });
    console.groupEnd();
  }

  return { segs, rawSegment, locale };
}
