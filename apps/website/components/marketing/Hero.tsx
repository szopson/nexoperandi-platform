"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  ),
});

export default function Hero() {
  return (
    <header className="relative bg-white text-black py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build. Scale.
            <br />
            Dominate.
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-gray-700">
            AI automation for serious businesses.
          </p>
          <p className="text-lg md:text-xl text-blue-600 font-semibold mb-8">
            Working globally, serving clients worldwide
          </p>
          <Link
            href="#contact"
            className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform"
          >
            Start Today
          </Link>
        </div>
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center relative">
          <Globe width={400} height={400} />
        </div>
      </div>
    </header>
  );
}
