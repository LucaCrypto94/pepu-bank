"use client";

import Image from "next/image";
import Link from "next/link";

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pepu Bank Whitepaper</h1>
        
        <div className="space-y-4">
          <Image
            src="/pepu-whitepaper.png"
            alt="Pepu Bank Whitepaper Page 1"
            width={600}
            height={450}
            className="w-full h-auto shadow-md rounded"
            priority
          />
          
          <Image
            src="/pepu-whitepaper2.png"
            alt="Pepu Bank Whitepaper Page 2"
            width={600}
            height={450}
            className="w-full h-auto shadow-md rounded"
          />
          
          <Image
            src="/pepu-whitepaper3.png"
            alt="Pepu Bank Whitepaper Page 3"
            width={600}
            height={450}
            className="w-full h-auto shadow-md rounded"
          />
          
          <Image
            src="/pepu-whitepaper4.png"
            alt="Pepu Bank Whitepaper Page 4"
            width={600}
            height={450}
            className="w-full h-auto shadow-md rounded"
          />
          
          <Image
            src="/pepu-whitepaper5.png"
            alt="Pepu Bank Whitepaper Page 5"
            width={600}
            height={450}
            className="w-full h-auto shadow-md rounded"
          />
          
          <Image
            src="/pepu-whitepaper6.png"
            alt="Pepu Bank Whitepaper Page 6"
            width={600}
            height={450}
            className="w-full h-auto shadow-md rounded"
          />
        </div>
        
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 