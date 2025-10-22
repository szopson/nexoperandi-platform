import Link from "next/link";

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
          <Link
            href="#contact"
            className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform"
          >
            Start Today
          </Link>
        </div>
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center relative">
          <div className="blob w-80 h-80 md:w-96 md:h-96"></div>
        </div>
      </div>
    </header>
  );
}
