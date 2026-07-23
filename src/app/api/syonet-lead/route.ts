import { NextResponse } from "next/server";

import type { SyonetLeadPayload } from "@/lib/syonetLead";

const SYONET_LEAD_URL = "https://syonet.gruposervopa.com.br/api/lead/";

const getSyonetCredentials = () => {
  const user = process.env.SYONET_API_USER;
  const password = process.env.SYONET_API_PASSWORD;

  if (!user || !password) {
    throw new Error("SYONET_API_USER e SYONET_API_PASSWORD devem estar definidos.");
  }

  return Buffer.from(`${user}:${password}`).toString("base64");
};

export async function POST(request: Request) {
  let payload: SyonetLeadPayload;

  try {
    payload = (await request.json()) as SyonetLeadPayload;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  let credentials: string;

  try {
    credentials = getSyonetCredentials();
  } catch {
    return NextResponse.json(
      { error: "Credenciais Syonet não configuradas." },
      { status: 500 },
    );
  }

  const response = await fetch(SYONET_LEAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Falha ao enviar lead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
