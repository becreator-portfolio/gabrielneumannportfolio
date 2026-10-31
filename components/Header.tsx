"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks as links, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu ao trocar de página.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Seção visível na home, para marcar o item ativo da navegação.
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["trabalhos", "sobre", "contato"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
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

  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header" data-open={open || undefined}>
      <div className="header__bar">
        <Link href="/" className="header__name" aria-label={`${site.name} — início`} onClick={() => setOpen(false)}>
          Gabriel Neumann
        </Link>
        <span className="header__role">{site.role}</span>
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
        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
      <nav id="menu" className="menu" aria-label="Menu" hidden={!open}>
        <ol>
          {links.map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                <span className="menu__n">0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ol>
        <p className="menu__foot">{site.role}</p>
      </nav>
    </header>
  );
}
