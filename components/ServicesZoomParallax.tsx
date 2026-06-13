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
	description: string;
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
		description:
			'We define positioning, messaging, and campaign direction so your brand speaks with clarity and purpose.',
		backgroundColor: '#E8341A',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[0],
		tags: ['Research', 'Positioning', 'Messaging'],
	},
	{
		label: 'Brand Identity & Graphic Design',
		description:
			'We create visual systems that communicate values, build trust, and help businesses stand out.',
		backgroundColor: '#1A1A1A',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[1],
		tags: ['Logo', 'Identity', 'Print'],
	},
	{
		label: 'Motion Graphics & Animation',
		description:
			'We bring brands to life through motion — from logo animations to explainer videos and social content.',
		backgroundColor: '#F7A23B',
		textColor: '#1A1A1A',
		image: WORK_IMAGES[2],
		tags: ['Motion', '3D', 'Effects'],
	},
	{
		label: 'Video Editing & Production',
		description:
			'We craft polished video content — from commercials and reels to corporate films and podcasts.',
		backgroundColor: '#050005',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[3],
		tags: ['Editing', 'Color', 'Sound'],
	},
	{
		label: 'User Experience Design',
		description:
			'We design intuitive interfaces that improve usability, guide users, and increase engagement.',
		backgroundColor: '#2563EB',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[0],
		tags: ['UX', 'Research', 'Prototyping'],
	},
	{
		label: 'Web Development',
		description:
			'We build fast, responsive websites and applications ensuring scalability and performance across devices.',
		backgroundColor: '#F03223',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[1],
		tags: ['Webflow', 'React', 'Speed'],
	},
	{
		label: 'eCommerce Solutions',
		description:
			'We launch and optimize online stores that convert — from Shopify to custom marketplaces.',
		backgroundColor: '#7C3AED',
		textColor: '#FFFFFF',
		image: WORK_IMAGES[2],
		tags: ['Shopify', 'Checkout', 'Growth'],
	},
	{
		label: 'AI Automation',
		description:
			'We build intelligent systems that automate workflows, support customers, and accelerate growth.',
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
	DECK_START: 0.45,
} as const;

const SLIDE_COUNT = ALL_SERVICES.length;
const SLIDE_STEPS = SLIDE_COUNT - 1;
const STEP_EASE = cubicBezier(0.85, 0, 0.15, 1);

const HOLD_WEIGHT = 3.2;
const SHIFT_WEIGHT = 1;

type DeckSegment = {
	holdStart: number;
	holdEnd: number;
	shiftEnd: number;
};

const DECK_SEGMENTS: DeckSegment[] = (() => {
	const span = 1 - PHASE.DECK_START;
	const unit = span / (SLIDE_COUNT * HOLD_WEIGHT + SLIDE_STEPS * SHIFT_WEIGHT);
	const hold = unit * HOLD_WEIGHT;
	const shift = unit * SHIFT_WEIGHT;
	const segments: DeckSegment[] = [];
	let cursor = PHASE.DECK_START;

	for (let i = 0; i < SLIDE_COUNT; i++) {
		const holdStart = cursor;
		cursor += hold;
		const holdEnd = cursor;
		const shiftEnd = i < SLIDE_STEPS ? cursor + shift : 1;
		if (i < SLIDE_STEPS) cursor += shift;
		segments.push({ holdStart, holdEnd, shiftEnd });
	}

	return segments;
})();

function buildCardKeyframes(index: number) {
	const seg = DECK_SEGMENTS[index];
	const isLast = index === SLIDE_STEPS;

	if (index === 0) {
		const prevShiftEnd = PHASE.DECK_START - 0.04;
		return {
			input: [prevShiftEnd, PHASE.DECK_START, seg.holdEnd, seg.shiftEnd],
			opacity: [1, 1, 1, 0],
			y: [0, 0, 0, -20],
			blur: [0, 0, 0, 8],
			ease: [STEP_EASE, STEP_EASE, STEP_EASE],
		};
	}

	const enterStart = DECK_SEGMENTS[index - 1].holdEnd;
	const enterEnd = seg.holdStart;

	if (isLast) {
		return {
			input: [PHASE.DECK_START, enterStart, enterEnd, seg.holdEnd, 1],
			opacity: [0, 0, 1, 1, 1],
			y: [50, 50, 0, 0, 0],
			blur: [8, 8, 0, 0, 0],
			ease: [STEP_EASE, STEP_EASE, STEP_EASE, STEP_EASE],
		};
	}

	return {
		input: [PHASE.DECK_START, enterStart, enterEnd, seg.holdEnd, seg.shiftEnd],
		opacity: [0, 0, 1, 1, 0],
		y: [50, 50, 0, 0, -20],
		blur: [8, 8, 0, 0, 8],
		ease: [STEP_EASE, STEP_EASE, STEP_EASE, STEP_EASE],
	};
}

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

function IdotiveDeckCard({ item }: { item: ServiceCardItem }) {
	return (
		<article className="szp-service-card" aria-label={item.label}>
			<div className="szp-service-card__image">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={item.image} alt={item.label} loading="eager" />
			</div>
			<div className="szp-service-card__body">
				<h3 className="szp-service-card__title">{item.label}</h3>
				<p className="szp-service-card__desc">{item.description}</p>
			</div>
		</article>
	);
}

function DeckCardItem({
	item,
	index,
	scrollYProgress,
}: {
	item: ServiceCardItem;
	index: number;
	scrollYProgress: MotionValue<number>;
}) {
	const keyframes = buildCardKeyframes(index);
	const opacity = useTransform(
		scrollYProgress,
		keyframes.input,
		keyframes.opacity,
		{ ease: keyframes.ease },
	);
	const y = useTransform(scrollYProgress, keyframes.input, keyframes.y, {
		ease: keyframes.ease,
	});
	const blur = useTransform(scrollYProgress, keyframes.input, keyframes.blur, {
		ease: keyframes.ease,
	});
	const filter = useTransform(blur, (value) => `blur(${value}px)`);

	return (
		<motion.div
			className="szp-deck-card"
			style={{
				opacity,
				y,
				filter,
				x: '-50%',
				zIndex: 10 + index,
			}}
		>
			<div className="szp-deck-card__inner">
				<IdotiveDeckCard item={item} />
			</div>
		</motion.div>
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

function ServiceCardDeck({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
	const deckOpacity = useTransform(
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
			className="services-zoom-parallax__deck"
			style={{ opacity: deckOpacity }}
		>
			{ALL_SERVICES.map((item, index) => (
				<DeckCardItem
					key={item.label}
					item={item}
					index={index}
					scrollYProgress={scrollYProgress}
				/>
			))}
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
					<div className="services-zoom-parallax__stack services-zoom-parallax__stack--deck">
						{ALL_SERVICES.map((item) => (
							<IdotiveDeckCard key={item.label} item={item} />
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
					<ServiceCardDeck scrollYProgress={scrollYProgress} />
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
