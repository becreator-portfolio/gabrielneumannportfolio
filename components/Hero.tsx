"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Media as MediaType } from "@/content/types";
import { Media } from "./Media";
import { Split } from "./Split";
import { useReducedMotion } from "./useReducedMotion";

export type ReelItem = { slug: string; client: string; n: string; media: MediaType };

const DURATION = 4200;

/**
 * Abertura. O nome funciona como cabeçalho de revista e um recorte de
 * trabalhos ocupa o centro. Ao rolar, o nome se abre e o recorte cresce
 * até tomar a tela — a apresentação passa direto para os trabalhos.
 * O recorte pausa com hover/foco e tem botão de pausa (WCAG 2.2.2).
 */
export function Hero({ items, statement }: { items: ReelItem[]; statement: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const running = !paused && !hover && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % items.length), DURATION);
    return () => window.clearTimeout(t);
  }, [running, i, items.length]);

  const cur = items[i];

  return (
    <section className="hero" aria-labelledby="hero-title" data-progress data-tone="light">
      <div className="hero__pin">
        <h1 id="hero-title" className="hero__name">
          <span className="hero__word hero__word--1">
            <Split text="Gabriel" by="char" />
          </span>
          <span className="hero__word hero__word--2">
            <Split text="Neumann" by="char" offset={4} />
          </span>
        </h1>

        <div
          className="hero__frame"
          data-running={running || undefined}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
        >
          <Link href={`/trabalhos/${cur.slug}`} className="hero__stage" aria-label={`Ver projeto ${cur.client}`} data-cursor="Ver projeto">
            {items.map((it, k) => (
              <span key={it.slug} className="hero__item" data-active={k === i || undefined} aria-hidden={k !== i}>
                <Media media={it.media} sizes="(max-width: 768px) 80vw, 46vw" priority={k === 0} />
              </span>
            ))}
            <span className="hero__timer" aria-hidden="true">
              <span key={`${i}-${running}`} style={{ animationDuration: `${DURATION}ms` }} />
            </span>
          </Link>
        </div>

        <div className="hero__cap label">
          <span className="hero__count mute">{cur.n}</span>
          <span className="hero__client" aria-live="polite" key={cur.slug}>
            {cur.client}
          </span>
          {!reduce && (
            <button type="button" className="hero__toggle" onClick={() => setPaused((v) => !v)} aria-pressed={paused}>
              {paused ? "Continuar" : "Pausar"}
            </button>
          )}
        </div>

        <div className="hero__foot">
          <p className="hero__statement">
            <Split text={statement} offset={10} />
          </p>
          <a href="#trabalhos" className="button button--solid" data-magnetic>
            <span>Ver trabalhos</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
