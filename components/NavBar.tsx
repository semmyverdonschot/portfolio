"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  isHome?: boolean;
}

interface NavButtonProps {
  item: NavItem;
  idx: number;
  activeIndex: number;
  onClick: () => void;
}

function NavButton({ item, idx, activeIndex, onClick }: NavButtonProps) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: activeIndex === idx ? 1 : 0,
        backgroundColor:
          activeIndex === idx ? "var(--color-dark)" : "transparent",
        duration: 0.15,
        ease: "power3.out",
      });
    }
  }, [activeIndex, idx]);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex items-center cursor-pointer group relative"
    >
      {activeIndex !== idx && (
        <div className="absolute w-3 h-3 rounded-full border border-[var(--color-dark)] top-1/2 left-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      <div
        ref={dotRef}
        className="w-3 h-3 mr-2 rounded-full border-2 border-[var(--color-dark)]"
        style={{ transformOrigin: "center", transform: "scale(0)" }}
      />
      <span className={item.isHome ? "uppercase" : ""}>{item.name}</span>
    </Link>
  );
}

export default function Navbar() {
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const bottomLinksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "SEMMY VERDONSCHOT", href: "/", isHome: true },
    { name: "PROJECTS", href: "/projects" },
    { name: "ABOUT", href: "/about" },
  ];

  const activeIndex = navItems.findIndex((item) => item.href === pathname);
  const finalActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  const handleNavClick = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      const tlOpen = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlOpen.to(menuRef.current, { x: 0, duration: 0.8 });

      if (navItemsRef.current) {
        Array.from(navItemsRef.current.children).forEach((child, i) => {
          const inner = (child as HTMLElement).querySelector("span");
          if (inner) {
            gsap.fromTo(
              inner,
              { yPercent: 100 },
              {
                yPercent: 0,
                duration: 0.8,
                delay: i * 0.05,
                ease: "power3.out",
              },
            );
          }
        });
      }

      if (bottomLinksRef.current) {
        Array.from(bottomLinksRef.current.children).forEach((child, i) => {
          gsap.fromTo(
            child as HTMLElement,
            { opacity: 0, yPercent: 10 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 0.5,
              delay: i * 0.05,
              ease: "power3.out",
            },
          );
        });
      }
    } else {
      const tlClose = gsap.timeline({ defaults: { ease: "power3.in" } });

      if (navItemsRef.current) {
        Array.from(navItemsRef.current.children).forEach((child, i) => {
          const inner = (child as HTMLElement).querySelector("span");
          if (inner) {
            gsap.to(inner, { yPercent: 100, duration: 0.5, delay: i * 0.02 });
          }
        });
      }

      if (bottomLinksRef.current) {
        Array.from(bottomLinksRef.current.children).forEach((child, i) => {
          gsap.to(child as HTMLElement, {
            opacity: 0,
            yPercent: 10,
            duration: 0.3,
            delay: i * 0.02,
          });
        });
      }

      if (menuRef.current) {
        tlClose.to(menuRef.current, { x: "100%", duration: 0.7, delay: 0.05 });
      }
    }
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full px-4 md:px-8 py-5 font-[var(--font-albert-sans)] z-50">
      {/* Desktop */}
      <div className="hidden md:flex w-full justify-between items-center text-[16px] text-[var(--color-dark)]">
        {navItems.map((item, idx) => (
          <NavButton
            key={idx}
            item={item}
            idx={idx}
            activeIndex={finalActiveIndex}
            onClick={handleNavClick}
          />
        ))}
        <Link
          href="mailto:hello@semmyverdonschot.com"
          className="px-6 py-3 rounded-full bg-[var(--color-dark)] text-white font-semibold hover:opacity-80 transition-opacity duration-300"
        >
          CONTACT
        </Link>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center relative z-50 w-full">
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center space-x-2 z-50 cursor-pointer"
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              menuOpen
                ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                : "bg-[var(--color-dark)] border-[var(--color-dark)]"
            }`}
          />
          <span
            className={`font-normal uppercase transition-colors duration-500 ${
              menuOpen ? "text-white" : "text-[var(--color-dark)]"
            }`}
          >
            SV
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="mailto:hello@semmyverdonschot.com"
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-500 ${
              menuOpen
                ? "bg-[var(--color-primary)] text-[var(--color-dark)]"
                : "bg-[var(--color-dark)] text-white"
            }`}
          >
            CONTACT
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-8 h-4 flex items-center justify-center z-50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block absolute h-[1px] w-full bg-[var(--color-dark)] transition-all duration-500 origin-center ${
                menuOpen
                  ? "rotate-45 bg-[var(--color-primary)]"
                  : "translate-y-[-0.42rem]"
              }`}
            />
            <span
              className={`block absolute h-[1px] w-full bg-[var(--color-dark)] transition-all duration-500 origin-center ${
                menuOpen
                  ? "-rotate-45 bg-[var(--color-primary)]"
                  : "translate-y-[0.42rem]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full w-full bg-[var(--color-dark)] flex flex-col justify-start pl-6 pt-28 text-[60px] transform translate-x-full overflow-hidden"
      >
        <div
          ref={navItemsRef}
          className="flex flex-col space-y-2 overflow-hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="relative overflow-hidden w-max cursor-pointer"
            >
              <span className="block text-[70px] font-semibold text-white">
                {item.isHome ? "HOME" : item.name}
              </span>
            </Link>
          ))}
        </div>

        <div
          ref={bottomLinksRef}
          className="flex flex-col space-y-4 mt-20 text-white text-[16px]"
        >
          <a
            href="https://www.linkedin.com/in/semmyverdonschot/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center overflow-hidden w-max group"
          >
            <span>[LINKEDIN</span>
            <svg
              className="w-4 h-4 ml-1 transform rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            <span>]</span>
          </a>

          <a
            href="https://github.com/cybrance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center overflow-hidden w-max group"
          >
            <span>[GITHUB</span>
            <svg
              className="w-4 h-4 ml-1 transform rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            <span>]</span>
          </a>
          <a
            href="https://wa.me/0641760992"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center overflow-hidden w-max group"
          >
            <span>[WHATSAPP</span>
            <svg
              className="w-4 h-4 ml-1 transform rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            <span>]</span>
          </a>

          <span>© 2025</span>
        </div>
      </div>
    </nav>
  );
}
