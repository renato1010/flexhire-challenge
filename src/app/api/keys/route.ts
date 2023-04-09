import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils";
import datastore from "@/db/datastore";
import { v4 as uuidv4 } from "uuid";
import { Keys } from "@/db/types";

export async function POST(request: NextRequest) {
  try {
    const body: { key: string } = await request.json();
    const key = body.key;
    let update: number[] | undefined;
    let insert: number[] | undefined;
    // always rewrite the saved key
    const queryKeys = await datastore<Keys>("keys").select("id").orderBy("updatedAt", "desc").limit(1);
    const keyId: Pick<Keys, "id"> | undefined = queryKeys[0];
    if (keyId == undefined) {
      insert = await datastore<Keys>("keys").insert({ value: key, id: uuidv4() });
    } else {
      update = await datastore<Keys>("keys")
        .where("id", "=", keyId.id)
        .update({ value: key, updatedAt: new Date() });
    }
    return new NextResponse(JSON.stringify({ data: { updatedId: update, insertedId: insert } }), {
      status: 200,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ ok: false, message });
  }
}
