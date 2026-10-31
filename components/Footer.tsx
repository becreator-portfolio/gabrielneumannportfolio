import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name" aria-hidden="true">
        Neumann
      </p>
      <div className="footer__row label">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.role}</span>
        <a href="#conteudo" className="roll" data-text="Voltar ao topo ↑">
          <span>Voltar ao topo ↑</span>
        </a>
      </div>
    </footer>
  );
}
