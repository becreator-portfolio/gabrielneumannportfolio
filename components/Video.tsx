"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VideoMedia } from "@/content/types";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  media: VideoMedia;
  /** "preview": recorte mudo em loop. "full": arquivo completo, com controles. */
  mode?: "preview" | "full";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Vídeo com poster otimizado por baixo: nunca aparece uma caixa vazia.
 * Só carrega e toca quando está na tela; pausa ao sair.
 * Com "reduzir movimento" ativo, nada toca sozinho.
 */
export function Video({ media, mode = "preview", sizes = "50vw", priority, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const reduce = useReducedMotion();
  const src = mode === "full" ? media.src : media.preview;

  const load = () => {
    const el = ref.current;
    if (el && !el.getAttribute("src")) el.src = src;
    return el;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          el.play().catch(() => setBlocked(true));
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, src]);

  // Barra de progresso sem re-render: atualizada direto no estilo.
  useEffect(() => {
    if (mode !== "full" || !playing) return;
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el && bar.current && el.duration) bar.current.style.transform = `scaleX(${el.currentTime / el.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, playing]);

  const togglePlay = () => {
    const el = load();
    if (!el) return;
    if (el.paused) el.play().catch(() => undefined);
    else el.pause();
  };

  const toggleSound = () => {
    const el = load();
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next) {
      el.currentTime = 0;
      el.play().catch(() => undefined);
    }
  };

  const showPlay = mode === "preview" && (reduce || blocked) && !playing;

  return (
    <span
      className={["video", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
      data-ready={ready || undefined}
      data-playing={playing || undefined}
    >
      <Image
        className="video__poster"
        src={media.poster}
        alt=""
        fill
        sizes={sizes}
        quality={75}
        priority={priority}
      />
      <video
        ref={ref}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
        onLoadedData={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {mode === "full" && (
        <>
          <span className="video__controls">
            <button type="button" className="video__btn" onClick={togglePlay} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}>
              <span aria-hidden="true" className="video__icon">
                {playing ? "❚❚" : "▶"}
              </span>
              <span className="video__label">{playing ? "Pausar" : "Reproduzir"}</span>
            </button>
            <button type="button" className="video__btn" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Ativar som" : "Silenciar"}>
              <span className="video__label">{muted ? "Ativar som" : "Som ativo"}</span>
            </button>
            {media.duration ? <span className="video__time">{fmt(media.duration)}</span> : null}
          </span>
          <span className="video__progress" aria-hidden="true">
            <span ref={bar} />
          </span>
        </>
      )}
      {showPlay && (
        // Prévias ficam dentro de links: o ícone é só indicativo.
        <span className="video__play" aria-hidden="true">
          <span>▶</span>
        </span>
      )}
    </span>
  );
}
