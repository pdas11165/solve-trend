import Link from "next/link";
import { DotGridArrow } from "@/components/Icons";
import { IS_HIRING, OPEN_ROLES } from "@/lib/careers";

/**
 * The only place /careers surfaces on the homepage. Renders nothing when no
 * posting is open, so the strip appears and disappears purely by editing
 * lib/careers.ts — no manual toggling.
 */
export default function HiringStrip() {
  if (!IS_HIRING) return null;

  const count = OPEN_ROLES.length;

  return (
    <section
      aria-label="Open roles"
      className="relative z-20 bg-[var(--bg-dark-2)] px-[var(--container-pad,24px)] pb-16 sm:pb-20"
    >
      <Link
        href="/careers"
        className="group mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2 rounded-[8px] bg-[var(--red)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse"
            />
            We&rsquo;re hiring
          </span>
          <p className="text-base font-semibold text-white sm:text-lg">
            {count} open {count === 1 ? "role" : "roles"} —{" "}
            <span className="text-white/60">
              {OPEN_ROLES.map((role) => role.title).join(", ")}
            </span>
          </p>
        </div>

        <span className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
          See openings
          <DotGridArrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
