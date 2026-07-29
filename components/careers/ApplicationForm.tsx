"use client";

import * as React from "react";
import { Loader2, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CAREERS_EMAIL } from "@/lib/contact";
import {
  APPLICATION_ROLE_OPTIONS,
  EXPERIENCE_OPTIONS,
  GENERAL_APPLICATION,
  RESUME_ACCEPT_ATTR,
  RESUME_MAX_BYTES,
} from "@/lib/careers";

type FormState = "idle" | "submitting" | "success" | "error" | "fallback";

const inputClass =
  "rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] text-[#1A1A1A] outline-none transition-all duration-200 placeholder:text-black/35 focus:border-[var(--red)] focus:shadow-[0_0_0_3px_rgba(232,52,26,0.12)]";

const labelClass = "flex flex-col gap-2 text-sm";
const labelTextClass = "font-semibold text-[#333]";

/**
 * A mailto can't carry an attachment, so the degraded path hands the candidate
 * a pre-filled email with every field except the resume, and tells them to
 * attach it themselves. Nothing gets silently dropped.
 */
function buildMailto(values: Record<string, string>) {
  const subject = `Application — ${values.role} — ${values.name}`;
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Location: ${values.location}`,
    `Experience: ${values.experience}`,
    `Role: ${values.role}`,
    values.links ? `Links: ${values.links}` : "",
    values.message ? `\n${values.message}` : "",
    "\n(Please attach your resume to this email.)",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ApplicationForm({
  defaultRole = GENERAL_APPLICATION,
  className,
}: {
  defaultRole?: string;
  className?: string;
}) {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [mailtoHref, setMailtoHref] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const renderedAtRef = React.useRef(0);

  // Set on mount rather than at render so the server-rendered HTML has no
  // timestamp to hydrate-mismatch on.
  React.useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  // The role list is derived from open postings; if this form was rendered for
  // a role that isn't in the list (shouldn't happen), fall back to general.
  const roleOptions = APPLICATION_ROLE_OPTIONS.includes(defaultRole)
    ? APPLICATION_ROLE_OPTIONS
    : [defaultRole, ...APPLICATION_ROLE_OPTIONS];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const resume = formData.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      setErrorMessage("Please attach your resume.");
      setFormState("error");
      return;
    }
    if (resume.size > RESUME_MAX_BYTES) {
      setErrorMessage("Your resume is larger than 5MB. Please upload a smaller file.");
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");
    formData.set("renderedAt", String(renderedAtRef.current));

    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      experience: String(formData.get("experience") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      links: String(formData.get("links") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        // Validation problems are the candidate's to fix — show them inline.
        // Anything else (delivery not configured, server/network failure)
        // shouldn't lose the application: hand them a pre-filled email.
        if (response.status === 400 && data.error) {
          setErrorMessage(data.error);
          setFormState("error");
          return;
        }
        setMailtoHref(buildMailto(values));
        setFormState("fallback");
        return;
      }

      form.reset();
      setFileName("");
      setFormState("success");
    } catch {
      setMailtoHref(buildMailto(values));
      setFormState("fallback");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "relative rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:p-8",
        className,
      )}
    >
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-3xl">
        Apply
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-[#555]">
        Fill this in and your details go straight to our inbox. We read every
        application ourselves and reply either way.
      </p>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Full name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Phone number</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Where you live</span>
          <input
            name="location"
            type="text"
            autoComplete="address-level2"
            required
            placeholder="City, Province / Country"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Years of experience</span>
          <select name="experience" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Role you&rsquo;re applying for</span>
          <select name="role" required defaultValue={defaultRole} className={inputClass}>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={cn(labelClass, "sm:col-span-2")}>
          <span className={labelTextClass}>
            Portfolio, LinkedIn, or GitHub{" "}
            <span className="font-normal text-[#888]">(optional)</span>
          </span>
          <input
            name="links"
            type="text"
            placeholder="https://…"
            className={inputClass}
          />
        </label>

        <label className={cn(labelClass, "sm:col-span-2")}>
          <span className={labelTextClass}>
            Anything you want us to know{" "}
            <span className="font-normal text-[#888]">(optional)</span>
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="A few sentences on why this role, or what you'd bring."
            className={cn(inputClass, "resize-y")}
          />
        </label>

        <div className={cn(labelClass, "sm:col-span-2")}>
          <span className={labelTextClass}>Resume</span>
          <label className="group flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-black/25 bg-white px-4 py-4 transition-colors duration-200 hover:border-[var(--red)] focus-within:border-[var(--red)] focus-within:shadow-[0_0_0_3px_rgba(232,52,26,0.12)]">
            <Paperclip
              className="h-5 w-5 shrink-0 text-[var(--red)]"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate text-[15px] text-[#444]">
              {fileName || "Choose a file — PDF, DOC, or DOCX, up to 5MB"}
            </span>
            <span className="shrink-0 rounded-md bg-[#1A1A1A] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-colors group-hover:bg-[var(--red)]">
              Browse
            </span>
            <input
              name="resume"
              type="file"
              required
              accept={RESUME_ACCEPT_ATTR}
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {formState === "success" ? (
        <p className="mt-5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900">
          Thanks — your application is in. We&rsquo;ll be in touch either way.
        </p>
      ) : null}

      {formState === "error" && errorMessage ? (
        <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-900">
          {errorMessage}
        </p>
      ) : null}

      {formState === "fallback" ? (
        <div className="mt-5 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-sm text-amber-950">
          <p>
            We couldn&rsquo;t send that automatically right now — but your
            details are ready to go. Send them to us directly and{" "}
            <strong>attach your resume to the email</strong>.
          </p>
          <a
            href={mailtoHref}
            className="mt-3 inline-flex items-center gap-2 font-semibold underline underline-offset-2 hover:text-amber-800"
          >
            Email {CAREERS_EMAIL}
          </a>
        </div>
      ) : null}

      <p className="mt-5 text-xs leading-relaxed text-[#777]">
        We don&rsquo;t store your application. It&rsquo;s forwarded straight to{" "}
        {CAREERS_EMAIL} and lives in our inbox — no database, no third-party
        applicant tracker.
      </p>

      <div className="magnetic-cta mt-5">
        <Button
          type="submit"
          disabled={formState === "submitting"}
          className={cn(
            "group/send h-12 w-full rounded-lg bg-[#1A1A1A] text-base font-bold text-white transition-all duration-300 hover:bg-[var(--red)]",
            formState === "submitting" && "opacity-80",
          )}
        >
          {formState === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send
                className="mr-2 h-4 w-4 transition-transform duration-300 ease-out group-hover/send:-translate-y-0.5 group-hover/send:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
              Send application
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
