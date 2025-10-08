"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // target position (mouse), current position (lerped)
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(true); // always true so dot stays visible

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      // setVisible(true); // no longer needed, always visible
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // smooth follow loop
    const tick = () => {
      const d = dotRef.current;
      if (!d) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      // lerp for smooth movement
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      d.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      d.style.opacity = visible ? "1" : "0";

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="fixed z-50 pointer-events-none"
      style={{
        left: 0,
        top: 0,
        width: 12,
        height: 12,
        borderRadius: "9999px",
        background: "#fff",
        boxShadow: "0 0 8px 2px rgba(0,0,0,0.10)",
        mixBlendMode: "difference",
        transition: "transform 0.1s, opacity 0.2s",
        opacity: 1, // always visible
        willChange: "transform, opacity",
      }}
    />
  );
}
