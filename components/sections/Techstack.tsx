"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const techs = [
	{ name: "HTML", icon: "/icons/html.svg" },
	{ name: "CSS", icon: "/icons/css.svg" },
	{ name: "JavaScript", icon: "/icons/js.svg" },
	{ name: "TypeScript", icon: "/icons/ts.svg" },
	{ name: "React", icon: "/icons/react.svg" },
	{ name: "Next.js", icon: "/icons/nextjs.svg" },
	{ name: "Node.js", icon: "/icons/nodejs.svg" },
	{ name: "Tailwind", icon: "/icons/tailwind.svg" },
	{ name: "Git", icon: "/icons/git.svg" },
	{ name: "Figma", icon: "/icons/figma.svg" },
];

export default function Techstack() {
	const modernRef = useRef<HTMLSpanElement>(null);
	const techstackRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const modern = modernRef.current;
		const techstack = techstackRef.current;
		if (!modern || !techstack) return;

		modern.style.transform = "translateY(80px) scale(0.7) rotate(-10deg)";
		modern.style.filter = "blur(8px)";
		techstack.style.transform = "translateY(80px) scale(0.7) rotate(10deg)";
		techstack.style.filter = "blur(8px)";

		const handleScroll = () => {
			const modernRect = modern.getBoundingClientRect();
			const techstackRect = techstack.getBoundingClientRect();
			const trigger = window.innerHeight * 0.85;

			if (modernRect.top < trigger) {
				modern.style.transition =
					"transform 0.7s cubic-bezier(.77,.2,.18,1), filter 0.7s cubic-bezier(.77,.2,.18,1)";
				modern.style.transform = "translateY(0) scale(1) rotate(0deg)";
				modern.style.filter = "blur(0)";
			}
			if (techstackRect.top < trigger + 40) {
				techstack.style.transition =
					"transform 0.7s cubic-bezier(.77,.2,.18,1) 0.15s, filter 0.7s cubic-bezier(.77,.2,.18,1) 0.15s";
				techstack.style.transform = "translateY(0) scale(1) rotate(0deg)";
				techstack.style.filter = "blur(0)";
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			modern.style.transform = "";
			modern.style.filter = "";
			modern.style.transition = "";
			techstack.style.transform = "";
			techstack.style.filter = "";
			techstack.style.transition = "";
		};
	}, []);

	return (
		<section className="pt-42 md:pt-48">
			<div className="w-full max-w-none mx-auto">
				<div className="flex flex-col justify-center items-center mb-12">
					<span
						ref={modernRef}
						className="uppercase font-black text-[var(--color-dark)] mb-2 tracking-tight leading-none"
						style={{
							fontSize: "15vw",
						}}
					>
						MODERN
					</span>
					<h2
						ref={techstackRef}
						className="uppercase font-black text-[var(--color-dark)] leading-none"
						style={{
							fontSize: "15vw",
						}}
					>
						TECHSTACK
					</h2>
				</div>
			</div>
		</section>
	);
}
