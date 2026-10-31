/**
 * Dados gerais do site. Os campos de contato ficam vazios até serem
 * confirmados — a seção de contato só exibe os canais preenchidos.
 */
export const site = {
  name: "Gabriel Neumann",
  role: "Design e comunicação visual",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabrielneumannportfolio.vercel.app",
  description:
    "Portfólio de Gabriel Neumann — design e comunicação visual. Identidade visual, criativos para redes, carrosséis, vídeos de conversão e geração com IA.",
  statement: "Ajudo marcas a contar histórias visuais que conectam as suas pessoas com o mundo.",
  about: [
    "Me chamo Gabriel Neumann, tenho 23 anos e trabalho com design e comunicação visual há pelo menos seis — tempo em que fui construindo os meus próprios métodos.",
    "Ajudo marcas a contar histórias visuais que conectam as suas pessoas com o mundo. Sou movido por arte e por detalhe, e é no detalhe que eu presto mais atenção.",
    "Aqui estão alguns dos meus projetos favoritos — ou os mais recentes.",
  ],
  capabilities: [
    "Identidade visual",
    "Criativos para redes sociais",
    "Carrosséis e posts fixados",
    "Vídeos de conversão",
    "Geração de imagem e vídeo com IA",
  ],
  contact: {
    email: "",
    instagram: "", // ex.: "https://instagram.com/usuario"
    whatsapp: "", // ex.: "https://wa.me/5500000000000"
    behance: "",
    linkedin: "",
  },
} as const;

export type ContactKey = keyof typeof site.contact;

export const contactLabels: Record<ContactKey, string> = {
  email: "E-mail",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  behance: "Behance",
  linkedin: "LinkedIn",
};

/** Há ao menos um canal de contato preenchido? Controla a seção e os atalhos de contato. */
export const hasContact = Object.values(site.contact).some(Boolean);

/** Navegação principal: o item Contato só aparece com um canal confirmado. */
export const navLinks = [
  { href: "/#trabalhos", label: "Trabalhos" },
  { href: "/#sobre", label: "Sobre" },
  ...(hasContact ? [{ href: "/#contato", label: "Contato" }] : []),
];
