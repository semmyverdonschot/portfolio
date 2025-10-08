"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

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

	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

	const allTechs = [
		{ name: "HTML", icon: "/placeholder.webp" },
		{ name: "CSS", icon: "/placeholder.webp" },
		{ name: "JavaScript", icon: "/placeholder.webp" },
		{ name: "TypeScript", icon: "/placeholder.webp" },
		{ name: "React", icon: "/placeholder.webp" },
		{ name: "Next.js", icon: "/placeholder.webp" },
		{ name: "Node.js", icon: "/placeholder.webp" },
		{ name: "Tailwind", icon: "/placeholder.webp" },
	];

	const desktopTopCount = 3;
	const desktopBottomCols = 5;
	const gridTop = allTechs.slice(0, desktopTopCount);
	const gridBottom = allTechs.slice(desktopTopCount);

	return (
		<section className="pt-64 md:pt-64">
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
				<div className="flex flex-col w-full pt-24 md:pt-24">
					<span className="text-sm md:text-base text-[var(--color-dark)] uppercase tracking-wider font-bold mb-2 md:mb-3">
						I&apos;m good at
					</span>
					{/* Mobile: 2 columns, all techs */}
					<div className="grid grid-cols-2 md:hidden w-full bg-[var(--color-primary)]">
						{allTechs.map((tech, i) => {
							const isLastRow = i >= allTechs.length - 2;
							const isLeftCol = i % 2 === 0;
							const isLastItem = i === allTechs.length - 1;
							const showRightBorder = isLeftCol && !isLastItem;
							const showBottomBorder = !isLastRow;
							return (
								<div
									key={tech.name}
									className={`flex items-center justify-center cursor-pointer transition-colors duration-500 ${
										hoveredIdx === i ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"
									} ${showRightBorder ? "border-r border-[#c6c6c6]" : ""} ${showBottomBorder ? "border-b border-[#c6c6c6]" : ""}`}
									style={{
										height: "160px",
									}}
									onMouseEnter={() => setHoveredIdx(i)}
									onMouseLeave={() => setHoveredIdx(null)}
								>
									<Image
										src={tech.icon}
										alt={tech.name}
										width={100}
										height={100}
										className="object-contain transition-transform duration-500"
									/>
								</div>
							);
						})}
					</div>
					{/* Desktop: 3 top + rest bottom, split bottom into 5 columns */}
					<div className="hidden md:grid md:grid-cols-3 w-full bg-[var(--color-primary)]">
						{gridTop.map((tech, i) => (
							<div
								key={tech.name}
								className={`flex items-center justify-center cursor-pointer border-b border-[#c6c6c6] transition-colors duration-500 ${
									hoveredIdx === i ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"
								} ${i === 1 ? "border-l border-r border-[#c6c6c6]" : ""}`}
								style={{
									height: "200px",
								}}
								onMouseEnter={() => setHoveredIdx(i)}
								onMouseLeave={() => setHoveredIdx(null)}
							>
								<Image
									src={tech.icon}
									alt={tech.name}
									width={120}
									height={120}
									className="object-contain transition-transform duration-500"
								/>
							</div>
						))}
					</div>
					<div className="hidden md:grid md:grid-cols-5 w-full bg-[var(--color-primary)]">
						{gridBottom.map((tech, i) => (
							<div
								key={tech.name}
								className={`flex items-center justify-center cursor-pointer transition-colors duration-500 ${
									hoveredIdx === i + desktopTopCount ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"
								}`}
								style={{
									height: "160px",
									borderRight: i % desktopBottomCols < desktopBottomCols - 1 ? "1px solid #c6c6c6" : "none",
								}}
								onMouseEnter={() => setHoveredIdx(i + desktopTopCount)}
								onMouseLeave={() => setHoveredIdx(null)}
							>
								<Image
									src={tech.icon}
									alt={tech.name}
									width={100}
									height={100}
									className="object-contain transition-transform duration-500"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}