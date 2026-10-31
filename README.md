# Gabriel Neumann — Portfólio

Portfólio de design e comunicação visual de Gabriel Neumann.
Next.js (App Router) + TypeScript, CSS próprio, publicado na Vercel a partir da branch `main`.

**Produção:** https://gabrielneumannportfolio.vercel.app

## Rodar localmente

```bash
npm install
npm run dev
```

## Estrutura

```
app/                  rotas (home, /trabalhos/[slug], sitemap, robots) e estilos globais
components/           componentes reutilizáveis (Header, Feature, Blocks, Media, Video…)
content/projects.ts   todos os projetos — ordem, textos, mídias e composição
content/site.ts       nome, bio, áreas e canais de contato
content/types.ts      modelo de conteúdo (tipos)
public/work/<slug>/   arquivos de cada projeto (WebP, MP4, posters)
scripts/              utilitários para preparar imagens e vídeos
```

## Adicionar ou editar um projeto

1. Prepare os arquivos em `public/work/<slug>/`:
   - imagens: `node scripts/optimize-image.mjs original.png public/work/<slug>/nome.webp`
   - vídeos: `scripts/encode-video.sh original.mp4 public/work/<slug> nome 3 1`
     (gera o vídeo com áudio, uma prévia muda de 6 s e o poster)
2. Acrescente uma entrada em `content/projects.ts`. Cada projeto define:
   - `feature` — a composição na home (`system`, `carousel`, `duo`, `cinema`, `trio`, `single`, `pair`);
   - `blocks` — o corpo da página (`media`, `grid`, `strip`, `text`).
3. A ordem do array `projects` é a ordem do site. Para remover um projeto, apague a entrada.

## Contato

Os canais em `content/site.ts → contact` começam vazios. Enquanto nenhum estiver
preenchido, o site não exibe a seção de contato nem os atalhos para ela (menu,
botão do topo, chamada no fim dos projetos) — assim não há link sem destino.
Ao preencher qualquer campo (e-mail, Instagram, WhatsApp, Behance, LinkedIn),
tudo isso aparece automaticamente.

## Interações

- Topo: recorte rotativo de trabalhos (pausa no hover/foco e com botão).
- Índice: filtro por tipo (Identidade visual, Redes sociais, Vídeo, IA);
  capa acompanha o cursor no desktop e vira miniatura no toque.
- Carrosséis: arraste, botões, setas do teclado e contador.
- Páginas de projeto: imagens ampliáveis (setas, Esc, deslizar no celular),
  vídeos com controles de reprodução/som e barra de leitura.
- Tudo respeita "reduzir movimento" do sistema.

## Deploy

Cada push na `main` gera um deploy de produção na Vercel; outras branches geram
deploys de prévia. Não há variáveis de ambiente obrigatórias
(`NEXT_PUBLIC_SITE_URL` é opcional, para um domínio próprio).
