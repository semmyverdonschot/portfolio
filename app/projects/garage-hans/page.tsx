"use client";

import Footer from "@/components/sections/Footer";
import { useRef, useMemo } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import gsap from "gsap";
import { useEffect } from "react";

export default function GarageHansPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearLabelRef = useRef<HTMLParagraphElement>(null);
  const yearValueRef = useRef<HTMLParagraphElement>(null);
  const servicesLabelRef = useRef<HTMLParagraphElement>(null);
  const summaryLabelRef = useRef<HTMLParagraphElement>(null);
  const summaryTextRef = useRef<HTMLParagraphElement>(null);
  const visitButtonRef = useRef<HTMLAnchorElement>(null);

  const animatedUpRefs = useMemo(
    () =>
      [
        titleRef,
        yearLabelRef,
        yearValueRef,
        servicesLabelRef,
        summaryLabelRef,
        summaryTextRef,
        visitButtonRef,
      ] as unknown as React.RefObject<HTMLElement>[],
    [],
  );
  useSlideTogether(animatedUpRefs, "up", 0.8);

  // for this page its y=110 instead of the 100 because the text big
  useEffect(() => {
    const elements = animatedUpRefs
      .map((ref) => ref.current)
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    gsap.set(elements, {
      y: "110%",
      force3D: true,
    });

    const timeout = setTimeout(() => {
      gsap.to(elements, {
        y: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
        stagger: 0.05,
      });
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [animatedUpRefs]);

  return (
    <>
      <section className="py-40 md:py-46 overflow-x-hidden">
        <div className="p-4 rounded-2xl bg-[var(--color-dark)] max-w-full overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full flex justify-center items-center overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[11vw] md:text-[12vw] lg:text-[8vw] font-black uppercase text-center block mb-12 md:mb-20 mt-12 md:mt-20"
              style={{ color: "var(--color-primary)" }}
            >
              Garage Hans
            </h1>
          </div>
          <div className="w-full flex flex-col gap-12 lg:grid lg:grid-cols-12 mb-8 p-4 bg-[var(--color-secondary)] rounded-2xl">
            {/* launch */}
            <div className="flex flex-col gap-4 col-span-2">
              <div className="overflow-hidden">
                <p
                  ref={yearLabelRef}
                  className="text-sm lg:text-base text-[var(--color-graylight)] uppercase font-medium tracking-tight"
                >
                  Launch
                </p>
              </div>
              <div className="overflow-hidden">
                <p
                  ref={yearValueRef}
                  className="text-4xl lg:text-5xl text-[var(--color-primary)] font-semibold tracking-tight leading-[0.8]"
                >
                  2024
                </p>
              </div>
            </div>
            {/* Services */}
            <div className="flex flex-col gap-4 col-span-4">
              <span className="overflow-hidden">
                <span
                  ref={servicesLabelRef}
                  className="block text-sm lg:text-base text-[var(--color-graylight)] uppercase font-medium tracking-tight"
                  style={{
                    display: "inline-block",
                  }}
                >
                  Services
                </span>
              </span>
              <ul className="flex gap-2 flex-wrap">
                {[
                  "Frontend",
                  "Backend",
                  "Database Management",
                  "Responsive Design",
                  "Secure Authentication",
                  "API Integration",
                  "SEO",
                  "Next.js",
                  "Tailwind CSS",
                  "GSAP",
                  "Vercel",
                ].map((tag) => (
                  <li
                    key={tag}
                    className="text-sm md:text-sm lg:text-sm text-[var(--color-primary)] uppercase tracking-tight bg-[var(--color-grayish)] px-3 py-2 rounded-lg whitespace-nowrap"
                  >
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Spacer */}
            <div className="hidden lg:block col-span-1"></div>
            {/* Summary */}
            <div className="flex flex-col gap-4 col-span-5">
              <div className="overflow-hidden">
                <p
                  ref={summaryLabelRef}
                  className="text-sm lg:text-base text-[var(--color-graylight)] uppercase font-medium tracking-tight"
                >
                  Summary
                </p>
              </div>
              <div className="overflow-hidden">
                <p
                  ref={summaryTextRef}
                  className="text-base md:text-2xl text-[var(--color-primary)] font-semibold"
                >
                  A modern website for Garage Hans Verdonschot, focused on
                  performance, accessibility, and user experience. Built with
                  Next.js, Tailwind CSS, GSAP, and more. A modern website for
                  Garage Hans Verdonschot, focused on performance,
                  accessibility, and user experience. Built with Next.js,
                  Tailwind CSS, GSAP, and more.
                </p>
              </div>
              <div className="overflow-hidden">
                <a
                  ref={visitButtonRef}
                  href="https://garagehansverdonschot.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="See about Garage Hans Verdonschot"
                >
                  <span>[CHECK IT OUT</span>
                  <svg
                    className="w-5 h-5 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                  <span>]</span>
                </a>
                <div
                  className="text-base md:hidden text-[var(--color-graylight)] leading-relaxed"
                  aria-label="Personal background"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
