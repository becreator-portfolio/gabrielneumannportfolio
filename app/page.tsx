import { Chapter } from "@/components/Chapter";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero, type ReelItem } from "@/components/Hero";
import { Split } from "@/components/Split";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const words = (t: string) => t.split(" ").length;

export default function Home() {
  // Recorte rotativo da abertura: um trabalho de cada linguagem.
  const pick = (slug: string, media?: (p: (typeof projects)[number]) => ReelItem["media"]): ReelItem => {
    const i = projects.findIndex((p) => p.slug === slug);
    const p = projects[i];
    return { slug, client: p.client, n: String(i + 1).padStart(2, "0"), media: media ? media(p) : p.cover };
  };
  const reel: ReelItem[] = [
    pick("oitta-sushi", (p) => (p.feature.layout === "system" ? p.feature.side : p.cover)),
    pick("kampeki"),
    pick("johns-pizza"),
    pick("inb-burguer"),
    pick("la-mafia"),
  ];

  // O interlúdio entra entre o primeiro e o segundo bloco de trabalhos.
  const BREAK = 5;
  const total = projects.length;

  return (
    <main className="home">
      <Hero items={reel} statement={site.statement} />

      <section id="trabalhos" className="works" aria-labelledby="trabalhos-title">
        <header className="works__head" data-tone="light">
          <h2 id="trabalhos-title" className="works__title" data-reveal="split">
            <Split text="Trabalhos" by="char" />
            <sup className="works__count">{String(total).padStart(2, "0")}</sup>
          </h2>
          <div className="works__aside" data-reveal>
            <p className="works__note">{site.worksNote}</p>
            <button type="button" className="button" data-open-index data-magnetic aria-haspopup="dialog" aria-controls="indice">
              <span>Índice</span>
              <span aria-hidden="true">≡</span>
            </button>
          </div>
        </header>

        {projects.slice(0, BREAK).map((p, i) => (
          <Chapter key={p.slug} project={p} index={i} />
        ))}

        <aside className="interlude" data-tone="dark" aria-label="Nota">
          <p className="interlude__text" data-scrub style={{ "--n": words(site.about.note) } as React.CSSProperties}>
            <Split text={site.about.note} />
          </p>
        </aside>

        {projects.slice(BREAK).map((p, i) => (
          <Chapter key={p.slug} project={p} index={i + BREAK} />
        ))}
      </section>

      <section id="sobre" className="about" aria-labelledby="sobre-title" data-tone="light">
        <h2 id="sobre-title" className="about__label label">
          Sobre
        </h2>
        <p className="about__lead" data-scrub style={{ "--n": words(site.about.lead) } as React.CSSProperties}>
          <Split text={site.about.lead} />
        </p>
        <div className="about__areas">
          <h3 className="label">Áreas</h3>
          <ol>
            {site.capabilities.map((c, i) => (
              <li key={c} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="label mute">{String(i + 1).padStart(2, "0")}</span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
