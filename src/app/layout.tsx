import "@/scss/main.scss";
import QueryProvider from "@/provider/QueryProvider/QueryProvider";
import { GoogleTagManager } from "@next/third-parties/google";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-Br">
      <body>
        <GoogleTagManager gtmId="GTM-TMV4DB7V" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
