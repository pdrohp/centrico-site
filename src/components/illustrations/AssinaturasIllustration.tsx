import type { Lang } from "@/lib/i18n";
import { Chip, Linha, Pill, Vista, Visto } from "./kit";

const COPY = {
  pt: {
    pill: "Contrato_Fornecimento · eIDAS qualificada",
    estado: "2 de 3 assinados",
    linhas: [
      { titulo: "Ana Ribeiro", sub: "Direção · 14:02", chip: "Assinado", tom: "a" },
      { titulo: "Miguel Faria", sub: "Jurídico · 14:20", chip: "Visualizado", tom: "b" },
      { titulo: "Sofia Lopes", sub: "Financeiro · aguarda", chip: "Pendente", tom: "c" },
    ],
  },
  en: {
    pill: "Supply_Agreement · eIDAS qualified",
    estado: "2 of 3 signed",
    linhas: [
      { titulo: "Ana Ribeiro", sub: "Board · 14:02", chip: "Signed", tom: "a" },
      { titulo: "Miguel Faria", sub: "Legal · 14:20", chip: "Viewed", tom: "b" },
      { titulo: "Sofia Lopes", sub: "Finance · waiting", chip: "Pending", tom: "c" },
    ],
  },
} as const;

export function AssinaturasIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/ass.jpg">
      <Pill>{t.pill}</Pill>

      {/* O fluxo multi-signatário: cada parte com o seu estado em tempo real */}
      {t.linhas.map((l) => (
        <Linha
          key={l.titulo}
          titulo={l.titulo}
          sub={l.sub}
          chip={<Chip tom={l.tom}>{l.chip}</Chip>}
        />
      ))}

      <Pill>
        <Visto />
        {t.estado}
      </Pill>
    </Vista>
  );
}
