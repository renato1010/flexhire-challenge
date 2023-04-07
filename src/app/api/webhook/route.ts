import { NextRequest } from "next/server";
import { flexhireWebHookBodySchema } from "@/utils";

type WebhookSuccessData = {
  event_name: string;
  timestamp: number;
  records: string[];
};
export async function POST(request: NextRequest) {
  let data: WebhookSuccessData;
  const body: { key: string } = await request.json();
  // validate req body based on info from graphql schema
  // .safeParse do not throw, instead return detailed info about validation problem
  const parsedBody = flexhireWebHookBodySchema.safeParse(body);
  // log validation results
  if (!parsedBody.success) {
    // handle errors
    console.log({ errors: parsedBody.error });
  } else {
    data = parsedBody.data;
    console.log({ data: parsedBody.data });
  }
}
