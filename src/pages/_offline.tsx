import Head from "next/head";

import HomePage from "@/components/HomePage";

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>Chillzone - Offline</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold">
            You are currently <a className="text-red-600">Offline</a>
          </h1>
          <h2 className="text-2xl">When offline, any page route will fallback to this page</h2>

          <HomePage />
        </main>
      </div>
    </>
  );
}
