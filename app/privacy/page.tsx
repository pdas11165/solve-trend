import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/contact";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — Solve Trend",
  description: "How Solve Trend collects, uses, and protects your information.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 28, 2026"
      intro="This Privacy Policy explains how Solve Trend (“we,” “us,” or “our”) collects, uses, and protects information when you visit our website or get in touch with us. We keep this simple: we collect only what we need, and we don't sell your data."
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "When you submit our contact form, we collect the details you choose to provide — typically your name, email address, phone number, and a note about the service you're interested in.",
            "If you apply for a role through our careers page, we collect your name, email, phone number, location, experience level, any links you share, and the resume you upload.",
            "Like most websites, we may also collect basic technical and usage data automatically, such as your browser type, device, and how you navigate the site. This helps us understand what's useful and improve the experience.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: [
            "We use the information you provide to respond to your inquiry, discuss potential work, and follow up about our services. We use usage data to maintain, secure, and improve the website.",
            "We will never sell your personal information. We only share it with service providers who help us operate (for example, our email delivery provider), and only to the extent needed to provide that service.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "We may use cookies or similar technologies to keep the site working and to understand aggregate traffic. You can control cookies through your browser settings. If we add third-party analytics, we'll update this policy to reflect it.",
          ],
        },
        {
          heading: "Data retention and security",
          paragraphs: [
            "We keep inquiry details only as long as needed to respond and maintain our business records, then delete them. We take reasonable measures to protect your information, though no method of transmission over the internet is completely secure.",
            "Job applications are not stored in any database or applicant-tracking system. Your details and resume are forwarded directly to our email inbox and kept only as long as we need them to consider you for a role. Ask us to delete them at any time and we will.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can ask us to access, correct, or delete the personal information we hold about you. Depending on where you live, you may have additional rights under local privacy law. To make a request, just email us.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [
            `If you have any questions about this policy or your data, reach us at ${CONTACT_EMAIL}.`,
            "Note: This is a general template provided as a starting point and is not legal advice. Please have it reviewed by a qualified professional before relying on it.",
          ],
        },
      ]}
    />
  );
}
