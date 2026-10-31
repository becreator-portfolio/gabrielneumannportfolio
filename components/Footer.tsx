import Link from "next/link";
import { navLinks as nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__nav" aria-label="Rodapé">
        {nav.map((l) => (
          <Link key={l.href} href={l.href} className="roll" data-text={l.label}>
            <span>{l.label}</span>
          </Link>
        ))}
      </nav>
      <p className="footer__name" aria-hidden="true">
        Neumann
      </p>
      <div className="footer__row label">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.role}</span>
        <a href="#conteudo" className="roll" data-text="Voltar ao topo ↑">
          <span>Voltar ao topo ↑</span>
        </a>
      </div>
    </footer>
  );
}
