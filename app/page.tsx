import { Contact } from "@/components/Contact";
import { Feature } from "@/components/Feature";
import { Footer } from "@/components/Footer";
import { HeroReel, type ReelItem } from "@/components/HeroReel";
import { Split } from "@/components/Split";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  // Recorte rotativo do topo: um trabalho de cada linguagem.
  const pick = (slug: string, media?: (p: (typeof projects)[number]) => ReelItem["media"]): ReelItem => {
    const i = projects.findIndex((p) => p.slug === slug);
    const p = projects[i];
    return { slug, client: p.client, n: String(i + 1).padStart(2, "0"), media: media ? media(p) : p.cover };
  };
  const reel: ReelItem[] = [
    pick("inb-burguer"),
    pick("kampeki"),
    pick("oitta-sushi", (p) => (p.feature.layout === "system" ? p.feature.side : p.cover)),
    pick("johns-pizza"),
    pick("la-mafia"),
  ];

  return (
    <main className="home">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__name">
          <span className="hero__line hero__line--1">
            <Split text="Gabriel" by="char" />
          </span>
          <span className="hero__line hero__line--2">
            <Split text="Neumann" by="char" offset={4} />
          </span>
        </h1>
        <div className="hero__tile">
          <HeroReel items={reel} />
        </div>
        <p className="hero__statement">
          <Split text={site.statement} offset={10} />
        </p>
        <div className="hero__actions">
          <a href="#trabalhos" className="button button--solid" data-magnetic>
            <span>Ver trabalhos</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="trabalhos" className="works" aria-labelledby="trabalhos-title">
        <header className="section-head">
          <h2 id="trabalhos-title" className="section-title" data-reveal="split">
            <Split text="Trabalhos" />
            <sup className="section-count">{String(projects.length).padStart(2, "0")}</sup>
          </h2>
          <p className="section-note" data-reveal>
            {site.worksNote}
          </p>
        </header>
        <WorkIndex projects={projects} />
        <div className="features">
          {projects.map((p, i) => (
            <Feature key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section id="sobre" className="about" aria-labelledby="sobre-title">
        <header className="section-head">
          <h2 id="sobre-title" className="section-title" data-reveal="split">
            <Split text="Sobre" />
          </h2>
        </header>
        <div className="about__body">
          <p className="about__lead" data-reveal="split">
            <Split text={site.about.lead} />
          </p>
          <p className="about__note" data-reveal>
            {site.about.note}
          </p>
          <div className="about__col" data-reveal>
            <h3 className="label">Áreas</h3>
            <ul>
              {site.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
