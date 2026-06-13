'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { ScrollCharacterText } from '@/components/ui/text-scroll-animation';

gsap.registerPlugin(ScrollTrigger);

const images = [
	{
		src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Modern architecture building',
	},
	{
		src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Urban cityscape at sunset',
	},
	{
		src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Abstract geometric pattern',
	},
	{
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Mountain landscape',
	},
	{
		src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Minimalist design elements',
	},
	{
		src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Ocean waves and beach',
	},
	{
		src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Forest trees and sunlight',
	},
];

export default function PerfectWorksSection() {
	const servicesScrollRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const root = document.documentElement;
		const previousScrollBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = 'auto';

		const lenis = new Lenis();

		lenis.on('scroll', ScrollTrigger.update);

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			root.style.scrollBehavior = previousScrollBehavior;
			ScrollTrigger.refresh();
		};
	}, []);

	return (
		<section id="services" className="min-h-screen w-full" aria-label="Our Expertise">
			<div ref={servicesScrollRef}>
				<div className="relative flex h-[50vh] items-center justify-center">
					<div
						aria-hidden="true"
						className={cn(
							'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
							'bg-[radial-gradient(ellipse_at_center,rgba(26,26,26,0.1),transparent_50%)]',
							'blur-[30px]',
						)}
					/>
					<div className="relative z-10 text-center">
						<h2
							className="services-zoom-parallax__title"
							style={{ perspective: '500px' }}
						>
							<ScrollCharacterText
								text="Our Expertise"
								scrollTargetRef={servicesScrollRef}
								scrollRange={[0, 0.35]}
							/>
						</h2>
						<div className="services-zoom-parallax__eyebrow mt-4 justify-center">
							<span className="services-brand-dot" aria-hidden="true" />
							<span>OUR EXPERTISE</span>
						</div>
					</div>
				</div>
				<ZoomParallax images={images} />
			</div>
			<div className="h-[50vh]" aria-hidden="true" />
		</section>
	);
}
