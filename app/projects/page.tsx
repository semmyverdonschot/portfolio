"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSlideTogether } from "@/hooks/useStaggerSlide";

export default function WorkPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // refs for wrappers around images
  const imgWrapperRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  // Slide heading & paragraph **together**
  useSlideTogether(
    [
      ...imgWrapperRefs,
      headingRef,
      paragraphRef,
    ] as React.RefObject<HTMLElement>[],
    "up",
    2,
  );

  // Slide video **together**
  useSlideTogether(
    [videoWrapperRef] as React.RefObject<HTMLElement>[],
    "down",
    1.23,
  );

  return (
    <div className="p-10 space-y-8">
      {/* Heading */}
      <div className="overflow-hidden">
        <h1 ref={headingRef} className="text-4xl font-bold">
          Testing Animations
        </h1>
      </div>

      {/* Paragraph */}
      <div className="overflow-hidden">
        <p ref={paragraphRef} className="text-lg">
          Here’s a list of my projects.
        </p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {["Project 1", "Project 2"].map((title, i) => (
          <div
            key={i}
            ref={imgWrapperRefs[i]}
            className="overflow-hidden rounded-lg h-[300px] relative"
          >
            <Image
              src="/WEB.svg" // replace with your actual image
              alt={title}
              fill
              className="object-cover"
              priority
              draggable={false}
            />
          </div>
        ))}

        {/* Video */}
        <div
          ref={videoWrapperRef}
          className="overflow-hidden rounded-lg h-[300px] col-span-2 relative"
        >
          <video
            src="/1.mp4" // replace with your video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
