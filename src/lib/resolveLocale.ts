export async function resolveLocaleFromParams(params: any, { debug = false } = {}) {
  const resolved = await params;

  // normalizar segs
  const segs = Array.isArray(resolved?.page) ? [...resolved.page] : [];
  const defaultLocale = "default";

  const rawSegment = segs[0] || "";
  const locale = defaultLocale;

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
