import type { Lang } from "@/lib/i18n";
import { Chip, Linha, Pill, Vista } from "./kit";

const COPY = {
  pt: {
    pill: "Pasta Jurídico · 24 utilizadores",
    linhas: [
      { titulo: "Direção", sub: "Ler, editar, eliminar", chip: "MFA", tom: "a" },
      { titulo: "Jurídico", sub: "Ler, editar", chip: "12 pessoas", tom: "b" },
      { titulo: "Auditor externo", sub: "Ler · expira 31/10", chip: "Temporário", tom: "c" },
    ],
  },
  en: {
    pill: "Legal folder · 24 users",
    linhas: [
      { titulo: "Board", sub: "Read, edit, delete", chip: "MFA", tom: "a" },
      { titulo: "Legal", sub: "Read, edit", chip: "12 people", tom: "b" },
      { titulo: "External auditor", sub: "Read · expires 31/10", chip: "Temporary", tom: "c" },
    ],
  },
} as const;

export function AcessosIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/ctrl.jpg">
      <Pill>{t.pill}</Pill>

      {/* Permissões por função, com o acesso externo a expirar sozinho */}
      {t.linhas.map((l) => (
        <Linha
          key={l.titulo}
          titulo={l.titulo}
          sub={l.sub}
          chip={<Chip tom={l.tom}>{l.chip}</Chip>}
        />
      ))}
    </Vista>
  );
}
