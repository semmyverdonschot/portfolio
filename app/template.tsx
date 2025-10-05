"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    setTransitionComplete(false);
  }, []);

  useEffect(() => {
    if (transitionComplete) {
      window.dispatchEvent(new CustomEvent("pageTransitionComplete"));
    }
  }, [transitionComplete]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{
        ease: [0.22, 1, 0.36, 1],
        duration: 0.5,
        type: "tween",
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        zIndex: 40,
        overflow: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
      className="px-2md:px-4"
      onAnimationStart={() => {
        const element = document.querySelector(
          "[data-template]",
        ) as HTMLElement;
        if (element) {
          element.style.backgroundColor = "var(--color-primary)";
        }
      }}
      onAnimationComplete={() => {
        window.scrollTo(0, 0);

        const element = document.querySelector(
          "[data-template]",
        ) as HTMLElement;
        if (element) {
          element.style.backgroundColor = "";
          element.style.position = "relative";
          element.style.width = "auto";
          element.style.height = "auto";
          element.style.overflow = "visible";
          element.style.zIndex = "auto";
          element.style.overflowX = "";
          element.style.boxSizing = "";
        }
        setTimeout(() => {
          setTransitionComplete(true);
        }, 100);
      }}
      data-template
    >
      {children}
    </motion.div>
  );
}
