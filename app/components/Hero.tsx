"use client";

import { useEffect, useRef, useState } from "react";

const artistFrames = [
  {
    src: "/atlas-wacera-card.jpg",
    eyebrow: "Meet the artist",
    title: "Atlas Wacera",
    description: "Jamaican-born filmmaker and creative director, creating stories with character, feeling, and a sense of place.",
    className: "hero-artist-card__image--portrait",
  },
  {
    src: "/atlas-filming-web.jpg",
    eyebrow: "Behind the lens",
    title: "Built in the moment.",
    description: "From first setup to final take, Atlas brings focus, texture, and intention to every frame.",
    className: "hero-artist-card__image--filming",
  },
];

export function Hero() {
  const [artistOpen, setArtistOpen] = useState(false);
  const [artistExiting, setArtistExiting] = useState(false);
  const [artistEffectsReady, setArtistEffectsReady] = useState(false);
  const [artistFlaresVisible, setArtistFlaresVisible] = useState(false);
  const [artistFrame, setArtistFrame] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const artistPhotoRefs = useRef<(HTMLImageElement | null)[]>([]);
  const effectsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flareFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const cleanups = artistPhotoRefs.current.flatMap((artistPhoto) => {
      if (!artistPhoto) return [];
      const preparePhoto = () => { void artistPhoto.decode().catch(() => undefined); };
      if (artistPhoto.complete) preparePhoto();
      else artistPhoto.addEventListener("load", preparePhoto, { once: true });
      return [() => artistPhoto.removeEventListener("load", preparePhoto)];
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    if (!artistOpen) {
      setArtistFrame(0);
      return;
    }

    const frameTimer = window.setInterval(() => {
      setArtistFrame((currentFrame) => (currentFrame + 1) % artistFrames.length);
    }, 7200);

    return () => window.clearInterval(frameTimer);
  }, [artistOpen]);

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
            {artistFrames.map((frame, index) => <img
              ref={(element) => { artistPhotoRefs.current[index] = element; }}
              className={["hero-artist-card__image", frame.className, artistFrame === index ? "hero-artist-card__image--active" : ""].join(" ")}
              src={frame.src}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              key={frame.src}
            />)}
            <span className="hero-artist-card__shade" aria-hidden="true" />
            <span className="hero-artist-card__copy" key={artistFrame}>
              <span className="eyebrow">{artistFrames[artistFrame].eyebrow}</span>
              <strong>{artistFrames[artistFrame].title}</strong>
              <span>{artistFrames[artistFrame].description}</span>
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
