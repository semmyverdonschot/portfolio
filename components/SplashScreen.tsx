"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fake visual counter
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) clearInterval(timer);
    }, 15); // fast counter

    // Load something in the background
    const loadData = async () => {
      // simulate loading 1-2 seconds
      await new Promise((r) => setTimeout(r, 1200));
      setLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    // When both counter and data are done
    if (count >= 100 && loaded && numberRef.current && containerRef.current) {
      // Number flies up under mask
      gsap.to(numberRef.current, { yPercent: -100, duration: 0.6, ease: "power3.inOut" });
      // Container slides up
      gsap.to(containerRef.current, { yPercent: -100, duration: 1, delay: 0.2, ease: "power4.inOut", onComplete: onFinish });
    }
  }, [count, loaded, onFinish]);

  return (
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--color-primary)] overflow-hidden">
      <div className="overflow-hidden h-[20px]">
        <div ref={numberRef} className="text-[16px] font-bold text-[var(--color-dark)]">{count}</div>
      </div>
    </div>
  );
}
