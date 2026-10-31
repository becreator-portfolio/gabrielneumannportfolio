"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageMedia } from "@/content/types";

/**
 * Visualizador em tela cheia para as imagens da página de projeto.
 * Abre a partir de qualquer elemento com [data-zoom="<índice>"].
 * Teclado: ← → navegam, Esc fecha. No toque: deslize para os lados.
 */
export function Lightbox({ images }: { images: ImageMedia[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<string | null>(null);

  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((v) => (v === null ? v : (v + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-zoom]");
      if (!el) return;
      e.preventDefault();
      opener.current = el;
      setIndex(Number(el.dataset.zoom));
      dialog.current?.showModal();
      document.documentElement.setAttribute("data-lightbox", "");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.removeAttribute("data-lightbox");
      setIndex(null);
      opener.current?.focus();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const img = index === null ? null : images[index];
  // Vizinhas pré-carregadas para a navegação ficar instantânea.
  const neighbors =
    index === null || images.length < 2
      ? []
      : [images[(index + 1) % images.length], images[(index - 1 + images.length) % images.length]];

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Visualização ampliada"
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      {img && (
        <>
          <div className="lightbox__top label">
            <span>
              {String(index! + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <span className="lightbox__alt">{img.alt}</span>
            <button type="button" className="lightbox__close" onClick={close} autoFocus>
              Fechar <span aria-hidden="true">✕</span>
            </button>
          </div>
          <figure
            className="lightbox__stage"
            data-loading={loaded !== img.src || undefined}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <span className="lightbox__loading label" aria-hidden="true">
              Carregando
            </span>
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="100vw"
              quality={85}
              className="lightbox__img"
              onLoad={() => setLoaded(img.src)}
            />
            {neighbors.map((m) => (
              <Image key={`pre-${m.src}`} src={m.src} alt="" width={m.width} height={m.height} sizes="100vw" quality={85} loading="eager" className="lightbox__pre" />
            ))}
          </figure>
          {images.length > 1 && (
            <>
              <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Imagem anterior">
                ←
              </button>
              <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Próxima imagem">
                →
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
