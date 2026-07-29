import { NextResponse } from "next/server";
import { CAREERS_EMAIL } from "@/lib/contact";
import {
  APPLICATION_ROLE_OPTIONS,
  EXPERIENCE_OPTIONS,
  RESUME_ACCEPTED_EXTENSIONS,
  RESUME_MAX_BYTES,
} from "@/lib/careers";

// Applications are never persisted: the resume lives in this request's memory
// only long enough to be base64'd into the outgoing email. No disk, no DB, and
// deliberately no logging of the candidate's details.

/** Bots fill forms instantly; a human takes longer than this to fill nine fields. */
const MIN_FILL_MS = 3000;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * The browser-reported MIME type is trivially spoofed, so check the actual
 * leading bytes too: "%PDF" for PDF, the ZIP local-file header for .docx, and
 * the OLE compound-file header for legacy .doc.
 */
const RESUME_SIGNATURES: Array<{ ext: string; bytes: number[] }> = [
  { ext: ".pdf", bytes: [0x25, 0x50, 0x44, 0x46] },
  { ext: ".docx", bytes: [0x50, 0x4b, 0x03, 0x04] },
  { ext: ".doc", bytes: [0xd0, 0xcf, 0x11, 0xe0] },
];

function hasKnownSignature(head: Uint8Array, ext: string) {
  return RESUME_SIGNATURES.some(
    (sig) =>
      sig.ext === ext && sig.bytes.every((byte, i) => head[i] === byte),
  );
}

function extensionOf(filename: string) {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot).toLowerCase();
}

function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot + time-trap. Silently accept so bots don't learn they were caught.
  const honeypot = field(form, "company");
  const renderedAt = Number(field(form, "renderedAt"));
  const tooFast =
    Number.isFinite(renderedAt) && renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS;

  if (honeypot || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const name = field(form, "name");
  const email = field(form, "email");
  const phone = field(form, "phone");
  const location = field(form, "location");
  const experience = field(form, "experience");
  const role = field(form, "role");
  const links = field(form, "links");
  const message = field(form, "message");

  if (!name || !email || !phone || !location || !experience || !role) {
    return NextResponse.json(
      { error: "Name, email, phone, location, experience, and role are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!APPLICATION_ROLE_OPTIONS.includes(role)) {
    return NextResponse.json({ error: "Please select a valid role." }, { status: 400 });
  }

  if (!EXPERIENCE_OPTIONS.includes(experience as (typeof EXPERIENCE_OPTIONS)[number])) {
    return NextResponse.json({ error: "Please select a valid experience range." }, { status: 400 });
  }

  const resume = form.get("resume");

  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });
  }

  if (resume.size > RESUME_MAX_BYTES) {
    return NextResponse.json(
      { error: "Your resume is larger than 5MB. Please upload a smaller file." },
      { status: 400 },
    );
  }

  const ext = extensionOf(resume.name);

  if (!RESUME_ACCEPTED_EXTENSIONS.includes(ext as (typeof RESUME_ACCEPTED_EXTENSIONS)[number])) {
    return NextResponse.json(
      { error: "Resumes must be a PDF, DOC, or DOCX file." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await resume.arrayBuffer());

  if (!hasKnownSignature(new Uint8Array(buffer.subarray(0, 4)), ext)) {
    return NextResponse.json(
      { error: "That file doesn't look like a real PDF or Word document." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CAREERS_EMAIL ?? process.env.CONTACT_EMAIL ?? CAREERS_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Solve Trend Careers <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Add RESEND_API_KEY to your environment variables.",
      },
      { status: 503 },
    );
  }

  const html = `
    <h2>New application — ${escapeHtml(role)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Location:</strong> ${escapeHtml(location)}</p>
    <p><strong>Experience:</strong> ${escapeHtml(experience)}</p>
    ${links ? `<p><strong>Links:</strong> ${escapeHtml(links)}</p>` : ""}
    ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>` : ""}
    <p><strong>Resume:</strong> attached (${escapeHtml(resume.name)})</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Application — ${role} — ${name}`,
      html,
      attachments: [
        {
          filename: resume.name,
          content: buffer.toString("base64"),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend API error:", errorText);
    return NextResponse.json(
      { error: "Unable to send your application right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
