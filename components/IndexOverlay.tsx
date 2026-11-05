"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { navLinks, site } from "@/content/site";
import { WorkIndex } from "./WorkIndex";

/**
 * Índice em sobreposição: navegação + lista filtrável de todos os
 * trabalhos, acessível de qualquer página. No mobile é o próprio menu.
 * Abre por qualquer elemento com [data-open-index].
 */
export function IndexOverlay() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-open-index]");
      if (!t) return;
      e.preventDefault();
      opener.current = t;
      ref.current?.showModal();
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Fecha ao navegar.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (!open && d.open) d.close();
    document.documentElement.toggleAttribute("data-index-open", open);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <dialog
      ref={ref}
      id="indice"
      className="overlay"
      aria-label="Índice"
      onClose={() => {
        setOpen(false);
        opener.current?.focus();
      }}
      onClick={(e) => {
        // Qualquer link dentro do índice fecha a sobreposição.
        if ((e.target as HTMLElement).closest("a")) close();
      }}
    >
      <div className="overlay__bar">
        <Link href="/" className="overlay__name">
          {site.name}
        </Link>
        <span className="overlay__title">Índice</span>
        <button type="button" className="overlay__close" onClick={close} autoFocus>
          Fechar
        </button>
      </div>

      <div className="overlay__body">
        <nav className="overlay__nav" aria-label="Seções">
          <ol>
            {[{ href: "/", label: "Início" }, ...navLinks].map((l, i) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <span className="overlay__n label">{String(i + 1).padStart(2, "0")}</span>
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="label mute">{site.role}</p>
        </nav>
        {open && <WorkIndex projects={projects} />}
      </div>
    </dialog>
  );
}
