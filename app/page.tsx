"use client";

import { useEffect, useState } from "react";

const services = [
  {
    number: "01",
    title: "Motion",
    subtitle: "Films with feeling.",
    description:
      "Brand films, commercials, social campaigns, and event stories shaped with a cinematic eye.",
  },
  {
    number: "02",
    title: "Stills",
    subtitle: "Images that linger.",
    description:
      "Editorial, lifestyle, product, and portrait photography with warmth, texture, and intention.",
  },
  {
    number: "03",
    title: "Direction",
    subtitle: "A world of your own.",
    description:
      "Creative concepts, visual identity, and production direction that make every frame feel connected.",
  },
];

const work = [
  {
    number: "01",
    title: "Brand stories",
    type: "Film · Direction",
    className: "work-card--amber",
  },
  {
    number: "02",
    title: "Editorial frames",
    type: "Photography · Portrait",
    className: "work-card--sage",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
    }

    const observer = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.14 },
        );

    if (observer) {
      elements.forEach((element) => observer.observe(element));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" id="top">
      <header
        className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
      >
        <a className="wordmark" href="#top" aria-label="Visual Heights Media home">
          <span className="wordmark__monogram">VH</span>
          <span className="wordmark__name">Visual Heights</span>
        </a>

        <nav
          className={`nav-links${menuOpen ? " nav-links--open" : ""}`}
          aria-label="Primary navigation"
        >
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#about" onClick={closeMenu}>
            Studio
          </a>
          <a className="nav-links__contact" href="#contact" onClick={closeMenu}>
            Start a project
          </a>
        </nav>

        <button
          className={`menu-button${menuOpen ? " menu-button--open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              <span>Independent media studio</span>
              <span>Chicago · Everywhere</span>
            </p>
            <h1 id="hero-title">
              <span>Stories with</span>
              <em>altitude.</em>
            </h1>
            <p className="hero__intro">
              Film, photography, and visual direction crafted with clarity,
              character, and a little vintage soul.
            </p>
            <div className="hero__actions">
              <a className="button button--light" href="#work">
                Explore the work <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href="#about">
                Meet the studio <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero-mark-crop">
              <img src="/vhm-mark.png" alt="" />
            </div>
            <span className="hero__visual-label">Est. 2026 / VHM</span>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to our approach">
            <span>Scroll</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="manifesto section" id="about">
          <div className="section__topline" data-reveal>
            <p className="eyebrow">Our point of view</p>
            <span className="section-number">01 / 04</span>
          </div>

          <div className="manifesto__grid">
            <h2 data-reveal>
              Modern stories.
              <br />
              <em>Vintage soul.</em>
            </h2>
            <div className="manifesto__copy" data-reveal>
              <p>
                We believe polished does not have to mean predictable. Visual
                Heights pairs modern production with the warmth, pacing, and
                honest texture of another era.
              </p>
              <p>
                The result is work that feels elevated—not overworked—and made
                to stay with people long after the screen goes dark.
              </p>
            </div>
          </div>

          <div className="manifesto__ticker" aria-label="Our creative disciplines">
            <span>Motion</span>
            <i />
            <span>Stills</span>
            <i />
            <span>Identity</span>
            <i />
            <span>Experience</span>
          </div>
        </section>

        <section className="services section section--dark" id="services">
          <div className="section__topline" data-reveal>
            <p className="eyebrow">What we make</p>
            <span className="section-number">02 / 04</span>
          </div>

          <div className="services__heading" data-reveal>
            <h2>One vision.</h2>
            <p>Every frame considered.</p>
          </div>

          <div className="services__list">
            {services.map((service) => (
              <article className="service" key={service.number} data-reveal>
                <span className="service__number">{service.number}</span>
                <div className="service__title">
                  <h3>{service.title}</h3>
                  <em>{service.subtitle}</em>
                </div>
                <p>{service.description}</p>
                <span className="service__arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section__topline" data-reveal>
            <p className="eyebrow">Selected frames</p>
            <span className="section-number">03 / 04</span>
          </div>

          <div className="work-feature" data-reveal>
            <img
              src="/vhm-cinematic.png"
              alt="Visual Heights cinematic gold identity floating in a dark, textured atmosphere"
            />
            <div className="work-feature__shade" />
            <div className="work-feature__meta">
              <div>
                <p>Visual identity</p>
                <h2>Above the expected.</h2>
              </div>
              <span>Brand world · 2026</span>
            </div>
          </div>

          <div className="work-grid">
            {work.map((item) => (
              <article className="work-item" key={item.number} data-reveal>
                <div className={`work-card ${item.className}`}>
                  <span className="work-card__ring" />
                  <span className="work-card__line" />
                  <span className="work-card__number">VHM / {item.number}</span>
                </div>
                <div className="work-item__caption">
                  <h3>{item.title}</h3>
                  <span>{item.type}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section section--sage" id="contact">
          <div className="section__topline" data-reveal>
            <p className="eyebrow">Your story, elevated</p>
            <span className="section-number">04 / 04</span>
          </div>
          <div className="contact__body" data-reveal>
            <h2>
              Let’s make something
              <br />
              <em>worth remembering.</em>
            </h2>
            <a
              className="contact__button"
              href="mailto:hello@visualheightsmedia.com?subject=New%20project%20inquiry"
            >
              <span>Start a project</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">
          <span className="wordmark__monogram">VH</span>
          <p>Visual Heights Media</p>
        </div>
        <p>A media production company.</p>
        <div className="footer__meta">
          <span>Chicago, Illinois</span>
          <span>© {new Date().getFullYear()} VHM</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
