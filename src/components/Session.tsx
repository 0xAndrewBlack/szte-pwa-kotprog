import Link from "next/link";
import { useEffect, useState } from "react";

import { timer } from "rxjs";
import { map, take } from "rxjs/operators";

export default function Session() {
  const [displayTime, setDisplayTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState(1);

  const [error, setError] = useState(false);
  const [sessionState, setSessionState] = useState("inactive");

  const [counterId, setCounterId] = useState<NodeJS.Timer[]>([]);
  const [counterRef, setCounterRef] = useState<NodeJS.Timer>();

  const startCounter = (duration: number) => {
    setDisplayTime(`0${sessionDuration}:00`);

    const timer$ = timer(0, 1000).pipe(
      take(duration * 60),
      map((tick) => duration * 60 - tick - 1),
    );

    const subscription = timer$.subscribe((timer) => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      setDisplayTime(`${formattedMinutes}:${formattedSeconds}`);

      if (timer === 0) {
        subscription.unsubscribe();
        setSessionState("completed");
      }
    });
  };

  useEffect(() => {
    const handleMovement = () => {
      if (sessionState === "active") {
        location.reload();

        setError(true);

        counterId.forEach((counter) => {
          console.log("clearing", counter);

          clearInterval(counter);
        });

        startCounter(sessionDuration);

        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    };

    const handleTabChange = () => {
      console.log("tab changed");

      handleMovement();
    };

    window.addEventListener("mousemove", handleMovement);
    window.addEventListener("focus", handleTabChange);

    return () => {
      window.removeEventListener("mousemove", handleMovement);
      window.removeEventListener("focus", handleTabChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterId, displayTime, sessionDuration, sessionState]);

  const startSession = () => {
    setSessionState("active");
    startCounter(sessionDuration);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <div className="main">
            <h1 className="text-6xl text-lime-500 font-bold">ChillZone</h1>
            <div className="welcome" style={{ display: sessionState === "inactive" ? "block" : "none" }}>
              <h2 className="mb-4">Take a break from all the noise and appreciate the beauty of silence</h2>
              <div className="controls flex items-center justify-center flex-1">
                <button
                  onClick={() => setSessionDuration(2)}
                  className={`${
                    sessionDuration === 2
                      ? "bg-lime-500 hover:bg-lime-600 text-white"
                      : "bg-lime-100 hover:bg-lime-300 text-gray-600"
                  } rounded-full px-4 py-2 mx-1`}>
                  2 minutes
                </button>
                <button
                  onClick={() => setSessionDuration(3)}
                  className={`${
                    sessionDuration === 3
                      ? "bg-lime-500 hover:bg-lime-600 text-white"
                      : "bg-lime-100 hover:bg-lime-300 text-gray-600"
                  } rounded-full px-4 py-2 mx-1`}>
                  3 minutes
                </button>
                <button
                  onClick={() => setSessionDuration(5)}
                  className={`${
                    sessionDuration === 5
                      ? "bg-lime-500 hover:bg-lime-600 text-white"
                      : "bg-lime-100 hover:bg-lime-300 text-gray-600"
                  } rounded-full px-4 py-2 mx-1`}>
                  5 minutes
                </button>
              </div>
              <button
                onClick={startSession}
                className="start-btn bg-lime-500 hover:bg-lime-600 text-white rounded-full px-4 py-2 mt-10">
                Start Session
              </button>
            </div>

            <div className="success mt-10" style={{ display: sessionState === "completed" ? "block" : "none" }}>
              <h1 className="text-bold text-lime-500">You did it</h1>
              <h2 className="text-lime-500">Remember, it&apos;s okay to take a break.</h2>
              <button
                onClick={() => setSessionState("inactive")}
                className="bg-lime-500 hover:bg-lime-600 text-white rounded-full px-4 py-2 mt-4">
                Take another break?
              </button>
            </div>

            <div
              className="timer mt-10 tex-bold text-lime-500 mt-20 mb-20"
              style={{ display: sessionState === "active" ? "block" : "none" }}>
              <h2 className="text-lg font-bold m-20">{displayTime}</h2>
              <p>Don&apos;t move your cursor. Just sit back, relax &amp; breathe.</p>
            </div>

            <div
              className="mt-10"
              style={{ display: sessionState === "completed" || sessionState === "inactive" ? "block" : "none" }}>
              <Link href="/" className="start-btn bg-lime-500 hover:bg-lime-600 text-white rounded px-4 py-2 mt-10">
                Home
              </Link>
            </div>

            <div className="error mt-10" style={{ display: error ? "block" : "none" }}>
              <h2 className="text-red-500 font-bold">Oops! Try Again.</h2>
            </div>

            <footer
              style={{ display: sessionState === "completed" || sessionState === "inactive" ? "block" : "none" }}
              className="mt-10">
              <Link
                href="https://github.com/0xAndrewBlack/szte-pwa-kotprog"
                target="_blank"
                className="text-lime-500 hover:text-lime-600">
                github.com/chillzone
              </Link>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
