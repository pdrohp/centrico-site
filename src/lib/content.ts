import {
  coreModuleCategories as localCoreModuleCategories,
  coreModules as localCoreModules,
  modules as localModules,
  type CoreModule,
  type Module,
} from "@/lib/data";
import { modulesContent as localModulesContent, type ModuleContent } from "@/lib/modulesContent";
import { isSanityConfigured, sanityClient, sanityImageUrl, siteContentQuery } from "@/lib/sanity";
import type { Lang } from "@/lib/i18n";
// Tradução inicial usada pelo seed do Studio; sem Sanity, serve de conteúdo local em inglês.
import {
  modulesEn as localModulesEn,
  siteSettingsEn as localSiteSettingsEn,
  workflowCategoriesEn as localWorkflowCategoriesEn,
  workflowModulesEn as localWorkflowModulesEn,
} from "../../studio/scripts/translations-en";

export type SiteSettings = {
  title: string;
  description: string;
  ogDescription: string;
  ogImage: string;
};

export type SiteContent = {
  lang: Lang;
  modules: Module[];
  /** Conteúdo das páginas /modulos/[id], indexado pelo id do módulo. */
  moduleContents: Record<string, ModuleContent>;
  /** Ids dos módulos que têm página própria (usado em links e menus). */
  moduleIdsWithContent: string[];
  coreModules: CoreModule[];
  coreModuleCategories: string[];
  settings: SiteSettings;
  source: "sanity" | "local";
};

const defaultSettings: Record<Lang, Omit<SiteSettings, "ogImage">> = {
  pt: {
    title: "Céntrico — Gestão documental inteligente",
    description:
      "A Céntrico unifica tudo numa só plataforma. Um sistema, a vossa marca, os módulos que a vossa operação exige. Gestão documental empresarial com total conformidade RGPD e alojamento na Europa.",
    ogDescription:
      "Gestão documental completa para empresas. Alojado na Europa, com total conformidade RGPD.",
  },
  en: localSiteSettingsEn,
};

const defaultOgImage = "/opengraph.jpg";

// ── Conteúdo bruto: português + campos em inglês, tal como vêm do Sanity ──

type Maybe<T> = T | null | undefined;

type ModuleEn = {
  title?: Maybe<string>;
  desc?: Maybe<string>;
  headline?: Maybe<string>;
  body?: Maybe<string>;
  page?: Maybe<{
    eyebrow?: Maybe<string>;
    subheadline?: Maybe<string>;
    tags?: Maybe<string[]>;
    vantagensTitle?: Maybe<string>;
    vantagensBody?: Maybe<string>;
    kpis?: Maybe<{ value?: Maybe<string>; label?: Maybe<string> }[]>;
    features?: Maybe<{ title?: Maybe<string>; desc?: Maybe<string> }[]>;
    cases?: Maybe<{ sector?: Maybe<string>; problem?: Maybe<string>; resolution?: Maybe<string> }[]>;
    compliance?: Maybe<string[]>;
    complianceNote?: Maybe<string>;
    faq?: Maybe<{ q?: Maybe<string>; a?: Maybe<string> }[]>;
    related?: Maybe<{ desc?: Maybe<string> }[]>;
    ctaHeadline?: Maybe<string>;
    ctaSubheadline?: Maybe<string>;
  }>;
};

type RawRelated = ModuleContent["related"][number] & {
  labelEn?: Maybe<string>;
  moduleDescEn?: Maybe<string>;
};

type RawModule = Module & {
  hasPage: boolean;
  page: (Omit<ModuleContent, "id" | "related"> & { related: RawRelated[] }) | null;
  en?: Maybe<ModuleEn>;
};

type RawCoreModule = CoreModule & {
  titleEn?: Maybe<string>;
  descEn?: Maybe<string>;
  categoryEn?: Maybe<string>;
};

