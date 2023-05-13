import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold">
            Welcome to the <a className="text-lime-500">Chillzone</a>
          </h1>

          <div className="flex flex-row justify-center space-x-4 mt-10">
            <Link href="/session" className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded">
              Start a session
            </Link>
            <Link href="/relax" className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded">
              Relax with sounds
            </Link>
          </div>

          <footer className="mt-10">
            <Link
              href="https://github.com/0xAndrewBlack/szte-pwa-kotprog"
              target="_blank"
              className="text-lime-500 hover:text-lime-600">
              github.com/chillzone
            </Link>
          </footer>
        </main>
      </div>
    </>
  );
}
