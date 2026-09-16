export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow"><span>Independent media studio</span><span>Chicago · Everywhere</span></p>
        <h1 id="hero-title"><span>Stories with</span><em>altitude.</em></h1>
        <p className="hero__intro">Film, photography, and visual direction crafted with clarity, character, and a little vintage soul.</p>
        <div className="hero__actions"><a className="button button--light" href="#work">Explore the work <span aria-hidden="true">↘</span></a><a className="text-link" href="#about">Meet the studio <span aria-hidden="true">→</span></a></div>
      </div>
      <div className="hero__visual" aria-hidden="true"><div className="hero-mark-crop"><img src="/vhm-monogram-gold.png" alt="" /></div><span className="hero__visual-label">Est. 2026 / VHM</span></div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to our approach"><span>Scroll</span><i aria-hidden="true" /></a>
    </section>
  );
}
