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
        <div className="absolute w-3 h-3 rounded-full border-1 border-line border-[var(--color-dark)] top-1/2 left-0 transform -translate-y-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
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
  const pathname = usePathname(); // get current path
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "SEMMY VERDONSCHOT", href: "/", isHome: true },
    { name: "PROJECTS", href: "/projects" },
    { name: "ABOUT", href: "/" },
  ];

  // Determine active index based on pathname
  const activeIndex = navItems.findIndex((item) => item.href === pathname);
  const finalActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  useEffect(() => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: menuOpen ? 0 : "100%",
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [menuOpen]);

  const handleNavClick = (idx: number) => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-5 font-[var(--font-albert-sans)] z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full justify-between items-center text-[16px] text-[var(--color-dark)]">
        {navItems.map((item, idx) => (
          <NavButton
            key={idx}
            item={item}
            idx={idx}
            activeIndex={finalActiveIndex}
            onClick={() => handleNavClick(idx)}
          />
        ))}

        {/* CTA */}
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--color-dark)] text-white font-semibold hover:opacity-80 transition-opacity duration-300"
        >
          CONTACT
        </Link>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center relative z-50 w-full">
        {/* SV */}
        <Link
          href="/"
          onClick={() => handleNavClick(0)}
          className="flex items-center space-x-2 z-50 cursor-pointer"
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              finalActiveIndex === 0
                ? menuOpen
                  ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                  : "bg-[var(--color-dark)] border-[var(--color-dark)]"
                : "border-transparent"
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

        <div className="flex items-center space-x-3">
          {/* Mobile CTA */}
          <Link
            href="/contact"
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-500 ${
              menuOpen
                ? "bg-[var(--color-primary)] text-[var(--color-dark)]"
                : "bg-[var(--color-dark)] text-white"
            }`}
          >
            CONTACT
          </Link>

          {/* Hamburger */}
          <button
            className="relative w-8 h-4 flex items-center justify-center z-50"
            onClick={() => setMenuOpen(!menuOpen)}
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

      {/* Mobile Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full w-full bg-black flex flex-col items-start justify-center pl-10 space-y-10 text-[60px] transform translate-x-full"
      >
        {navItems.slice(1).map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="cursor-pointer text-white overflow-hidden"
          >
            <span className="block">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
