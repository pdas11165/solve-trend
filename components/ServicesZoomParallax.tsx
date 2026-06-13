'use client';

import {
	cubicBezier,
	motion,
	useMotionValue,
	useReducedMotion,
	useTransform,
	type MotionValue,
} from 'framer-motion';
import { Fragment, useEffect, useRef } from 'react';


interface ServiceCardItem {
	label: string;
	backgroundColor: string;
	textColor: string;
	image: string;
	tags: string[];
}

const WORK_IMAGES = [
	'https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp',
	'https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1/69c6157dc7884d040282487d_Work%207%20WebP.webp',
	'https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1/69bac6dee6fbe19c625613e7_CMS%20Work%2003%20webp.webp',
	'https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1/69bac6edbbaa23515e2a5e63_CMS%20Work%2004%20webp.webp',
];

const ALL_SERVICES: ServiceCardItem[] = [
	{
		label: 'Brand Strategy',
		backgroundColor: '#E8341A',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[0],
		tags: ['Research', 'Positioning', 'Messaging'],
	},
	{
		label: 'Brand Identity & Graphic Design',
		backgroundColor: '#1A1A1A',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[1],
		tags: ['Logo', 'Identity', 'Print'],
	},
	{
		label: 'Motion Graphics & Animation',
		backgroundColor: '#F7A23B',
		textColor: '#1A1A1A',
		image: WORK_IMAGES[2],
		tags: ['Motion', '3D', 'Effects'],
	},
	{
		label: 'Video Editing & Production',
		backgroundColor: '#050005',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[3],
		tags: ['Editing', 'Color', 'Sound'],
	},
	{
		label: 'User Experience Design',
		backgroundColor: '#2563EB',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[0],
		tags: ['UX', 'Research', 'Prototyping'],
	},
	{
		label: 'Web Development',
		backgroundColor: '#F03223',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[1],
		tags: ['Webflow', 'React', 'Speed'],
	},
	{
		label: 'eCommerce Solutions',
		backgroundColor: '#7C3AED',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[2],
		tags: ['Shopify', 'Checkout', 'Growth'],
	},
	{
		label: 'AI Automation',
		backgroundColor: '#0D9488',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[3],
		tags: ['AI', 'Workflows', 'Agents'],
	},
];

const STRIP_COUNT = 10;

const SCATTER_OFFSETS = [
	{ x: 0, y: 0 },
	{ x: -34, y: -27 },
	{ x: 33, y: -30 },
	{ x: -42, y: 4 },
	{ x: 40, y: 8 },
	{ x: -27, y: 30 },
	{ x: 30, y: 31 },
	{ x: 1, y: -39 },
];

const PHASE = {
	INTRO_END: 0.12,
	ZOOM_START: 0.12,
	ZOOM_END: 0.45,
	SLIDESHOW_START: 0.45,
} as const;

const SLIDE_COUNT = ALL_SERVICES.length;
const SLIDE_STEPS = SLIDE_COUNT - 1;
const STEP_EASE = cubicBezier(0.85, 0, 0.15, 1);
const LINEAR = (t: number) => t;

// How the slideshow scroll range is divided. Each slide's hold is weighted
// much heavier than each shift, so slides linger on screen and the shift to
// the next one is quick and snappy.
const HOLD_WEIGHT = 3.2;
const SHIFT_WEIGHT = 1;

// Build a stepped keyframe track: the slideshow rests on each slide, then
// quickly eases to the next, instead of crawling continuously with the scroll.
// The range is shared across every slide's hold and every shift
// (SLIDE_COUNT holds + SLIDE_STEPS shifts) so each slide — including the last —
// gets an equal beat on screen before it moves on.
const SLIDE_TRACK = (() => {
	const span = 1 - PHASE.SLIDESHOW_START;
	const unit = span / (SLIDE_COUNT * HOLD_WEIGHT + SLIDE_STEPS * SHIFT_WEIGHT);
	const hold = unit * HOLD_WEIGHT;
	const shift = unit * SHIFT_WEIGHT;
	const input: number[] = [PHASE.SLIDESHOW_START];
	const output: string[] = ['0vh'];
	const ease: Array<(t: number) => number> = [];
	let cursor = PHASE.SLIDESHOW_START;

	for (let i = 0; i < SLIDE_STEPS; i++) {
		// Rest on slide i.
		cursor += hold;
		input.push(cursor);
		output.push(`${-i * 100}vh`);
		ease.push(LINEAR);
		// Shift to slide i + 1.
		cursor += shift;
		input.push(cursor);
		output.push(`${-(i + 1) * 100}vh`);
		ease.push(STEP_EASE);
	}

	// Rest on the final slide before the section releases.
	cursor += hold;
	input.push(cursor);
	output.push(`${-SLIDE_STEPS * 100}vh`);
	ease.push(LINEAR);

	return { input, output, ease };
})();

