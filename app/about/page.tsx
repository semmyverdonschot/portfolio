"use client";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import ScrollAnimate from "@/hooks/Scrollanimate";

const images = [
  "/img/Linkedin.jpeg",
  "/img/Myself.jpg",
  "/img/Linkedin.jpeg",
  "/img/Myself.jpg",
];

const positions = [
  { marginTop: "-2vw", marginLeft: "6vw" },
  { marginLeft: "5vw" },
  { marginTop: "-1vw", marginLeft: "1vw" },
  { marginTop: "-3vw", marginLeft: "8vw" },
];

function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locked, setLocked] = useState(true);
  const [canScroll, setCanScroll] = useState(true);

  const handleScroll = (e: React.WheelEvent | React.TouchEvent) => {
    if (!canScroll) {
      e.preventDefault();
      return;
    }
    if (locked) {
      if ("deltaY" in e && e.deltaY > 0) {
        if (currentIndex < images.length - 1) {
          setCanScroll(false);
          setTimeout(() => setCanScroll(true), 120);
          setCurrentIndex(currentIndex + 1);
        } else {
          setLocked(false);
        }
        e.preventDefault();
      }
      if ("deltaY" in e && e.deltaY < 0) {
        if (currentIndex > 0) {
          setCanScroll(false);
          setTimeout(() => setCanScroll(true), 120);
          setCurrentIndex(currentIndex - 1);
        }
        e.preventDefault();
      }
      if (!("deltaY" in e)) {
        if (currentIndex < images.length - 1) {
          setCanScroll(false);
          setTimeout(() => setCanScroll(true), 120);
          setCurrentIndex(currentIndex + 1);
        } else {
          setLocked(false);
        }
        e.preventDefault();
      }
      return;
    }
  };

  useEffect(() => {
    if (!locked) {
      const onScroll = () => {
        if (window.scrollY === 0) {
          setLocked(true);
          setCurrentIndex(images.length - 1);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [locked]);

  const aboutRef = useRef<HTMLHeadingElement>(null);
  const animatedRefs = useMemo(
    () => [aboutRef] as unknown as React.RefObject<HTMLElement>[],
    [],
  );

  useSlideTogether(animatedRefs, "up", 0.8);

  return (
    <>
      <div
        className={`w-full min-h-screen ${locked ? "overflow-hidden h-screen" : "overflow-auto"} relative`}
        onWheel={handleScroll}
        onTouchMove={handleScroll}
      >
        {/* Dissapearing images  */}
        <div className="relative w-full md:min-h-screen flex flex-col items-center justify-start pt-60">
          {images.slice(0, currentIndex + 1).map((src, idx) => (
            <div
              key={idx}
              className={`z-50 pointer-events-none transition-all duration-500 about-img absolute`}
              style={{
                marginTop: positions[idx].marginTop,
                marginLeft: positions[idx].marginLeft,
                opacity: idx === 0 ? 0 : 1,
                visibility: idx === 0 ? "hidden" : "visible",
                animation:
                  idx === 0
                    ? "fadeUp 0.8s cubic-bezier(0.55, 0.06, 0.68, 0.19) 0.4s forwards"
                    : undefined,
                transition: "opacity 0.5s, margin 0.5s",
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden mb-[-8vw]">
                <Image
                  src={src}
                  alt={`About photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
          <style jsx>{`
            .about-img {
              width: 80vw;
              height: 105vw;
              max-width: 400px;
              max-height: 520px;
              min-width: 140px;
              min-height: 160px;
            }
            @media (min-width: 768px) {
              .about-img {
                width: 28vw !important;
                height: 34vw !important;
                max-width: 320px !important;
                max-height: 420px !important;
                min-width: 140px !important;
                min-height: 140px !important;
              }
            }
            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(12px);
                visibility: hidden;
              }
              to {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
              }
            }
          `}</style>
        </div>

        {/* ABOUT */}
        <div className="w-full flex justify-center pointer-events-none z-50 mt-[-24vw]">
          <h1
            ref={aboutRef}
            className="text-[25vw] md:text-[22vw] lg:text-[26vw] font-black uppercase leading-none select-none"
            style={{ color: "var(--color-primary-dark)" }}
          >
            ABOUT
          </h1>
        </div>

        {/* Normal scrollable content below this */}
        <div className="relative z-30 w-full max-w-4xl mx-auto px-4 py-72 md:py-24 mt-8"></div>

        {/* dark section*/}
        <section className="w-full min-h-[60vh] py-40 px-2 bg-[#171717] flex flex-col items-center justify-center mt-24 rounded-2xl">
          <ScrollAnimate animateOnScroll>
            <p
              className="w-[90%] max-w-[1100px] text-center font-semibold leading-tight -tracking-normal mx-auto text-[6vw] md:text-[4vw] lg:text-[3vw]"
              style={{ color: "var(--color-primary)" }}
            >
              I craft secure, scalable digital experiences that go beyond just
              looking good. I enjoy helping brands solve problems and do things
              they didn&apos;t know they could do.
            </p>
          </ScrollAnimate>
          <div className="flex justify-center w-full mt-12">
            <a
              href="/projects"
              className="flex items-center overflow-hidden w-max group text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors text-lg md:text-lg"
              aria-label="see more about my work and projects"
            >
              <span>[PROJECTS</span>
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

        {/* About Myself section */}
        <section
          className="min-h-[60vh] md:min-h-[90vh] bg-[var(--color-primary)] flex items-center justify-center w-full "
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="w-full max-w-none mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-12 ">
                <header></header>
                <div className="flex flex-col md:flex-row md:items-start md:space-x-20 space-y-3 md:space-y-0">
                  <ScrollAnimate animateOnScroll>
                    <p className="text-2xl md:text-4xl lg:text-5xl font-normal text-[var(--color-dark)] leading-tight flex-1 max-w-full md:max-w-4xl">
                      I&apos;m a junior web developer and cybersecurity
                      enthusiast based in Limburg, the Netherlands, passionate
                      about building secure, scalable projects and continuously
                      learning in the field.
                    </p>
                  </ScrollAnimate>
                  <ScrollAnimate animateOnScroll>
                    <aside className="text-lg md:text-2xl text-[var(--color-darkgray)] hidden md:block flex-shrink-0 leading-relaxed text-left ml-auto">
                      <address className="not-italic">
                        <p>Experiences gained</p>
                        <p>& where I’ve</p>
                        <p>studied</p>
                      </address>
                    </aside>
                  </ScrollAnimate>
                </div>
                <nav
                  className="flex flex-row items-start space-x-6 md:space-x-8 pt-4 md:pt-8"
                  aria-label="About page navigation"
                >
                  <div
                    className="text-base md:hidden leading-relaxed"
                    style={{ color: "var(--color-darkgray)" }}
                  >
                    <p>Raised in the southern Netherlands.</p>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <hr className="w-full mx-auto border-t border-[var(--color-graylight)]" />

        {/* Resume  */}
        <section className="w-full py-32 md:py-40 flex flex-col gap-32">
          {/* OVATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
            <div>
              <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-black leading-none text-[var(--color-dark)] mb-4">
                OVATION
              </h2>
              <div className="mt-2 text-base text-[var(--color-dark)] font-medium">
                SEP 2024 – FEB 2025
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-6 text-[var(--color-graylight)] font-semibold uppercase text-base md:text-lg">
                <ScrollAnimate animateOnScroll>
                  <span>Internship</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Web Development</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Webflow</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Excel</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>SEO</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>REPOSITIONING</span>
                </ScrollAnimate>
              </div>
              <ScrollAnimate animateOnScroll>
                <p className="text-base md:text-lg text-[var(--color-dark)] leading-relaxed">
                  During my internship at Ovation, I focused on concepting,
                  designing and strategically positioning the agency towards a
                  new target audience in the make industry. I worked on a
                  variety of web projects and gained hands-on experience with
                  HTML, CSS, JavaScript, Figma, and Webflow. I also improved my
                  skills in Excel for data management. I contributed to projects
                  for several brands such as <b>Club Hacienda</b>,{" "}
                  <b>Hydrauliek Service Venlo</b>, and <b>Jill en Co</b>, where
                  I developed an Excel-based system to filter and manage over
                  10,000 products. This experience gave me valuable insights
                  into the workflow of a digital agency and highlighted the
                  importance of both technical and communication skills in
                  delivering successful projects.
                  <a
                    href="https://www.ovation-agency.nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center overflow-hidden mt-10 w-max group text-[var(--color-dark)] hover:text-[var(--color-dark)] transition-colors text-base md:text-base"
                    aria-label="Ovation agency website"
                  >
                    <span>[VISIT OVATION </span>
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
                </p>
              </ScrollAnimate>
            </div>
          </div>
          {/* Cytric (was Projects) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
            <div>
              <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-black leading-none text-[var(--color-dark)] mb-4">
                CYTRIC
              </h2>
              <div className="mt-2 text-base text-[var(--color-dark)] font-medium">
                2024 – Present
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-6 text-[var(--color-graylight)] font-semibold uppercase text-base md:text-lg">
                <ScrollAnimate animateOnScroll>
                  <span>Founder</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Fullstack</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Infrastructure</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Security</span>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <span>Cloudflare</span>
                </ScrollAnimate>
              </div>
              <ScrollAnimate animateOnScroll>
                <p className="text-base md:text-lg text-[var(--color-dark)] leading-relaxed">
                  Cytric (previously known as Cybrance) is my own individual
                  project focused on building a modern Dutch/English bot hosting
                  platform from the ground up. I have been responsible for
                  everything from the branding and frontend design to backend
                  development, infrastructure setup and security. My work
                  includes creating a scalable and secure platform, integrating
                  payment systems, managing APIs and database and delivering a
                  seamless user experience. This project has allowed me to apply
                  and expand my skills in fullstack development and cloud
                  infrastructure.
                  <a
                    href="https://cytric.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center overflow-hidden mt-10 w-max group text-[var(--color-dark)] hover:text-[var(--color-dark)] transition-colors text-base md:text-base"
                    aria-label="Visit Cytric website"
                  >
                    <span>[VISIT CYTRIC </span>
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
                </p>
              </ScrollAnimate>
            </div>
          </div>
          <hr className="w-full mx-auto border-t border-[var(--color-graylight)]" />
        </section>

        {/* Resume */}
        <section className="w-full py-12 md:py-12 bg-[var(--color-primary)]">
          <div className="mx-auto flex flex-col md:flex-row gap-16 md:gap-24 w-full max-w-none px-4">
            {/* Education */}
            <div className="w-full md:w-1/3 flex flex-col gap-16">
              <div>
                <ScrollAnimate animateOnScroll>
                  <h3 className="text-2xl md:text-3xl font-black text-[var(--color-dark)] mb-2 uppercase">
                    BACHELOR ICT MEDIA
                  </h3>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <div className="text-lg text-[var(--color-graylight)]">
                    2022 – Present
                  </div>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <div className="text-lg text-[var(--color-graylight)]">
                    Specialisation: Cybersecurity
                  </div>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <div className="text-lg text-[var(--color-graylight)]">
                    <a
                      href="https://www.fontys.nl/Opleidingen/ICT-bachelor-voltijd.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[#663366] hover:underline transition-colors text-lg"
                      aria-label="Visit the Fontys website"
                    >
                      Fontys University of Applied Sciences
                    </a>
                  </div>
                </ScrollAnimate>
              </div>
            </div>
            {/* Center: Skills */}
            <div className="w-full md:w-1/3 flex flex-col md:pl-24">
              <ScrollAnimate animateOnScroll>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--color-dark)] mb-6 uppercase tracking-wide">
                  WHAT I LEARNED
                </h3>
              </ScrollAnimate>
              <ul className="flex flex-wrap gap-3 text-lg text-[var(--color-primary)]">
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Figma
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Next.js
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    React
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Linux
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Frontend
                  </li>
                </ScrollAnimate>

                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    TypeScript
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    MongoDB
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Git
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Networking
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Basic Hacking
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Node.js & Express
                  </li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li className="bg-[var(--color-dark)] rounded-lg px-4 py-2 font-semibold">
                    Adobe tools
                  </li>
                </ScrollAnimate>
              </ul>
            </div>
            {/* Right: Languages */}
            <div className="w-full md:w-1/3 flex flex-col items-start md:items-end">
              <ScrollAnimate animateOnScroll>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--color-dark)] mb-6 uppercase">
                  LANGUAGES
                </h3>
              </ScrollAnimate>
              <ul className="space-y-2 text-lg text-[var(--color-graylight)] text-left md:text-right">
                <ScrollAnimate animateOnScroll>
                  <li>Dutch</li>
                </ScrollAnimate>
                <ScrollAnimate animateOnScroll>
                  <li>English</li>
                </ScrollAnimate>
              </ul>
            </div>
          </div>
          {/* High School Diploma below the main row */}
          <div className="mx-auto w-full max-w-none px-4 mt-12 flex flex-col items-start">
            <div>
              <ScrollAnimate animateOnScroll>
                <h3 className="text-2xl md:text-2xl font-black text-[var(--color-dark)] mb-2 uppercase">
                  HIGH SCHOOL DIPLOMA (HAVO)
                </h3>
              </ScrollAnimate>
              <ScrollAnimate animateOnScroll>
                <ScrollAnimate animateOnScroll>
                  <div className="text-lg text-[var(--color-graylight)]">
                    Aug 2017 - Jul 2022
                  </div>
                </ScrollAnimate>
                <div className="text-lg text-[var(--color-graylight)]">
                  <a
                    href="https://www.ursula.nl/leerlingen/havo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center overflow-hidden w-max group text-[var(--color-graylight)] hover:text-[#424d94] hover:underline transition-colors text-lg"
                    aria-label="Visit the Sint Ursula website"
                  >
                    Sint Ursula Horn
                  </a>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
