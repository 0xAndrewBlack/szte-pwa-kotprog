import Head from "next/head";
import { useEffect, useState } from "react";

import Relax from "@/components/Relax";
import { Quote } from "@/types";

import quotes from "../helpers/quotes.json";

export default function RelaxPage() {
  const [apiData, setApiData] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/quotes");
        const data = await response.json();

        setApiData(data.quotes);
      } catch (e: any) {
        console.log(e);

        setApiData(quotes as Quote[]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Chillzone - Relax</title>
      </Head>

      {apiData && <Relax quotes={apiData as Quote[]} />}
    </>
  );
}
