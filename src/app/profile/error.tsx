"use client";
import { useEffect } from "react";
// import { useRouter } from "next/router";

export default function Error({ error }: { error: Error; reset: () => void }) {
  // const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const reload = () => {
    window?.location.reload();
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-200">
      <h2 className="px-6 py-4 text-red-800 bg-red-200 rounded-lg text-[1.5rem]">
        Something went wrong when fetching Profile data ❌
      </h2>
      <button
        className="w-max mt-10 px-4 py-3 bg-gray-300 rounded-lg border-gray-500 text-black text-lg"
        onClick={
          // Attempt to recover by trying to re-render the segment
          reload
        }
      >
        Try again
      </button>
    </div>
  );
}
