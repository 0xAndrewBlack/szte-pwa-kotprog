import { useEffect, useState } from "react";

import Head from "next/head";

import Relax from "@/components/Relax";
import quotes from "../helpers/quotes.json";

export default function RelaxPage() {
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/quotes");
        const data = await response.json();

        setApiData(data.quotes);
      } catch (error) {
        console.log(quotes);

        setApiData(quotes as any);
      }
    };

    const interval = setInterval(fetchData, 5000);

    fetchData();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Chillzone - Relax</title>
      </Head>

      {apiData && <Relax quotes={apiData} />}
    </>
  );
}
