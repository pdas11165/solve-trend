import * as React from "react";
import ServiceAccordion from "./ServiceAccordion";
import ServicesZoomParallax from "./ServicesZoomParallax";

export default function Services() {
  return (
    <>
    <ServicesZoomParallax />
    <section className="services" id="services" aria-label="Our expertise">
      <div className="container">
        <div className="services-header">
          <h2 className="services-header__title">Our Expertise</h2>
          <span className="services-header__divider" aria-hidden="true" />
          <div className="services-header__tag">
            <span className="services-brand-dot" aria-hidden="true" />
            <span className="services-header__eyebrow">SERVICE</span>
          </div>
        </div>
        <div className="services-header-rule" aria-hidden="true" />
        <ServiceAccordion />
      </div>
    </section>
    </>
  );
}
