export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold">
            Welcome to the <a className="text-lime-600">Chillzone</a>
          </h1>

          <div className="flex flex-row justify-center space-x-4 mt-10">
            <a href="/session" className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
              Start a session
            </a>
            <a href="/relax" className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
              Relax with sounds
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
