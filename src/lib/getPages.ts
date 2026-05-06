import { cache } from "react";
import getMapId from "./getMapId";
import clearUrl from "@/utils/clearUrl";

// Revalidate vindo do .env
const REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 3600);

const getPages = cache(
  async ({
    link,
    locale,
    debug = false,
    ...params
  }: {
    link: string[];
    locale?: string;
    debug?: boolean;
    [key: string]: any;
  }) => {
    const debugLog: any = {
      input: { link, locale, params },
      resolved: {
        clean: null,
        haveLang: null,
        url: null,
        targetSegment: null
      },
      finalData: null,
      size: null,
      revalidateSeconds: REVALIDATE
    };

    // Normalização da URL
    const { clean, haveLang, url } = clearUrl(link);

    debugLog.resolved.clean = clean;
    debugLog.resolved.haveLang = haveLang;
    debugLog.resolved.url = url?.href;

    const targetSegment = clean?.[haveLang ? 1 : 0] || "";
    debugLog.resolved.targetSegment = targetSegment;

    try {
      // Busca as páginas do WP
      const pages = await getMapId({
        type: "page",
        locale,
        ...params
      });

      if (!Array.isArray(pages)) {
        if (debug) {
          const json = JSON.stringify(null);
          const bytes = new TextEncoder().encode(json).length;
          debugLog.size = Number(bytes / 1024).toFixed(2);
          debugLog.revalidateSeconds = REVALIDATE;
          console.groupCollapsed("[getPages][DEBUG] SUMMARY");
          console.dir(debugLog, { depth: null });
          console.groupEnd();
        }
        return null;
      }

      const currentPath = url?.pathname.replace(/\/+$/, "") || "/";

      // Match exato pelo pathname
      let page =
        pages.find((p: any) => {
          try {
            const pageUrl = new URL(p.link);
            const pagePath = pageUrl.pathname.replace(/\/+$/, "") || "/";
            return pagePath === currentPath;
          } catch {
            return false;
          }
        }) || null;

      // Fallback category/page
      if (!page) {
        page =
          pages.find((p: any) => {
            try {
              const pageUrl = new URL(p.link);
              return pageUrl.pathname.includes("category") && pageUrl.pathname.includes(targetSegment);
            } catch {
              return false;
            }
          }) || null;
      }

      const json = JSON.stringify(page || {});
      const bytes = new TextEncoder().encode(json).length;
      debugLog.size = `${Number(bytes / 1024).toFixed(2)} KB`;
      debugLog.revalidateSeconds = REVALIDATE;
      debugLog.finalData = page || null;

      if (debug) {
        console.groupCollapsed("[getPages][DEBUG] SUMMARY");
        console.dir(debugLog, { depth: null });
        console.groupEnd();
      }

      return page || null;
    } catch (error: any) {
      console.log("[getPages][CATCH]:", error.message);
      return null;
    }
  }
);

export default getPages;
