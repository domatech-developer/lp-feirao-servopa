import "./Home.scss";
import { FC } from "react";
import MainDefault from "@/components/Main/Main";
import StructureData from "@/components/SEO/StructureData/StructureData";
interface HomeProps {
  data: any;
  locale?: any;
}
const Home: FC<HomeProps> = async ({ data, locale }) => {
  return (
    <MainDefault id="home" {...{ data, locale }}>
      <></>
    </MainDefault>
  );
};

export default Home;
