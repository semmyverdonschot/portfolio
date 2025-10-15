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
                  ONGOING
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
                  "Recaptcha",
                  "Secure networking",
                  "Payment integration",
                  "Sendgrid",
                  "API integration",
                  "Cloudflare",
                  "Database management",
                  "Hosting",
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
                  Cybrance is a modern Discord hosting platform optimized for
                  performance, security, and scalability, hosted with Cloudflare
                  for enhanced protection and speed. I developed the entire
                  platform end-to-end, handling the frontend with responsive
                  design and custom branding, as well as the backend with
                  features like Recaptcha, secure networking, payment
                  integration, and Sendgrid for transactional emails. The
                  platform includes robust API integration, database management,
                  and efficient hosting architecture, delivering a seamless and
                  secure user experience.
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
                  href="https://panel.cybrance.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-4 overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base font-normal"
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
              </div>
            </div>
            {/* gallery*/}
            <div className="col-span-12 w-full flex flex-col gap-4 cursor-none">
              {/* big img */}
              <Image
                src="/img/placeholder.webp"
                alt="Placeholder"
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
                    src="/img/ServiceDevelopment.jpg"
                    alt="Placeholder"
                    width={1200}
                    height={800}
                    className="block w-full h-[28vw] max-h-[400px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/img/placeholder.webp"
                    alt="Placeholder"
                    width={1200}
                    height={800}
                    className="block w-full h-[28vw] max-h-[400px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
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
                    src="/img/ServiceDevelopment.jpg"
                    alt="Placeholder"
                    width={1200}
                    height={800}
                    className="block w-full h-[28vw] max-h-[400px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/img/placeholder.webp"
                    alt="Placeholder"
                    width={1200}
                    height={800}
                    className="block w-full h-[28vw] max-h-[400px] min-h-[80px] sm:h-[38vw] sm:min-h-[180px] object-cover rounded-2xl"
                    priority
                  />
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
