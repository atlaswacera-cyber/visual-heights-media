"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { About } from "./components/About";
import { AmbientAudio } from "./components/AmbientAudio";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Work } from "./components/Work";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetScroll = () => window.scrollTo(0, 0);
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", resetScroll);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduceMotion) elements.forEach((element) => element.classList.add("is-visible"));

    const observer = reduceMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    if (observer) elements.forEach((element) => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer?.disconnect(); };
  }, []);

  return (
    <div className="site-shell" id="top">
      <SiteHeader
        menuOpen={menuOpen}
        scrolled={scrolled}
        onCloseMenu={() => setMenuOpen(false)}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      <AmbientAudio />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
