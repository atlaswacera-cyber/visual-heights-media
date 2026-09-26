"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const [artistOpen, setArtistOpen] = useState(false);
  const [artistExiting, setArtistExiting] = useState(false);
  const [artistEffectsReady, setArtistEffectsReady] = useState(false);
  const [artistFlaresVisible, setArtistFlaresVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const artistPhotoRef = useRef<HTMLImageElement>(null);
  const effectsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flareFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const artistPhoto = artistPhotoRef.current;
    if (!artistPhoto) return;

    // Decode the exact image element used by the card while the hero is idle.
    // This prevents its first visible frame from doing image work during a click.
    const preparePhoto = () => {
      void artistPhoto.decode().catch(() => undefined);
    };

    if (artistPhoto.complete) preparePhoto();
    else artistPhoto.addEventListener("load", preparePhoto, { once: true });

    return () => artistPhoto.removeEventListener("load", preparePhoto);
  }, []);

  useEffect(() => () => {
    if (effectsTimerRef.current) clearTimeout(effectsTimerRef.current);
    if (flareFrameRef.current) cancelAnimationFrame(flareFrameRef.current);
  }, []);

  useEffect(() => {
    if (!artistEffectsReady) {
      setArtistFlaresVisible(false);
      return;
    }

    // Two frames guarantee the invisible state paints before the opacity transition begins.
    flareFrameRef.current = requestAnimationFrame(() => {
      flareFrameRef.current = requestAnimationFrame(() => setArtistFlaresVisible(true));
    });

    return () => {
      if (flareFrameRef.current) cancelAnimationFrame(flareFrameRef.current);
    };
  }, [artistEffectsReady]);

  const toggleArtist = () => {
    if (artistOpen) {
      if (effectsTimerRef.current) clearTimeout(effectsTimerRef.current);
      setArtistEffectsReady(false);
      setArtistFlaresVisible(false);
      const watermarkTransform = heroRef.current
        ? window.getComputedStyle(heroRef.current, "::after").transform
        : "";
      if (watermarkTransform && watermarkTransform !== "none") {
        heroRef.current?.style.setProperty("--artist-watermark-exit-transform", watermarkTransform);
      }
      setArtistOpen(false);
      setArtistExiting(true);
      window.setTimeout(() => setArtistExiting(false), 1100);
      return;
    }

    setArtistExiting(false);
    setArtistOpen(true);
    effectsTimerRef.current = setTimeout(() => setArtistEffectsReady(true), 650);
  };

  return (
    <section ref={heroRef} className={`hero${artistOpen ? " hero--artist" : ""}${artistEffectsReady ? " hero--artist-effects" : ""}${artistFlaresVisible ? " hero--artist-flares-visible" : ""}${artistExiting ? " hero--artist-exit" : ""}`} aria-labelledby="hero-title">
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
          onClick={toggleArtist}
        >
          <span className="hero-identity__aura" aria-hidden="true" />
          <span className="hero-mark-crop" aria-hidden="true"><img src="/vhm-monogram-gold.png?v=3" alt="" /></span>
          <span className="hero-artist-card">
            <img ref={artistPhotoRef} src="/atlas-wacera-card.jpg" alt="Atlas Wacera standing in front of a brick archway" fetchPriority="high" loading="eager" decoding="sync" />
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
