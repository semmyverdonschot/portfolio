"use client";

import { useRef } from "react";
import { useAnimateUp } from "@/hooks/useAnimateUp";

export default function WorkPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Animate whole elements
  useAnimateUp({ ref: titleRef });
  useAnimateUp({ ref: descRef, delay: 0.2 });
  useAnimateUp({ ref: imgRef, delay: 0.4 });

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <h1 ref={titleRef} className="text-4xl font-bold">
        Testing animations
      </h1>
      <p ref={descRef} className="text-lg text-center">
        Here’s a list of my projects. The whole sentence animates at once.
      </p>
      <img
        ref={imgRef}
        src="/webdeveloper.png"
        alt="Web Developer"
        className="w-64 h-64 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}
