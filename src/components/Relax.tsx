import Image from "next/image";

export default function Relax() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">Play ambiance</button>
        </main>

        <Image src="https://source.unsplash.com/600x400/?cat" alt="random cat" width={600} height={400} />
      </div>
    </>
  );
}
