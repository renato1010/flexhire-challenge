import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils";
import { redis, FlexhireData } from "@/db/redis";

export async function POST(request: NextRequest) {
  try {
    const body: { key: string } = await request.json();
    const key = body.key;
    const data = { data: { key, updatedAt: Date.now() } };
    await redis.hset(process.env.REDIS_HSET_KEY_NAME!, {
      key,
    });
    await redis.hset(process.env.REDIS_HSET_KEY_NAME!, {
      updatedAt: Date.now(),
    });
    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ ok: false, message });
  }
}