type RawContent = {
  modules: RawModule[];
  coreModules: RawCoreModule[];
  coreModuleCategories: { title: string; titleEn?: Maybe<string> }[];
  settings: {
    title?: Maybe<string>;
    description?: Maybe<string>;
    ogDescription?: Maybe<string>;
    ogImage?: unknown;
    en?: Maybe<{ title?: Maybe<string>; description?: Maybe<string>; ogDescription?: Maybe<string> }>;
  } | null;
  source: "sanity" | "local";
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function localRaw(): RawContent {
  const categoryEn = (title: string) => localWorkflowCategoriesEn[`workflowCategory-${slugify(title)}`];
  return {
    modules: localModules.map((m) => {
      const c = localModulesContent[m.id];
      return {
        ...m,
        hasPage: Boolean(c),
        page: c
          ? {
              ...c,
              related: c.related.map((r) => ({
                ...r,
                labelEn: localModulesEn[`module-${r.id}`]?.title,
                moduleDescEn: localModulesEn[`module-${r.id}`]?.desc,
              })),
            }
          : null,
        en: localModulesEn[`module-${m.id}`],
      };
    }),
    coreModules: localCoreModules.map((m) => ({
      ...m,
      titleEn: localWorkflowModulesEn[`workflowModule-${m.id}`]?.title,
      descEn: localWorkflowModulesEn[`workflowModule-${m.id}`]?.desc,
      categoryEn: categoryEn(m.category),
    })),
    coreModuleCategories: localCoreModuleCategories.map((title) => ({ title, titleEn: categoryEn(title) })),
    settings: null,
    source: "local",
  };
}

async function sanityRaw(): Promise<RawContent> {
  const data = await sanityClient!.fetch<Omit<RawContent, "source">>(siteContentQuery);
  if (!data.modules.length) {
    console.warn(
      "[sanity] Nenhum módulo encontrado no dataset — a usar o conteúdo local. Corra o seed (ver studio/README.md).",
    );
    return localRaw();
  }
  return { ...data, source: "sanity" };
}

// ── Escolha do idioma: cada campo em inglês vazio cai para o português ──

const pick = (en: Maybe<string>, pt: string) => (en && en.trim() ? en : pt);
const pickList = <T,>(en: Maybe<T[]>, pt: T[]) => (en && en.length ? en : pt);

function localizeModule(m: RawModule, lang: Lang): Module {
  const { hasPage: _h, page: _p, en: _e, ...base } = m;
  if (lang === "pt" || !m.en) return base;
  return {
    ...base,
    label: pick(m.en.title, m.label),
    desc: pick(m.en.desc, m.desc),
    headline: pick(m.en.headline, m.headline),
    body: pick(m.en.body, m.body),
  };
}

function localizePage(m: RawModule, lang: Lang): ModuleContent {
  const pt = m.page!;
  if (lang === "pt") {
    return {
      id: m.id,
      ...pt,
      related: pt.related.map(({ labelEn: _l, moduleDescEn: _d, ...r }) => r),
    };
  }
  const en = m.en?.page ?? {};
  return {
    id: m.id,
    eyebrow: pick(en.eyebrow, pt.eyebrow === "Módulo" ? "Module" : pt.eyebrow),
    subheadline: pick(en.subheadline, pt.subheadline),
    tags: pickList(en.tags, pt.tags),
    vantagensTitle: pick(en.vantagensTitle, pt.vantagensTitle),
    vantagensBody: pick(en.vantagensBody, pt.vantagensBody),
    kpis: pt.kpis.map((k, i) => ({
      value: pick(en.kpis?.[i]?.value, k.value),
      label: pick(en.kpis?.[i]?.label, k.label),
    })),
    // Ícones vêm sempre da versão em português; o texto, por posição.
    features: pt.features.map((f, i) => ({
      ...f,
      title: pick(en.features?.[i]?.title, f.title),
      desc: pick(en.features?.[i]?.desc, f.desc),
    })),
    cases: pt.cases.map((c, i) => ({
      ...c,
      sector: pick(en.cases?.[i]?.sector, c.sector),
      problem: pick(en.cases?.[i]?.problem, c.problem),
      resolution: pick(en.cases?.[i]?.resolution, c.resolution),
    })),
    integrations: pt.integrations,
    compliance: pickList(en.compliance, pt.compliance),
    complianceNote: pick(en.complianceNote, pt.complianceNote),
    faq: en.faq?.length
      ? en.faq.map((f, i) => ({ q: pick(f.q, pt.faq[i]?.q ?? ""), a: pick(f.a, pt.faq[i]?.a ?? "") }))
      : pt.faq,
    related: pt.related.map((r, i) => ({
      id: r.id,
      label: pick(r.labelEn, r.label),
      desc: en.related?.[i]?.desc || r.moduleDescEn || r.desc,
    })),
    ctaHeadline: pick(en.ctaHeadline, pt.ctaHeadline),
    ctaSubheadline: pick(en.ctaSubheadline, pt.ctaSubheadline),
  };
}

function localize(raw: RawContent, lang: Lang): SiteContent {
  const isEn = lang === "en";
  const moduleContents: Record<string, ModuleContent> = {};
  for (const m of raw.modules) {
    if (m.hasPage && m.page) moduleContents[m.id] = localizePage(m, lang);
  }

  const s = raw.settings ?? {};
  const sLang = isEn ? (s.en ?? {}) : s;
  const fallback = defaultSettings[lang];

  return {
    lang,
    modules: raw.modules.map((m) => localizeModule(m, lang)),
    moduleContents,
    moduleIdsWithContent: Object.keys(moduleContents),
    coreModules: raw.coreModules.map(({ titleEn, descEn, categoryEn, ...m }) =>
      isEn
        ? { ...m, label: pick(titleEn, m.label), desc: pick(descEn, m.desc), category: pick(categoryEn, m.category) }
        : m,
    ),
    coreModuleCategories: raw.coreModuleCategories.map((c) => (isEn ? pick(c.titleEn, c.title) : c.title)),
    settings: {
      title: sLang.title || fallback.title,
      description: sLang.description || fallback.description,
      ogDescription: sLang.ogDescription || fallback.ogDescription,
      ogImage: sanityImageUrl(s.ogImage, { width: 1200, height: 630 }) ?? defaultOgImage,
    },
    source: raw.source,
  };
}

let cached: Promise<RawContent> | undefined;

/**
 * Conteúdo do site no idioma pedido, lido uma vez por build. Vem do Sanity
 * quando SANITY_PROJECT_ID está definido; caso contrário, do conteúdo local.
 */
export async function getSiteContent(lang: Lang = "pt"): Promise<SiteContent> {
  // Em dev, buscar de novo a cada pedido para refletir edições no Studio.
  if (import.meta.env.DEV) cached = undefined;
  cached ??= isSanityConfigured ? sanityRaw() : Promise.resolve(localRaw());
  return localize(await cached, lang);
}
