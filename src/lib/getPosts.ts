import { cache } from "react";
import { getTypes } from "@/config/api";
import clearUrl from "@/utils/clearUrl";
import getMapId from "./getMapId";

const REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 3600);

const getPosts = cache(
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
      input: {
        link,
        locale,
        params
      },
      resolved: {
        clean: null,
        haveLang: null,
        slug: null,
        baseSegment: null,
        rest_base: null
      },
      finalData: null,
      size: null,
      revalidateSeconds: REVALIDATE
    };

    const { clean, haveLang } = clearUrl(link);

    debugLog.resolved.clean = clean;
    debugLog.resolved.haveLang = haveLang;

    const slug = clean?.[clean.length - 1] || "";
    debugLog.resolved.slug = slug;

    if (!slug) {
      if (debug) {
        console.groupCollapsed("[getPosts][DEBUG] SUMMARY");
        console.dir(debugLog, { depth: null });
        console.groupEnd();
      }
      return null;
    }

    let type: any = { rest_base: "" };
    const baseIndex = haveLang ? 1 : 0;
    const baseSegment = clean?.[baseIndex];
    debugLog.resolved.baseSegment = baseSegment;

    if (baseSegment === "blog") {
      type.rest_base = "post";
    } else {
      const types = await getTypes();
      type = Object.values(types)?.find((item: any) => item.has_archive === baseSegment) || { rest_base: "" };
    }

    debugLog.resolved.rest_base = type.rest_base;

    try {
      const post = await getMapId({
        type: type.rest_base || "post",
        locale,
        slug,
        ...params
      });

      const finalData = post?.[0] || null;
      debugLog.finalData = finalData;

      // tamanho aproximado da resposta em KB (para debug)
      if (finalData) {
        const json = JSON.stringify(finalData);
        const bytes = new TextEncoder().encode(json).length;
        debugLog.size = `${Number(bytes / 1024).toFixed(2)} KB`;
      } else {
        debugLog.size = "0.00 KB";
      }

      if (debug) {
        console.groupCollapsed("[getPosts][DEBUG] SUMMARY");
        console.dir(debugLog, { depth: null });
        console.groupEnd();
      }

      return finalData;
    } catch (error: any) {
      console.log("[getPosts][CATCH]:", error.message);
      return null;
    }
  }
);

export default getPosts;
