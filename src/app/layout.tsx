import "@/scss/main.scss";
import QueryProvider from "@/provider/QueryProvider/QueryProvider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-Br">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
