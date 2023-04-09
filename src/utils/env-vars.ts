export const flexhireBaseUrl = process.env.FLEXHIRE_API_BASE_URL;
export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL!
    : `https://${process.env.VERCEL_URL!}`;
export const flexhireApiKey = process.env.FLEXHIRE_API_KEY;
