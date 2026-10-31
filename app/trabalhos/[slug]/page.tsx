import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { Footer } from "@/components/Footer";
import { getProject, projectIndex, projects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = p.cover.kind === "video" ? p.cover.poster : p.cover.src;
  return {
    title: p.client,
    description: `${p.category} — ${p.summary}`,
    alternates: { canonical: `/trabalhos/${p.slug}` },
    openGraph: {
      title: `${p.client} — Gabriel Neumann`,
      description: p.summary,
      images: [{ url: cover, width: p.cover.width, height: p.cover.height, alt: p.cover.alt }],
    },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projectIndex(slug);
  const next = projects[(i + 1) % projects.length];
  const fit = (name: string) => ({ "--fit": Math.max(...name.split(/\s+/).map((w) => w.length)) }) as React.CSSProperties;
  const nextCover = next.cover.kind === "video" ? next.cover.poster : next.cover.src;

  return (
    <main className="project">
      <header className="phead">
        <p className="phead__top label">
          <Link href="/#trabalhos" className="roll" data-text="← Todos os trabalhos">
            <span>← Todos os trabalhos</span>
          </Link>
          <span>
            {pad(i + 1)} / {pad(projects.length)}
          </span>
          <span>{project.category}</span>
        </p>
        <h1 className="phead__title" style={fit(project.client)}>{project.client}</h1>
        <div className="phead__body">
          <dl className="phead__meta">
            <div>
              <dt className="label">Entregas</dt>
              <dd>
                {project.deliverables.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="label">Formatos</dt>
              <dd>
                {project.formats.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </dd>
            </div>
          </dl>
          <div className="phead__intro">
            {project.intro.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {project.credit && <p className="phead__credit label">{project.credit}</p>}
          </div>
        </div>
      </header>

      <Blocks blocks={project.blocks} />

      <nav className="next" aria-label="Próximo projeto">
        <Link href={`/trabalhos/${next.slug}`} className="next__link">
          <span className="label">Próximo — {pad(((i + 1) % projects.length) + 1)}</span>
          <span className="next__title" style={fit(next.client)}>{next.client}</span>
          <span className="next__thumb">
            <Image src={nextCover} alt="" width={next.cover.width} height={next.cover.height} sizes="(max-width: 768px) 40vw, 18vw" />
          </span>
        </Link>
      </nav>
      <Footer />
    </main>
  );
}
