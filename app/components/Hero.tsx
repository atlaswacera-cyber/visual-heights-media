"use client";

import { useState } from "react";

export function Hero() {
  const [artistOpen, setArtistOpen] = useState(false);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow"><span>Independent media studio</span><span>Chicago · Everywhere</span></p>
        <h1 id="hero-title"><span>Stories with</span><em>altitude.</em></h1>
        <p className="hero__intro">Film, photography, and visual direction crafted with clarity, character, and a little vintage soul.</p>
        <div className="hero__actions"><a className="button button--light" href="#work">Explore the work <span aria-hidden="true">↘</span></a><a className="text-link" href="#about">Meet the studio <span aria-hidden="true">→</span></a></div>
      </div>

      <div className={`hero__visual${artistOpen ? " hero__visual--artist" : ""}`}>
        <button
          className="hero-identity"
          type="button"
          aria-label={artistOpen ? "Return to the Visual Heights logo" : "Meet the artist, Atlas Wacera"}
          aria-pressed={artistOpen}
          onClick={() => setArtistOpen((open) => !open)}
        >
          <span className="hero-mark-crop" aria-hidden="true"><img src="/vhm-monogram-gold.png" alt="" /></span>
          <span className="hero-artist-card">
            <img src="/atlas-wacera.jpg" alt="Atlas Wacera standing in front of a brick archway" />
            <span className="hero-artist-card__shade" aria-hidden="true" />
            <span className="hero-artist-card__copy">
              <span className="eyebrow">Meet the artist</span>
              <strong>Atlas Wacera</strong>
              <span>Jamaican-born filmmaker and creative director, creating stories with character, feeling, and a sense of place.</span>
              <em>Click to return to VHM ↗</em>
            </span>
          </span>
        </button>
        <span className="hero__visual-label">{artistOpen ? "Click to return / VHM" : "Click to meet Atlas / VHM"}</span>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to our approach"><span>Scroll</span><i aria-hidden="true" /></a>
    </section>
  );
}
