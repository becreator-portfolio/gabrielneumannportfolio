import Link from "next/link";
import type { Media as MediaType, Project } from "@/content/types";
import { Media } from "./Media";
import { Rail } from "./Rail";

const n = (i: number) => String(i + 1).padStart(2, "0");

/** Apresentação de um projeto na home. Cada layout tem composição própria. */
export function Feature({ project, index, total }: { project: Project; index: number; total: number }) {
  const { feature: f } = project;
  const href = `/trabalhos/${project.slug}`;
  const fit = Math.max(...project.client.split(/\s+/).map((w) => w.length));

  const caption = (
    <div className="feat__caption" data-reveal>
      <p className="label feat__meta">
        <span className="feat__num">{n(index)}</span>
        <span className="label__sep">/</span>
        <span>{String(total).padStart(2, "0")}</span>
        <span className="label__gap">{project.category}</span>
      </p>
      <h3 className="feat__title" style={{ "--fit": fit } as React.CSSProperties}>
        <Link href={href}>{project.client}</Link>
      </h3>
      <p className="feat__summary">{project.summary}</p>
      <p className="feat__formats label">{project.formats.join(" · ")}</p>
      <Link href={href} className="cta" tabIndex={-1} aria-hidden="true">
        <span>Ver projeto</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );

  /** Mídia clicável. Fica fora da ordem de tabulação: o título já é o link. */
  const link = (m: MediaType, cls: string, sizes: string, depth?: number) => (
    <Link
      key={m.src}
      href={href}
      className={`feat__media ${cls}`}
      tabIndex={-1}
      aria-hidden="true"
      data-reveal="media"
      data-cursor="Ver projeto"
      style={depth ? ({ "--depth": depth } as React.CSSProperties) : undefined}
      data-depth={depth ? "" : undefined}
    >
      <Media media={m} sizes={sizes} />
    </Link>
  );

  switch (f.layout) {
    case "system":
      return (
        <article className="feat feat--system">
          {caption}
          {link(f.main, "feat__a", "(max-width: 768px) 100vw, 66vw")}
          {link(f.side, "feat__b", "(max-width: 768px) 60vw, 20vw", 70)}
        </article>
      );
    case "carousel":
      return (
        <article className="feat feat--carousel">
          {caption}
          <div className="feat__rail" data-reveal>
            <Rail label={`${project.client}: telas do carrossel`}>
              {f.items.map((m) => (
                <li key={m.src}>
                  <Link href={href} tabIndex={-1} aria-label={m.alt} data-cursor="Arraste ou clique" draggable={false}>
                    <Media media={m} sizes="(max-width: 768px) 72vw, 26vw" />
                  </Link>
                </li>
              ))}
            </Rail>
          </div>
        </article>
      );
    case "duo":
      return (
        <article className="feat feat--duo">
          {caption}
          {link(f.items[0], "feat__a", "(max-width: 768px) 50vw, 24vw")}
          {link(f.items[1], "feat__b", "(max-width: 768px) 50vw, 24vw", 90)}
        </article>
      );
    case "cinema":
      return (
        <article className="feat feat--cinema">
          {link(f.main, "feat__a", "100vw")}
          {caption}
        </article>
      );
    case "trio":
      return (
        <article className="feat feat--trio">
          {caption}
          {f.items.map((m, i) =>
            link(m, `feat__${"abc"[i]}`, "(max-width: 768px) 70vw, 26vw", i === 0 ? undefined : 40 + i * 30),
          )}
        </article>
      );
    case "single":
      return (
        <article className={`feat feat--single feat--${f.align}`}>
          {link(f.main, "feat__a", "(max-width: 768px) 66vw, 26vw")}
          {caption}
        </article>
      );
    case "pair":
      return (
        <article className="feat feat--pair">
          {caption}
          {link(f.items[0], "feat__a", "(max-width: 768px) 66vw, 32vw")}
          {link(f.items[1], "feat__b", "(max-width: 768px) 66vw, 24vw", 80)}
        </article>
      );
  }
}
