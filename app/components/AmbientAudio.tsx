"use client";

import { useEffect, useRef, useState } from "react";

const START_AT = 16;
const LISTENING_VOLUME = 0.11;

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const restartingRef = useRef(false);
  const pausedForVideoRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  const fadeTo = (target: number, duration: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    const from = audio.volume;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      audio.volume = from + (target - from) * progress;
      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(tick);
      } else {
        fadeFrameRef.current = null;
        done?.();
      }
    };

    fadeFrameRef.current = requestAnimationFrame(tick);
  };

  const begin = async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    if (audio.currentTime < START_AT - 0.25 || audio.ended) audio.currentTime = START_AT;
    audio.volume = 0;
    try {
      await audio.play();
      fadeTo(LISTENING_VOLUME, 1200);
      setEnabled(true);
      return true;
    } catch {
      setEnabled(false);
      return false;
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, 450, () => audio.pause());
    setEnabled(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const restartGently = () => {
      if (restartingRef.current || pausedForVideoRef.current) return;
      restartingRef.current = true;
      fadeTo(0, 1800, () => {
        audio.currentTime = START_AT;
        audio.play().then(() => fadeTo(LISTENING_VOLUME, 1300)).catch(() => setEnabled(false));
        restartingRef.current = false;
      });
    };

    const onTimeUpdate = () => {
      if (Number.isFinite(audio.duration) && audio.currentTime > audio.duration - 2.1) restartGently();
    };
    const onEnded = () => {
      restartingRef.current = false;
      audio.currentTime = START_AT;
      begin();
    };
    const unlockOnFirstInteraction = () => { begin(); };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    window.addEventListener("pointerdown", unlockOnFirstInteraction, { once: true, capture: true });
    window.addEventListener("keydown", unlockOnFirstInteraction, { once: true, capture: true });
    begin();

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", unlockOnFirstInteraction, true);
      window.removeEventListener("keydown", unlockOnFirstInteraction, true);
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const attachVideoListeners = (video: HTMLVideoElement) => {
      const pauseForVideo = () => {
        const audio = audioRef.current;
        if (!audio || audio.paused) return;
        pausedForVideoRef.current = true;
        fadeTo(0, 500, () => audio.pause());
      };
      const resumeAfterVideo = () => {
        if (!pausedForVideoRef.current) return;
        pausedForVideoRef.current = false;
        begin();
      };
      video.addEventListener("play", pauseForVideo);
      video.addEventListener("pause", resumeAfterVideo);
      video.addEventListener("ended", resumeAfterVideo);
      return () => {
        video.removeEventListener("play", pauseForVideo);
        video.removeEventListener("pause", resumeAfterVideo);
        video.removeEventListener("ended", resumeAfterVideo);
      };
    };

    const cleanups = new Map<HTMLVideoElement, () => void>();
    const connectVideos = () => {
      document.querySelectorAll("video").forEach((video) => {
        if (!cleanups.has(video)) cleanups.set(video, attachVideoListeners(video));
      });
    };
    connectVideos();
    const observer = new MutationObserver(connectVideos);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="auto" aria-hidden="true">
        <source src="/vhm-ambient.mp3" type="audio/mpeg" />
      </audio>
      <button
        className={`ambient-audio-toggle${enabled ? " ambient-audio-toggle--on" : ""}`}
        type="button"
        aria-pressed={enabled}
        onClick={() => (enabled ? stop() : begin())}
      >
        <span aria-hidden="true" />
        Sound {enabled ? "on" : "off"}
      </button>
    </>
  );
}
