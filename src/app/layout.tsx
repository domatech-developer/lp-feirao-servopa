import "@/scss/main.scss";
import QueryProvider from "@/provider/QueryProvider/QueryProvider";
import { generateStaticUrls } from "@/config/generateStaticUrls";

export async function generateStaticParams() {
  const urls = await generateStaticUrls();
  return urls;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-Br">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