function CardMedia({
	item,
	index,
	strips = 'none',
}: {
	item: ServiceCardItem;
	index: number;
	strips?: 'static' | 'none';
}) {
	const indexLabel = `(${String(index + 1).padStart(2, '0')})`;

	return (
		<div className="szp-card__media">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={item.image}
				alt={item.label}
				className="szp-card__img"
				loading={strips === 'static' ? 'lazy' : 'eager'}
			/>
			{strips === 'static' ? (
				<div className="szp-card__strips szp-card__strips--static" aria-hidden="true">
					{Array.from({ length: STRIP_COUNT }).map((_, stripIndex) => (
						<span key={stripIndex} className="szp-card__strip" />
					))}
				</div>
			) : null}
			<div className="szp-card__content">
				<div className="szp-card__left">
					<span className="szp-card__index">{indexLabel}</span>
					<span className="szp-card__title">{item.label}</span>
				</div>
				<span className="szp-card__divider" aria-hidden="true" />
				<div className="szp-card__tags">
					{item.tags.map((tag, tagIndex) => (
						<Fragment key={tag}>
							{tagIndex > 0 && (
								<span className="szp-card__tag-dot" aria-hidden="true" />
							)}
							<span className="szp-card__tag">{tag}</span>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}

function RevealWord({
	word,
	introProgress,
	delay,
}: {
	word: string;
	introProgress: MotionValue<number>;
	delay: number;
}) {
	const clipPath = useTransform(
		introProgress,
		[delay, delay + 0.45],
		['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
	);

	return (
		<motion.span style={{ clipPath }} className="inline-block">
			{word}
		</motion.span>
	);
}

function IntroTitle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
	const introProgress = useTransform(
		scrollYProgress,
		[0, PHASE.INTRO_END],
		[0, 1],
	);
	const opacity = useTransform(
		scrollYProgress,
		[0, PHASE.INTRO_END * 0.7, PHASE.ZOOM_START + 0.06],
		[1, 1, 0],
	);
	const y = useTransform(
		scrollYProgress,
		[PHASE.INTRO_END * 0.5, PHASE.ZOOM_START + 0.08],
		[0, -72],
	);
	const hintOpacity = useTransform(
		scrollYProgress,
		[0.03, 0.07, PHASE.ZOOM_START + 0.04],
		[0, 0.55, 0],
	);

	return (
		<motion.div
			className="services-zoom-parallax__title-wrap"
			style={{ opacity, y }}
		>
			<h2 className="services-zoom-parallax__title">
				<RevealWord word="Our" introProgress={introProgress} delay={0.05} />
				{'\u00A0'}
				<RevealWord word="Services" introProgress={introProgress} delay={0.18} />
			</h2>
			<motion.p className="services-zoom-parallax__hint" style={{ opacity: hintOpacity }}>
				Scroll to explore
			</motion.p>
		</motion.div>
	);
}


function ZoomCard({
	item,
	index,
	zoomProgress,
}: {
	item: ServiceCardItem;
	index: number;
	zoomProgress: MotionValue<number>;
}) {
	const isHero = index === 0;
	const offset = SCATTER_OFFSETS[index % SCATTER_OFFSETS.length] ?? { x: 0, y: 0 };
	const fly = isHero ? 1 : 2.3;

	const scale = useTransform(
		zoomProgress,
		[0, 1],
		isHero ? [0.62, 1] : [1, 2.6],
	);
	const opacity = useTransform(
		zoomProgress,
		isHero ? [0, 1] : [0.42, 0.82],
		isHero ? [1, 1] : [1, 0],
	);
	const x = useTransform(zoomProgress, (progress) => {
		const shift = offset.x + (offset.x * fly - offset.x) * progress;
		return `calc(-50% + ${shift}vw)`;
	});
	const y = useTransform(zoomProgress, (progress) => {
		const shift = offset.y + (offset.y * fly - offset.y) * progress;
		return `calc(-50% + ${shift}vh)`;
	});

	return (
		<motion.div
			className={`szp-zoom-card${isHero ? ' szp-zoom-card--hero' : ''}`}
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				x,
				y,
				scale,
				opacity,
				zIndex: isHero ? 5 : 1,
			}}
			aria-hidden="true"
		>
			<CardMedia item={item} index={index} strips="static" />
		</motion.div>
	);
}

function SlideshowTrack({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
	const trackY = useTransform(
		scrollYProgress,
		SLIDE_TRACK.input,
		SLIDE_TRACK.output,
		{ ease: SLIDE_TRACK.ease },
	);
	const slideshowOpacity = useTransform(
		scrollYProgress,
		[PHASE.ZOOM_END - 0.04, PHASE.ZOOM_END + 0.04],
		[0, 1],
	);
	const scrimOpacity = useTransform(
		scrollYProgress,
		[0, PHASE.INTRO_END * 0.6, PHASE.INTRO_END],
		[1, 1, 0],
	);

	return (
		<motion.div
			className="services-zoom-parallax__slideshow"
			style={{ opacity: slideshowOpacity }}
		>
			<motion.div className="services-zoom-parallax__track" style={{ y: trackY }}>
				{ALL_SERVICES.map((item, index) => (
					<article key={item.label} className="szp-fullscreen-slide" aria-label={item.label}>
						<CardMedia item={item} index={index} strips="none" />
					</article>
				))}
			</motion.div>
			<motion.div
				className="services-zoom-parallax__intro-scrim"
				style={{ opacity: scrimOpacity }}
				aria-hidden="true"
			/>
		</motion.div>
	);
}


export default function ServicesZoomParallax() {
	const reduceMotion = useReducedMotion();
	const zoomRef = useRef<HTMLDivElement>(null);
	const scrollYProgress = useMotionValue(0);

	useEffect(() => {
		const el = zoomRef.current;
		if (!el) return;

		const update = () => {
			const scrollable = el.offsetHeight - window.innerHeight;
			if (scrollable <= 0) return;
			const rect = el.getBoundingClientRect();
			const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
			scrollYProgress.set(progress);
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, [scrollYProgress]);

	const zoomProgress = useTransform(
		scrollYProgress,
		[PHASE.ZOOM_START, PHASE.ZOOM_END],
		[0, 1],
	);
	const scatterOpacity = useTransform(
		scrollYProgress,
		[0.04, PHASE.ZOOM_START, PHASE.ZOOM_END - 0.05, PHASE.ZOOM_END],
		[0, 1, 1, 0],
	);

	if (reduceMotion) {
		return (
			<section className="services-zoom-parallax services-zoom-parallax--static">
				<div className="services-zoom-parallax__inner">
					<div className="services-zoom-parallax__header">
						<h2 className="services-zoom-parallax__title">Our Services</h2>
						<div className="services-zoom-parallax__eyebrow">
							<span className="services-brand-dot" aria-hidden="true" />
							<span>OUR SERVICES</span>
						</div>
					</div>
					<div className="services-zoom-parallax__stack">
						{ALL_SERVICES.map((item, index) => (
							<article
								key={item.label}
								className="szp-card"
								aria-label={item.label}
							>
								<CardMedia item={item} index={index} strips="static" />
							</article>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			className="services-zoom-parallax"
			aria-label="Our services overview"
		>
			<div ref={zoomRef} className="services-zoom-parallax__zoom">
				<div className="services-zoom-parallax__sticky">
					<IntroTitle scrollYProgress={scrollYProgress} />
					<SlideshowTrack scrollYProgress={scrollYProgress} />
					<motion.div
						className="services-zoom-parallax__scatter"
						style={{ opacity: scatterOpacity }}
					>
						{ALL_SERVICES.map((item, index) => (
							<ZoomCard
								key={item.label}
								item={item}
								index={index}
								zoomProgress={zoomProgress}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
