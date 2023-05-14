import { Quote } from "@/types";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { interval } from "rxjs";
import { take } from "rxjs/operators";

export default function Relax({ quotes }: { quotes: Quote[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [randomQuote, setRandomQuote] = useState<Quote>(null as unknown as Quote);

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

    const interval$ = interval(10000).pipe(take(quotes.length));

    const subscription = interval$.subscribe(() => {
      setRandomQuote(getRandomQuote());
    });

    return () => subscription.unsubscribe();
  }, [quotes]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <audio ref={audioRef} src="/static/music/ambiance.mp3" />

          <button
            className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 mb-10 rounded-full"
            onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"} ambiance
          </button>

          <div className="mt-10 mb-10">
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
