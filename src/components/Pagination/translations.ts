export const paginationTranslations = {
  default: {
    label: "Página",
    current: "Página atual",
    init: "Página inicial",
    prev: "Página anterior",
    next: "Proxima página",
    end: "Ultima página"
  }
} as const;

export type PaginationTranslation = typeof paginationTranslations;
