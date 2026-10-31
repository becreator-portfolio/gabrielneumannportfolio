/**
 * Modelo de conteúdo do portfólio.
 * Para adicionar um projeto: coloque os arquivos em /public/work/<slug>/
 * e acrescente uma entrada em content/projects.ts.
 */

export type ImageMedia = {
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type VideoMedia = {
  kind: "video";
  /** Arquivo completo, com áudio (usado na página do projeto). */
  src: string;
  /** Recorte curto, sem áudio, para miniaturas e capas animadas. */
  preview: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  /** Duração em segundos, exibida como metadado. */
  duration?: number;
};

export type Media = ImageMedia | VideoMedia;

export type Block =
  | { type: "media"; media: Media; size?: "full" | "wide" | "inset" | "narrow"; caption?: string }
  | { type: "grid"; items: Media[]; columns: 2 | 3; caption?: string; stagger?: boolean }
  | { type: "strip"; items: Media[]; caption?: string }
  | { type: "text"; label?: string; title?: string; body: string[] };

/** Composição usada para apresentar o projeto na home. */
export type Feature =
  | { layout: "system"; main: Media; side: Media }
  | { layout: "carousel"; items: Media[] }
  | { layout: "duo"; items: [Media, Media] }
  | { layout: "cinema"; main: Media }
  | { layout: "trio"; items: [Media, Media, Media] }
  | { layout: "single"; main: Media; align: "left" | "right" }
  | { layout: "pair"; items: [Media, Media] };

export type Tag = "identidade" | "social" | "video" | "ia";

export const tagLabels: Record<Tag, string> = {
  identidade: "Identidade visual",
  social: "Redes sociais",
  video: "Vídeo",
  ia: "IA",
};

export type Project = {
  slug: string;
  /** Usadas no filtro do índice. */
  tags: Tag[];
  client: string;
  /** Rótulo curto da categoria (ex.: "Identidade visual"). */
  category: string;
  /** Uma frase de apresentação. */
  summary: string;
  deliverables: string[];
  formats: string[];
  intro: string[];
  cover: Media;
  feature: Feature;
  blocks: Block[];
  /** Observação de crédito exibida na página do projeto, quando houver. */
  credit?: string;
};
