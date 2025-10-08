"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Techstack() {
	const modernRef = useRef<HTMLSpanElement>(null);
	const techstackRef = useRef<HTMLHeadingElement>(null);
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

	const allTechs = [
		{ name: "React",  href: "https://reactjs.org/" },
		{ name: "Next.js",  href: "https://nextjs.org/" },
		{ name: "TypeScript", href: "https://www.typescriptlang.org/" },
		{ name: "JavaScript",  href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
		{ name: "Vercel",  href: "https://vercel.com/" },
		{ name: "Supabase",  href: "https://supabase.com/" },
		{ name: "Gsap",  href: "https://greensock.com/gsap/" },
		{ name: "Tailwind",  href: "https://tailwindcss.com/" },
		{ name: "Mongodb",  href: "https://www.mongodb.com/" },
		{ name: "Angular",  href: "https://angular.io/" },
	];

	const desktopTopCount = 3;
	const gridTop = allTechs.slice(0, desktopTopCount);
	const gridBottom = allTechs.slice(desktopTopCount);
	const desktopBottomCols = gridBottom.length > 0 ? gridBottom.length : 5;

	const slugify = (s: string) =>
		s
			.toLowerCase()
			.replace(/\.+/g, "")
			.replace(/[^a-z0-9\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-")
			.replace(/-/g, "");

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
							const showBottomBorder = i < allTechs.length - 2; // fix: only show for rows except last
							const iconSrc = `/svg/${slugify(tech.name)}.svg`;
							return (
								<Link
									key={tech.name + i}
									href={tech.href}
									data-index={i}
									className={`group flex items-center justify-center cursor-pointer ${hoveredIdx === i ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"} ${showRightBorder ? "border-r border-[#c6c6c6]" : ""} ${showBottomBorder ? "border-b border-[#c6c6c6]" : ""}`}
									style={{
										height: "220px",
										transition: "background-color 0.12s ease",
									}}
									onMouseEnter={() => setHoveredIdx(i)}
									onMouseLeave={() => setHoveredIdx(null)}
									aria-label={tech.name}
								>
									<div className="relative w-[72px] h-[72px]">
										<Image src={iconSrc} alt={tech.name} fill sizes="72px" className="object-contain" />
										{/* overlay shows primary color using SVG as mask */}
										<div
											className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
											style={{
												background: "var(--color-primary)",
												WebkitMaskImage: `url(${iconSrc})`,
												WebkitMaskSize: "contain",
												WebkitMaskRepeat: "no-repeat",
												WebkitMaskPosition: "center",
												maskImage: `url(${iconSrc})`,
												maskSize: "contain",
												maskRepeat: "no-repeat",
												maskPosition: "center",
											}}
										/>
									</div>
								</Link>
							);
						})}
					</div>

					{/* Desktop: 3 top + rest bottom, split bottom into dynamic columns */}
					<div className="hidden md:grid md:grid-cols-3 w-full bg-[var(--color-primary)]">
						{gridTop.map((tech, i) => {
							const iconSrc = `/svg/${slugify(tech.name)}.svg`;
							return (
								<Link
									key={tech.name + i}
									href={tech.href}
									data-index={i}
									className={`group flex items-center justify-center cursor-pointer ${hoveredIdx === i ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"} border-b border-[#c6c6c6] ${i === 1 ? "border-l border-r border-[#c6c6c6]" : ""}`}
									style={{
										height: "260px", // taller top boxes
										transition: "background-color 0.12s ease",
									}}
									onMouseEnter={() => setHoveredIdx(i)}
									onMouseLeave={() => setHoveredIdx(null)}
									aria-label={tech.name}
								>
									<div className="relative w-[96px] h-[96px]">
										<Image src={iconSrc} alt={tech.name} fill sizes="96px" className="object-contain" />
										<div
											className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
											style={{
												background: "var(--color-primary)",
												WebkitMaskImage: `url(${iconSrc})`,
												WebkitMaskSize: "contain",
												WebkitMaskRepeat: "no-repeat",
												WebkitMaskPosition: "center",
												maskImage: `url(${iconSrc})`,
												maskSize: "contain",
												maskRepeat: "no-repeat",
												maskPosition: "center",
											}}
										/>
									</div>
								</Link>
							);
						})}
					</div>

					<div className="hidden md:grid w-full bg-[var(--color-primary)]" style={{ gridTemplateColumns: `repeat(${desktopBottomCols}, minmax(0, 1fr))` }}>
						{gridBottom.map((tech, i) => {
							const idx = i + desktopTopCount;
							const iconSrc = `/svg/${slugify(tech.name)}.svg`;
							return (
								<Link
									key={tech.name + i}
									href={tech.href}
									data-index={idx}
									className={`group flex items-center justify-center cursor-pointer ${hoveredIdx === idx ? "bg-[var(--color-dark)]" : "bg-[var(--color-primary)]"}`}
									style={{
										height: "220px", 
										borderRight: i % desktopBottomCols < desktopBottomCols - 1 ? "1px solid #c6c6c6" : "none",
										transition: "background-color 0.12s ease",
									}}
									onMouseEnter={() => setHoveredIdx(idx)}
									onMouseLeave={() => setHoveredIdx(null)}
									aria-label={tech.name}
								>
									<div className="relative w-[72px] h-[72px]">
										<Image src={iconSrc} alt={tech.name} fill sizes="72px" className="object-contain" />
										<div
											className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
											style={{
												background: "var(--color-primary)",
												WebkitMaskImage: `url(${iconSrc})`,
												WebkitMaskSize: "contain",
												WebkitMaskRepeat: "no-repeat",
												WebkitMaskPosition: "center",
												maskImage: `url(${iconSrc})`,
												maskSize: "contain",
												maskRepeat: "no-repeat",
												maskPosition: "center",
											}}
										/>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
 }