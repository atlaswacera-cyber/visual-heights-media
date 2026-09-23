"use client";

import { useState } from "react";

const services = [
  {
    number: "01", slug: "motion", title: "Motion", subtitle: "Films with feeling.",
    description: "Brand films, commercials, social campaigns, and event stories shaped with a cinematic eye.",
    overview: "Moving image for the moments when your brand needs to be felt, not just explained. We shape the idea, find the visual language, and carry it through the final cut.",
    deliverables: ["Brand films and campaign pieces", "Social edits and launch cutdowns", "Event recaps and artist visuals"],
    bestFor: "Launches, campaigns, events, and stories with a point of view.", image: "/vhm-cinematic.png",
    imageAlt: "Visual Heights cinematic gold identity in a dark atmosphere", visualLabel: "Film / direction",
  },
  {
    number: "02", slug: "stills", title: "Stills", subtitle: "Images that linger.",
    description: "Editorial, lifestyle, product, and portrait photography with warmth, texture, and intention.",
    overview: "Photography built around presence, texture, and the details people remember. Every shoot starts with a clear visual direction, then leaves room for the honest moments inside it.",
    deliverables: ["Editorial and portrait sessions", "Lifestyle and product imagery", "Creative direction and shot planning"],
    bestFor: "Portraits, editorials, products, and brand moments worth slowing down for.", image: "/atlas-wacera.jpg",
    imageAlt: "Atlas Wacera standing in front of a brick archway", visualLabel: "Photography / portrait",
  },
  {
    number: "03", slug: "interface-systems", title: "Interface Systems", subtitle: "Custom-built to be used.",
    description: "Customized websites, launch pages, and early app builds that give your brand a clear, intentional place to live online.",
    overview: "A focused digital home for your work or idea. From the first page structure to the polished build, the goal is a site or early product that feels specific to your brand and simple for people to use.",
    deliverables: ["Custom websites and launch pages", "Early app and product concepts", "Responsive builds and refinement"],
    bestFor: "Independent brands, artists, launches, and ideas ready to live online.", image: "/vhm-mark.png",
    imageAlt: "Visual Heights monogram on a dark background", visualLabel: "Web / app building",
  },
];

export function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const selectService = (slug: string) => {
    if (activeService === slug) {
      setActiveService(null);
      return;
    }
    setActiveService(slug);
    window.setTimeout(() => document.getElementById(`service-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  };

  return <section className="services section section--dark" id="services">
    <div className="section__topline" data-reveal><p className="eyebrow">Ways to work together</p><span className="section-number">02 / 04</span></div>
    <div className="services__heading" data-reveal><h2>Creative services.</h2><p>One vision. Every frame considered.</p></div>
    <div className={`services__list${activeService ? " services__list--focused" : ""}`}>
      {services.map((service) => {
        const isActive = activeService === service.slug;
        const isMuted = Boolean(activeService && !isActive);
        return <article className={`service${isActive ? " service--active" : ""}${isMuted ? " service--muted" : ""}`} id={`service-${service.slug}`} key={service.number} data-reveal>
          <button className="service__trigger" type="button" onClick={() => selectService(service.slug)} aria-expanded={isActive}>
            <span className="service__number">{service.number}</span>
            <span className="service__title"><strong>{service.title}</strong><em>{service.subtitle}</em></span>
            <span className="service__summary">{service.description}</span>
            <span className="service__arrow" aria-hidden="true">{isActive ? "×" : "↗"}</span>
          </button>
          {isActive && <div className="service-detail">
            <figure className="service-detail__visual"><img src={service.image} alt={service.imageAlt} /><figcaption>{service.visualLabel}</figcaption></figure>
            <div className="service-detail__copy">
              <p className="eyebrow">What it can include</p>
              <p className="service-detail__overview">{service.overview}</p>
              <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="service-detail__best"><span>Best for</span>{service.bestFor}</p>
              <span className="service-detail__return">Click {service.number} again to return to all services.</span>
            </div>
          </div>}
        </article>;
      })}
    </div>
  </section>;
}
