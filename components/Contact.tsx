import { contactLabels, site, type ContactKey } from "@/content/site";

export function Contact() {
  const entries = (Object.keys(site.contact) as ContactKey[])
    .map((k) => ({ key: k, value: site.contact[k] as string }))
    .filter((e) => e.value);

  return (
    <section id="contato" className="contact" aria-labelledby="contato-title">
      <p className="label" data-reveal>
        <span>(03)</span>
        <span className="label__gap">Contato</span>
      </p>
      <h2 id="contato-title" className="contact__title" data-reveal>
        Vamos conversar sobre a sua marca.
      </h2>
      {entries.length > 0 ? (
        <ul className="contact__list" data-reveal>
          {entries.map((e) => {
            const href = e.key === "email" ? `mailto:${e.value}` : e.value;
            const shown = e.key === "email" ? e.value : e.value.replace(/^https?:\/\/(www\.)?/, "");
            return (
              <li key={e.key}>
                <span className="label">{contactLabels[e.key]}</span>
                <a href={href} target={e.key === "email" ? undefined : "_blank"} rel="noreferrer" className="contact__link">
                  {shown}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
