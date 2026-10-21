/**
 * Preenche os campos em inglês dos documentos existentes com a tradução de
 * scripts/translations-en.ts. Só escreve campos ainda vazios (setIfMissing),
 * por isso não apaga traduções já editadas no Studio.
 *
 * Uso (dentro de studio/):
 *   npm run seed:en
 */
import { getCliClient } from "sanity/cli";
import { modulesEn, siteSettingsEn, workflowCategoriesEn, workflowModulesEn } from "./translations-en";

const client = getCliClient({
  apiVersion: "2025-01-01",
  ...(process.env.SANITY_WRITE_TOKEN ? { token: process.env.SANITY_WRITE_TOKEN } : {}),
});

const withKeys = <T extends object>(items: T[], prefix: string) =>
  items.map((item, i) => ({ _key: `${prefix}${i}`, ...item }));

async function run() {
  const existing = new Set(
    await client.fetch<string[]>(
      `*[_id in $ids]._id`,
      {
        ids: [
          "siteSettings",
          ...Object.keys(modulesEn),
          ...Object.keys(workflowCategoriesEn),
          ...Object.keys(workflowModulesEn),
        ],
      },
    ),
  );

  const tx = client.transaction();
  let count = 0;

  for (const [id, m] of Object.entries(modulesEn)) {
    if (!existing.has(id)) {
      console.warn(`[seed:en] ${id} não existe no dataset — ignorado.`);
      continue;
    }
    const { page } = m;
    tx.patch(id, (p) =>
      p.setIfMissing({
        en: {
          title: m.title,
          desc: m.desc,
          headline: m.headline,
          body: m.body,
          page: {
            ...page,
            kpis: withKeys(page.kpis, "kpi"),
            features: withKeys(page.features, "feat"),
            cases: withKeys(page.cases, "case"),
            faq: withKeys(page.faq, "faq"),
            related: withKeys(page.related, "rel"),
          },
        },
      }),
    );
    count++;
  }

  for (const [id, titleEn] of Object.entries(workflowCategoriesEn)) {
    if (!existing.has(id)) continue;
    tx.patch(id, (p) => p.setIfMissing({ titleEn }));
    count++;
  }

  for (const [id, w] of Object.entries(workflowModulesEn)) {
    if (!existing.has(id)) continue;
    tx.patch(id, (p) => p.setIfMissing({ titleEn: w.title, descEn: w.desc }));
    count++;
  }

  tx.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
  tx.patch("siteSettings", (p) => p.setIfMissing({ en: siteSettingsEn }));
  count++;

  await tx.commit();
  console.log(`[seed:en] ${count} documentos atualizados.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
