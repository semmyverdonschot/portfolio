"use client";

import { useRef } from "react";
import Scrollanimate from "@/hooks/Scrollanimate";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center w-full pt-48 md:pt-56"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="w-full max-w-none mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-12 space-y-12 md:space-y-14">
            <header>
              <Scrollanimate animateOnScroll>
                <h2
                  id="about-heading"
                  className="text-sm md:text-base text-[var(--color-dark)] uppercase tracking-tight font-semibold mb-2 md:mb-3"
                >
                  About Myself
                </h2>
              </Scrollanimate>
            </header>
            <div className="flex flex-col md:flex-row md:items-start md:space-x-20 space-y-3 md:space-y-0">
              <Scrollanimate animateOnScroll>
                <p className="text-2xl md:text-4xl lg:text-5xl font-normal text-[var(--color-dark)] leading-tight flex-1 max-w-full md:max-w-4xl">
                  I&apos;m a web developer with a focus on building secure
                  digital experiences, a jack-of-all-trades who enjoys helping
                  brands do things they didn&apos;t know they could do.{" "}
                </p>
              </Scrollanimate>
              <Scrollanimate animateOnScroll>
                <aside
                  className="text-lg md:text-2xl text-[var(--color-graylight)] hidden md:block flex-shrink-0 leading-relaxed text-left ml-auto"
                  aria-label="Personal background information"
                >
                  <address className="not-italic">
                    <p>Raised in the southern</p>
                    <p>Netherlands, now studying</p>
                    <p>at Fontys</p>
                  </address>
                </aside>
              </Scrollanimate>
            </div>
            <nav
              className="flex flex-row items-start space-x-6 md:space-x-8 pt-4 md:pt-8"
              aria-label="About page navigation"
            >
              <a
                href="/about"
                className="flex items-center overflow-hidden w-max group text-[var(--color-dark)] hover:text-[var(--color-dark)] transition-colors text-base md:text-base"
                aria-label="Learn more about my background and experience"
              >
                <span>[ABOUT</span>
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
              >
                <p>Raised in the southern Netherlands.</p>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
