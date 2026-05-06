import { getTypes } from "./api";

export async function generateStaticUrls({ debug = false } = {}): Promise<{ page: string[]; locale: string }[]> {
  const allParams: { page: string[]; locale: string }[] = [];
  if (debug) console.log("[generateStaticUrls][DEBUG] start");
  const debugLog: any = {
    endpoints: [],
    fetches: [],
    items: [],
    outputLength: 0
  };

  const typesList = await getTypes();
  if (!typesList || typeof typesList !== "object") {
    if (debug) {
      debugLog.endpoints = [];
      debugLog.fetches.push({
        locale: "n/a",
        type: "types",
        status: "skipped-null-types",
        pageNum: 0
      });
    }
    return allParams;
  }

  const endpoints = Object.values(typesList)
    .filter((t: any) => !!t.icon)
    .filter((t: any) => t.rest_base !== "media")
    .map((t: any) => t.rest_base)
    .sort((a: string, b: string) => (a === "pages" ? -1 : b === "pages" ? 1 : a.localeCompare(b)));

  if (debug) {
    debugLog.endpoints = endpoints;
  }

  for (const type of endpoints) {
    let pageNum = 1;
    let totalPages = 1;

    while (pageNum <= totalPages) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/wp-json/wp/v2/${type}?per_page=10&page=${pageNum}&_fields=link`);
      if (debug) {
        debugLog.fetches.push({
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
        const segments = urlObj.pathname.split("/").filter(Boolean);

        if (segments[0] === "blog") {
          if (debug) {
            debugLog.items.push(
              JSON.parse(
                JSON.stringify({
                  original: item.link,
                  segments,
                  skipped: true,
                  reason: "starts-with-blog"
                })
              )
            );
          }
          return;
        }

        if (debug) {
          debugLog.items.push(
            JSON.parse(
              JSON.stringify({
                original: item.link,
                segments
              })
            )
          );
        }

        allParams.push({
          page: segments,
          locale: ""
        });
      });

      pageNum++;
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
