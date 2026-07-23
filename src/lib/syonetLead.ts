const DEFAULT_PHONE_TYPE = "RESIDENCIAL" as const;

export type SyonetPhonePayload =
  | {
      ddi: number;
      ddd: number;
      numero: number;
      tipo: string;
    }
  | {
      e164Number: string;
    };

/**
 * Campos em `leadInfo["Dados do Lead"]`.
 * Boolean apenas em `Deseja fazer test drive`; demais chaves são string (inclui horário formatado em pt-BR).
 */
export type SyonetLeadDadosDoLead = {
  "Cidade de atendimento": string;
  "Marca de interesse": string;
  Concessionária: string;
  Unidade: string;
  "Deseja fazer test drive": boolean;
  "Horário de test drive": string;
  Interesse: string;
};

export type SyonetLeadPayload = {
  customer: {
    name: string;
    emails: string[];
    phones: SyonetPhonePayload[];
  };
  event: {
    companyId: number;
    eventGroup: string;
    eventType: string;
    source: string;
    media: string;
    comment: string;
    leadInfo: {
      "Dados do Lead": SyonetLeadDadosDoLead;
    };
  };
};

export const buildPhoneData = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  const numberWithoutCountryCode = digits.startsWith("55") ? digits.slice(2) : digits;
  const ddd = Number(numberWithoutCountryCode.slice(0, 2)) || 0;
  const numero = Number(numberWithoutCountryCode.slice(2)) || 0;

  return {
    ddd,
    numero,
    e164Number: `+55${numberWithoutCountryCode}`,
  };
};

export const buildSyonetPhones = (phone: string): SyonetPhonePayload[] => {
  const phoneData = buildPhoneData(phone);

  return [
    {
      ddi: 55,
      ddd: phoneData.ddd,
      numero: phoneData.numero,
      tipo: DEFAULT_PHONE_TYPE,
    },
    {
      e164Number: phoneData.e164Number,
    },
    {
      e164Number: phoneData.e164Number,
    },
  ];
};

export async function submitSyonetLead(payload: SyonetLeadPayload): Promise<void> {
  const response = await fetch("/api/syonet-lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar lead.");
  }
}
