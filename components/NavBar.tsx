"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface NavItem {
  name: string;
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
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [activeIndex, idx]);

  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer group relative"
    >
      {/* Hover Outline (only if not active) */}
      {activeIndex !== idx && (
        <div className="absolute w-3 h-3 rounded-full border-2 border-dotted border-[var(--color-dark)] top-1/2 left-0 transform -translate-y-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
      )}

      {/* Animated Dot */}
      <div
        ref={dotRef}
        className="w-3 h-3 mr-2 rounded-full border-2 border-[var(--color-dark)]"
        style={{ transformOrigin: "center" }}
      />

      <span className={item.isHome ? "uppercase" : ""}>{item.name}</span>
    </button>
  );
}

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: "SEMMY VERDONSCHOT", isHome: true },
    { name: "PROJECTS" },
    { name: "ABOUT" },
    { name: "LINKED IN" },
  ];

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
    setActiveIndex(idx);
    setMenuOpen(false);
  };

  const handleSVClick = () => setActiveIndex(0);

  return (
    <nav className="fixed top-0 left-0 w-full px-5 py-5 font-[var(--font-albert-sans)] z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full justify-between items-center text-[16px] text-[var(--color-dark)]">
        {navItems.map((item, idx) => (
          <NavButton
            key={idx}
            item={item}
            idx={idx}
            activeIndex={activeIndex}
            onClick={() => handleNavClick(idx)}
          />
        ))}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center relative z-50">
        <div
          className="flex items-center space-x-2 z-50 cursor-pointer"
          onClick={handleSVClick}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeIndex === 0
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
        </div>

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

      {/* Mobile Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full w-full bg-black flex flex-col items-start justify-center pl-10 space-y-10 text-[60px] transform translate-x-full"
      >
        {navItems.slice(1).map((item, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              handleNavClick(idx + 1);
              gsap.to(e.currentTarget, {
                yPercent: -100,
                duration: 0.6,
                ease: "power3.inOut",
              });
            }}
            className="cursor-pointer text-white overflow-hidden"
          >
            <span className="block">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
