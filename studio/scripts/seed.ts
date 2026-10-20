/**
 * Importa o conteúdo atual do site (src/lib/data.ts e src/lib/modulesContent.ts)
 * para o dataset do Sanity. Idempotente: os _id são determinísticos, por isso
 * correr de novo substitui os documentos pelo conteúdo local.
 *
 * Uso (dentro de studio/):
 *   npm run seed                                  # usa a sessão do `sanity login`
 *   SANITY_WRITE_TOKEN=... npx sanity exec scripts/seed.ts   # ou um token Editor
 */
import { getCliClient } from "sanity/cli";
import { coreModuleCategories, coreModules, modules } from "../../src/lib/data";
import { modulesContent } from "../../src/lib/modulesContent";

const client = getCliClient({
  apiVersion: "2025-01-01",
  ...(process.env.SANITY_WRITE_TOKEN ? { token: process.env.SANITY_WRITE_TOKEN } : {}),
});

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const withKeys = <T extends object>(items: T[], prefix: string) =>
  items.map((item, i) => ({ _key: `${prefix}${i}`, ...item }));

const moduleId = (id: string) => `module-${id}`;
const categoryId = (title: string) => `workflowCategory-${slugify(title)}`;

const docs: Array<{ _id: string; _type: string; [k: string]: unknown }> = [];

docs.push({ _id: "siteSettings", _type: "siteSettings" });

modules.forEach((m, i) => {
  const c = modulesContent[m.id];
  docs.push({
    _id: moduleId(m.id),
    _type: "platformModule",
    title: m.label,
    slug: { _type: "slug", current: m.id },
    order: (i + 1) * 10,
    desc: m.desc,
    area: m.area,
    headline: m.headline,
    body: m.body,
    accent: m.accent,
    bg: m.bg,
    ...(m.video ? { video: m.video } : {}),
    hasPage: Boolean(c),
    ...(c
      ? {
          page: {
            eyebrow: c.eyebrow,
            subheadline: c.subheadline,
            tags: c.tags,
            vantagensTitle: c.vantagensTitle,
            vantagensBody: c.vantagensBody,
            kpis: withKeys(c.kpis.map((k) => ({ _type: "kpi", ...k })), "kpi"),
            features: withKeys(c.features.map((f) => ({ _type: "feature", ...f })), "feature"),
            cases: withKeys(c.cases.map((x) => ({ _type: "useCase", ...x })), "case"),
            integrations: c.integrations,
            compliance: c.compliance,
            complianceNote: c.complianceNote,
            faq: withKeys(c.faq.map((f) => ({ _type: "faqItem", ...f })), "faq"),
            related: withKeys(
              c.related.map((r) => ({
                _type: "relatedModule",
                module: { _type: "reference", _ref: moduleId(r.id) },
                desc: r.desc,
              })),
              "related",
            ),
            ctaHeadline: c.ctaHeadline,
            ctaSubheadline: c.ctaSubheadline,
          },
        }
      : {}),
  });
});

coreModuleCategories.forEach((title, i) => {
  docs.push({ _id: categoryId(title), _type: "workflowCategory", title, order: (i + 1) * 10 });
});

coreModules.forEach((m, i) => {
  docs.push({
    _id: `workflowModule-${m.id}`,
    _type: "workflowModule",
    title: m.label,
    slug: { _type: "slug", current: m.id },
    desc: m.desc,
    category: { _type: "reference", _ref: categoryId(m.category) },
    order: (i + 1) * 10,
    accent: m.accent,
    bg: m.bg,
  });
});

const { projectId, dataset } = client.config();
console.log(`A importar ${docs.length} documentos para ${projectId}/${dataset}…`);

// siteSettings só é criado se ainda não existir, para não apagar edições do cliente.
const tx = client.transaction();
for (const doc of docs) {
  if (doc._id === "siteSettings") tx.createIfNotExists(doc);
  else tx.createOrReplace(doc);
}
await tx.commit({ visibility: "async" });

console.log("Concluído.");
