import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
type FlexhireData = { key: string; updatedAt: number };

export { redis, type FlexhireData };
