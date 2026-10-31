"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";

const n = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Índice tipográfico dos projetos. No desktop, a capa acompanha o cursor.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (active === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      const k = reduce ? 1 : 0.16;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      if (preview.current) {
        preview.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const onMove = (e: React.PointerEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
    if (active === null) pos.current = { ...target.current };
  };

  return (
    <div className="index" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <div className="index__head" aria-hidden="true">
        <span>Nº</span>
        <span>Cliente</span>
        <span>Categoria</span>
        <span>Formatos</span>
      </div>
      <ol className="index__list">
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal>
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
              <span className="index__formats">{p.formats.join(" · ")}</span>
              <span className="index__arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
      <div ref={preview} className="index__preview" data-visible={active !== null || undefined} aria-hidden="true">
        {projects.map((p, i) => {
          const c = p.cover;
          const src = c.kind === "video" ? c.poster : c.src;
          return (
            <div key={p.slug} className="index__thumb" data-active={active === i || undefined}>
              <Image src={src} alt="" width={c.width} height={c.height} sizes="320px" quality={75} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
