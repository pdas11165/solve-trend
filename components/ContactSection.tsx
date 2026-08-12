"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_SERVICE_OPTIONS } from "@/lib/contact";
import { RevealText } from "@/components/ui/reveal-text";

type FormState = "idle" | "submitting" | "success" | "error" | "fallback";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
};

function buildMailto({ name, phone, email, service }: ContactPayload) {
  const subject = `New project inquiry${name ? ` from ${name}` : ""}`;
  const body = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service: ${service}`,
    "",
    "Tell us a bit more about your project:",
    "",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

const PROMISES = [
  "Expect a reply from us within one business day",
  "Happy to sign an NDA on request",
  "You talk to the people doing the work — no handlers",
];

/**
 * Contact — designmonks panel: one dark rounded panel, copy left / form
 * right, warm gradient glows in the corners (the "glow in the back" stays).
 * Form fields follow the designmonks recipe: translucent inputs, 8px radius,
 * radio-pill service picker, gradient submit with an inner top highlight.
 */
export default function ContactSection() {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [mailtoHref, setMailtoHref] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState("submitting");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload: ContactPayload = {
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
        // Validation problems (bad email, missing field) are the visitor's to
        // fix — show them inline. Anything else (delivery not configured, or a
        // server/network failure) shouldn't lose their inquiry: fall back to a
        // pre-filled direct email so the message still reaches us.
        if (response.status === 400 && data.error) {
          setErrorMessage(data.error);
          setFormState("error");
          return;
        }
        setMailtoHref(buildMailto(payload));
        setFormState("fallback");
        return;
      }

      form.reset();
      setFormState("success");
    } catch {
      setMailtoHref(buildMailto(payload));
      setFormState("fallback");
    }
  }

  return (
    <section id="contact" className="contact-section scroll-mt-24" aria-label="Contact form">
      <div className="contact-panel">
        <span className="contact-glow contact-glow--tr" aria-hidden="true" />
        <span className="contact-glow contact-glow--bl" aria-hidden="true" />

        <div className="contact-copy">
          <span className="contact-chip">Get in touch</span>
          <RevealText
            as="h2"
            text="Ready to start your next project?"
            className="contact-heading"
          />
          <p className="contact-blurb">
            Tell us what you&rsquo;re building and what you need. We read every
            message ourselves and reply fast.
          </p>
          <ul className="contact-promises">
            {PROMISES.map((line) => (
              <li key={line}>
                <span className="contact-promise__icon" aria-hidden="true">
                  <Check />
                </span>
                {line}
              </li>
            ))}
          </ul>
          <a className="contact-mail-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="contact-name">Full name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
            />
          </div>

          <div className="contact-field-grid">
            <div className="contact-field">
              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-phone">Phone number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <fieldset className="contact-field contact-services">
            <legend>What do you need?</legend>
            <div className="contact-service-pills">
              {CONTACT_SERVICE_OPTIONS.map((service) => (
                <label key={service} className="contact-service-pill">
                  <input type="radio" name="service" value={service} required />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {formState === "success" ? (
            <p className="contact-status contact-status--ok" role="status">
              Thanks — your message was sent. We&rsquo;ll be in touch soon.
            </p>
          ) : null}

          {formState === "error" && errorMessage ? (
            <p className="contact-status contact-status--err" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {formState === "fallback" ? (
            <div className="contact-status contact-status--warn">
              <p>
                We couldn&rsquo;t send that automatically right now — but your
                details are ready to go. Email them to us directly and
                we&rsquo;ll reply within a day.
              </p>
              <a href={mailtoHref}>
                <Mail aria-hidden="true" />
                Email {CONTACT_EMAIL}
              </a>
            </div>
          ) : null}

          <div className="magnetic-cta">
            <button
              type="submit"
              className="contact-submit"
              disabled={formState === "submitting"}
            >
              <span className="contact-submit__glow" aria-hidden="true" />
              <span className="contact-submit__inner">
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="contact-submit__spinner" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Let&rsquo;s connect
                    <ArrowRight aria-hidden="true" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
