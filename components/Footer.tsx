import Link from "next/link";
import { Split } from "./Split";
import { navLinks as nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__top">
        <nav className="footer__nav label" aria-label="Rodapé">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="roll" data-text={l.label}>
              <span>{l.label}</span>
            </Link>
          ))}
          <button type="button" className="roll" data-text="Índice" data-open-index aria-haspopup="dialog" aria-controls="indice">
            <span>Índice</span>
          </button>
        </nav>
        <p className="footer__role label mute">{site.role}</p>
      </div>
      <p className="footer__name" aria-hidden="true" data-reveal="split">
        <Split text="Neumann" />
      </p>
      <div className="footer__row label">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <a href="#conteudo" className="roll" data-text="Voltar ao topo ↑">
          <span>Voltar ao topo ↑</span>
        </a>
      </div>
    </footer>
  );
}
