import Link from "next/link";
import type { Project } from "@/content/types";
import { Media } from "./Media";

const n = (i: number) => String(i + 1).padStart(2, "0");

/** Apresentação de um projeto na home. Cada layout tem composição própria. */
export function Feature({ project, index, total }: { project: Project; index: number; total: number }) {
  const { feature: f } = project;
  const href = `/trabalhos/${project.slug}`;

  const fit = Math.max(...project.client.split(/\s+/).map((w) => w.length));

  const caption = (
    <div className="feat__caption" data-reveal>
      <p className="label">
        <span>{n(index)}</span>
        <span className="label__sep">/</span>
        <span>{String(total).padStart(2, "0")}</span>
        <span className="label__gap">{project.category}</span>
      </p>
      <h3 className="feat__title" style={{ "--fit": fit } as React.CSSProperties}>
        <Link href={href}>{project.client}</Link>
      </h3>
      <p className="feat__summary">{project.summary}</p>
      <Link href={href} className="cta">
        <span>Ver projeto</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );

  const link = (node: React.ReactNode, cls: string, label: string) => (
    <Link href={href} className={`feat__media ${cls}`} aria-label={label} data-reveal>
      {node}
    </Link>
  );

  switch (f.layout) {
    case "system":
      return (
        <article className="feat feat--system">
          {caption}
          {link(<Media media={f.main} sizes="(max-width: 768px) 100vw, 62vw" />, "feat__a", `${project.client}: ${f.main.alt}`)}
          {link(<Media media={f.side} sizes="(max-width: 768px) 50vw, 22vw" />, "feat__b", `${project.client}: ${f.side.alt}`)}
        </article>
      );
    case "carousel":
      return (
        <article className="feat feat--carousel">
          {caption}
          <div className="feat__rail" data-reveal>
            <ol className="rail" aria-label={`${project.client}: telas do carrossel`}>
              {f.items.map((m, i) => (
                <li key={m.src}>
                  <Link href={href} aria-label={m.alt}>
                    <Media media={m} sizes="(max-width: 768px) 72vw, 26vw" />
                  </Link>
                  <span className="rail__n">{n(i)}</span>
                </li>
              ))}
            </ol>
          </div>
        </article>
      );
    case "duo":
      return (
        <article className="feat feat--duo">
          {caption}
          {link(<Media media={f.items[0]} sizes="(max-width: 768px) 50vw, 24vw" />, "feat__a", f.items[0].alt)}
          {link(<Media media={f.items[1]} sizes="(max-width: 768px) 50vw, 24vw" />, "feat__b", f.items[1].alt)}
        </article>
      );
    case "cinema":
      return (
        <article className="feat feat--cinema">
          {link(<Media media={f.main} sizes="100vw" />, "feat__a", f.main.alt)}
          {caption}
        </article>
      );
    case "trio":
      return (
        <article className="feat feat--trio">
          {caption}
          {f.items.map((m, i) => link(<Media media={m} sizes="(max-width: 768px) 80vw, 28vw" />, `feat__${"abc"[i]}`, m.alt))}
        </article>
      );
    case "single":
      return (
        <article className={`feat feat--single feat--${f.align}`}>
          {link(<Media media={f.main} sizes="(max-width: 768px) 70vw, 26vw" />, "feat__a", f.main.alt)}
          {caption}
        </article>
      );
    case "pair":
      return (
        <article className="feat feat--pair">
          {caption}
          {link(<Media media={f.items[0]} sizes="(max-width: 768px) 50vw, 30vw" />, "feat__a", f.items[0].alt)}
          {link(<Media media={f.items[1]} sizes="(max-width: 768px) 50vw, 24vw" />, "feat__b", f.items[1].alt)}
        </article>
      );
  }
}
