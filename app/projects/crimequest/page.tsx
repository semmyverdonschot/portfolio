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
      <section className="pt-40 md:pt-46 overflow-x-hidden">
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
                  "Branding",
                  "Backend",
                  "Secure Networking",
                  "Paymenter",
                  "Linux",
                  "API Integration",
                  "Cloudflare",
                  "User Authentication",
                  "Hosting",
                  "Pterodactyl",
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
                  I worked within a Fontys group for ROSH Studios on a project
                  commissioned by the Dutch Police to improve recruitment among
                  detectives and community officers. We created CrimeQuest, an
                  interactive experience where users solve a crime by collecting
                  evidence and identifying the suspect. I managed the Git
                  repository and contributed to the project’s technical
                  development. Specifically, I built the signup and login
                  system, as well as the introduction and choose the guilty section of CrimeQuest,
                  which was developed as a progressive web app (PWA).
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
                  <span>[VIEW PWA)</span>
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
              </div>
            </div>
            {/* gallery*/}
            <div className="col-span-12 w-full flex flex-col gap-4 cursor-none">
              {/* big img */}
              <Image
                src="/Cybrance/StatusPage.webp"
                alt="Status page of Cybrance"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl"
                priority
              />
              {/* big img */}
              <Image
                src="/img/placeholder.webp"
                alt="Placeholder"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl"
                priority
              />
              {/* 2 small img */}
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/Pterodactyl Logo.png"
                    alt="Pterodactyl panel used for hosting Discord bots"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/paymenter_logo.jpg"
                    alt="Paymenter integration for handling payments"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
                </div>
              </div>
              {/* big img*/}
              <Image
                src="/img/placeholder.webp"
                alt="Placeholder"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl"
                priority
              />
              {/* big img*/}
              <Image
                src="/img/placeholder.webp"
                alt="Placeholder"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl"
                priority
              />
              {/* 2 small img */}
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/Pterodactyl Logo.png"
                    alt="Pterodactyl panel used for hosting Discord bots"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/paymenter_logo.jpg"
                    alt="Paymenter integration for handling payments"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
                </div>
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
