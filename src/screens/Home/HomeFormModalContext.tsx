"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HomeFormModalContextValue = {
  openFeiraoFormModal: () => void;
  closeFeiraoFormModal: () => void;
  isFeiraoFormModalOpen: boolean;
};

const HomeFormModalContext = createContext<HomeFormModalContextValue | null>(null);

export function HomeFormModalProvider({ children }: { children: ReactNode }) {
  const [isFeiraoFormModalOpen, setOpen] = useState(false);

  const openFeiraoFormModal = useCallback(() => setOpen(true), []);
  const closeFeiraoFormModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      openFeiraoFormModal,
      closeFeiraoFormModal,
      isFeiraoFormModalOpen,
    }),
    [closeFeiraoFormModal, isFeiraoFormModalOpen, openFeiraoFormModal]
  );

  return <HomeFormModalContext.Provider value={value}>{children}</HomeFormModalContext.Provider>;
}

export function useHomeFormModal() {
  const ctx = useContext(HomeFormModalContext);
  if (!ctx) {
    throw new Error("useHomeFormModal must be used within HomeFormModalProvider");
  }
  return ctx;
}
