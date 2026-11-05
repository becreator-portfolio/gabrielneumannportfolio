import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/media.css";
import "./styles/home.css";
import "./styles/project.css";
import { Cursor } from "@/components/Cursor";
import { Header } from "@/components/Header";
import { IndexOverlay } from "@/components/IndexOverlay";
import { Motion } from "@/components/Motion";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#eeece6",
  colorScheme: "light",
};

const INTRO_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');
try{if(sessionStorage.getItem('gn-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
sessionStorage.setItem('gn-intro','1');d.classList.add('intro-play');
setTimeout(function(){d.classList.add('intro-done')},2700);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          // Ativa as animações só com JavaScript e decide se a abertura em tela
          // preta toca: uma vez por sessão e nunca com "reduzir movimento".
          dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }}
        />
      </head>
      <body>
        <a href="#conteudo" className="skip">
          Pular para o conteúdo
        </a>
        <div className="intro" aria-hidden="true">
          <p className="intro__text">
            <span className="intro__m">
              <span className="intro__pre">Portfólio de</span>
            </span>{" "}
            <span className="intro__m">
              <span className="intro__name">Gabriel Neumann</span>
            </span>
          </p>
          <span className="intro__line" />
        </div>
        <Header />
        <div id="conteudo">{children}</div>
        <IndexOverlay />
        <Motion />
        <Cursor />
      </body>
    </html>
  );
}
