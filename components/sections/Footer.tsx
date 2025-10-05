"use client";

import { useRef } from "react";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={sectionRef}
      className="bg-[var(--color-dark)] text-[var(--color-primary)] py-16 md:py-24 rounded-2xl mb-8 mt-24 md:mt-32"
    >
      <div className="w-full max-w-none">
        {/* Main Content*/}
        <div className="flex flex-col items-center justify-center mb-24 md:mb-48 mt-12 md:mt-20 space-y-4">
          <div className="flex items-center space-x-4">
            {/* Logo text */}
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase leading-none">
                Semmy
              </h2>
              <h3 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase leading-none">
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
              href="https://github.com/cybrance"
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
