export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export const IMG_WIDTH = 60;
export const IMG_HEIGHT = 85;
export const TOTAL_IMAGES = 12;

export type ArcTarget = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
};

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

type ComputeArcTargetParams = {
  index: number;
  total: number;
  introPhase: AnimationPhase;
  scatterTarget: ArcTarget;
  containerSize: { width: number; height: number };
  morphValue: number;
  rotateValue: number;
  parallaxValue: number;
};

export function computeArcTarget({
  index,
  total,
  introPhase,
  scatterTarget,
  containerSize,
  morphValue,
  rotateValue,
  parallaxValue,
}: ComputeArcTargetParams): ArcTarget {
  if (introPhase === "scatter") {
    return scatterTarget;
  }

  if (introPhase === "line") {
    const lineSpacing = 70;
    const lineTotalWidth = total * lineSpacing;
    const lineX = index * lineSpacing - lineTotalWidth / 2;
    return { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
  }

  const isMobile = containerSize.width < 768;
  const minDimension = Math.min(containerSize.width, containerSize.height);

  const circleRadius = Math.min(minDimension * 0.35, 350);
  const circleAngle = (index / total) * 360;
  const circleRad = (circleAngle * Math.PI) / 180;
  const circlePos = {
    x: Math.cos(circleRad) * circleRadius,
    y: Math.sin(circleRad) * circleRadius,
    rotation: circleAngle + 90,
  };

  const baseRadius = Math.min(
    containerSize.width,
    containerSize.height * 1.5,
  );
  const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
  const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
  const arcCenterY = arcApexY + arcRadius;
  const spreadAngle = isMobile ? 100 : 130;
  const startAngle = -90 - spreadAngle / 2;
  const step = spreadAngle / (total - 1);
  const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
  const maxRotation = spreadAngle * 0.8;
  const boundedRotation = -scrollProgress * maxRotation;
  const currentArcAngle = startAngle + index * step + boundedRotation;
  const arcRad = (currentArcAngle * Math.PI) / 180;

  const arcPos = {
    x: Math.cos(arcRad) * arcRadius + parallaxValue,
    y: Math.sin(arcRad) * arcRadius + arcCenterY,
    rotation: currentArcAngle + 90,
    scale: isMobile ? 1.4 : 1.8,
  };

  return {
    x: lerp(circlePos.x, arcPos.x, morphValue),
    y: lerp(circlePos.y, arcPos.y, morphValue),
    rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
    scale: lerp(1, arcPos.scale, morphValue),
    opacity: 1,
  };
}

export function pixelTargetToWorld(
  target: ArcTarget,
  containerSize: { width: number; height: number },
  viewport: { width: number; height: number },
) {
  const wx = (target.x / (containerSize.width || 1)) * viewport.width;
  const wy = -(target.y / (containerSize.height || 1)) * viewport.height;
  const cardWorldW =
    ((IMG_WIDTH * target.scale) / (containerSize.width || 1)) * viewport.width;
  const cardWorldH =
    ((IMG_HEIGHT * target.scale) / (containerSize.height || 1)) *
    viewport.height;
  return { wx, wy, cardWorldW, cardWorldH };
}
