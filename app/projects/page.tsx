"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import Footer from "@/components/sections/Footer";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLAnchorElement>(null);
  const card2Ref = useRef<HTMLAnchorElement>(null);

  const animatedUpRefs = useMemo(
    () => [yearRef, titleRef] as unknown as React.RefObject<HTMLElement>[],
    [],
  );

  const animatedDownRefs = useMemo(
    () => [card1Ref, card2Ref] as unknown as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedUpRefs, "up", 0.8);
  useSlideTogether(animatedDownRefs, "down", 0.8);

  return (
    <>
      <section ref={sectionRef} className="py-40 md:py-46 overflow-x-hidden">
        <div className="w-full max-w-none mx-auto overflow-x-hidden">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start overflow-x-hidden">
            <div className="md:col-span-12 space-y-6 md:space-y-6 overflow-x-hidden">
              {/* Year */}
              <div className="w-full overflow-hidden">
                <p
                  ref={yearRef}
                  className="text-base font-medium text-[var(--color-dark)] text-left"
                >
                  [2024-2025]
                </p>
              </div>

              {/* PROJECTS */}
              <div className="w-full flex justify-between items-center overflow-hidden">
                <h2
                  ref={titleRef}
                  className="text-[17.5vw] md:text-[10vw] lg:text-[8vw] leading-none font-black text-[var(--color-dark)]"
                >
                  PROJECTS
                </h2>
              </div>

              {/* Light wrapper around project cards */}
              <div className="p-4 rounded-3xl bg-[var(--color-light)] max-w-full overflow-hidden">
                {/* Project Cards*/}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-6">
                  {/* garage hans verdonschot*/}
                  <div className="overflow-hidden w-full md:flex-1 max-w-full">
                    <a
                      ref={card1Ref}
                      href="/projects/garage-hans"
                      className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-dark)] cursor-pointer group relative w-full"
                    >
                      <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
                        <div className="absolute inset-0 bg-[var(--color-dark)]/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg lg:rounded-xl"></div>

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
                          src="/garagehansverdonschot/Garage Hans mockup.png"
                          alt="Garage Hans Verdonschot Preview"
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
                              alt="Garage Hans Verdonschot Logo"
                              loading="lazy"
                              width="32"
                              height="32"
                              decoding="async"
                              className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0 object-contain"
                              src="/Garagehansverdonschot/small logo.png"
                            />
                            <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide truncate">
                              Garage Hans
                            </p>
                          </div>
                          <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide flex-shrink-0 ml-2">
                            Website • 2024
                          </p>
                        </div>

                        {/* Infinite carousel tech list */}
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

                  {/* revivor*/}
                  <div className="overflow-hidden w-full md:flex-1 max-w-full">
                    <a
                      ref={card2Ref}
                      href="/projects/revivor"
                      className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-dark)] cursor-pointer group relative w-full"
                    >
                      <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
                        <div className="absolute inset-0 bg-[var(--color-dark)]/30 backdrop-blur-md z-10 opacity-0 rounded-lg lg:rounded-xl group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

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
                                <source
                                  src="/Revivor/preview.mp4"
                                  type="video/mp4"
                                />
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
                            <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide truncate">
                              Drink Revivor
                            </p>
                          </div>
                          <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide flex-shrink-0 ml-2">
                            CONCEPT • 2024
                          </p>
                        </div>

                        {/* Infinite carousel tech list */}
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

                {/* Project Cards - Row 2 */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                  {/* Project 3 */}
                  <div className="overflow-hidden w-full md:flex-1 max-w-full">
                    <a
                      href="/work/project-3"
                      className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-dark)] cursor-pointer group relative w-full"
                    >
                      <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
                        <div className="absolute inset-0 bg-[var(--color-dark)]/30 backdrop-blur-md rounded-lg lg:rounded-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <Image
                          src="/placeholder.webp"
                          alt="Project Three Preview"
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
                              alt="Project Three Logo"
                              loading="lazy"
                              width="32"
                              height="32"
                              decoding="async"
                              className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0 object-contain"
                              src="/placeholder.webp"
                            />
                            <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide truncate">
                              Weldas
                            </p>
                          </div>
                          <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide flex-shrink-0 ml-2">
                            • 2024
                          </p>
                        </div>

                        {/* Infinite carousel tech list */}
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

                  {/* Project 4 */}
                  <div className="overflow-hidden w-full md:flex-1 max-w-full">
                    <a
                      href="/work/project-4"
                      className="flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-dark)] cursor-pointer group relative w-full"
                    >
                      <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
                        <div className="absolute inset-0 bg-[var(--color-dark)]/30 backdrop-blur-md rounded-lg lg:rounded-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        <Image
                          src="/placeholder.webp"
                          alt="Project Four Preview"
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
                              alt="Crime quest Logo"
                              loading="lazy"
                              width="32"
                              height="32"
                              decoding="async"
                              className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0 object-contain"
                              src="/placeholder.webp"
                            />
                            <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide truncate">
                              Crime Quest
                            </p>
                          </div>
                          <p className="text-sm md:text-lg uppercase font-semibold text-[var(--color-primary)] tracking-wide flex-shrink-0 ml-2">
                            • 2023
                          </p>
                        </div>

                        {/* Infinite carousel tech list */}
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
