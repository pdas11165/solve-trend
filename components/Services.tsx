import * as React from "react";
import Image from "next/image";

const SERVICES = [
  {
    name: "Brand Strategy",
    sub: "4 deliverables",
    chips: ["Positioning", "Audience", "Voice"],
    seed: "strategy",
  },
  {
    name: "Brand Identity",
    sub: "5 deliverables",
    chips: ["Logo", "Type", "Guidelines"],
    seed: "identity",
  },
  {
    name: "Web Design & Dev",
    sub: "6 deliverables",
    chips: ["Next.js", "CMS", "Animation"],
    seed: "webdesign",
  },
  {
    name: "Digital Marketing",
    sub: "7 deliverables",
    chips: ["SEO", "Ads", "Email"],
    seed: "digital",
  },
  {
    name: "UI/UX Design",
    sub: "5 deliverables",
    chips: ["Research", "Prototypes", "Systems"],
    seed: "uiux",
  },
  {
    name: "Data & AI",
    sub: "4 deliverables",
    chips: ["Dashboards", "ML", "Agents"],
    seed: "dataai",
  },
  {
    name: "SEO & Content",
    sub: "6 deliverables",
    chips: ["Audit", "Strategy", "Writing"],
    seed: "seo",
  },
];

export default function Services() {
  return (
    <section className="services" aria-label="Our services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Our Services</span>
            <h2 style={{ marginTop: 12 }}>
              Capabilities, end-to-end.
            </h2>
          </div>
          <p
            style={{
              maxWidth: 360,
              color: "var(--muted-light)",
              fontSize: 15,
            }}
          >
            Scroll through every discipline we run in-house. Mix and match — we
            scope to what your brand actually needs.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="services-row" role="list">
          {SERVICES.map((s) => (
            <article key={s.name} className="service-card st-card" role="listitem">
              <span className="st-card-glow-border" aria-hidden="true" />
              <Image
                src={`https://picsum.photos/seed/${s.seed}/600/800`}
                alt={s.name}
                width={600}
                height={800}
                loading="lazy"
                className="bg-img"
                unoptimized
              />
              <span className="overlay" aria-hidden="true" />
              <div className="inner">
                <span className="eyebrow" style={{ color: "#fff", opacity: 0.85 }}>
                  Service
                </span>
                <div>
                  <h3>{s.name}</h3>
                  <span className="sub">{s.sub}</span>
                  <div className="chips" aria-hidden="true">
                    {s.chips.map((c) => (
                      <span key={c} className="st-tag-glass">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
