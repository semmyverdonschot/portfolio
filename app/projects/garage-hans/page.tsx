"use client";

import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { useRef, useMemo } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";

export default function GarageHansPage() {

      const titleRef = useRef<HTMLHeadingElement>(null);
        const animatedUpRefs = useMemo(
          () => [titleRef] as unknown as React.RefObject<HTMLElement>[],
          [],
        );

          useSlideTogether(animatedUpRefs, "up", 0.8);

      

  return (
    <>
      <section className="py-40 md:py-46 overflow-x-hidden">
        <div className="p-4 rounded-2xl bg-[var(--color-dark)] max-w-full overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full flex justify-center items-center overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[22vw] md:text-[12vw] lg:text-[8vw] font-black uppercase text-center block mb-12 md:mb-20 mt-12 md:mt-20"
              style={{ color: "var(--color-primary)" }}
            >
              Garage Hans
            </h1>
          </div>
          <div className="w-full mt-8 p-4 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center">
              <h2
                  id="about-heading"
                  className="text-sm md:text-base text-[var(--color-graylight)] uppercase tracking-tight font-medium mb-2 md:mb-3"
                >
                  LAUNCH
                </h2>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
