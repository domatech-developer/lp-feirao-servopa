export type FeiraoDealer = {
  label: string;
  id: number;
};

export type FeiraoCityData = {
  label: string;
  marcas: Record<string, FeiraoDealer[]>;
};

export const FEIRAO_FORM_LOCATIONS = {
  curitiba: {
    label: "Curitiba",
    marcas: {
      Audi: [{ label: "Audi Center Alto da XV", id: 43 }],
      BYD: [
        { label: "BYD Servopa", id: 51 },
        { label: "BYD Servopa (Mario Tourinho)", id: 56 },
        { label: "BYD Servopa (Portão)", id: 62 },
      ],
      GAC: [{ label: "GAC Servopa", id: 64 }],
      Honda: [{ label: "Honda Servopa", id: 11 }],
      Hyundai: [
        { label: "Hyundai Servopa (Arthur Bernardes)", id: 44 },
        { label: "Hyundai Servopa (Marechal Floriano)", id: 10 },
      ],
      Volkswagen: [
        { label: "Servopa Marechal", id: 18 },
        { label: "Servopa Mario Tourinho", id: 25 },
        { label: "Servopa Pinheirinho", id: 17 },
        { label: "Servopa Rockfeller", id: 16 },
      ],
      "Harley Davidson": [{ label: "The One Harley Davidson", id: 4 }],
      Triumph: [{ label: "Triumph CWB", id: 46 }],
      Volvo: [{ label: "Volvo Servopa", id: 42 }],
    },
  },
  sao_jose_dos_pinhais: {
    label: "São José dos Pinhais",
    marcas: {
      BYD: [{ label: "BYD Servopa", id: 57 }],
      Honda: [{ label: "Honda Servopa", id: 13 }],
    },
  },
  paranagua: {
    label: "Paranaguá",
    marcas: {
      Volkswagen: [{ label: "Servopa Paranaguá", id: 21 }],
    },
  },
  ponta_grossa: {
    label: "Ponta Grossa",
    marcas: {
      BYD: [{ label: "BYD Servopa", id: 59 }],
      Volkswagen: [{ label: "Servopa Pgo Oficinas", id: 19 }],
    },
  },
  paranavaí: {
    label: "Paranavaí",
    marcas: {
      Volkswagen: [{ label: "Servopa Paranavai", id: 26 }],
    },
  },
  maringa: {
    label: "Maringá",
    marcas: {
      Audi: [{ label: "Audi Center Maringá", id: 49 }],
      BYD: [{ label: "BYD Servopa", id: 55 }],
      GAC: [{ label: "GAC Servopa", id: 66 }],
      Honda: [{ label: "Honda Servopa", id: 14 }],
      Volkswagen: [{ label: "Servopa Maringá", id: 23 }],
    },
  },
  londrina: {
    label: "Londrina",
    marcas: {
      BYD: [{ label: "BYD Servopa", id: 58 }],
      GAC: [{ label: "GAC Servopa", id: 65 }],
      Honda: [{ label: "Honda Servopa", id: 15 }],
      "Harley Davidson": [{ label: "Red Wheel Harley Davidson", id: 3 }],
      Triumph: [{ label: "Triumph North", id: 45 }],
    },
  },
  cascavel: {
    label: "Cascavel",
    marcas: {
      Audi: [{ label: "Audi Center Cascavel", id: 2 }],
      BYD: [{ label: "BYD Servopa", id: 60 }],
      GAC: [{ label: "GAC Servopa", id: 68 }],
      Volvo: [{ label: "Volvo Servopa", id: 48 }],
    },
  },
  umuarama: {
    label: "Umuarama",
    marcas: {
      BYD: [{ label: "BYD Servopa", id: 63 }],
    },
  },
  porto_alegre: {
    label: "Porto Alegre",
    marcas: {
      Hyundai: [{ label: "Hyundai Servopa", id: 29 }],
      Peugeot: [
        { label: "Lyon Edu Chaves", id: 33 },
        { label: "Lyon Ipiranga", id: 35 },
      ],
    },
  },
  bento_goncalves: {
    label: "Bento Gonçalves",
    marcas: {
      Hyundai: [{ label: "Hyundai Servopa", id: 32 }],
    },
  },
  canoas: {
    label: "Canoas",
    marcas: {
      Hyundai: [{ label: "Hyundai Servopa", id: 31 }],
      Peugeot: [{ label: "Lyon Canoas", id: 34 }],
    },
  },
  novo_hamburgo: {
    label: "Novo Hamburgo",
    marcas: {
      Hyundai: [{ label: "Hyundai Servopa", id: 30 }],
      Peugeot: [{ label: "Lyon Novo Hamburgo", id: 36 }],
    },
  },
  ribeirao_preto: {
    label: "Ribeirão Preto",
    marcas: {
      "Harley Davidson": [{ label: "Ribeirão Preto Harley Davidson", id: 47 }],
    },
  },
  cambe: {
    label: "Cambé",
    marcas: {
      VWC: [{ label: "Servopa Caminhões Cambé", id: 8 }],
    },
  },
} as const satisfies Record<string, FeiraoCityData>;

export type FeiraoCityKey = keyof typeof FEIRAO_FORM_LOCATIONS;

export const FEIRAO_CITY_OPTIONS: { key: FeiraoCityKey; label: string }[] = (
  Object.entries(FEIRAO_FORM_LOCATIONS) as [FeiraoCityKey, FeiraoCityData][]
)
  .map(([key, { label }]) => ({ key, label }))
  .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

export function getMarcasForCity(cityKey: string): string[] {
  const city = FEIRAO_FORM_LOCATIONS[cityKey as FeiraoCityKey];
  if (!city) return [];
  return Object.keys(city.marcas).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function getDealersForCityMarca(cityKey: string, marca: string): FeiraoDealer[] {
  const city = FEIRAO_FORM_LOCATIONS[cityKey as FeiraoCityKey];
  if (!city || !marca) return [];
  const dealers = (city.marcas as Record<string, FeiraoDealer[]>)[marca];
  return dealers ?? [];
}

export function getCityLabel(cityKey: string): string {
  return FEIRAO_FORM_LOCATIONS[cityKey as FeiraoCityKey]?.label ?? "";
}
