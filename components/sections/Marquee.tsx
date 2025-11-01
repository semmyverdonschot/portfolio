"use client";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const images = [
  "WeldasHomepage.png",

  "PortfolioMenu.png",
  "CytricBilling.png",
  "GarageHomepage.png",
  "LoginCytric.png",
  "LoginCrimequest.png",

  "CytricDashboard.png",
];

export default function Marquee() {
  const galleryRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.3, height * 0.8],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.5, height * 1.2],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.2, height * 0.5],
  );
  const y4 = useTransform(scrollYProgress, [0, 1], [-height * 0.4, height * 1]);

  return (
    <section
      id="marquee"
      style={{
        background: "var(--color-dark)",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
      }}
    >
      <div
        ref={galleryRef}
        className="h-[175vh] flex flex-row gap-[2vw] p-4 rounded-2xl box-border overflow-hidden"
        style={{ background: "var(--color-dark)", paddingTop: "0" }}
      >
        <Column images={[images[5], images[2], images[2]]} y={y} />
        <Column images={[images[3], images[1], images[0]]} y={y2} />
        {width > 640 && (
          <>
            <Column images={[images[6], images[0], images[4]]} y={y3} />
            <Column images={[images[2], images[3], images[4]]} y={y4} />
          </>
        )}
      </div>
    </section>
  );
}

import type { MotionValue } from "framer-motion";

type ColumnProps = {
  images: string[];
  y?: MotionValue<number>;
};

function Column({ images, y }: ColumnProps) {
  return (
    <motion.div
      style={y ? { y } : {}}
      className="gallery-column h-full flex flex-col gap-[2vw] w-1/2 sm:min-w-[250px] relative"
    >
      {images.map((src: string, index: number) => {
        // Defensive: fallback alt if src is undefined/null
        let altText = "Gallery image";
        if (typeof src === "string") {
          const name = src.split(".")[0] || "Gallery image";
          altText = `Image of ${name.replace(/([A-Z])/g, " $1").trim()}`;
        }
        return (
          <div
            key={index}
            className="w-full h-full rounded-[1vw] overflow-hidden relative cursor-none"
          >
            <Image
              src={`/img/${src}`}
              alt={altText}
              fill
              className="object-cover object-top"
            />
          </div>
        );
      })}
    </motion.div>
  );
}
