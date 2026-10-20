import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título do site (SEO)", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "description", title: "Descrição (SEO)", type: "text", rows: 3, validation: (r) => r.max(200) }),
    defineField({ name: "ogDescription", title: "Descrição para partilha (redes sociais)", type: "text", rows: 2 }),
    defineField({
      name: "ogImage",
      title: "Imagem de partilha",
      description: "1200 × 630 px.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Configurações do site" }) },
});
