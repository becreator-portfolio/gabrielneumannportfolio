"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  children: React.ReactNode[];
  className?: string;
};

/**
 * Trilho horizontal com scroll nativo (toque/trackpad), arraste com mouse,
 * botões anterior/próximo, setas do teclado e indicador de posição.
 */
export function Rail({ label, children, className }: Props) {
  const track = useRef<HTMLOListElement>(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [state, setState] = useState({ start: true, end: false, current: 1 });
  const total = children.length;

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const item = el.querySelector("li");
    const step = item ? item.getBoundingClientRect().width : el.clientWidth;
    const end = el.scrollLeft >= max - 4;
    const current = end ? total : Math.min(total, Math.round(el.scrollLeft / (step || 1)) + 1);
    setState({ start: el.scrollLeft <= 4, end, current });
  }, [total]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, moved: false, x: e.clientX, left: track.current.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = track.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "";
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = track.current;
    drag.current.active = false;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    if (el) delete el.dataset.dragging;
  };

  // Um arraste não deve abrir o link sob o cursor.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <div className={["railbox", className].filter(Boolean).join(" ")}>
      <ol
        ref={track}
        className="rail"
        tabIndex={0}
        aria-label={`${label} — use as setas para navegar`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </ol>
      <div className="rail__nav">
        <span className="rail__count label" aria-live="polite">
          {String(state.current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="rail__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${state.current / total})` }} />
        </span>
        <button type="button" className="rail__btn" data-magnetic onClick={() => go(-1)} disabled={state.start} aria-label="Anterior">
          ←
        </button>
        <button type="button" className="rail__btn" data-magnetic onClick={() => go(1)} disabled={state.end} aria-label="Próximo">
          →
        </button>
      </div>
    </div>
  );
}
