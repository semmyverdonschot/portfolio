"use client";

import { useEffect, useState } from "react";

export default function LiveClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  const hours12 = hours % 12 || 12;
  const amPm = hours >= 12 ? "PM" : "AM";

  return (
    <p className={`font-normal text-[var(--color-primary)] flex items-center ${className}`}>
      <span>{hours12.toString().padStart(2, "0")}</span>
      <span className="blink-animation mx-1">:</span>
      <span>{minutes.toString().padStart(2, "0")}</span>
      <span className="ml-1">{amPm}</span>
      <style jsx>{`
        .blink-animation {
          animation: blink 1s steps(1, end) infinite;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </p>
  );
}
