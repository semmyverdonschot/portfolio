"use client";

import { useRef } from "react";
import { useAnimateUp } from "@/hooks/useAnimateUp";

export default function WorkPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Animate each element as a single block
  useAnimateUp({ ref: titleRef });
  useAnimateUp({ ref: descRef, delay: 0.2 });
  useAnimateUp({ ref: imgRef, delay: 0.4 });
  useAnimateUp({ ref: divRef, delay: 0.6 });

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <h1 ref={titleRef} className="text-4xl font-bold">
        Testing animations
      </h1>

      <p ref={descRef} className="text-lg text-center">
        Here’s a list of my projects. All words move together.
      </p>

      <img
        ref={imgRef}
        src="/webdeveloper.png"
        alt="Web Developer"
        className="w-64 h-64 object-cover rounded-lg shadow-lg"
      />

      <div
        ref={divRef}
        className="w-64 h-32 bg-gray-300 flex items-center justify-center rounded-lg"
      >
        Animated Div
      </div>
    </div>
  );
}
