"use client";

import { createContext, useContext, useState } from "react";

type HeaderVariant = "default" | "light";

interface HeaderContextProps {
  variant: HeaderVariant;
  setLightHeader: () => void;
  resetHeader: () => void;
}

const HeaderContext = createContext<HeaderContextProps | null>(null);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [variant, setVariant] = useState<HeaderVariant>("default");

  const setLightHeader = () => setVariant("light");
  const resetHeader = () => setVariant("default");

  return (
    <HeaderContext.Provider
      value={{ variant, setLightHeader, resetHeader }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error("useHeader must be used within HeaderProvider");
  return ctx;
};
