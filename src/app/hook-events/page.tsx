import { type Message } from "@upstash/kafka";
import { WebhookEventData, auth, kafkaUrl, kafkaTopic } from "@/kafka";
import { ReloadButton } from "./reload-button";

export const revalidate = 10;
export default async function HookEvents() {
  let eventList: WebhookEventData[] = [];

  // fetch messages from upstash kafka topic
  async function fetchTopic(topic: string, partition: number = 0, offset: number = 0) {
    const request = {
      topic: topic,
      partition: partition,
      offset: offset,
    };
    const response = await fetch(`${kafkaUrl}/fetch/`, {
      headers: { Authorization: `Basic ${auth}` },
      method: "POST",
      body: JSON.stringify(request),
      cache: "reload",
    });
    const messages = (await response.json()) as Message[];
    console.log({ messages });
    if (messages?.length) {
      messages.forEach((m) => {
        console.log(`Message: ${m.value}, Offset: ${m.offset}`);
        const data = JSON.parse(m.value) as WebhookEventData;
        console.log({ data });
        eventList = [...eventList, data];
      });
    }
  }

  await fetchTopic(kafkaTopic, 0, 0);

  if (!eventList.length) {
    return (
      <div className="container mx-auto h-screen grid content-center">
        <div className="w-1/2 mx-auto">
          <div className="bg-red-200 border border-pink-300 rounded-sm">
            <p className="text-center">No data available now</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto h-screen grid content-center">
      <div className="w-1/2 mx-auto">
        <div className="p-2 bg-slate-200 border border-green-200">
          {eventList?.map(({ event_name, records, timestamp }, idx) => (
            <div key={`${timestamp}${idx}`}>
              <p>
                Event: <span className="font-bold">{event_name}</span>
              </p>
              <p>Records:</p>
              <ul className="px-4">
                {records?.map((r) => (
                  <li key={r}>
                    {r}:{timestamp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ReloadButton />
      </div>
    </div>
  );
}
