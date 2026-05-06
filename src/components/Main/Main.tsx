"use client";
import { FC, ReactNode } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import StructureData from "../SEO/StructureData/StructureData";
import H1Hidden from "../SEO/H1Hidden/H1Hidden";

const MainDefault: FC<{ id: string; children: ReactNode; data?: any }> = ({ id, children, data }) => {
  useActiveSection("section", "isElementInitialVisible", "active");
  return (
    <main id={id}>
      <>
        <StructureData data={data?.acf?.metaDados} />
        <H1Hidden data={data?.acf?.seo?.title} />
        {children}
      </>
    </main>
  );
};

export default MainDefault;
