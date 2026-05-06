export const defaultLang = "default";
export const locales = [defaultLang] as const;

export type Locale = (typeof locales)[number];

export function Locale(locale?: string): Locale {
  return locale === defaultLang ? defaultLang : defaultLang;
}
