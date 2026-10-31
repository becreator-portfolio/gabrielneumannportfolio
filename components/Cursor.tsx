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
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(t ? (t.dataset.cursor ?? null) : null);
    };
    const onLeave = () => setLabel(null);
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
    };
  }, [fine, reduce]);

  if (!fine) return null;
  return (
    <div ref={el} className="cursor" aria-hidden="true" data-visible={label ? "" : undefined}>
      <span>{label}</span>
    </div>
  );
}
