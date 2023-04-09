const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`;

export default async function Home() {
  const response = await fetch(`${baseUrl}/api/hello`);
  const data = await response.text();
  return (
    <main className="h-full flex flex-col items-center">
      <p className="text-gray-900 text-lg">{data}</p>
      <p className="text-gray-900 text-lg">Vercel URL:{`${baseUrl}/api/hello`}</p>
    </main>
  );
}
