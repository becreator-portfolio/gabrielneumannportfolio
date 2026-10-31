"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tagLabels, type Project, type Tag } from "@/content/types";
import { useReducedMotion } from "./useReducedMotion";

const n = (i: number) => String(i + 1).padStart(2, "0");
const coverSrc = (p: Project) => (p.cover.kind === "video" ? p.cover.poster : p.cover.src);

/**
 * Índice tipográfico com filtro por tipo de trabalho.
 * Desktop: a capa acompanha o cursor. Toque/tablet: miniatura na linha.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<Tag | "all">("all");
  const reduce = useReducedMotion();
  const preview = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const tags = (Object.keys(tagLabels) as Tag[]).filter((t) => projects.some((p) => p.tags.includes(t)));
  const visible = (p: Project) => filter === "all" || p.tags.includes(filter);
  const count = projects.filter(visible).length;

  useEffect(() => {
    if (active === null) return;
    let raf = 0;
    const tick = () => {
      const k = reduce ? 1 : 0.16;
      const dx = (target.current.x - pos.current.x) * k;
      pos.current.x += dx;
      pos.current.y += (target.current.y - pos.current.y) * k;
      // Inclina levemente na direção do movimento — dá peso à imagem.
      const tilt = reduce ? 0 : Math.max(-7, Math.min(7, dx * 0.35));
      if (preview.current) {
        preview.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce]);

  const onMove = (e: React.PointerEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
    if (active === null) pos.current = { ...target.current };
  };

  return (
    <div className="index" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <div className="filters" role="group" aria-label="Filtrar trabalhos">
        {(["all", ...tags] as const).map((t) => {
          const total = t === "all" ? projects.length : projects.filter((p) => p.tags.includes(t)).length;
          return (
            <button
              key={t}
              type="button"
              className="filter"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
            >
              {t === "all" ? "Todos" : tagLabels[t]}
              <sup>{String(total).padStart(2, "0")}</sup>
            </button>
          );
        })}
        <span className="sr-only" aria-live="polite">
          {count === projects.length ? `${count} trabalhos` : `${count} de ${projects.length} trabalhos`}
        </span>
      </div>

      <ol className="index__list">
        {projects.map((p, i) => (
          <li key={p.slug} hidden={!visible(p)}>
            <Link
              href={`/trabalhos/${p.slug}`}
              className="index__row"
              data-dim={active !== null && active !== i ? "" : undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
            >
              <span className="index__n">{n(i)}</span>
              <span className="index__client">{p.client}</span>
              <span className="index__cat">{p.category}</span>
              <span className="index__mini" aria-hidden="true">
                <Image src={coverSrc(p)} alt="" width={p.cover.width} height={p.cover.height} sizes="96px" quality={75} />
              </span>
              <span className="index__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div ref={preview} className="index__preview" data-visible={active !== null || undefined} aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.slug} className="index__thumb" data-active={active === i || undefined}>
            <Image src={coverSrc(p)} alt="" width={p.cover.width} height={p.cover.height} sizes="280px" quality={75} />
          </div>
        ))}
      </div>
    </div>
  );
}
