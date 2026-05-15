import { NextResponse } from "next/server";

export const SYONET_LEAD_URL = "https://syonet.gruposervopa.com.br/api/lead/" as const;

export async function POST(req: Request) {
  const user = process.env.SYONET_LEAD_BASIC_USER;
  const pass = process.env.SYONET_LEAD_BASIC_PASSWORD;

  if (!user?.trim() || !pass) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const authorization = Buffer.from(`${user}:${pass}`, "utf-8").toString("base64");

  const upstream = await fetch(SYONET_LEAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization}`,
    },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: upstream.status });
  }

  return new NextResponse(null, { status: 204 });
}
