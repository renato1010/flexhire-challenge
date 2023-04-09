import { getErrorMessage } from "@/utils";

export type TErrorResponse = { ok: false; status: number; message: string };
async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse | TErrorResponse> {
  let response: Response | undefined = undefined;
  try {
    response = await fetch(url, config);
    return await response.json() as TResponse;
  } catch (error) {
    const message = getErrorMessage(error);
    const status: number = response?.status ?? 400;
    return { ok: false, status, message };
  }
}

export { request };
