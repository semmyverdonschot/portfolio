"use client";

import Footer from "@/components/sections/Footer";
import { useRef, useMemo } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import Image from "next/image";

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

  return (
    <>
      <section className="pt-40 md:pt-46 overflow-hidden">
        <div className="p-4 rounded-2xl bg-[var(--color-dark)] max-w-full overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full flex justify-center items-center overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[11vw] md:text-[12vw] lg:text-[8vw] font-black uppercase text-center block  mt-12 md:mt-20"
              style={{ color: "var(--color-primary)" }}
            >
              CrimeQuest
            </h1>
          </div>
          {/* (for masking the huge text + animation) */}
          <div className="mb-12 md:mb-20"></div>
          <div className="w-full flex flex-col gap-12 lg:grid lg:grid-cols-12 p-4 bg-[var(--color-secondary)] rounded-2xl">
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
                  2023
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
                  "Login & Signup",
                  "Encryption",
                  "UI/UX Design",
                  "Database management",
                  "API Intergration",
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
                  I worked in a Fontys group for ROSH Studios on a project for
                  the Dutch Police to improve recruitment among detectives and
                  community officers. We created CrimeQuest, an interactive app
                  where users solve crimes by collecting evidence and
                  identifying suspects. I managed the Git repository and built
                  the signup/login system, as well as the introduction and
                  “choose the guilty” sections of this PWA.
                </p>
              </div>
              <div className="overflow-hidden">
                <a
                  ref={visitButtonRef}
                  href="https://jordankoevoets.nl/crimequest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="Check the CrimeQuest PWA"
                >
                  <span>[VIEW PWA</span>
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
                
                <a
                  ref={visitButtonRef}
                  href="https://www.rosh-studios.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-4 overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="Our Project partner ROSH Studios"
                >
                  <span>[ROSH STUDIO&apos;S</span>
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
                    <a
                  ref={visitButtonRef}
                  href="https://github.com/Cybrance/CrimeQuest-Login-Signup-Mongodb-bcrypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center overflow-hidden ml-4 w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="Check the CrimeQuest PWA Login repository"
                >
                  <span>[LOGIN/SIGNUP REPOSITORY </span>
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
              </div>
            </div>
            {/* gallery*/}
            <div className="col-span-12 w-full flex flex-col gap-4 cursor-none">
              {/* big img */}
                {/* video */}
              <div className="w-full overflow-hidden rounded-2xl">
                <video
                  src="/Crimequest/crimequest login.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ background: "#171717" }}
                  ref={(el) => {
                    if (el) el.playbackRate = 1.5;
                  }}
                  aria-label="Login and Signup functionality demonstration"
                />
              </div>
         <div className="w-full overflow-hidden rounded-2xl">
                <video
                  src="/Crimequest/playthrough.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ background: "#171717" }}
                  ref={(el) => {
                    if (el) el.playbackRate = 1.5;
                  }}
                  aria-label="playthrough demonstration"
                />
              </div>

              </div>
            </div>
          </div>
        
        <div className="flex flex-row justify-center space-x-6 md:space-x-8 pt-12 md:pt-16">
          <a
            href="/projects"
            className="flex items-center font-bold aoverflow-hidden w-max group text-[var(--color-dark)] hover:text-[var(--color-dark)] transition-colors text-lg md:text-lg"
            aria-label="see more about my work and projects"
          >
            <span>[OTHER PROJECTS</span>
            <svg
              className="w-5 h-5 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
        </div>
      </section>
      <Footer />
    </>
  );
}
