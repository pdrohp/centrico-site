export type Lang = "pt" | "en";

export const LANGS: Lang[] = ["pt", "en"];

/** Valor do atributo <html lang> e de hreflang. */
export const HTML_LANG: Record<Lang, string> = { pt: "pt-PT", en: "en" };

const EN_PREFIX = /^\/en(?=[/#?]|$)/;

/** O português vive na raiz do site; o inglês em /en. */
export function langFromPath(pathname: string): Lang {
  return EN_PREFIX.test(pathname) ? "en" : "pt";
}

/** Converte um caminho do site (com ou sem /en) para o idioma pedido. */
export function localizePath(path: string, lang: Lang): string {
  const base = path.replace(EN_PREFIX, "") || "/";
  if (lang === "pt") return base;
  return base === "/" ? "/en" : `/en${base.startsWith("/#") ? base.slice(1) : base}`;
}

// As áreas são valores fixos do Sanity (studio/schemaTypes/iconOptions.ts) e
// servem para agrupar o menu; aqui ficam só os nomes mostrados no site.
const AREA_LABELS_EN: Record<string, string> = {
  Core: "Core",
  Jurídico: "Legal",
  "Recursos Humanos": "Human Resources",
  Operações: "Operations",
  Compliance: "Compliance",
  Segurança: "Security",
  API: "API",
};

export function areaLabel(area: string, lang: Lang): string {
  return lang === "en" ? (AREA_LABELS_EN[area] ?? area) : area;
}
