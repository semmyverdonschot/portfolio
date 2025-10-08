"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, ReactElement } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface SplitTextInstance {
  lines: Element[];
  revert: () => void;
}

interface CopyProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLElement[]>([]);
  const splitRef = useRef<SplitTextInstance[]>([]);
  const lines = useRef<Element[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      elementRef.current = [];
      splitRef.current = [];
      lines.current = [];

      let elements: HTMLElement[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRef.current.push(element);

        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          autoSplit: true,
          onSplit: (self) => {
            lines.current = self.lines;
            gsap.set(self.lines, { yPercent: 100 });

            const animationProps = {
              yPercent: 0,
              duration: 0.55, 
              stagger: 0.07,  
              ease: "power4.out",
              delay: delay,
            };

            if (animateOnScroll) {
              let startValue = "top 100%";
              if (typeof window !== "undefined") {
                const isAboutSection = containerRef.current?.id === "about-heading" ||
                  containerRef.current?.closest("#about");
                const isBigScreen = window.innerWidth >= 1024;
                if (isAboutSection) {
                  startValue = isBigScreen ? "top 180%" : "top 90%";
                } else {
                  startValue = isBigScreen ? "top 180%" : "top 210%";
                }
              }
              gsap.to(self.lines, {
                ...animationProps,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: startValue,
                  once: true,
                },
              });
            } else {
              gsap.to(self.lines, animationProps);
            }
          },
        }) as unknown as SplitTextInstance;

        splitRef.current.push(split);

        const computedStyles = window.getComputedStyle(element);
        const textIndent = computedStyles.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 1) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          element.style.textIndent = "0px";
        }
      });

      return () => {
        splitRef.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    }
  );

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    const child = children as ReactElement<{ ref?: React.Ref<HTMLElement> }>;
    return React.cloneElement(child, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
