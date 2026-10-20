import {
  coreModuleCategories as localCoreModuleCategories,
  coreModules as localCoreModules,
  modules as localModules,
  type CoreModule,
  type Module,
} from "@/lib/data";
import { modulesContent as localModulesContent, type ModuleContent } from "@/lib/modulesContent";
import { isSanityConfigured, sanityClient, sanityImageUrl, siteContentQuery } from "@/lib/sanity";

export type SiteSettings = {
  title: string;
  description: string;
  ogDescription: string;
  ogImage: string;
};

export type SiteContent = {
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

const defaultSettings: SiteSettings = {
  title: "Céntrico — Gestão documental inteligente",
  description:
    "A Céntrico unifica tudo numa só plataforma. Um sistema, a vossa marca, os módulos que a vossa operação exige. Gestão documental empresarial com total conformidade RGPD e alojamento na Europa.",
  ogDescription:
    "Gestão documental completa para empresas. Alojado na Europa, com total conformidade RGPD.",
  ogImage: "/opengraph.jpg",
};

function localContent(): SiteContent {
  const moduleContents = Object.fromEntries(
    Object.entries(localModulesContent).filter(
      (entry): entry is [string, ModuleContent] => Boolean(entry[1]),
    ),
  );
  return {
    modules: localModules,
    moduleContents,
    moduleIdsWithContent: Object.keys(moduleContents),
    coreModules: localCoreModules,
    coreModuleCategories: localCoreModuleCategories,
    settings: defaultSettings,
    source: "local",
  };
}

type SanityModule = Module & {
  hasPage: boolean;
  page: Omit<ModuleContent, "id"> | null;
};

type SanityResult = {
  modules: SanityModule[];
  coreModules: CoreModule[];
  coreModuleCategories: string[];
  settings: {
    title?: string;
    description?: string;
    ogDescription?: string;
    ogImage?: unknown;
  } | null;
};

async function fetchSanityContent(): Promise<SiteContent> {
  const data = await sanityClient!.fetch<SanityResult>(siteContentQuery);

  if (!data.modules.length) {
    console.warn(
      "[sanity] Nenhum módulo encontrado no dataset — a usar o conteúdo local. Corra o seed (ver studio/README.md).",
    );
    return localContent();
  }

  const modules: Module[] = data.modules.map(({ hasPage: _h, page: _p, ...m }) => m);
  const moduleContents: Record<string, ModuleContent> = {};
  for (const m of data.modules) {
    if (m.hasPage && m.page) moduleContents[m.id] = { id: m.id, ...m.page };
  }

  const s = data.settings ?? {};
  return {
    modules,
    moduleContents,
    moduleIdsWithContent: Object.keys(moduleContents),
    coreModules: data.coreModules,
    coreModuleCategories: data.coreModuleCategories,
    settings: {
      title: s.title || defaultSettings.title,
      description: s.description || defaultSettings.description,
      ogDescription: s.ogDescription || defaultSettings.ogDescription,
      ogImage: sanityImageUrl(s.ogImage, { width: 1200, height: 630 }) ?? defaultSettings.ogImage,
    },
    source: "sanity",
  };
}

let cached: Promise<SiteContent> | undefined;

/**
 * Conteúdo do site, lido uma vez por build. Vem do Sanity quando
 * SANITY_PROJECT_ID está definido; caso contrário, do conteúdo local.
 */
export function getSiteContent(): Promise<SiteContent> {
  // Em dev, buscar de novo a cada pedido para refletir edições no Studio.
  if (import.meta.env.DEV) cached = undefined;
  cached ??= isSanityConfigured ? fetchSanityContent() : Promise.resolve(localContent());
  return cached;
}

export async function getModules(): Promise<Module[]> {
  return (await getSiteContent()).modules;
}

export async function getModuleContent(id: string): Promise<ModuleContent | undefined> {
  return (await getSiteContent()).moduleContents[id];
}
