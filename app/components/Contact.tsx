"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SubmissionState = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [modalState, setModalState] = useState<"closed" | "open" | "closing">("closed");
  const [submission, setSubmission] = useState<SubmissionState>("idle");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const open = modalState !== "closed";

  const close = () => {
    if (modalState !== "open") return;
    setModalState("closing");
    closeTimerRef.current = window.setTimeout(() => {
      setModalState("closed");
      setSubmission("idle");
    }, 520);
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [open]);

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/visualheightsmediainc@gmail.com", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Inquiry could not be sent");
      form.reset();
      setSubmission("sent");
    } catch {
      setSubmission("error");
    }
  };

  return <section className="contact section section--sage" id="contact">
    <div className="section__topline" data-reveal><p className="eyebrow">Your story, elevated</p><span className="section-number">04 / 04</span></div>
    <div className="contact__body" data-reveal>
      <h2>Let’s make something<br /><em>worth remembering.</em></h2>
      <button className="contact__button" type="button" onClick={() => setModalState("open")} aria-haspopup="dialog">
        <span>Start a project</span><span aria-hidden="true">↗</span>
      </button>
    </div>

    {open && <div className={`inquiry-modal${modalState === "closing" ? " inquiry-modal--closing" : ""}`} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section className="inquiry-modal__panel" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
        <div className="inquiry-modal__glow" aria-hidden="true" />
        <button ref={closeButtonRef} className="inquiry-modal__close" type="button" onClick={close} aria-label="Close inquiry form"><img src="/vhm-monogram-gold.png?v=3" alt="" /></button>
        {submission === "sent" ? <div className="inquiry-modal__success">
          <p className="eyebrow">Inquiry received</p>
          <h2 id="inquiry-title">Your next story<br /><em>starts here.</em></h2>
          <p>Thank you — your note is on its way to Visual Heights Media. We’ll be in touch soon.</p>
          <button type="button" className="inquiry-modal__send" onClick={close}>Return to the site</button>
        </div> : <>
          <header className="inquiry-modal__header">
            <p className="eyebrow">Visual Heights / Project inquiry</p>
            <p className="inquiry-modal__index">01 — 01</p>
            <h2 id="inquiry-title">Bring the <em>idea</em><br />into focus.</h2>
            <p>Share a little about what you’re building. A clear starting point is all we need.</p>
          </header>
          <form className="inquiry-form" onSubmit={submitInquiry}>
            <input type="hidden" name="_subject" value="New Visual Heights Media project inquiry" />
            <input type="hidden" name="_template" value="table" />
            <div className="inquiry-form__grid">
              <label>Your name<input name="name" autoComplete="name" required /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
              <label>Company or brand <span>Optional</span><input name="company" autoComplete="organization" /></label>
              <label>What are you looking for?
                <select name="service" defaultValue="">
                  <option value="" disabled>Select a direction</option>
                  <option>Motion</option><option>Stills</option><option>Interface systems</option><option>A little of everything</option>
                </select>
              </label>
            </div>
            <label className="inquiry-form__message">Tell us about the project<textarea name="message" rows={4} required placeholder="The idea, timing, and anything you’d like us to know." /></label>
            {submission === "error" && <p className="inquiry-form__error">Something interrupted the send. Please try again, or email <a href="mailto:visualheightsmediainc@gmail.com">visualheightsmediainc@gmail.com</a>.</p>}
            <div className="inquiry-form__footer"><p>Visual Heights Media<br />Chicago · Everywhere</p><button className="inquiry-modal__send" type="submit" disabled={submission === "sending"}>{submission === "sending" ? "Sending…" : "Send inquiry"}</button></div>
          </form>
        </>}
      </section>
    </div>}
  </section>;
}
