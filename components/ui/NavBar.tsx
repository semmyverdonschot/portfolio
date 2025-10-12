"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSlideTogether } from "@/hooks/useStaggerSlide";
import React from "react";

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
  className?: string;
}

const NavButton = React.forwardRef<HTMLAnchorElement, NavButtonProps>(
  function NavButton({ item, idx, activeIndex, onClick, className }, ref) {
    const dotRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrolled = window.scrollY > 100;
        if (scrolled !== isScrolled) {
          setIsScrolled(scrolled);

          if (item.isHome && textRef.current) {
            if (scrolled) {
              gsap
                .timeline()
                .to(textRef.current, {
                  opacity: 0.3,
                  scale: 0.95,
                  duration: 0.2,
                  ease: "power2.out",
                })
                .call(() => {
                  if (textRef.current) {
                    textRef.current.textContent = "SV";
                  }
                })
                .to(textRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
            } else {
              gsap
                .timeline()
                .to(textRef.current, {
                  opacity: 0.3,
                  scale: 0.95,
                  duration: 0.2,
                  ease: "power2.out",
                })
                .call(() => {
                  if (textRef.current) {
                    textRef.current.textContent = "SEMMY VERDONSCHOT";
                  }
                })
                .to(textRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolled, item.isHome]);

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
        ref={ref}
        href={item.href}
        onClick={onClick}
        className={`flex items-center cursor-pointer group relative ${className ?? ""}`}
      >
        {activeIndex !== idx && (
          <div className="absolute w-3 h-3 rounded-full border border-[var(--color-dark)] top-1/2 left-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        <div
          ref={dotRef}
          className="w-3 h-3 mr-2 rounded-full border-2 border-[var(--color-dark)]"
          style={{ transformOrigin: "center", transform: "scale(0)" }}
        />
        <span
          ref={textRef}
          className={item.isHome ? "uppercase" : ""}
          style={{
            minWidth: item.isHome ? "200px" : "auto",
            display: "inline-block",
          }}
        >
          {item.isHome ? "SEMMY VERDONSCHOT" : item.name}
        </span>
      </Link>
    );
  },
);

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navItemRefs = navItems.map(() => useRef<HTMLAnchorElement>(null));

  const activeIndex = navItems.findIndex((item) => item.href === pathname);

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

  useSlideTogether(navItemRefs as React.RefObject<HTMLElement>[], "up", 0.8);

  return (
    <nav className="fixed top-0 left-0 w-full px-4 md:px-8 py-5 font-[var(--font-albert-sans)] z-50">
      {/* Desktop */}
      <div className="hidden md:flex w-full justify-between items-center text-[16px] text-[var(--color-dark)]">
        {navItems.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            <NavButton
              item={item}
              idx={idx}
              activeIndex={activeIndex}
              onClick={handleNavClick}
              ref={navItemRefs[idx]}
              className="translate-y-full"
            />
          </div>
        ))}
<Link
  href="mailto:hello@semmyverdonschot.com"
  className="px-6 py-3 rounded-full bg-[var(--color-dark)] text-[var(--color-primary)] font-semibold hover:bg-[var(--color-secondary)] transition duration-300"
  style={{
    opacity: 0,
    visibility: "hidden",
    animation: "fadeUp 0.8s cubic-bezier(0.55, 0.06, 0.68, 0.19) 0.4s forwards",
  }}
>
  CONTACT
</Link>


<style jsx>{`
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

      {/* Mobile Header */}
      <div
        className="md:hidden flex justify-between items-center w-full px-4"
        style={{
          position: "fixed",
          left: 0,
          zIndex: 100,
        }}
      >
        <div className="flex items-center space-x-2 z-50 cursor-pointer">
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
                menuOpen
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-dark)]"
              }`}
            >
              SV
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="mailto:hello@semmyverdonschot.com"
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-500 ${
              menuOpen
                ? "bg-[var(--color-primary)] text-[var(--color-dark)]"
                : "bg-[var(--color-dark)] text-[var(--color-primary)]"
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
              <span className="block text-[70px] font-semibold text-[var(--color-primary)]">
                {item.isHome ? "HOME" : item.name}
              </span>
            </Link>
          ))}
        </div>

        <div
          ref={bottomLinksRef}
          className="flex flex-col space-y-4 mt-20 text-[var(--color-primary)] text-[16px]"
        >
          <a
            href="https://www.linkedin.com/in/semmyverdonschot/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center overflow-hidden w-max group"
          >
            <span>[LINKEDIN</span>
            <svg
              className="w-4 h-4 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
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
              className="w-4 h-4 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
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
              className="w-4 h-4 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
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
