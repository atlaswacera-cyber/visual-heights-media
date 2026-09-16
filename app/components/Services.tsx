const services = [
  { number: "01", title: "Motion", subtitle: "Films with feeling.", description: "Brand films, commercials, social campaigns, and event stories shaped with a cinematic eye." },
  { number: "02", title: "Stills", subtitle: "Images that linger.", description: "Editorial, lifestyle, product, and portrait photography with warmth, texture, and intention." },
  { number: "03", title: "Direction", subtitle: "A world of your own.", description: "Creative concepts, visual identity, and production direction that make every frame feel connected." },
];

export function Services() {
  return <section className="services section section--dark" id="services">
    <div className="section__topline" data-reveal><p className="eyebrow">What we make</p><span className="section-number">02 / 04</span></div>
    <div className="services__heading" data-reveal><h2>One vision.</h2><p>Every frame considered.</p></div>
    <div className="services__list">{services.map((service) => <article className="service" key={service.number} data-reveal><span className="service__number">{service.number}</span><div className="service__title"><h3>{service.title}</h3><em>{service.subtitle}</em></div><p>{service.description}</p><span className="service__arrow" aria-hidden="true">↗</span></article>)}</div>
  </section>;
}
