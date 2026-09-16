const work = [
  { number: "01", title: "Brand stories", type: "Film · Direction", className: "work-card--amber" },
  { number: "02", title: "Editorial frames", type: "Photography · Portrait", className: "work-card--sage" },
];

export function Work() {
  return <section className="work section" id="work">
    <div className="section__topline" data-reveal><p className="eyebrow">Selected frames</p><span className="section-number">03 / 04</span></div>
    <div className="work-feature" data-reveal><img src="/vhm-cinematic.png" alt="Visual Heights cinematic gold identity floating in a dark, textured atmosphere" /><div className="work-feature__shade" /><div className="work-feature__meta"><div><p>Visual identity</p><h2>Above the expected.</h2></div><span>Brand world · 2026</span></div></div>
    <div className="work-grid">{work.map((item) => <article className="work-item" key={item.number} data-reveal><div className={`work-card ${item.className}`}><span className="work-card__ring" /><span className="work-card__line" /><span className="work-card__number">VHM / {item.number}</span></div><div className="work-item__caption"><h3>{item.title}</h3><span>{item.type}</span></div></article>)}</div>
  </section>;
}
