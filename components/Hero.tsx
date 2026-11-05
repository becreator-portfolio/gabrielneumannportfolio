import { Split } from "./Split";

/**
 * Abertura tipográfica. O nome é um letreiro: "Gabriel" em itálico serifado
 * sobre "NEUMANN" condensado, ajustado à largura da página. Sem mídia —
 * os trabalhos começam logo abaixo.
 *
 * O nome anima por palavra (não por letra) para preservar o kerning.
 */
export function Hero({ statement }: { statement: string }) {
  return (
    <section className="hero" aria-labelledby="hero-title" data-tone="light">
      <p className="hero__statement">
        <Split text={statement} offset={6} />
      </p>

      <a href="#trabalhos" className="hero__go link-arrow">
        <span>Ver trabalhos</span>
        <span aria-hidden="true">↓</span>
      </a>

      <h1 id="hero-title" className="hero__name">
        <span className="hero__first">
          <Split text="Gabriel" />
        </span>
        <span className="hero__rule" aria-hidden="true" />
        <span className="hero__last">
          <Split text="Neumann" />
        </span>
      </h1>
    </section>
  );
}
