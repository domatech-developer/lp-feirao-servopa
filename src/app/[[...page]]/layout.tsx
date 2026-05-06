import { getGeneral } from "@/lib/GetGeneral";
import { resolveLocaleFromParams } from "@/lib/resolveLocale";

export default async function Layout({ children, params }: any) {
  const { locale } = await resolveLocaleFromParams(params);
  if (locale) {
    await getGeneral({ locale });
  }

  return <>{children}</>;
}
