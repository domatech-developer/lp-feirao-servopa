import { cache } from "react";
import { fetchWrapper } from "@/config/api";

const REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 3600);

export const getGeneral = cache(async function getGeneralCached({
  locale,
  debug = false
}: { locale?: string; debug?: boolean } = {}) {
  try {
    const debugLog: any = {
      inputLocale: locale || null,
      resolvedLocale: locale || null,
      finalData: null,
      size: null, // <-- igual getPages
      revalidateSeconds: REVALIDATE
    };

    const resp = await fetchWrapper(
      `/acf/v3/options/option?acf_format=standard`,
      {
        next: { revalidate: REVALIDATE, tags: ["layout"] }
      },
      3,
      20000,
      2000,
      false,
      locale as any
    );

    const finalData = resp?.acf || null;
    debugLog.finalData = finalData;

    // calcular tamanho do JSON
    if (finalData) {
      const json = JSON.stringify(finalData);
      const bytes = new TextEncoder().encode(json).length;
      debugLog.size = `${Number(bytes / 1024).toFixed(2)} KB`;
    } else {
      debugLog.size = "0.00 KB";
    }

    if (debug) {
      console.groupCollapsed("[getGeneral][DEBUG] SUMMARY");
      console.dir(debugLog, { depth: null });
      console.groupEnd();
    }

    return finalData;
  } catch (error: any) {
    console.log("[getGeneral][CATCH]: ", error.message);
  }
});
