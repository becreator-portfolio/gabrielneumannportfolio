import type { ImageMedia, Media, Project, VideoMedia } from "./types";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const post = (path: string, alt: string, height = 1350): ImageMedia => ({
  kind: "image",
  src: `/work/${path}.webp`,
  width: 1080,
  height,
  alt,
});

const page = (n: number, alt: string): ImageMedia => ({
  kind: "image",
  src: `/work/oitta-sushi/manual/${String(n).padStart(2, "0")}.webp`,
  width: 2016,
  height: 1134,
  alt: `Manual de identidade visual Oitta Sushi — ${alt}`,
});

const reel = (dir: string, name: string, alt: string, duration: number): VideoMedia => ({
  kind: "video",
  src: `/work/${dir}/${name}.mp4`,
  preview: `/work/${dir}/${name}-preview.mp4`,
  poster: `/work/${dir}/${name}-poster.webp`,
  width: 720,
  height: 1280,
  alt,
  duration,
});

const film = (dir: string, name: string, alt: string, duration: number): VideoMedia => ({
  ...reel(dir, name, alt, duration),
  width: 1280,
  height: 720,
});

/* ------------------------------------------------------------------ */
/* Mídia                                                               */
/* ------------------------------------------------------------------ */

const oitta = {
  cover: page(1, "capa"),
  refs: [
    page(2, "referência: fontes termais"),
    page(3, "referência: esqueleto de peixe"),
    page(4, "referência: pôr do sol"),
    page(5, "referência: região montanhosa"),
    page(6, "referência: algas"),
  ],
  logo: page(7, "logo completo"),
  icon: page(8, "apenas ícone"),
  type: page(9, "aplicação tipográfica"),
  colors: page(10, "paleta de cores"),
  contrast: page(11, "uso dos contrastes"),
  typeIntro: page(12, "tipografia"),
  fonts: [page(13, "tipografia principal"), page(14, "tipografia secundária"), page(15, "tipografia alternativa")],
  textures: [page(16, "textura"), page(17, "textura"), page(18, "textura")],
  voice: [page(19, "tom de voz"), page(20, "essência e personalidade"), page(21, "arquétipo verbal"), page(22, "exemplos de aplicação")],
  back: page(23, "contracapa"),
  post: post("oitta-sushi/estamos-abertos", "Post “Estamos Abertos” da Oitta Sushi com combinado em caixa e lettering laranja"),
  narration: reel("oitta-sushi", "oitta-narracao", "Vídeo vertical da Oitta Sushi com narração", 18),
  coupon: reel("oitta-sushi", "oitta-cupom", "Vídeo vertical da Oitta Sushi com chamada para cupom de primeira compra", 18),
};

const kampeki = {
  slides: [
    post("kampeki/carrossel-01-pov", "Carrossel Kampeki, tela 1: “POV: sua nova sequência favorita é do Kampeki…”"),
    post("kampeki/carrossel-02-maguro", "Carrossel Kampeki, tela 2: Maguro no Missô"),
    post("kampeki/carrossel-03-usuzukuri", "Carrossel Kampeki, tela 3: Usuzukuri Mediterrâneo"),
    post("kampeki/carrossel-04-shake-ebi", "Carrossel Kampeki, tela 4: Shake Ebi"),
    post("kampeki/carrossel-05-cogumelos", "Carrossel Kampeki, tela 5: Mix de Cogumelos na Brasa"),
    post("kampeki/carrossel-06-crispy-rice", "Carrossel Kampeki, tela 6: Crispy Rice"),
  ],
  space: post("kampeki/historia-sendo-escrita", "Post Kampeki “Vivêncie a história sendo escrita no Kampeki!”, com o cardápio da casa", 1370),
  video: reel("kampeki", "kampeki-montagem", "Vídeo vertical da montagem de um combinado do Kampeki", 21),
};

const inb = {
  reels: reel("inb-burguer", "inb-reels", "Reel INB Burguer: hambúrguer na brasa e montagem do lanche", 17),
  brasa: reel("inb-burguer", "inb-brasa", "Reel INB Burguer: ingredientes, brasa e montagem", 18),
};

const ia = {
  one: film("geracao-ia", "animacao-01", "Animação gerada com IA em estilo anime, com personagens em uma rua de bairro", 68),
  two: film("geracao-ia", "animacao-02", "Animação gerada com IA em estilo cartoon, com personagem de bicicleta", 30),
};

const johns = {
  launch: post("johns-pizza/lancamento", "Post John’s Pizza: lançamento do sabor costela, queijo coalho e sweet chilli"),
  best: post("johns-pizza/mais-vendido", "Post John’s Pizza: o mais vendido da casa, a partir de 75,90"),
  order: post("johns-pizza/onde-pedir", "Post John’s Pizza: escolha onde pedir, Cardápio Web ou iFood"),
};

