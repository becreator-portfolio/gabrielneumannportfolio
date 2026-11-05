"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type ChapterDetail = { n: string; title: string } | null;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Um único laço de scroll para todo o comportamento ligado à rolagem:
 *  - [data-reveal]   entra na tela uma vez (IntersectionObserver)
 *  - [data-tone]     a seção que cruza o meio da tela define o tom da página
 *  - [data-chapter]  avisa o cabeçalho qual projeto está em leitura
 *  - [data-progress] recebe --p (0→1) enquanto atravessa a tela fixada (hero)
 *  - [data-depth]    parallax leve, medido pelo contêiner pai
 *  - [data-scrub]    texto que acende palavra a palavra conforme a rolagem
 * Com "reduzir movimento", só tom e capítulo continuam ativos.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const q = <T extends HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

    /* Revelação ------------------------------------------------------- */
    const reveals = q("[data-reveal]:not([data-shown])");
    let io: IntersectionObserver | null = null;
    if (reduce) {
      reveals.forEach((el) => el.setAttribute("data-shown", ""));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.setAttribute("data-shown", "");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );
      reveals.forEach((el) => io!.observe(el));
    }

    /* Elementos ligados à rolagem ------------------------------------ */
    const tones = q("[data-tone]");
    const progress = reduce ? [] : q("[data-progress]");
    const depth = reduce ? [] : q("[data-depth]");
    const scrub = reduce ? [] : q("[data-scrub]");

    // Só calcula o que está perto da tela.
    const near = new Set<Element>();
    const watch = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
        schedule();
      },
      { rootMargin: "25% 0px" },
    );
    [...progress, ...scrub].forEach((el) => watch.observe(el));
    depth.forEach((el) => el.parentElement && watch.observe(el.parentElement));

    let tone = "";
    let chapter = "";
    let raf = 0;

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      // Linha de leitura no meio da tela; no fim da página ela desce até a
      // base, para que seções curtas (rodapé) também assumam o tom.
      const left = document.documentElement.scrollHeight - (window.scrollY + vh);
      const mid = left < vh / 2 ? vh - Math.max(0, left) - 1 : vh / 2;

      // Tom: a última seção marcada que contém a linha do meio da tela.
      let t = "light";
      let ch: HTMLElement | null = null;
      for (const el of tones) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          t = el.dataset.tone || "light";
          ch = el.dataset.chapter ? el : null;
        }
      }
      if (t !== tone) {
        tone = t;
        root.dataset.tone = t;
      }
      const key = ch ? ch.dataset.chapter! : "";
      if (key !== chapter) {
        chapter = key;
        const detail: ChapterDetail = ch ? { n: ch.dataset.chapter!, title: ch.dataset.title ?? "" } : null;
        window.dispatchEvent(new CustomEvent("chapter", { detail }));
      }

      for (const el of progress) {
        if (!near.has(el)) continue;
        const r = el.getBoundingClientRect();
        const run = Math.max(1, r.height - vh);
        el.style.setProperty("--p", clamp(-r.top / run).toFixed(4));
      }

      for (const el of depth) {
        const box = el.parentElement;
        if (!box || !near.has(box)) continue;
        const r = box.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh + r.height));
        const d = Number(el.dataset.depth) || 60;
        el.style.translate = `0 ${((0.5 - p) * 2 * d).toFixed(1)}px`;
      }

      for (const el of scrub) {
        if (!near.has(el)) continue;
        const r = el.getBoundingClientRect();
        const p = clamp((vh * 0.86 - r.top) / (r.height * 0.85 + vh * 0.32));
        el.style.setProperty("--p", p.toFixed(4));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Primeira medição depois que o layout assenta.
    schedule();
    const settle = window.setTimeout(schedule, 300);

    return () => {
      io?.disconnect();
      watch.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearTimeout(settle);
      cancelAnimationFrame(raf);
      depth.forEach((el) => (el.style.translate = ""));
    };
  }, [pathname]);

  return null;
}
