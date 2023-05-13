import Link from "next/link";

import { useEffect, useRef, useState } from "react";

export default function Relax({ quotes }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [randomQuote, setRandomQuote] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();

      setIsPlaying(true);
    } else {
      audioRef.current?.pause();

      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);

      return quotes[randomIndex];
    };

    setRandomQuote(getRandomQuote());

    const interval = setInterval(() => {
      setRandomQuote(getRandomQuote());
    }, 10_000);

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <audio ref={audioRef} src="/static/music/ambiance.mp3" />

          <button className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full" onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"} ambiance
          </button>

          {/* <audio ref={audioRef} src="/static/music/ambiance.mp3" /> */}
          {/* <button onClick={togglePlay}>{audioRef.current && audioRef.current.paused ? "Play" : "Pause"}</button> */}

          <div className="mt-20">
            {randomQuote && (
              <p className="flex justify-center flex-1 px-20 text-center">
                {randomQuote.quote} ~ {randomQuote.author}
              </p>
            )}
          </div>
          <div className="mt-10">
            <Link href="/" className="start-btn bg-lime-500 hover:bg-lime-600 text-white rounded px-4 py-2 mt-10">
              Home
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
