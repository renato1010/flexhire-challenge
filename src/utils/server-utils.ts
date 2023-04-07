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

export const isOneHourFresh = (createdAt: Date | undefined): boolean => {
  if (!createdAt) return false;
  const savedAt = new Date(createdAt);
  return Date.now() - savedAt.getTime() <= 3600;
};
