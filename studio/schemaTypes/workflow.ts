import { defineField, defineType } from "sanity";

export const workflowCategory = defineType({
  name: "workflowCategory",
  title: "Categoria do workflow",
  type: "document",
  orderings: [{ title: "Ordem", name: "ordem", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 100 }),
  ],
});

export const workflowModule = defineType({
  name: "workflowModule",
  title: "Item do workflow",
  description: "Opções do configurador na secção “Workflow” da home.",
  type: "document",
  orderings: [{ title: "Ordem", name: "ordem", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Identificador", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "desc", title: "Descrição", type: "string" }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "workflowCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 100 }),
    defineField({ name: "accent", title: "Cor de destaque", type: "string", initialValue: "#0028ff" }),
    defineField({ name: "bg", title: "Cor de fundo", type: "string", initialValue: "#ECECEC" }),
  ],
  preview: { select: { title: "title", subtitle: "category.title" } },
});
