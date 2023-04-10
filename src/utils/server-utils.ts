import { number, string, z } from "zod";

export const navBarPropsSchema = z.object({ avatarUrl: z.string(), name: z.string() });
export const leftSidePropsSchema = z.object({ textIntroduction: z.string(), createdAt: z.string() });
export const skillsPropsSchema = z
  .object({ experience: number(), skill: z.object({ name: string() }) })
  .array();

export const answersPropsSchema = z
  .object({
    optimizedUrl: z.string(),
    question: z.object({ title: string() }),
  })
  .array();

export const flexhireWebHookBodySchema = z.object({
  event_name: z.string(),
  timestamp: z.number(),
  records: string().array(),
});

const toTimeStamp = (strDate: string) => {
  const dt = new Date(strDate).getTime();
  return dt / 1000;
};
export const isOneHourFresh = (updatedAt: number | Date | string | undefined | null): boolean => {
  if (!updatedAt) return false;
  if (typeof updatedAt === "number") {
    const updated = updatedAt;
    const now = Date.now();
    return now - updated <= 3600_000;
  } else if (typeof updatedAt === "string") {
    return Date.now() - new Date(updatedAt).getTime() <= 3600_000;
  } else {
    return Date.now() - updatedAt.getTime() <= 3600_000;
  }
};
