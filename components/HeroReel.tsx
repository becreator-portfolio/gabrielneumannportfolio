"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Media as MediaType } from "@/content/types";
import { Media } from "./Media";
import { useReducedMotion } from "./useReducedMotion";

export type ReelItem = { slug: string; client: string; n: string; media: MediaType };

const DURATION = 4200;

/**
 * Recorte rotativo de trabalhos no topo da página.
 * Pausa com hover/foco, tem botão de pausa (WCAG 2.2.2) e fica parado
 * quando o sistema pede menos movimento.
 */
export function HeroReel({ items }: { items: ReelItem[] }) {
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
    <div
      className="reel"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      data-running={running || undefined}
    >
      <Link href={`/trabalhos/${cur.slug}`} className="reel__stage" aria-label={`Ver projeto ${cur.client}`} data-cursor="Ver projeto">
        {items.map((it, k) => (
          <span key={it.slug} className="reel__item" data-active={k === i || undefined} aria-hidden={k !== i}>
            <Media media={it.media} sizes="(max-width: 768px) 46vw, 15vw" priority={k === 0} />
          </span>
        ))}
        <span className="reel__timer" aria-hidden="true">
          <span key={`${i}-${running}`} style={{ animationDuration: `${DURATION}ms` }} />
        </span>
      </Link>
      <div className="reel__cap label">
        <span className="reel__n">
          {cur.n}
        </span>
        <span className="reel__client" aria-live="polite">
          {cur.client}
        </span>
        {!reduce && (
          <button type="button" className="reel__toggle" onClick={() => setPaused((v) => !v)} aria-pressed={paused}>
            {paused ? "Continuar" : "Pausar"}
          </button>
        )}
      </div>
    </div>
  );
}
