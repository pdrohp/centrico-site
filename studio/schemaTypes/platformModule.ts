import { defineArrayMember, defineField, defineType } from "sanity";
import { areaOptions, iconOptions } from "./iconOptions";

const hex = (rule: any) =>
  rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/, { name: "cor hexadecimal" });

export const platformModule = defineType({
  name: "platformModule",
  title: "Módulo",
  type: "document",
  groups: [
    { name: "catalogo", title: "Catálogo", default: true },
    { name: "pagina", title: "Página do módulo" },
    { name: "en", title: "English" },
  ],
  orderings: [
    { title: "Ordem", name: "ordem", by: [{ field: "order", direction: "asc" }] },
  ],
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", group: "catalogo", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Identificador (URL)",
      description: "Usado no endereço /modulos/<identificador>. Evite alterar depois de publicado.",
      type: "slug",
      group: "catalogo",
      options: { source: "title", maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Ordem", description: "Menor número aparece primeiro.", type: "number", group: "catalogo", initialValue: 100 }),
    defineField({ name: "desc", title: "Descrição curta", type: "string", group: "catalogo", validation: (r) => r.required() }),
    defineField({
      name: "area",
      title: "Área",
      description: "Define em que grupo do menu o módulo aparece.",
      type: "string",
      group: "catalogo",
      options: { list: areaOptions },
      validation: (r) => r.required(),
    }),
    defineField({ name: "headline", title: "Título (secção Módulos da home)", type: "string", group: "catalogo" }),
    defineField({ name: "body", title: "Texto (secção Módulos da home)", type: "text", rows: 4, group: "catalogo" }),
    defineField({ name: "accent", title: "Cor de destaque", type: "string", group: "catalogo", initialValue: "#0028ff", validation: hex }),
    defineField({ name: "bg", title: "Cor de fundo", type: "string", group: "catalogo", initialValue: "#EAEDF1", validation: hex }),
    defineField({ name: "video", title: "Vídeo (URL)", type: "url", group: "catalogo" }),
    defineField({
      name: "hasPage",
      title: "Tem página própria",
      description: "Quando ativo, o módulo ganha a página /modulos/<identificador> e passa a ter link no menu.",
      type: "boolean",
      group: "pagina",
      initialValue: false,
    }),
    defineField({
      name: "page",
      title: "Conteúdo da página",
      type: "object",
      group: "pagina",
      hidden: ({ document }) => !document?.hasPage,
      fields: [
        defineField({ name: "eyebrow", title: "Etiqueta", type: "string", initialValue: "Módulo" }),
        defineField({ name: "subheadline", title: "Subtítulo", type: "text", rows: 2 }),
        defineField({ name: "tags", title: "Tags", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
        defineField({ name: "vantagensTitle", title: "Vantagens — título", type: "string" }),
        defineField({ name: "vantagensBody", title: "Vantagens — texto", type: "text", rows: 5 }),
        defineField({
          name: "kpis",
          title: "Indicadores",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "kpi",
              fields: [
                defineField({ name: "value", title: "Valor", type: "string" }),
                defineField({ name: "label", title: "Legenda", type: "string" }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
        defineField({
          name: "features",
          title: "Funcionalidades",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "feature",
              fields: [
                defineField({ name: "icon", title: "Ícone", type: "string", options: { list: iconOptions } }),
                defineField({ name: "title", title: "Título", type: "string" }),
                defineField({ name: "desc", title: "Descrição", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "icon" } },
            }),
          ],
        }),
        defineField({
          name: "cases",
          title: "Casos de uso",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "useCase",
              fields: [
                defineField({ name: "icon", title: "Ícone", type: "string", options: { list: iconOptions } }),
                defineField({ name: "sector", title: "Setor", type: "string" }),
                defineField({ name: "problem", title: "Hoje (problema)", type: "text", rows: 3 }),
                defineField({ name: "resolution", title: "Com a Céntrico (solução)", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "sector", subtitle: "problem" } },
            }),
          ],
        }),
        defineField({ name: "integrations", title: "Integrações", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
        defineField({ name: "compliance", title: "Conformidade — selos", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
        defineField({ name: "complianceNote", title: "Conformidade — nota", type: "text", rows: 3 }),
        defineField({
          name: "faq",
          title: "Perguntas frequentes",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "faqItem",
              fields: [
                defineField({ name: "q", title: "Pergunta", type: "string" }),
                defineField({ name: "a", title: "Resposta", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "q" } },
            }),
          ],
        }),
        defineField({
          name: "related",
          title: "Módulos relacionados",
          type: "array",
          validation: (r) => r.max(3),
          of: [
            defineArrayMember({
              type: "object",
              name: "relatedModule",
              fields: [
                defineField({ name: "module", title: "Módulo", type: "reference", to: [{ type: "platformModule" }], validation: (r) => r.required() }),
                defineField({
                  name: "desc",
                  title: "Descrição (opcional)",
                  description: "Se vazio, usa a descrição curta do módulo.",
                  type: "text",
                  rows: 2,
                }),
              ],
              preview: { select: { title: "module.title", subtitle: "desc" } },
            }),
          ],
        }),
        defineField({ name: "ctaHeadline", title: "CTA final — título", type: "string" }),
        defineField({ name: "ctaSubheadline", title: "CTA final — texto", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "en",
      title: "Versão em inglês",
      description:
        "Textos do site em /en. Campos vazios usam o texto em português. As listas seguem a mesma ordem das listas em português (ícones, cores e módulos vêm de lá).",
      type: "object",
      group: "en",
      options: { collapsible: false },
      fields: [
        defineField({ name: "title", title: "Nome", type: "string" }),
        defineField({ name: "desc", title: "Descrição curta", type: "string" }),
        defineField({ name: "headline", title: "Título (secção Módulos da home)", type: "string" }),
        defineField({ name: "body", title: "Texto (secção Módulos da home)", type: "text", rows: 4 }),
        defineField({
          name: "page",
          title: "Conteúdo da página",
          type: "object",
          hidden: ({ document }) => !document?.hasPage,
          fields: [
            defineField({ name: "eyebrow", title: "Etiqueta", type: "string" }),
            defineField({ name: "subheadline", title: "Subtítulo", type: "text", rows: 2 }),
            defineField({ name: "tags", title: "Tags", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
            defineField({ name: "vantagensTitle", title: "Vantagens — título", type: "string" }),
            defineField({ name: "vantagensBody", title: "Vantagens — texto", type: "text", rows: 5 }),
            defineField({
              name: "kpis",
              title: "Indicadores",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "kpi",
                  fields: [
                    defineField({ name: "value", title: "Valor", type: "string" }),
                    defineField({ name: "label", title: "Legenda", type: "string" }),
                  ],
                  preview: { select: { title: "value", subtitle: "label" } },
                }),
              ],
            }),
            defineField({
              name: "features",
              title: "Funcionalidades",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "feature",
                  fields: [
                    defineField({ name: "title", title: "Título", type: "string" }),
                    defineField({ name: "desc", title: "Descrição", type: "text", rows: 3 }),
                  ],
                  preview: { select: { title: "title" } },
                }),
              ],
            }),
            defineField({
              name: "cases",
              title: "Casos de uso",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "useCase",
                  fields: [
                    defineField({ name: "sector", title: "Setor", type: "string" }),
                    defineField({ name: "problem", title: "Hoje (problema)", type: "text", rows: 3 }),
                    defineField({ name: "resolution", title: "Com a Céntrico (solução)", type: "text", rows: 3 }),
                  ],
                  preview: { select: { title: "sector", subtitle: "problem" } },
                }),
              ],
            }),
            defineField({ name: "compliance", title: "Conformidade — selos", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
            defineField({ name: "complianceNote", title: "Conformidade — nota", type: "text", rows: 3 }),
            defineField({
              name: "faq",
              title: "Perguntas frequentes",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "faqItem",
                  fields: [
                    defineField({ name: "q", title: "Pergunta", type: "string" }),
                    defineField({ name: "a", title: "Resposta", type: "text", rows: 3 }),
                  ],
                  preview: { select: { title: "q" } },
                }),
              ],
            }),
            defineField({
              name: "related",
              title: "Módulos relacionados — descrições",
              description: "Uma por módulo relacionado, pela mesma ordem. Se vazio, usa a descrição curta em inglês do módulo.",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "relatedModule",
                  fields: [defineField({ name: "desc", title: "Descrição", type: "text", rows: 2 })],
                  preview: { select: { title: "desc" } },
                }),
              ],
            }),
            defineField({ name: "ctaHeadline", title: "CTA final — título", type: "string" }),
            defineField({ name: "ctaSubheadline", title: "CTA final — texto", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "area", hasPage: "hasPage" },
    prepare: ({ title, subtitle, hasPage }) => ({
      title,
      subtitle: `${subtitle ?? ""}${hasPage ? " · com página" : ""}`,
    }),
  },
});
