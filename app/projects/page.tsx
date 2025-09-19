"use client";

import { useRef } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";

export default function WorkPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imgRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slide heading & paragraph **together**
  useSlideTogether(
    [...imgRefs, headingRef, paragraphRef] as React.RefObject<HTMLElement>[],
    "up",
    2
  );

  // Slide images & video **together**
  useSlideTogether(
    [videoRef] as React.RefObject<HTMLElement>[],
    "down",
    1.23
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
          <div key={i} className="overflow-hidden rounded-lg h-[300px]">
            <img
              ref={imgRefs[i]}
              src={`/WEB.svg`} // replace with your image
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Video */}
        <div className="overflow-hidden rounded-lg h-[300px] col-span-2">
          <video
            ref={videoRef}
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
