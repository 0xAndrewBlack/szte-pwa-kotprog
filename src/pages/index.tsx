import Head from "next/head";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chillzone - Home</title>
      </Head>
      <HomePage />
    </>
  );
}
