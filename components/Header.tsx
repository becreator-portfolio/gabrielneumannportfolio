"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks as links, site } from "@/content/site";
import { projects } from "@/content/projects";
import type { ChapterDetail } from "./Motion";

export function Header() {
  const pathname = usePathname();
  const [chapter, setChapter] = useState<ChapterDetail>(null);

  // Projeto em leitura na home (enviado pelo laço de scroll em Motion).
  useEffect(() => {
    const on = (e: Event) => setChapter((e as CustomEvent<ChapterDetail>).detail);
    window.addEventListener("chapter", on);
    return () => window.removeEventListener("chapter", on);
  }, []);

  // Seção visível na home, para marcar o item ativo da navegação.
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const els = ["trabalhos", "sobre", "contato"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < window.innerHeight * 0.5 && setSection(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);
  const current = pathname === "/" ? section : pathname.startsWith("/trabalhos") ? "trabalhos" : null;
  const now = pathname === "/" ? chapter : null;

  return (
    <header className="header">
      <div className="header__bar">
        <Link href="/" className="header__name" aria-label={`${site.name} — início`}>
          Gabriel Neumann
        </Link>
        <span className="header__now" aria-hidden="true">
          <span key={now?.n ?? "role"} className="header__now-in">
            {now ? (
              <>
                <span className="header__now-n">
                  {now.n}/{String(projects.length).padStart(2, "0")}
                </span>
                <span className="header__now-t">{now.title}</span>
              </>
            ) : (
              <span className="header__now-t">{site.role}</span>
            )}
          </span>
        </span>
        <nav className="header__nav" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="roll"
              data-text={l.label}
              aria-current={current === l.href.slice(2) ? "location" : undefined}
            >
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <button type="button" className="header__index" data-open-index aria-haspopup="dialog" aria-controls="indice">
          <span className="header__index-d">
            Índice<sup>{String(projects.length).padStart(2, "0")}</sup>
          </span>
          <span className="header__index-m">Menu</span>
        </button>
      </div>
    </header>
  );
}
