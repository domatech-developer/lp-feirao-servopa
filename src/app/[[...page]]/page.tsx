// Página dinâmica responsável por resolver rotas, idioma e template correto.
// Aqui ocorre a busca de posts/páginas e o render do componente correspondente.
import getPages from "@/lib/getPages";
import getPosts from "@/lib/getPosts";
import { resolveLocaleFromParams } from "@/lib/resolveLocale";
import { templatesMap } from "@/config/templatesMap";
import { getGeneral } from "@/lib/GetGeneral";
import NotFound from "../not-found";

function isBlogRoute(segs: string[]) {
  return segs && segs.length > 0 && segs[0] === "blog";
}

// ---------------------------------------------
// METADADOS DA PÁGINA
// Busca os dados do post/página para montar title e description.
// ---------------------------------------------
export async function generateMetadata({ params }: { params: any }) {
  // Extrai segmentos da URL e detecta o locale.
  const { segs, locale } = await resolveLocaleFromParams(params);

  const isBlog = segs[1] === "blog" && segs.length > 3;
  const data = isBlog ? await getPosts({ link: segs, locale }) : await getPages({ link: segs, locale });

  // Se nada foi encontrado, retornamos metadados de fallback.
  if (!data) {
    return {
      title: "Página não encontrada",
      description: ""
    };
  }

  return {
    title: data?.acf?.seo?.title || data.title?.rendered || "",
    description: data?.acf?.seo?.description || ""
  };
}

// ---------------------------------------------
// COMPONENTE PRINCIPAL DA ROTA
// Resolve locale, busca dados e define qual template/renderizar.
// ---------------------------------------------
export default async function Page({ params }: { params: any }) {
  // Novamente obtemos segmentos e o idioma.
  const { segs, locale } = await resolveLocaleFromParams(params);
  const isBlog = segs[1] === "blog" && segs.length > 3;

  // Executa em paralelo: getPosts ou getPages + getGeneral
  const [data, generalData] = await Promise.all([
    isBlog ? getPosts({ link: segs, locale }) : getPages({ link: segs, locale }),
    getGeneral({ locale })
  ]);

  const Component = data?.template ? templatesMap[data.template] : null;

  const headerThemes = data?.acf?.seo?.menu_themes || "light_1";
  const menuCheck = headerThemes !== "no_data";

  const footerThemes = data?.acf?.seo?.footer_themes || "light_1";
  const footerCheck = footerThemes !== "no_data";

  return (
    <>
      {/* header */}
      {data && Component ? <Component data={data} {...{ locale }} /> : <NotFound data={generalData?.p404} {...{ locale }} />}
      {/* footer */}
    </>
  );
}
