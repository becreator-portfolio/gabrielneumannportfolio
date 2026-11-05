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
app/                  rotas (home, /trabalhos/[slug], sitemap, robots)
app/styles/           CSS por área: base, chrome (cabeçalho/índice/rodapé), media, home, project
components/           componentes (Hero, Chapter, IndexOverlay, Motion, Blocks, Media, Video…)
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
   - `feature` — a composição do capítulo na home (`system`, `carousel`, `duo`, `cinema`, `trio`, `single`, `pair`);
   - `tone` — `"dark"` ou `"light"` (padrão): fundo do capítulo e da página do projeto;
   - `blocks` — o corpo da página (`media`, `grid`, `strip`, `text`).
3. A ordem do array `projects` é a ordem do site. Para remover um projeto, apague a entrada.

## Contato

Os canais em `content/site.ts → contact` começam vazios. Enquanto nenhum estiver
preenchido, o site não exibe a seção de contato nem os atalhos para ela (menu,
botão do topo, chamada no fim dos projetos) — assim não há link sem destino.
Ao preencher qualquer campo (e-mail, Instagram, WhatsApp, Behance, LinkedIn),
tudo isso aparece automaticamente.

## Tipografia

- **Archivo** (variável, eixo de largura) em três larguras: 62% para nomes e
  títulos, 100% para texto de interface, 116% para rótulos.
- **Newsreader** (variável, tamanho óptico) para a voz editorial: frase de
  apresentação, resumos, textos dos projetos e Sobre.
- Escala em quarta perfeita sobre 17px; tokens `--fs-*` em `app/styles/base.css`.

## Estrutura da home e interações

1. **Abertura** — o nome funciona como cabeçalho de revista, com um recorte
   rotativo de trabalhos no centro (pausa no hover/foco e com botão). Ao rolar,
   o nome se abre e o recorte cresce até tomar a tela.
2. **Trabalhos** — cada projeto é um capítulo: régua, número, título, resumo e
   uma composição de mídia própria. A cor de fundo acompanha o capítulo em
   leitura (claro/escuro) e o cabeçalho mostra qual é (`03/09 INB Burguer`).
3. **Interlúdio** — frase do Gabriel que acende palavra a palavra com a rolagem.
4. **Sobre** e **rodapé**.

- **Índice** (botão no cabeçalho; no celular, "Menu"): sobreposição com as
  seções e todos os trabalhos, filtro por tipo e capa que segue o cursor.
- Parallax leve nas composições; mídia abre por recorte ao entrar na tela.
- Carrosséis: arraste, botões, setas do teclado e contador.
- Páginas de projeto: imagens ampliáveis (setas, Esc, deslizar no celular),
  vídeos com controles de reprodução/som e barra de leitura.
- Todo o comportamento ligado à rolagem roda num único laço
  (`components/Motion.tsx`). Com "reduzir movimento", nada é fixado, animado
  ou tocado sozinho.

## Deploy

Cada push na `main` gera um deploy de produção na Vercel; outras branches geram
deploys de prévia. Não há variáveis de ambiente obrigatórias
(`NEXT_PUBLIC_SITE_URL` é opcional, para um domínio próprio).
