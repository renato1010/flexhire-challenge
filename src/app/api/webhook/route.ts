import { NextRequest, NextResponse } from "next/server";
import { flexhireWebHookBodySchema } from "@/utils";
import { WebhookEventData, kafkaProducer, kafkaTopic } from "@/kafka";

export async function POST(request: NextRequest) {
  let data: WebhookEventData;
  const body: WebhookEventData = await request.json();
  // validate req body based on info from graphql schema
  // .safeParse do not throw, instead return detailed info about validation problem
  const parsedBody = flexhireWebHookBodySchema.safeParse(body);
  // log validation results
  if (!parsedBody.success) {
    // handle errors
  } else {
    data = parsedBody.data;
    const flexhireWebHookMessage = data;
    try {
      const response = await kafkaProducer.produce(
        kafkaTopic,
        { ...flexhireWebHookMessage },
        { key: "hookEvents" }
      );
      return NextResponse.json({ ok: true, status: 200 });
    } catch (error) {
      return NextResponse.json({ ok: false, status: 500 });
    }
  }
}
