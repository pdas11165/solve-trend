import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Service — Solve Trend",
  description: "The terms that govern your use of the Solve Trend website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="July 22, 2026"
      intro="These Terms of Service (“Terms”) govern your use of the Solve Trend website. By using this site, you agree to these Terms. Client projects are governed separately by the specific agreement or proposal we sign with you."
      sections={[
        {
          heading: "Use of the website",
          paragraphs: [
            "You may use this website for lawful purposes and to learn about our services. You agree not to misuse the site, interfere with its operation, or attempt to access it in ways we haven't authorized.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The content on this site — including text, design, graphics, and logos — is owned by Solve Trend or used with permission, and is protected by applicable intellectual property laws. You may not reproduce or reuse it without our written consent.",
          ],
        },
        {
          heading: "Client work and proposals",
          paragraphs: [
            "Anything on this site is for general information and does not constitute an offer or a binding quote. The scope, deliverables, timeline, and pricing for any engagement are defined in a separate written agreement or proposal signed by both parties.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "Our site may link to third-party websites or tools we don't control. We're not responsible for their content or practices, and linking to them doesn't mean we endorse them.",
          ],
        },
        {
          heading: "Disclaimer and limitation of liability",
          paragraphs: [
            "This website is provided “as is” without warranties of any kind. To the fullest extent permitted by law, Solve Trend is not liable for any damages arising from your use of the site.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "We may update these Terms from time to time; the “last updated” date above reflects the latest version. Questions? Email us at " +
              `${CONTACT_EMAIL}.`,
            "Note: This is a general template provided as a starting point and is not legal advice. Please have it reviewed by a qualified professional before relying on it.",
          ],
        },
      ]}
    />
  );
}
