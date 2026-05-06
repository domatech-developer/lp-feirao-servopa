import "./not-found.scss";
import { Metadata } from "next";
interface NotFoundProps {
  data: any;
  locale?: any;
}

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você está procurando não foi encontrada. Verifique o URL ou volte para a página inicial."
};

export default async function NotFound({ data, locale }: NotFoundProps) {
  if (!data || !data?.section_check) return null;

  const titleCat = "/";
  const breadcrumb = [{ name: "404", url: titleCat }];
  return (
    <div className="notFound" id="not-found">
      <h1>Página não encontrada </h1>
    </div>
  );
}
