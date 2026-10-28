/**
 * Gera os fundos desfocados das ilustrações dos módulos.
 *
 *   node scripts/desfocar.mjs
 *
 * Cada fundo é um recorte da onda de partículas do hero, reduzido e bem
 * desfocado, guardado em public/img/desfocadas/<id>.jpg. Mantém as ilustrações
 * no mundo visual da Céntrico em vez de trazer fotografia de stock.
 */
import sharp from "sharp";
import { join } from "path";
import { mkdirSync } from "fs";

const RAIZ = new URL("..", import.meta.url).pathname;
const destino = join(RAIZ, "public", "img", "desfocadas");
mkdirSync(destino, { recursive: true });

// id do módulo: recorte em fração da imagem (x, y, largura, altura)
const fundos = {
  ged: [0.02, 0.56, 0.44, 0.42],
  ass: [0.52, 0.58, 0.44, 0.4],
  proc: [0.28, 0.6, 0.44, 0.38],
  ctrl: [0.0, 0.62, 0.42, 0.36],
  audit: [0.56, 0.54, 0.42, 0.44],
  integ: [0.18, 0.52, 0.46, 0.46],
  rh: [0.4, 0.64, 0.46, 0.34],
};

const origem = join(RAIZ, "public", "hero-wave.webp");

for (const [id, [x, y, w, h]] of Object.entries(fundos)) {
  const img = sharp(origem);
  const { width, height } = await img.metadata();
  await img
    .extract({
      left: Math.round(x * width),
      top: Math.round(y * height),
      width: Math.round(w * width),
      height: Math.round(h * height),
    })
    .resize({ width: 720 })
    .blur(22)
    // A onda é quase preta no original: o linear levanta os tons médios para
    // que as cristas se leiam por trás dos cartões brancos.
    .linear(2.4, 10)
    .modulate({ saturation: 1.4 })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(join(destino, `${id}.jpg`));
  console.log("fundo gerado:", id);
}
