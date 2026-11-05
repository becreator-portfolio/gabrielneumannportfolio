import Link from "next/link";
import type { Media as MediaType, Project } from "@/content/types";
import { Media } from "./Media";
import { Rail } from "./Rail";
import { Split } from "./Split";

const pad = (i: number) => String(i).padStart(2, "0");

/**
 * Um projeto na home, tratado como capítulo: régua, número, título grande
 * e uma composição de mídia própria para o tipo de trabalho.
 */
export function Chapter({ project, index }: { project: Project; index: number }) {
  const { feature: f } = project;
  const href = `/trabalhos/${project.slug}`;
  const n = pad(index + 1);
  const fit = Math.max(...project.client.split(" ").map((w) => w.length));
  const side = f.layout === "single";

  const head = (
    <header className="chapter__head">
      <p className="chapter__n label" data-reveal>
        {n}
      </p>
      <h3 className="chapter__title" style={{ "--fit": fit } as React.CSSProperties} data-reveal="split">
        <Link href={href}>
          <Split text={project.client} />
          <span className="chapter__arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </h3>
      <div className="chapter__aside" data-reveal>
        <p className="label">{project.category}</p>
        <p className="chapter__summary">{project.summary}</p>
        {side && <p className="label mute">{project.formats.join(" · ")}</p>}
        {/* Atalho visual; o título já é o link acessível. */}
        <Link href={href} className="chapter__open" tabIndex={-1} aria-hidden="true">
          <span>Ver projeto</span>
          <span>→</span>
        </Link>
      </div>
    </header>
  );

  /** Mídia clicável, fora da ordem de tabulação (o título já é o link). */
  const item = (m: MediaType, cls: string, sizes: string, depth?: number) => (
    <Link
      key={m.src}
      href={href}
      className={`chapter__item ${cls}`}
      tabIndex={-1}
      aria-hidden="true"
      data-reveal="media"
      data-cursor="Ver projeto"
      data-depth={depth}
    >
      <Media media={m} sizes={sizes} />
    </Link>
  );

  let media: React.ReactNode;
  switch (f.layout) {
    case "system":
      media = [
        item(f.main, "c-a", "(max-width: 768px) 100vw, 75vw"),
        item(f.side, "c-b", "(max-width: 768px) 50vw, 25vw", 50),
      ];
      break;
    case "carousel":
      media = (
        <div className="chapter__rail" data-reveal>
          <Rail label={`${project.client}: telas do carrossel`}>
            {f.items.map((m) => (
              <li key={m.src}>
                <Link href={href} tabIndex={-1} aria-label={m.alt} data-cursor="Arraste ou clique" draggable={false}>
                  <Media media={m} sizes="(max-width: 768px) 76vw, 28vw" />
                </Link>
              </li>
            ))}
          </Rail>
        </div>
      );
      break;
    case "duo":
      media = [
        item(f.items[0], "c-a", "(max-width: 768px) 50vw, 34vw"),
        item(f.items[1], "c-b", "(max-width: 768px) 50vw, 34vw", 90),
      ];
      break;
    case "cinema":
      media = item(f.main, "c-a", "100vw");
      break;
    case "trio":
      media = f.items.map((m, i) => item(m, `c-${"abc"[i]}`, "(max-width: 768px) 76vw, 34vw", [20, 80, 45][i]));
      break;
    case "single":
      media = item(f.main, "c-a", "(max-width: 768px) 66vw, 34vw", 40);
      break;
    case "pair":
      media = [
        item(f.items[0], "c-a", "(max-width: 768px) 50vw, 42vw"),
        item(f.items[1], "c-b", "(max-width: 768px) 50vw, 34vw", 90),
      ];
      break;
  }

  const align = f.layout === "single" ? ` chapter--${f.align}` : "";

  return (
    <article
      className={`chapter chapter--${f.layout}${align}`}
      data-tone={project.tone ?? "light"}
      data-chapter={n}
      data-title={project.client}
      id={`c-${project.slug}`}
    >
      {head}
      <div className="chapter__media">{media}</div>
    </article>
  );
}
