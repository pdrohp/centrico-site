import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { ptPTLocale } from "@sanity/locale-pt-pt";
import { schemaTypes } from "./schemaTypes";
import { SINGLETONS, structure } from "./structure";

export default defineConfig({
  name: "centrico",
  title: "Céntrico",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool({ structure }), visionTool(), ptPTLocale()],
  schema: {
    types: schemaTypes,
    // Singletons não aparecem em "Criar novo".
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
