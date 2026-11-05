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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          // Ativa as animações de entrada só quando há JavaScript.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a href="#conteudo" className="skip">
          Pular para o conteúdo
        </a>
        <Header />
        <div id="conteudo">{children}</div>
        <IndexOverlay />
        <Motion />
        <Cursor />
      </body>
    </html>
  );
}
