"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "./useReducedMotion";

/**
 * Etiqueta que acompanha o cursor sobre elementos com [data-cursor].
 * Só existe com mouse/trackpad; o cursor nativo continua visível.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!fine) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    // Botões magnéticos: acompanham o cursor alguns pixels quando ele está por cima.
    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const node = e.target as HTMLElement | null;
      const t = node?.closest<HTMLElement>("[data-cursor]");
      setLabel(t ? (t.dataset.cursor ?? null) : null);
      const m = reduce ? null : node?.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const mx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 10;
        const my = ((e.clientY - (r.top + r.height / 2)) / r.height) * 8;
        m.style.translate = `${mx.toFixed(1)}px ${my.toFixed(1)}px`;
      }
    };
    const onLeave = () => {
      setLabel(null);
      release();
    };
    const tick = () => {
      const k = reduce ? 1 : 0.22;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      if (el.current) el.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      release();
    };
  }, [fine, reduce]);

  if (!fine) return null;
  return (
    <div ref={el} className="cursor" aria-hidden="true" data-visible={label ? "" : undefined}>
      <span>{label}</span>
    </div>
  );
}
