import "server-only";
import { Kafka } from "@upstash/kafka";

const kafkaUrl = process.env.KAFKA_URL!;
const kafkaTopic = process.env.KAFKA_TOPIC!
const kafkaUser = process.env.KAFKA_USERNAME;
const kafkaPass = process.env.KAFKA_PASSWORD;

if (!kafkaUrl || !kafkaUser || !kafkaPass) {
  throw Error("Kafka env vars not loaded");
}

const kafka = new Kafka({
  url: kafkaUrl,
  username: kafkaUser,
  password: kafkaPass,
});

const kafkaProducer = kafka.producer();
const kafkaConsumer = kafka.consumer();
const auth = Buffer.from(`${kafkaUser}:${kafkaPass}`).toString("base64");

export { kafkaProducer, kafkaConsumer, auth, kafkaUrl, kafkaTopic };
export * from "./types";
