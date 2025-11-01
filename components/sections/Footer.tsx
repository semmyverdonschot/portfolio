"use client";
import LiveClock from "../ui/LiveClock";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showGif, setShowGif] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleWordEnter = () => {
    if (isMobile) setShowGif((prev) => !prev);
    else setShowGif(true);
  };
  const handleFooterLeave = () => {
    if (!isMobile) setShowGif(false);
  };

  return (
    <footer
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-primary)] py-16 md:py-24 rounded-2xl mb-8 mt-24 md:mt-32"
      onMouseLeave={handleFooterLeave}
    >
      <div className="w-full max-w-none">
        {/* Top Section*/}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 space-y-4 md:space-y-0 mb-8">
          <div className="text-sm md:text-base font-normal text-[var(--color-primary)] uppercase tracking-wider">
            Netherlands, LI
          </div>
          <div className="flex-shrink-0">
            <LiveClock className="font-normal text-sm md:text-base text-[var(--color-primary)]" />
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col items-center justify-center md:mt-20 space-y-4 ${
            showGif
              ? isMobile
                ? "mb-8"
                : "mb-24"
              : isMobile
                ? "mb-24"
                : "mb-48"
          }`}
        >
          <div className="flex items-center space-x-4">
            {/* Logo text */}
            <div className="text-center">
              <h2
                className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase leading-none"
                onMouseEnter={!isMobile ? handleWordEnter : undefined}
                onClick={isMobile ? handleWordEnter : undefined}
              >
                Semmy
              </h2>
              {/* Animated GIF reveal */}
              <div
                style={{
                  height: showGif ? (isMobile ? "120px" : "180px") : "0px",
                  width: showGif ? (isMobile ? "220px" : "360px") : "0px",
                  opacity: showGif ? 1 : 0,
                  margin: showGif ? "24px auto" : "0 auto",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "var(--color-secondary)",
                  boxShadow: showGif ? "0 4px 24px rgba(0,0,0,0.18)" : "none",
                  transition:
                    "height 0.5s cubic-bezier(.77,.2,.18,1), width 0.5s cubic-bezier(.77,.2,.18,1), opacity 0.5s cubic-bezier(.77,.2,.18,1), margin 0.5s cubic-bezier(.77,.2,.18,1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showGif && (
                  <Image
                    src="../videos/django.gif"
                    alt="Django GIF"
                    width={isMobile ? 220 : 360}
                    height={isMobile ? 120 : 180}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "16px",
                      display: "block",
                    }}
                    priority
                  />
                )}
              </div>
              <h3
                className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase leading-none"
                onMouseEnter={!isMobile ? handleWordEnter : undefined}
                onClick={isMobile ? handleWordEnter : undefined}
              >
                Verdonschot
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 space-y-4 md:space-y-0">
          {/* Email */}
          <div className="order-1 md:order-2">
            <a
              href="mailto:hello@semmyverdonschot.com"
              className="text-sm uppercase tracking-wider"
            >
              HELLO@SEMMYVERDONSCHOT.COM
            </a>
          </div>
          {/* GitHub */}
          <div className="order-2 md:order-3">
            <a
              href="https://github.com/semmyverdonschot"
              target="_blank"
              className="text-sm uppercase tracking-wider"
            >
              GITHUB
            </a>
          </div>
          {/* LinkedIn */}
          <div className="order-3 md:order-4">
            <a
              href="https://linkedin.com/in/semmyverdonschot"
              target="_blank"
              className="text-sm uppercase tracking-wider"
            >
              LINKEDIN
            </a>
          </div>
          {/* WhatsApp */}
          <div className="order-4 md:order-5">
            <a
              href="https://wa.me/0641760992"
              target="_blank"
              className="text-sm uppercase tracking-wider"
            >
              WHATSAPP
            </a>
          </div>
          {/* Copyright */}
          <div className="order-5 md:order-1">
            <p className="text-sm text-[var(--color-primary)]">© 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
