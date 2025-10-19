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
              Cybrance
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
                  ON GOING
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
                  "Responsive Design",
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
                  "Vercel",
                  "Vite",
                  "MariaDB",
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
                  Cybrance is a modern bot hosting platform built for
                  performance, security, and scalability. The platform features
                  a responsive, branded frontend, a secure backend with payment
                  integration, API and database management, and efficient
                  hosting, delivering a seamless and reliable user
                  experience.{" "}
                </p>
              </div>
              <div className="overflow-hidden">
                <a
                  ref={visitButtonRef}
                  href="https://cybrance.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="Check the Cybrance website"
                >
                  <span>[SEE IT LIVE</span>
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
                  href="https://billing.cybrance.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-4 overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="See the panel of Cybrance"
                >
                  <span>[BILLING AREA</span>
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
                  href="https://panel.cybrance.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-0 mt-4 md:ml-4 sm:ml-0 overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="See the panel of Cybrance"
                >
                  <span>[VISIT THE PANEL</span>
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
                  href="https://status.cybrance.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-4 overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
                  aria-label="See the  status of all the services"
                >
                  <span>[STATUS PAGE</span>
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
                src="/Cybrance/Homepage.png"
                alt="Cybrance homepage showing status and dashboard"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl"
                priority
                aria-label="Cybrance homepage screenshot"
              />
              {/* video */}
              <div className="w-full overflow-hidden rounded-2xl">
                <video
                  src="/Cybrance/Cybrance Panel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ background: "#171717" }}
                  ref={(el) => {
                    if (el) el.playbackRate = 1.5;
                  }}
                  aria-label="Cybrance panel demo video"
                />
              </div>
              {/* 2 small img */}
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/EinaFont.png"
                    alt="EinaFont typeface used for Cybrance branding"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                    aria-label="EinaFont branding screenshot"
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/CybranceInfrastructure Design.png"
                    alt="Infrastructure design diagram for Cybrance platform"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                    aria-label="Cybrance infrastructure diagram"
                  />
                </div>
              </div>
              {/* video */}
              <div className="w-full overflow-hidden rounded-2xl">
                <video
                  src="/Cybrance/BillingSystem.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ background: "#171717" }}
                  ref={(el) => {
                    if (el) el.playbackRate = 1;
                  }}
                  aria-label="Cybrance billing system demo video"
                />
              </div>
              {/* 2 small img */}
              <div className="w-full flex gap-4">
                <div className="w-1/2 relative group">
                  <a
                    href="https://pterodactyl.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label="Open source panel Pterodactyl.io"
                  >
                    <Image
                      src="/Cybrance/Pterodactyl Logo.png"
                      alt="Pterodactyl open source panel for hosting Discord bots"
                      width={1200}
                      height={800}
                      className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                      priority
                      aria-label="Pterodactyl panel screenshot"
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity duration-300">
                      <span className="text-[var(--color-dark)] text-base font-semibold px-4 text-center">
                        Open source panel <br /> pterodactyl.io
                      </span>
                    </div>
                  </a>
                </div>
                <div className="w-1/2 relative group">
                  <a
                    href="https://paymenter.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label="Open source CMS system Paymenter"
                  >
                    <Image
                      src="/Cybrance/paymenter_logo.jpg"
                      alt="Paymenter open source CMS system for payments"
                      width={1200}
                      height={800}
                      className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                      priority
                      aria-label="Paymenter CMS screenshot"
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity duration-300">
                      <span className="text-black text-base font-semibold px-4 text-center">
                        Open source CMS system <br /> paymenter.org
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              {/* big img */}
              <Image
                src="/Cybrance/logo designs.jpg"
                alt="Logo design explorations for Cybrance"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl mt-4"
                priority
                aria-label="Cybrance logo designs"
              />
              {/* big img  */}
              <Image
                src="/Cybrance/Style.png"
                alt="Cybrance style and branding overview"
                width={2400}
                height={1600}
                className="block w-full h-[40vw] max-h-[900px] min-h-[120px] sm:h-[56vw] sm:min-h-[320px] object-cover rounded-2xl mt-4"
                priority
                aria-label="Cybrance style branding"
              />
              {/* 2 small img */}
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/StatusPage.webp"
                    alt="Cybrance status page showing system health"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                    aria-label="Cybrance status page screenshot"
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/Cybrance/Tawkto.png"
                    alt="Tawk.to live chat integration for Cybrance"
                    width={1200}
                    height={800}
                    className="block w-full h-[48vw] max-h-[1200px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                    aria-label="Tawk.to live chat screenshot"
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
