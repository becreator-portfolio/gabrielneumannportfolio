import type { Block } from "@/content/types";
import { Media } from "./Media";

const sizesFor = (size?: string) =>
  size === "full" ? "100vw" : size === "wide" ? "(max-width: 768px) 100vw, 84vw" : size === "narrow" ? "(max-width: 768px) 86vw, 34vw" : "(max-width: 768px) 100vw, 62vw";

/** Corpo da página de projeto, montado a partir de content/projects.ts. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blocks">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "media":
            return (
              <figure key={i} className={`block block--media block--${b.size ?? "wide"}`} data-reveal>
                <Media media={b.media} sizes={sizesFor(b.size)} mode="full" priority={i === 0} />
                {b.caption && <figcaption className="label">{b.caption}</figcaption>}
              </figure>
            );
          case "grid":
            return (
              <figure key={i} className={`block block--grid cols-${b.columns}`} data-stagger={b.stagger || undefined}>
                {b.items.map((m) => (
                  <div key={m.src} className="block__cell" data-reveal>
                    <Media media={m} sizes={`(max-width: 768px) 100vw, ${Math.round(92 / b.columns)}vw`} mode="full" />
                  </div>
                ))}
                {b.caption && <figcaption className="label">{b.caption}</figcaption>}
              </figure>
            );
          case "strip":
            return (
              <figure key={i} className="block block--strip" data-reveal>
                {b.caption && <figcaption className="label">{b.caption}</figcaption>}
                <ol className="rail rail--block" tabIndex={0} aria-label={b.caption ?? "Galeria"}>
                  {b.items.map((m, j) => (
                    <li key={m.src}>
                      <Media media={m} sizes="(max-width: 768px) 78vw, 30vw" mode="full" />
                      <span className="rail__n">{String(j + 1).padStart(2, "0")}</span>
                    </li>
                  ))}
                </ol>
              </figure>
            );
          case "text":
            return (
              <section key={i} className="block block--text" data-reveal>
                {b.label && <h2 className="label">{b.label}</h2>}
                <div>
                  {b.title && <p className="block__title">{b.title}</p>}
                  {b.body.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </section>
            );
        }
      })}
    </div>
  );
}
