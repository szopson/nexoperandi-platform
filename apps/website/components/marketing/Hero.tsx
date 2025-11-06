"use client";

import Link from "next/link";
import NetworkDiagram from "@/components/NetworkDiagram";

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
          <NetworkDiagram />
        </div>
      </div>

      {/* Trust strip - desktop version */}
      <div className="container mx-auto px-6 mt-16 hidden md:block">
        <div className="grid grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
          <div className="border-l-2 border-blue-600 pl-4 text-left">
            <div className="text-2xl font-bold text-gray-900">90-day</div>
            <div className="text-gray-600">ROI guarantee</div>
          </div>
          <div className="border-l-2 border-blue-600 pl-4 text-left">
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-gray-600">deployments</div>
          </div>
          <div className="border-l-2 border-blue-600 pl-4 text-left">
            <div className="text-2xl font-bold text-gray-900">End-to-end</div>
            <div className="text-gray-600">implementation</div>
          </div>
        </div>
      </div>
    </header>
  );
}
