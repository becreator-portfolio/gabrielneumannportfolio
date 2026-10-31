import { Contact } from "@/components/Contact";
import { Feature } from "@/components/Feature";
import { Footer } from "@/components/Footer";
import { HeroReel, type ReelItem } from "@/components/HeroReel";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/content/projects";
import { hasContact, site } from "@/content/site";

const clients = projects
  .filter((p) => p.slug !== "geracao-com-ia")
  .flatMap((p) => p.client.split(" & "));

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
          <span className="hero__line hero__line--1">Gabriel</span>
          <span className="hero__line hero__line--2">Neumann</span>
        </h1>
        <div className="hero__tile">
          <HeroReel items={reel} />
        </div>
        <p className="hero__meta label">
          <span>{site.role}</span>
          <span>
            Seleção de trabalhos — {String(projects.length).padStart(2, "0")}
          </span>
        </p>
        <p className="hero__statement">{site.statement}</p>
        <div className="hero__actions">
          <a href="#trabalhos" className="button button--solid">
            <span>Ver trabalhos</span>
            <span aria-hidden="true">↓</span>
          </a>
          {hasContact && (
            <a href="#contato" className="button">
              <span>Contato</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </section>

      <section id="trabalhos" className="works" aria-labelledby="trabalhos-title">
        <div className="section-head">
          <p className="label">
            <span>(01)</span>
          </p>
          <h2 id="trabalhos-title" className="section-title">
            Trabalhos selecionados
          </h2>
        </div>
        <WorkIndex projects={projects} />
        <div className="features">
          {projects.map((p, i) => (
            <Feature key={p.slug} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </section>

      <section id="sobre" className="about" aria-labelledby="sobre-title">
        <div className="section-head">
          <p className="label">
            <span>(02)</span>
          </p>
          <h2 id="sobre-title" className="section-title">
            Sobre
          </h2>
        </div>
        <div className="about__body">
          <dl className="about__facts" data-reveal>
            <div>
              <dt className="label">Idade</dt>
              <dd>23</dd>
            </div>
            <div>
              <dt className="label">Anos de prática</dt>
              <dd>6+</dd>
            </div>
            <div>
              <dt className="label">Projetos nesta seleção</dt>
              <dd>{String(projects.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="label">Áreas de atuação</dt>
              <dd>{String(site.capabilities.length).padStart(2, "0")}</dd>
            </div>
          </dl>
          <p className="about__lead" data-reveal>
            {site.about[0]}
          </p>
          <div className="about__text" data-reveal>
            {site.about.slice(1).map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <div className="about__col" data-reveal>
            <h3 className="label">Áreas</h3>
            <ul>
              {site.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="about__col" data-reveal>
            <h3 className="label">Marcas nesta seleção</h3>
            <ul>
              {clients.map((c) => (
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
