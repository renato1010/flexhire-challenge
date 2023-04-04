import { useState } from "react";
import { NextResponse } from "next/server";
import { ApiStatus, hasError, api } from "../";
import { baseUrl } from "@/utils";

type SetKeyBody = { key: string };
type TResponse = NextResponse & { data: SetKeyBody; ok: boolean };
const useSaveApiKey = (key: string) => {
  const [status, setStatus] = useState<ApiStatus>("IDLE");
  const [data, setData] = useState<SetKeyBody | undefined>(undefined);

  console.log({ baseUrl });
  const saveApiKey = async () => {
    setStatus("PENDING");
    try {
      const respose = await api.post<SetKeyBody, TResponse>(`${baseUrl}/api/keys`, { key });
      if (hasError<TResponse>(respose)) {
        setStatus("ERROR");
      } else {
        setData(respose.data);
        setStatus("SUCCESS");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return { data, status, saveApiKey };
};

export { useSaveApiKey };
