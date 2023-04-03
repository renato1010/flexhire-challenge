import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils";

export async function POST(request: NextRequest) {
  try {
    const body: { key: string } = await request.json();
    console.log({ body });
    return new NextResponse(JSON.stringify({ data: body }), {
      status: 200,
      headers: { "Set-Cookie": `flexhireKey=${body.key}; Max-Age=3600; Secure; HttpOnly` },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ ok: false, message });
  }
}
