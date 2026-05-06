import { getTypes } from "./api";

export async function generateStaticUrls({ debug = false } = {}): Promise<{ page: string[]; locale: string }[]> {
  const allParams: { page: string[]; locale: string }[] = [];
  if (debug) console.log("[generateStaticUrls][DEBUG] start");
  const debugLog: any = {
    locales: [],
    endpoints: [],
    fetches: [],
    items: [],
    outputLength: 0
  };

  // --- Validação via .env ONLY other_locales ---
  const rawLocales = process.env.NEXT_PUBLIC_OTHER_LOCALES || "";
  const validLocales = rawLocales
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

  if (debug) {
    debugLog.locales = validLocales;
  }

  function isValidLocale(locale: string) {
    return validLocales.includes(locale);
  }

  const typesList: any[] = await getTypes();
  const endpoints = Object.values(typesList)
    .filter((t: any) => !!t.icon)
    .filter((t: any) => t.rest_base !== "media")
    .map((t: any) => t.rest_base)
    .sort((a: string, b: string) => (a === "pages" ? -1 : b === "pages" ? 1 : a.localeCompare(b)));

  if (debug) {
    debugLog.endpoints = endpoints;
  }

  // Vamos iterar SOMENTE pelos locales válidos do env
  for (const lang of validLocales) {
    if (debug) console.log("[generateStaticUrls][DEBUG] processing locale:", lang);
    const langPrefix = `/${lang}`;

    for (const type of endpoints) {
      let pageNum = 1;
      let totalPages = 1;

      while (pageNum <= totalPages) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}${langPrefix}/wp-json/wp/v2/${type}?per_page=10&page=${pageNum}&_fields=link`
        );
        if (debug) {
          debugLog.fetches.push({
            locale: lang,
            type,
            status: res.status,
            pageNum
          });
        }

        if (!res.ok) console.log(`Fetch ${type} failed: ${res.status}`);

        totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
        const items: any[] = await res.json();

        items.forEach((item) => {
          const urlObj = new URL(item.link);
          let segments = urlObj.pathname.split("/").filter(Boolean);

          // Detectar locale
          let detectedLocale = "";
          if (segments.length && isValidLocale(segments[0])) {
            detectedLocale = segments[0];
            segments = segments.slice(1);
          }

          // Ignorar TUDO que começa com "blog"
          if (segments[0] === "blog") {
            if (debug) {
              debugLog.items.push(
                JSON.parse(
                  JSON.stringify({
                    original: item.link,
                    detectedLocale,
                    segments,
                    skipped: true,
                    reason: "starts-with-blog"
                  })
                )
              );
            }
            return; // pula
          }

          // Opcional: debug
          if (debug) {
            debugLog.items.push(
              JSON.parse(
                JSON.stringify({
                  original: item.link,
                  detectedLocale,
                  segments
                })
              )
            );
          }

          allParams.push({
            page: segments,
            locale: detectedLocale
          });
        });

        pageNum++;
      }
    }
  }

  if (debug) {
    const json = JSON.stringify(allParams);
    const bytes = new TextEncoder().encode(json).length;
    const sizeKB = Number(bytes / 1024).toFixed(2);
    debugLog.outputLength = allParams.length;
    debugLog.outputSizeKB = `${sizeKB} KB`;
  }

  if (debug) {
    console.log("[generateStaticUrls][DEBUG] SUMMARY:");
    console.dir(debugLog, { depth: null });
  }

  return allParams;
}
