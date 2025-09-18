"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex flex-col justify-end">
      {/* Text row above */}
      <div className="flex w-full mb-6">
        <span className="flex-1 text-left text-xl font-semibold">A</span>
        <span className="flex-1 text-center text-xl font-semibold">VERY</span>
        <span className="flex-1 text-right text-xl font-semibold">GOOD</span>
      </div>

      {/* Bottom row with WEB + DEVELOPER */}
      <div className="w-full pb-8 flex h-[26vw] md:h-[20vw] lg:h-[16vw] items-end">
        {/* WEB */}
        <div className="flex justify-start h-full">
          <Image
            src="/WEB.svg"
            alt="WEB"
            width={1000}
            height={400}
            className="h-full w-auto object-contain"
            draggable={false}
            priority
          />
        </div>

        {/* Gap */}
        <div className="w-28 md:w-32 lg:w-36"></div>

        {/* DEVELOPER */}
        <div className="flex justify-end h-full">
          <Image
            src="/DEVELOPER.svg"
            alt="DEVELOPER"
            width={1000}
            height={400}
            className="h-full w-auto object-fill"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
