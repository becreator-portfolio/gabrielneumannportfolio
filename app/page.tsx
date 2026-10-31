import Link from "next/link";
import { Contact } from "@/components/Contact";
import { Feature } from "@/components/Feature";
import { Footer } from "@/components/Footer";
import { Media } from "@/components/Media";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const clients = projects
  .filter((p) => p.slug !== "geracao-com-ia")
  .flatMap((p) => p.client.split(" & "));

export default function Home() {
  // Destaque animado do topo: o reel da INB Burguer.
  const heroIndex = projects.findIndex((p) => p.slug === "inb-burguer");
  const hero = projects[heroIndex];

  return (
    <main className="home">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__name">
          <span className="hero__line hero__line--1">Gabriel</span>
          <span className="hero__line hero__line--2">Neumann</span>
        </h1>
        <Link href={`/trabalhos/${hero.slug}`} className="hero__tile" aria-label={`Ver projeto ${hero.client}`}>
          <Media media={hero.cover} sizes="(max-width: 768px) 40vw, 16vw" priority />
          <span className="hero__tilecap label">
            <span>{String(heroIndex + 1).padStart(2, "0")}</span>
            <span className="label__gap">{hero.client}</span>
          </span>
        </Link>
        <p className="hero__meta label">
          <span>{site.role}</span>
          <span>Portfólio</span>
        </p>
        <p className="hero__statement">{site.statement}</p>
        <a href="#trabalhos" className="hero__down label">
          <span>{String(projects.length).padStart(2, "0")} trabalhos</span>
          <span aria-hidden="true">↓</span>
        </a>
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
