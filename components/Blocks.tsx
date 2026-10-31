import type { Block, Media as MediaType } from "@/content/types";
import { Media } from "./Media";
import { Rail } from "./Rail";

const sizesFor = (size?: string) =>
  size === "full"
    ? "100vw"
    : size === "wide"
      ? "(max-width: 768px) 100vw, 84vw"
      : size === "narrow"
        ? "(max-width: 768px) 84vw, 34vw"
        : "(max-width: 768px) 100vw, 52vw";

/** Corpo da página de projeto, montado a partir de content/projects.ts. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  // Índice sequencial das imagens, na mesma ordem usada pelo Lightbox.
  let zoom = 0;

  const item = (m: MediaType, sizes: string, priority = false) => {
    if (m.kind === "video") return <Media media={m} sizes={sizes} mode="full" priority={priority} />;
    const z = zoom++;
    return (
      <button type="button" className="zoom" data-zoom={z} data-cursor="Ampliar" aria-label={`Ampliar imagem: ${m.alt}`}>
        <Media media={m} sizes={sizes} priority={priority} />
      </button>
    );
  };

  return (
    <div className="blocks">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "media":
            return (
              <figure key={i} className={`block block--media block--${b.size ?? "wide"}`} data-reveal="media">
                <div className="block__one">{item(b.media, sizesFor(b.size), i === 0)}</div>
                {b.caption && <figcaption className="label">{b.caption}</figcaption>}
              </figure>
            );
          case "grid":
            return (
              <figure key={i} className={`block block--grid cols-${b.columns}`} data-stagger={b.stagger || undefined}>
                {b.items.map((m) => (
                  <div key={m.src} className="block__cell" data-reveal="media">
                    {item(m, `(max-width: 768px) 100vw, ${Math.round(96 / b.columns)}vw`)}
                  </div>
                ))}
                {b.caption && <figcaption className="label">{b.caption}</figcaption>}
              </figure>
            );
          case "strip":
            return (
              <figure key={i} className="block block--strip" data-reveal>
                {b.caption && <figcaption className="label">{b.caption}</figcaption>}
                <Rail label={b.caption ?? "Galeria"} className="rail--block">
                  {b.items.map((m) => (
                    <li key={m.src}>{item(m, "(max-width: 768px) 78vw, 30vw")}</li>
                  ))}
                </Rail>
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
