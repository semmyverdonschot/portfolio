"use client";

import { useRef } from "react";
import Image from "next/image";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import Scrollanimate from "@/hooks/Scrollanimate";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section ref={sectionRef} className="pt-32 md:pt-48">
      <div className="w-full max-w-none mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-12 space-y-8 md:space-y-10 overflow-x-hidden">
            {/* Projects*/}
            <div className="w-full flex justify-between items-center">
              <Scrollanimate animateOnScroll>
                <h2 className="text-[17.8vw] md:text-[12vw] lg:text-[10vw] uppercase leading-none font-black text-[var(--color-dark)]">
                  MY WORK
                </h2>
              </Scrollanimate>
            </div>

            {/* Project Cards */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-6 overflow-x-hidden">
              {/* garage hans*/}
              <a
                href="/projects/garage-hans"
                className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-dark)] cursor-pointer group relative w-full md:flex-1 min-w-0"
              >
                <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
                  <div className="absolute inset-0 bg-[var(--color-dark)]/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

                  {/* Animated overlay content */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="overflow-hidden">
                      <div className="w-80 h-48 md:w-[30rem] md:h-72 overflow-hidden transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source
                            src="/Garagehansverdonschot/preview.webm"
                            type="video/webm"
                          />
                          <Image
                            src="/Garagehansverdonschot/preview.webp"
                            alt="Garage Hans Preview"
                            width={480}
                            height={288}
                            className="w-full h-full object-cover"
                          />
                        </video>
                      </div>
                    </div>
                  </div>

                  <Image
                    src="/Garagehansverdonschot/Garage Hans mockup.png"
                    alt="Garage Hans Verdonschot mockup"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-lg lg:rounded-xl"
                    priority
                  />
                </div>

                <div className="flex flex-col gap-3 min-w-0">
                  <div className="flex justify-between items-center min-w-0">
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                      <Image
                        alt="Garage Hans Verdonschot Logo"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0 object-contain"
                        src="/Garagehansverdonschot/small logo.png"
                      />
                      <Scrollanimate animateOnScroll>
                        <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide truncate">
                          Garage Hans
                        </p>
                      </Scrollanimate>
                    </div>
                    <Scrollanimate animateOnScroll>
                      <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide flex-shrink-0 ml-2">
                        Website 2024
                      </p>
                    </Scrollanimate>
                  </div>

                  {/* tech*/}
                  <div className="w-full min-w-0">
                    <InfiniteCarousel
                      items={[
                        "HTML",
                        "CSS",
                        "JAVASCRIPT",
                        "FORMSPREE",
                        "API INTEGRATION",
                        "SEO",
                      ]}
                    />
                  </div>
                </div>
              </a>
              {/* revivor*/}
              <a
                href="/projects/revivor"
                className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-dark)] cursor-pointer group relative w-full md:flex-1 min-w-0"
              >
                <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
                  <div className="absolute inset-0 bg-[var(--color-dark)]/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

                  {/* Animated overlay content */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="overflow-hidden">
                      <div className="w-80 h-48 md:w-[30rem] md:h-72 rounded-xl overflow-hidden transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source src="/Revivor/preview.mp4" type="video/mp4" />
                          <Image
                            src="/Revivor/preview.webp"
                            alt="Revivor Preview"
                            width={480}
                            height={288}
                            className="w-full h-full object-cover"
                          />
                        </video>
                      </div>
                    </div>
                  </div>

                  <Image
                    src="/Revivor/revivorbanner.webp"
                    alt="Revivor Preview"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    priority
                  />
                </div>

                <div className="flex flex-col gap-3 min-w-0">
                  <div className="flex justify-between items-center min-w-0">
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                      <Image
                        alt="Revivor Logo"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0 object-contain"
                        src="/Revivor/revivor logo.webp"
                      />
                      <Scrollanimate animateOnScroll>
                        <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide truncate">
                          Project Two
                        </p>
                      </Scrollanimate>
                    </div>
                    <Scrollanimate animateOnScroll>
                      <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide flex-shrink-0 ml-2">
                        CONCEPT 2024
                      </p>
                    </Scrollanimate>
                  </div>

                  {/* dynamic tech list */}
                  <div className="w-full min-w-0">
                    <InfiniteCarousel
                      items={[
                        "HTML",
                        "CSS",
                        "JAVASCRIPT",
                        "FORMSPREE",
                        "API INTEGRATION",
                      ]}
                    />
                  </div>
                </div>
              </a>
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
          <span>[SEE ALL</span>
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
  );
}
