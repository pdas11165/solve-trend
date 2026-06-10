'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export interface ZoomParallaxItem {
	label: string;
	backgroundColor: string;
	textColor: string;
}

interface ZoomParallaxProps {
	/** Array of service cards for the parallax effect (max 7 items) */
	items: ZoomParallaxItem[];
}

export function ZoomParallax({ items }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{items.map(({ label, backgroundColor, textColor }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={label}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div
								className="relative flex h-[25vh] w-[25vw] items-center justify-center rounded-2xl px-4 py-3 text-center shadow-lg"
								style={{ backgroundColor, color: textColor }}
							>
								<span className="text-sm font-semibold leading-tight tracking-tight sm:text-base md:text-lg lg:text-xl">
									{label}
								</span>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
