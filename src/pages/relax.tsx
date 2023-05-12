import Head from "next/head";

import { useEffect, useState } from "react";

import Relax from "@/components/Relax";

export default function RelaxPage() {
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/quotes");
      const data = await response.json();

      setApiData(data.quotes);
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
