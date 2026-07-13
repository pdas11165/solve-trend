"use client";

import React from "react";
import { Loader2, Mail, Phone, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_SERVICE_OPTIONS } from "@/lib/contact";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

const GRADIENT_FROM = "#ffbc00";
const GRADIENT_TO = "#ff0058";
const GRADIENT = `linear-gradient(315deg, ${GRADIENT_FROM}, ${GRADIENT_TO})`;

const glowPanelClass =
  "pointer-events-none absolute top-0 left-[50px] h-full w-1/2 skew-x-[15deg] rounded-2xl transition-all duration-500 ease-out group-hover:left-[16px] group-hover:w-[calc(100%-32px)] group-hover:skew-x-0 group-focus-within:left-[16px] group-focus-within:w-[calc(100%-32px)] group-focus-within:skew-x-0 motion-reduce:skew-x-0 motion-reduce:left-[16px] motion-reduce:w-[calc(100%-32px)]";

const GradientBlobCard: React.FC = () => {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      event.currentTarget.reset();
      setFormState("success");
    } catch {
      setErrorMessage("Unable to reach the server. Please try again.");
      setFormState("error");
    }
  }

  return (
    <div className="group relative w-full px-3 py-5 transition-all duration-500 sm:px-4 sm:py-6">
      <span
        aria-hidden="true"
        className={cn(
          glowPanelClass,
          "z-0 opacity-85 group-hover:opacity-100 group-focus-within:opacity-100",
        )}
        style={{ background: GRADIENT }}
      />
      <span
        aria-hidden="true"
        className={cn(
          glowPanelClass,
          "z-0 blur-[30px] opacity-75 group-hover:opacity-100 group-hover:blur-[38px] group-focus-within:opacity-100 group-focus-within:blur-[38px]",
        )}
        style={{ background: GRADIENT }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[5px] z-0 rounded-[20px] opacity-60 blur-[22px] transition-all duration-500 group-hover:-inset-[12px] group-hover:opacity-90 group-hover:blur-[36px] group-focus-within:-inset-[12px] group-focus-within:opacity-90 group-focus-within:blur-[36px]"
        style={{ background: GRADIENT }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[12px] z-0 rounded-[28px] opacity-35 blur-[44px] transition-all duration-500 group-hover:-inset-[20px] group-hover:opacity-60 group-hover:blur-[52px] group-focus-within:-inset-[20px] group-focus-within:opacity-60 group-focus-within:blur-[52px]"
        style={{ background: GRADIENT }}
      />

      <span className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <span
          className={cn(
            "animate-contact-glass-blob absolute top-0 left-0 h-0 w-0 rounded-xl bg-[rgba(255,255,255,0.14)] opacity-0 shadow-[0_5px_15px_rgba(0,0,0,0.2)] backdrop-blur-[10px] transition-all duration-300",
            "group-hover:top-[-36px] group-hover:left-[42px] group-hover:h-[100px] group-hover:w-[100px] group-hover:opacity-100",
            "group-focus-within:top-[-36px] group-focus-within:left-[42px] group-focus-within:h-[100px] group-focus-within:w-[100px] group-focus-within:opacity-100",
          )}
        />
        <span
          className={cn(
            "animate-contact-glass-blob animation-delay-1000 absolute right-0 bottom-0 h-0 w-0 rounded-xl bg-[rgba(255,255,255,0.14)] opacity-0 shadow-[0_5px_15px_rgba(0,0,0,0.2)] backdrop-blur-[10px] transition-all duration-500",
            "group-hover:right-[42px] group-hover:bottom-[-36px] group-hover:h-[100px] group-hover:w-[100px] group-hover:opacity-100",
            "group-focus-within:right-[42px] group-focus-within:bottom-[-36px] group-focus-within:h-[100px] group-focus-within:w-[100px] group-focus-within:opacity-100",
          )}
        />
      </span>

      <div
        className={cn(
          "relative left-0 z-20 overflow-hidden rounded-2xl border border-white/25 bg-[rgba(12,12,14,0.82)] shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-500",
          "group-hover:-translate-y-1 group-hover:border-white/35 group-hover:bg-[rgba(16,16,18,0.9)] group-hover:shadow-[0_16px_48px_rgba(255,0,88,0.22)]",
          "group-focus-within:-translate-y-1 group-focus-within:border-white/35 group-focus-within:bg-[rgba(16,16,18,0.9)] group-focus-within:shadow-[0_16px_48px_rgba(255,0,88,0.22)]",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.16] via-white/[0.04] to-transparent"
        />
        <form
          className="relative flex flex-col gap-5 p-6 transition-all duration-500 group-hover:p-7 sm:p-8 sm:group-hover:p-9"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--red-light)]">
              Contact
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white sm:text-3xl">
              Tell us about your project
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Share a few details and we&apos;ll reply within one business day.
            </p>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white">
            <span className="flex items-center gap-2 font-medium text-white/80">
              <User className="h-4 w-4 text-[var(--red-light)]" aria-hidden="true" />
              Name
            </span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="rounded-lg border border-white/20 bg-black/45 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-[var(--red-light)] focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,107,74,0.15)]"
              placeholder="Your name"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white">
            <span className="flex items-center gap-2 font-medium text-white/80">
              <Phone className="h-4 w-4 text-[var(--red-light)]" aria-hidden="true" />
              Phone number
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="rounded-lg border border-white/20 bg-black/45 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-[var(--red-light)] focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,107,74,0.15)]"
              placeholder="(555) 123-4567"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white">
            <span className="flex items-center gap-2 font-medium text-white/80">
              <Mail className="h-4 w-4 text-[var(--red-light)]" aria-hidden="true" />
              Email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-lg border border-white/20 bg-black/45 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-[var(--red-light)] focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,107,74,0.15)]"
              placeholder="you@company.com"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white">
            <span className="font-medium text-white/80">Services you&apos;re looking for</span>
            <select
              name="service"
              required
              defaultValue=""
              className="rounded-lg border border-white/20 bg-black/45 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[var(--red-light)] focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,107,74,0.15)]"
            >
              <option value="" disabled className="bg-[var(--bg-dark-3)] text-white/60">
                Select a service
              </option>
              {CONTACT_SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service} className="bg-[var(--bg-dark-3)] text-white">
                  {service}
                </option>
              ))}
            </select>
          </label>

          {formState === "success" ? (
            <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100">
              Thanks — your message was sent. We&apos;ll be in touch soon.
            </p>
          ) : null}

          {formState === "error" && errorMessage ? (
            <p className="rounded-lg border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
              {errorMessage}
            </p>
          ) : null}

          <div className="magnetic-cta mt-1">
            <Button
              type="submit"
              disabled={formState === "submitting"}
              className={cn(
                "group/send h-12 w-full rounded-lg bg-white text-base font-bold text-black transition-all duration-300 hover:border hover:border-[rgba(255,0,88,0.45)] hover:bg-[#ffcf4d] hover:shadow-[0_8px_24px_rgba(255,188,0,0.25)]",
                formState === "submitting" && "opacity-80",
              )}
            >
              {formState === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send
                    className="mr-2 h-4 w-4 transition-transform duration-300 ease-out group-hover/send:-translate-y-0.5 group-hover/send:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                  Send inquiry
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes contact-glass-blob {
            0%, 100% { transform: translateY(10px); }
            50% { transform: translate(-10px); }
          }
          .animate-contact-glass-blob {
            animation: contact-glass-blob 2s ease-in-out infinite;
          }
          .animation-delay-1000 {
            animation-delay: -1s;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-contact-glass-blob {
              animation: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GradientBlobCard;
