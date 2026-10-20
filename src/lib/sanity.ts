import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// Variáveis lidas no build (frontmatter das páginas .astro). Sem projectId o
// site usa o conteúdo local em src/lib/data.ts e src/lib/modulesContent.ts.
const projectId =
  import.meta.env.SANITY_PROJECT_ID ?? import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  import.meta.env.SANITY_DATASET ??
  import.meta.env.PUBLIC_SANITY_DATASET ??
  "production";
const apiVersion = import.meta.env.SANITY_API_VERSION ?? "2025-01-01";
const token = import.meta.env.SANITY_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      // O site é estático: lemos sempre a versão publicada mais recente.
      useCdn: false,
      perspective: "published",
    })
  : null;

const imageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function sanityImageUrl(
  source: unknown,
  { width, height }: { width?: number; height?: number } = {},
): string | undefined {
  if (!imageBuilder || !source) return undefined;
  let img = imageBuilder.image(source as Parameters<typeof imageBuilder.image>[0]).auto("format");
  if (width) img = img.width(width);
  if (height) img = img.height(height);
  return img.url();
}

export const siteContentQuery = /* groq */ `{
  "modules": *[_type == "platformModule" && defined(slug.current)] | order(order asc, title asc) {
    "id": slug.current,
    "label": title,
    "desc": coalesce(desc, ""),
    "area": coalesce(area, ""),
    "accent": coalesce(accent, "#0028ff"),
    "bg": coalesce(bg, "#EAEDF1"),
    "headline": coalesce(headline, ""),
    "body": coalesce(body, ""),
    "video": coalesce(video, ""),
    "hasPage": coalesce(hasPage, false),
    page {
      "eyebrow": coalesce(eyebrow, "Módulo"),
      "subheadline": coalesce(subheadline, ""),
      "tags": coalesce(tags, []),
      "vantagensTitle": coalesce(vantagensTitle, ""),
      "vantagensBody": coalesce(vantagensBody, ""),
      "kpis": coalesce(kpis[]{ value, label }, []),
      "features": coalesce(features[]{ icon, title, desc }, []),
      "cases": coalesce(cases[]{ icon, sector, problem, resolution }, []),
      "integrations": coalesce(integrations, []),
      "compliance": coalesce(compliance, []),
      "complianceNote": coalesce(complianceNote, ""),
      "faq": coalesce(faq[]{ q, a }, []),
      "related": coalesce(related[defined(module->slug.current)]{
        "id": module->slug.current,
        "label": module->title,
        "desc": coalesce(desc, module->desc, "")
      }, []),
      "ctaHeadline": coalesce(ctaHeadline, ""),
      "ctaSubheadline": coalesce(ctaSubheadline, "")
    }
  },
  "coreModuleCategories": *[_type == "workflowCategory"] | order(order asc, title asc).title,
  "coreModules": *[_type == "workflowModule" && defined(slug.current)] | order(order asc, title asc) {
    "id": slug.current,
    "label": title,
    "desc": coalesce(desc, ""),
    "category": coalesce(category->title, ""),
    "accent": coalesce(accent, "#0028ff"),
    "bg": coalesce(bg, "#ECECEC")
  },
  "settings": *[_id == "siteSettings"][0] { title, description, ogDescription, ogImage }
}`;