const laMafia = reel("la-mafia", "la-mafia", "Reel da La Mafia Barbearia Social Club", 27);
const mark = reel("mark", "mark-reels", "Reel gravado em frente à fachada da Mark", 17);
const recheadinhos = {
  post: post("recheadinhos/fome-bate", "Post Recheadinhos: “Se a fome bate, o Recheadinhos bate de volta!”", 1369),
  video: reel("recheadinhos", "recheadinhos-reels", "Reel Recheadinhos com o lanche apresentado em frente à loja", 16),
};
const avulsos = {
  artes: post("artes-burger/conteudo-gostoso", "Post Artes Burger: “Conteúdo Extremamente Gostoso”, em formato de aviso de conteúdo sensível"),
  pastelero: post("el-pastelero/pastel-de-canela", "Post El Pastelero: pastel de canela em formato de captcha"),
};

/* ------------------------------------------------------------------ */
/* Projetos — a ordem desta lista é a ordem do site                    */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    slug: "oitta-sushi",
    tags: ["identidade", "social", "video"],
    client: "Oitta Sushi",
    category: "Identidade visual",
    summary: "Manual de identidade visual e primeiras aplicações da marca.",
    deliverables: ["Manual de identidade visual", "Post", "Vídeo vertical"],
    formats: ["Manual 16:9 · 23 páginas", "Post 4:5", "Reels 9:16"],
    intro: [
      "Manual de identidade visual da Oitta Sushi: logo em três versões (completo, só o ícone e aplicação tipográfica), paleta, tipografia, texturas e tom de voz.",
      "O símbolo parte de Oita, no Japão: as fontes termais, o pôr do sol do arquipélago, a região montanhosa e as algas do mar que rodeia a ilha. O esqueleto de peixe faz alusão ao trabalho manual com o sushi.",
    ],
    cover: oitta.logo,
    feature: { layout: "system", main: oitta.logo, side: oitta.narration },
    blocks: [
      { type: "media", media: oitta.cover, size: "full" },
      { type: "text", label: "Referências", body: ["Cinco imagens de partida: fontes termais, esqueleto de peixe, pôr do sol, região montanhosa e algas."] },
      { type: "grid", columns: 3, items: oitta.refs.slice(0, 3) },
      { type: "grid", columns: 2, items: oitta.refs.slice(3) },
      { type: "media", media: oitta.logo, size: "full" },
      { type: "grid", columns: 2, items: [oitta.icon, oitta.type] },
      { type: "grid", columns: 2, items: [oitta.colors, oitta.contrast] },
      {
        type: "text",
        label: "Tipografia",
        body: [
          "Três papéis, para manter a hierarquia em qualquer estilo de peça: Coolvetica para títulos e destaques, Cascadia Code para textos de apoio e legendas, DX Burst apenas para títulos e textos de destaque pontuais.",
        ],
      },
      { type: "media", media: oitta.typeIntro, size: "wide" },
      { type: "grid", columns: 3, items: oitta.fonts },
      { type: "strip", items: oitta.textures, caption: "Texturas" },
      {
        type: "text",
        label: "Tom de voz",
        body: [
          "A marca se comunica como o anfitrião e o facilitador: próxima, acolhedora, ágil, confiável e apetitosa. Frases curtas, verbos diretos e nenhum exagero do tipo “o melhor sushi do mundo”.",
        ],
      },
      { type: "grid", columns: 2, items: oitta.voice },
      {
        type: "text",
        label: "Aplicações",
        body: ["A identidade em uso: post de abertura e vídeo vertical do restaurante, em duas versões — com narração e com chamada para cupom de primeira compra."],
      },
      { type: "grid", columns: 3, items: [oitta.post, oitta.narration, oitta.coupon], stagger: true },
      { type: "media", media: oitta.back, size: "inset" },
    ],
  },
  {
    slug: "kampeki",
    tags: ["social", "video"],
    client: "Kampeki",
    category: "Carrossel",
    summary: "Carrossel de pratos, post sobre o espaço da casa e vídeo de montagem.",
    deliverables: ["Carrossel", "Post", "Vídeo vertical"],
    formats: ["Carrossel 4:5 · 6 telas", "Post 4:5", "Reels 9:16"],
    intro: [
      "Carrossel de seis telas com pratos do Kampeki: Maguro no Missô, Usuzukuri Mediterrâneo, Shake Ebi, Mix de Cogumelos na Brasa e Crispy Rice, abrindo com “POV: sua nova sequência favorita é do Kampeki…”.",
      "Completam o conjunto um post sobre o espaço físico da casa e um vídeo vertical da montagem de um combinado.",
    ],
    cover: kampeki.slides[1],
    feature: { layout: "carousel", items: kampeki.slides },
    blocks: [
      { type: "strip", items: kampeki.slides, caption: "Carrossel — 6 telas" },
      { type: "grid", columns: 2, items: [kampeki.space, kampeki.video] },
    ],
  },
  {
    slug: "inb-burguer",
    tags: ["video"],
    client: "INB Burguer",
    category: "Vídeo de conversão",
    summary: "Dois reels construídos sobre a brasa e a montagem do lanche.",
    deliverables: ["Reels"],
    formats: ["Reels 9:16 · 17–18 s"],
    intro: [
      "Dois reels verticais para a INB Burguer. A brasa, os ingredientes e a montagem do lanche conduzem o ritmo; os dois fecham com a assinatura da marca.",
    ],
    cover: inb.reels,
    feature: { layout: "duo", items: [inb.reels, inb.brasa] },
    blocks: [{ type: "grid", columns: 2, items: [inb.reels, inb.brasa], stagger: true }],
  },
  {
    slug: "geracao-com-ia",
    tags: ["ia", "video"],
    client: "Geração com IA",
    category: "Animação",
    summary: "Duas animações produzidas com geração de imagem e vídeo por IA.",
    deliverables: ["Animação"],
    formats: ["Vídeo 16:9 · 68 s", "Vídeo 16:9 · 30 s"],
    intro: [
      "Duas animações horizontais produzidas com geração de imagem e vídeo por IA: uma narrativa de rua em estilo anime e uma vinheta em estilo cartoon.",
    ],
    credit: "As duas animações trazem a assinatura “by co.becreator” no encerramento.",
    cover: ia.one,
    feature: { layout: "cinema", main: ia.one },
    blocks: [
      { type: "media", media: ia.one, size: "full" },
      { type: "media", media: ia.two, size: "wide" },
    ],
  },
  {
    slug: "johns-pizza",
    tags: ["social"],
    client: "John’s Pizza Delivery",
    category: "Criativos",
    summary: "Série de posts para o delivery: lançamento, mais vendido e canais de pedido.",
    deliverables: ["Posts"],
    formats: ["Post 4:5 · 3 peças"],
    intro: [
      "Três posts para o delivery da John’s Pizza: o lançamento de um sabor, o mais vendido da casa e os canais de pedido.",
      "A mesma estrutura sustenta a série: faixa clara com sombra dura, tipografia condensada em vermelho e um selo circular para a chamada.",
    ],
    cover: johns.launch,
    feature: { layout: "trio", items: [johns.launch, johns.best, johns.order] },
    blocks: [{ type: "grid", columns: 3, items: [johns.launch, johns.best, johns.order], stagger: true }],
  },
  {
    slug: "la-mafia",
    tags: ["video"],
    client: "La Mafia Barbearia Social Club",
    category: "Vídeo",
    summary: "Reel para a barbearia, com legendas palavra a palavra.",
    deliverables: ["Reels"],
    formats: ["Reels 9:16 · 27 s"],
    intro: ["Reel vertical para a La Mafia Barbearia Social Club, com legendas palavra a palavra e encerramento com a marca."],
    cover: laMafia,
    feature: { layout: "single", main: laMafia, align: "left" },
    blocks: [{ type: "media", media: laMafia, size: "narrow" }],
  },
  {
    slug: "mark",
    tags: ["video"],
    client: "Mark",
    category: "Vídeo de conversão",
    summary: "Reel com fala direta para a câmera, em frente à fachada.",
    deliverables: ["Reels"],
    formats: ["Reels 9:16 · 17 s"],
    intro: ["Reel vertical gravado em frente à fachada da Mark, com fala direta para a câmera e legendas palavra a palavra."],
    cover: mark,
    feature: { layout: "single", main: mark, align: "right" },
    blocks: [{ type: "media", media: mark, size: "narrow" }],
  },
  {
    slug: "recheadinhos",
    tags: ["social", "video"],
    client: "Recheadinhos",
    category: "Criativo e vídeo",
    summary: "Post de cardápio digital e reel em frente à loja.",
    deliverables: ["Post", "Reels"],
    formats: ["Post 4:5", "Reels 9:16 · 16 s"],
    intro: ["Post de cardápio digital — “Se a fome bate, o Recheadinhos bate de volta!” — e reel em que o lanche é apresentado em frente à loja."],
    cover: recheadinhos.post,
    feature: { layout: "pair", items: [recheadinhos.post, recheadinhos.video] },
    blocks: [{ type: "grid", columns: 2, items: [recheadinhos.post, recheadinhos.video], stagger: true }],
  },
  {
    slug: "criativos-avulsos",
    tags: ["social"],
    client: "Artes Burger & El Pastelero",
    category: "Criativos",
    summary: "Duas peças que se apropriam de formatos conhecidos da internet.",
    deliverables: ["Posts"],
    formats: ["Post 4:5 · 2 peças"],
    intro: [
      "Duas peças que partem de formatos conhecidos da internet: um aviso de conteúdo sensível para a Artes Burger e um captcha de “selecione os quadros” para o pastel de canela da El Pastelero.",
    ],
    cover: avulsos.pastelero,
    feature: { layout: "pair", items: [avulsos.artes, avulsos.pastelero] },
    blocks: [{ type: "grid", columns: 2, items: [avulsos.artes, avulsos.pastelero], stagger: true }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectIndex = (slug: string) => projects.findIndex((p) => p.slug === slug);

export const allMedia = (p: Project): Media[] =>
  p.blocks.flatMap((b) => (b.type === "media" ? [b.media] : b.type === "text" ? [] : b.items));
