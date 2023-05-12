import Head from "next/head";

export default function OfflinePage() {
  const quotes = [
    {
      id: 1,
      quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      id: 2,
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      id: 3,
      quote: "If life were predictable it would cease to be life, and be without flavor.",
      author: "Eleanor Roosevelt",
    },
    {
      id: 4,
      quote: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      author: "James Cameron",
    },
    {
      id: 5,
      quote: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      id: 6,
      quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
      author: "Mother Teresa",
    },
    {
      id: 7,
      quote: "When you reach the end of your rope, tie a knot in it and hang on.",
      author: "Franklin D. Roosevelt",
    },
    {
      id: 8,
      quote: "Always remember that you are absolutely unique. Just like everyone else.",
      author: "Margaret Mead",
    },
    {
      id: 9,
      quote: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
      author: "Robert Louis Stevenson",
    },
    {
      id: 10,
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
  ];

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

          <div>
            {quotes.map((quote: any) => (
              <p key={quote.id} className="flex justify-center flex-1 px-20 text-center">
                {quote.quote} ~ {quote.author}
              </p>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
