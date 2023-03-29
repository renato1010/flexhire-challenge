export default async function Home() {
  const baseUrl = process.env.BASE_URL;
  const response = await fetch(`${baseUrl}/api/hello`);
  const text = await response.text();
  return (
    <main className="h-full flex flex-col items-center">
      <p className="text-gray-900 text-lg">{text}</p>
    </main>
  );
}
