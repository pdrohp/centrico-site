import type { Lang } from "@/lib/i18n";
import { Chip, Linha, Pill, Vista } from "./kit";

const COPY = {
  pt: {
    pill: "6 integrações ativas · API REST",
    linhas: [
      { titulo: "Microsoft 365", sub: "Sincronizado · há 2 min", chip: "Ativo", tom: "a" },
      { titulo: "SAP", sub: "Bidirecional · há 8 min", chip: "Ativo", tom: "a" },
      { titulo: "Salesforce", sub: "3 chamadas falhadas", chip: "Reprocessar", tom: "c" },
    ],
  },
  en: {
    pill: "6 active integrations · REST API",
    linhas: [
      { titulo: "Microsoft 365", sub: "Synced · 2 min ago", chip: "Active", tom: "a" },
      { titulo: "SAP", sub: "Two-way · 8 min ago", chip: "Active", tom: "a" },
      { titulo: "Salesforce", sub: "3 failed calls", chip: "Retry", tom: "c" },
    ],
  },
} as const;

export function IntegracoesIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/integ.jpg">
      <Pill>{t.pill}</Pill>

      {/* A saúde dos conectores, incluindo o que falhou e se pode reprocessar */}
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
