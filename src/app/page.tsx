import { baseUrl } from "@/utils";

export default async function Home() {
  const response = await fetch(`${baseUrl}/api/hello`);
  const text = await response.text();
  return (
    <main className="h-full flex flex-col items-center">
      <p className="text-gray-900 text-lg">{text}</p>
      <p className="text-gray-900 text-lg">Vercel URL:{baseUrl}</p>
    </main>
  );
}
