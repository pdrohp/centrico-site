# Céntrico — Sanity Studio

Painel onde o cliente edita o conteúdo do site: módulos (catálogo, menu e páginas
`/modulos/<id>`), o configurador "Workflow" da home e as configurações de SEO.

## Primeira configuração

```bash
cd studio
npm install
npx sanity login                    # entrar na conta Sanity
npx sanity projects create          # ou criar o projeto em sanity.io/manage
cp .env.example .env                # preencher SANITY_STUDIO_PROJECT_ID
npm run seed                        # importa o conteúdo atual do site
npm run deploy                      # publica em https://<SANITY_STUDIO_HOST>.sanity.studio
```

Depois, na raiz do site, criar `.env` a partir de `.env.example` com o mesmo
`SANITY_PROJECT_ID` / `SANITY_DATASET`, e definir as mesmas variáveis no
alojamento (Vercel, Netlify…).

- **Convidar o cliente:** sanity.io/manage → projeto → Members → Invite (papel *Editor*).
- **CORS:** não é necessário — o site lê o Sanity apenas durante o build.
  Só seria preciso se algum dia o browser fizesse pedidos diretos à API.
- **Dataset privado:** criar um token *Viewer* (sanity.io/manage → API → Tokens)
  e definir `SANITY_READ_TOKEN` no build do site.

## Publicar alterações

O site é estático: as edições no Studio só aparecem após um novo build.
Configure um *Deploy Hook* no alojamento e um webhook do Sanity
(sanity.io/manage → API → Webhooks, filtro `!(_id in path("drafts.**"))`)
a apontar para ele, ou adicione um botão "Publicar" no Studio.

## Notas

- `npm run seed` substitui os módulos e o workflow pelo conteúdo de
  `src/lib/data.ts` / `src/lib/modulesContent.ts`. Use-o só na configuração
  inicial — depois disso, o Studio passa a ser a fonte de verdade.
- Ícones e áreas são listas fixas (`schemaTypes/iconOptions.ts`), espelhadas em
  `src/lib/icons.ts` e no menu do site (`AREA_TO_BUCKET` em `Navbar.tsx`).
- **Inglês (/en):** cada módulo tem o separador *English*; os itens e categorias
  do workflow têm campos "(inglês)"; as Configurações do site têm "Versão em
  inglês". Campos vazios usam o texto em português. As listas em inglês seguem a
  ordem das listas em português (os ícones vêm de lá). `npm run seed:en`
  preenche só os campos em inglês ainda vazios, a partir de
  `scripts/translations-en.ts`.
