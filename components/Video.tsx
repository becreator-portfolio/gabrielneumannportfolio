"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { VideoMedia } from "@/content/types";

type Props = {
  media: VideoMedia;
  /** "preview": recorte mudo em loop. "full": arquivo completo, com botão de som. */
  mode?: "preview" | "full";
  sizes?: string;
  className?: string;
};

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);

/**
 * Vídeo que só carrega e toca quando entra na tela, e pausa ao sair.
 * Com "reduzir movimento" ativo, nada toca sozinho: o usuário decide.
 */
export function Video({ media, mode = "preview", className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const reduce = useReducedMotion();
  const manual = reduce || blocked;
  const src = mode === "full" ? media.src : media.preview;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = el.dataset.src ?? "";
          el.play().catch(() => setBlocked(true));
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    if (!el.src) el.src = el.dataset.src ?? "";
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next) {
      el.currentTime = 0;
      el.play().catch(() => undefined);
    }
  };

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (!el.src) el.src = el.dataset.src ?? "";
    if (el.paused) el.play().catch(() => undefined);
    else el.pause();
  };

  return (
    <div
      className={["video", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
      data-playing={playing || undefined}
    >
      <video
        ref={ref}
        data-src={src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {mode === "full" ? (
        <div className="video__controls">
          <button type="button" className="video__btn" onClick={togglePlay} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}>
            {playing ? "Pausar" : "Play"}
          </button>
          <button type="button" className="video__btn" onClick={toggleSound} aria-pressed={!muted}>
            {muted ? "Som off" : "Som on"}
          </button>
        </div>
      ) : manual && !playing ? (
        <button type="button" className="video__play" onClick={togglePlay} aria-label={`Reproduzir: ${media.alt}`}>
          <span aria-hidden="true">▶</span>
        </button>
      ) : null}
    </div>
  );
}
