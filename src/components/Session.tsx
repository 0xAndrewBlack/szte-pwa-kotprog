import Link from "next/link";
import { useEffect, useState } from "react";

export default function Session() {
  const [displayTime, setDisplayTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState(1);
  const [counterId, setCounterId] = useState([]);
  const [sessionState, setSessionState] = useState("inactive");
  const [error, setError] = useState(false);

  const startCounter = (duration: any) => {
    setDisplayTime(`0${sessionDuration}:00`);

    let timer = duration * 60;
    let minutes, seconds;

    const counter = setInterval(() => {
      minutes = parseInt((timer / 60) as any, 10);
      seconds = parseInt((timer % 60) as any, 10);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      setDisplayTime(`${minutes}:${seconds}`);

      if (--timer < 0) {
        timer = duration * 60;
      }

      console.log(timer);

      if (displayTime === "00:00" || timer === 0) {
        clearInterval(counter);
        setSessionState("completed");
      }
    }, 1000);

    // @ts-ignore
    setCounterId([...counterId, counter]);
  };

  useEffect(() => {
    const handleMouseMove = () => {
      if (sessionState === "active") {
        setError(true);
        counterId.forEach((counter) => {
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
      handleMouseMove();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("focus", handleTabChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

            <div className="mt-10">
              <Link href="/" className="start-btn bg-lime-500 hover:bg-lime-600 text-white rounded px-4 py-2 mt-10">
                Home
              </Link>
            </div>

            <div className="success mt-10" style={{ display: sessionState === "completed" ? "block" : "none" }}>
              <h1>You did it</h1>
              <h2>Remember, it&apos;s okay to take a break.</h2>
              <button
                onClick={() => setSessionState("inactive")}
                className="bg-lime-500 hover:bg-lime-600 text-white rounded-full px-4 py-2 mt-4">
                Take another break?
              </button>
            </div>

            <div className="timer mt-10" style={{ display: sessionState === "active" ? "block" : "none" }}>
              <h2>{displayTime}</h2>
              <p>Don&apos;t move your cursor. Just sit back, relax &amp; breathe.</p>
            </div>

            <div className="error mt-10" style={{ display: error ? "block" : "none" }}>
              <h2>Oops! Try Again.</h2>
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
