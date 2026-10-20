import type { StructureResolver } from "sanity/structure";

export const SINGLETONS = ["siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Configurações do site")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("platformModule")
        .title("Módulos")
        .child(
          S.documentTypeList("platformModule")
            .title("Módulos")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Workflow (home)")
        .child(
          S.list()
            .title("Workflow")
            .items([
              S.documentTypeListItem("workflowCategory").title("Categorias"),
              S.documentTypeListItem("workflowModule").title("Itens"),
            ]),
        ),
    ]);
