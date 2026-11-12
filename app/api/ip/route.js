import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const token = process.env.IPINFO_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "IP lookup service is not configured." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);
  const ip = searchParams.get("ip");
  const target = ip ? encodeURIComponent(ip.trim()) : "";

  try {
    const response = await fetch(`https://ipinfo.io/${target}?token=${token}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch IP details right now." },
      { status: 502 }
    );
  }
}
