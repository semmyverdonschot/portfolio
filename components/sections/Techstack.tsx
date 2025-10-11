"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Scrollanimate from "@/hooks/Scrollanimate";

export default function Techstack() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const allTechs = [
    { name: "React", target: "_blank", href: "https://reactjs.org/" },
    { name: "Next.js", target: "_blank", href: "https://nextjs.org/" },
    {
      name: "TypeScript",
      target: "_blank",
      href: "https://www.typescriptlang.org/",
    },
    {
      name: "JavaScript",
      target: "_blank",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { name: "Vercel", target: "_blank", href: "https://vercel.com/" },
    { name: "PostgreSQL", target: "_blank", href: "https://www.postgresql.org/" },
    { name: "Gsap", target: "_blank", href: "https://greensock.com/gsap/" },
    { name: "Tailwind", target: "_blank", href: "https://tailwindcss.com/" },
    { name: "Mongodb", target: "_blank", href: "https://www.mongodb.com/" },
    { name: "Angular", target: "_blank", href: "https://angular.io/" },
  ];

  const desktopTopCount = 3;
  const gridTop = allTechs.slice(0, desktopTopCount);
  const gridBottom = allTechs.slice(desktopTopCount);
  const desktopBottomCols = gridBottom.length > 0 ? gridBottom.length : 5;

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/\.+/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-/g, "");

  return (
    <section className="pt-24 mb-24 md:pt-48">
      <div className="w-full max-w-none mx-auto">
        <div className="flex flex-col justify-left items-center mb-12">
          <Scrollanimate animateOnScroll>
            <h2 className="text-[15vw] md:text-[10vw] lg:text-[10vw] uppercase leading-none font-black text-[var(--color-dark)]">
              TECHSTACK
            </h2>
          </Scrollanimate>
        </div>
        <div className="flex flex-col w-full pt-24 md:pt-24">
          <span className="text-sm md:text-base text-[var(--color-dark)] uppercase tracking-wider font-bold mb-2 md:mb-3">
            I&apos;m good at
          </span>

          {/* Mobile: 2 columns, all techs */}
          <div className="grid grid-cols-2 md:hidden w-full bg-[var(--color-primary)]">
            {allTechs.map((tech, i) => {
              const isLeftCol = i % 2 === 0;
              const isLastItem = i === allTechs.length - 1;
              const showRightBorder = isLeftCol && !isLastItem;
              const showBottomBorder = i < allTechs.length - 2;
              const iconSrc = `/svg/${slugify(tech.name)}.svg`;
              const isActive = hoveredIdx === i;
              return (
                <Link
                  key={tech.name + i}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-index={i}
                  className={`group flex items-center justify-center cursor-pointer ${isActive ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"} ${showRightBorder ? "border-r border-[#c6c6c6]" : ""} ${showBottomBorder ? "border-b border-[#c6c6c6]" : ""}`}
                  style={{
                    height: "220px",
                    transition: "background-color 0.12s ease",
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setHoveredIdx(i)}
                  aria-label={tech.name}
                >
                  <div className="relative w-[80px] h-[80px]">
                    <Image
                      src={iconSrc}
                      alt={tech.name}
                      fill
                      sizes="80px"
                      className={`object-contain ${isActive ? "brightness-0 invert" : ""}`}
                      style={{
                        filter: isActive ? "brightness(0) invert(1)" : "none",
                        transition: "filter 0.28s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                    <div
                      className={`absolute inset-0 pointer-events-none`}
                      style={{
                        background: "var(--color-primary)",
                        WebkitMaskImage: `url(${iconSrc})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskImage: `url(${iconSrc})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop: 3 top + rest bottom, split bottom into dynamic columns */}
          <div className="hidden md:grid md:grid-cols-3 w-full bg-[var(--color-primary)]">
            {gridTop.map((tech, i) => {
              const iconSrc = `/svg/${slugify(tech.name)}.svg`;
              return (
                <Link
                  key={tech.name + i}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-index={i}
                  className={`group flex items-center justify-center cursor-pointer ${hoveredIdx === i ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"} border-b border-[#c6c6c6] ${i === 1 ? "border-l border-r border-[#c6c6c6]" : ""}`}
                  style={{
                    height: "320px",
                    transition: "background-color 0.12s ease",
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  aria-label={tech.name}
                >
                  <div className="relative w-[80px] h-[80px]">
                    <Image
                      src={iconSrc}
                      alt={tech.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                      style={{
                        filter:
                          hoveredIdx === i ? "brightness(0) invert(1)" : "none",
                        transition: "filter 0.28s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                      style={{
                        background: "var(--color-primary)",
                        WebkitMaskImage: `url(${iconSrc})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskImage: `url(${iconSrc})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          <div
            className="hidden md:grid w-full bg-[var(--color-primary)]"
            style={{
              gridTemplateColumns: `repeat(${desktopBottomCols}, minmax(0, 1fr))`,
            }}
          >
            {gridBottom.map((tech, i) => {
              const idx = i + desktopTopCount;
              const iconSrc = `/svg/${slugify(tech.name)}.svg`;
              return (
                <Link
                  key={tech.name + i}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-index={idx}
                  className={`group flex items-center justify-center cursor-pointer ${hoveredIdx === idx ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"}`}
                  style={{
                    height: "320px",
                    borderRight:
                      i % desktopBottomCols < desktopBottomCols - 1
                        ? "1px solid #c6c6c6"
                        : "none",
                    transition: "background-color 0.12s ease",
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  aria-label={tech.name}
                >
                  <div className="relative w-[80px] h-[80px]">
                    <Image
                      src={iconSrc}
                      alt={tech.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                      style={{
                        filter:
                          hoveredIdx === idx
                            ? "brightness(0) invert(1)"
                            : "none",
                        transition: "filter 0.28s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                      style={{
                        background: "var(--color-primary)",
                        WebkitMaskImage: `url(${iconSrc})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskImage: `url(${iconSrc})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
