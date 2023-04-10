"use client";

import { useEffect, useState } from "react";
import { useSaveApiKey } from "@/api-layer";

export default function SetKey() {
  const [key, setKey] = useState("");
  // validation error
  const [error, setError] = useState<Record<string, string> | null>(null);
  const { data, status, saveApiKey } = useSaveApiKey(key);

  useEffect(() => {
    if (status === "SUCCESS") {
      setKey("");
    }
  }, [status]);

  const validateKey = () => {
    const KEY_LENGTH_ERROR = "The key must be at least 12 characters long";
    const keyLength = key.length >= 12;
    if (!keyLength) {
      setError({ KEY_LENGTH_ERROR });
    } else {
      setError(null);
    }
  };

  const saveKey = () => {
    validateKey();
    if (error === null) {
      // send key
      saveApiKey();
    }
  };
  return (
    <section className="grid h-screen place-content-center bg-gray-100">
      <div className="mb-10 text-center text-blue-500">
        <h1 className="text-3xl font-bold tracking-widest">Enter FLEXHIRE Key</h1>
        <p>
          <span className="font-bold">This key</span> allows you to <span className="font-bold">check</span>{" "}
          another account data
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div>
          <input
            onChange={(e) => setKey(e.currentTarget.value)}
            value={key}
            type="text"
            name="key"
            placeholder="Enter key"
            autoComplete="off"
            className="w-[450px] h-[30px] text-white text-[1.5rem] font-bold placeholder:text-lg 
            placeholder:text-gray-300 appearance-none rounded-lg border-0 bg-blue-600/50 px-4 py-6 
            focus:bg-blue-800 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
          <p className={`text-center text-red-500 italic text-sm ${error ? "visible" : "invisible"}`}>
            {error ? error["KEY_LENGTH_ERROR"] : ""}
          </p>
        </div>
        <button
          onClick={saveKey}
          className="rounded-lg bg-green-500 px-8 py-3 text-white hover:bg-green-700 font-semibold"
        >
          <span>Set</span> Key
        </button>
      </div>
    </section>
  );
}
