// Uso: node scripts/optimize-image.mjs <entrada> <saida.webp> [larguraMaxima=2016]
// Converte imagens (PNG/JPG/WebP) para WebP otimizado para a web.
import sharp from "sharp";

const [input, output, max = "2016"] = process.argv.slice(2);
if (!input || !output) {
  console.error("Uso: node scripts/optimize-image.mjs <entrada> <saida.webp> [larguraMaxima]");
  process.exit(1);
}
const info = await sharp(input)
  .resize({ width: Number(max), withoutEnlargement: true })
  .webp({ quality: 86, effort: 6 })
  .toFile(output);
console.log(`${output}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`);
