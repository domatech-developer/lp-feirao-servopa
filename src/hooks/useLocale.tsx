"use client";
import { Locale } from "@/locales/locales";

const DEFAULT_LOCALE = "default" as Locale;

export default function useLocale(): Locale {
  return DEFAULT_LOCALE;
}
