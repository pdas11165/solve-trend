import { cn } from "@/lib/utils";

type BackgroundGradientGlowProps = {
  className?: string;
};

export function BackgroundGradientGlow({
  className,
}: BackgroundGradientGlowProps) {
  return (
    <div
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 85% 65% at 8% 8%, rgba(255, 145, 70, 0.48), transparent 60%),
          radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
          radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
          radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
          linear-gradient(180deg, #fff0e0 0%, #fde2ea 100%)
        `,
      }}
    />
  );
}
