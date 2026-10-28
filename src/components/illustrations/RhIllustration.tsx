import type { Lang } from "@/lib/i18n";
import { Barra, Cartao, Chip, Linha, Pill, Rotulo, Vista } from "./kit";

const COPY = {
  pt: {
    pill: "Admissão · Marta Ferreira",
    checklist: "Checklist de admissão",
    contagem: "4 de 6 passos",
    linhas: [
      { titulo: "Contrato de trabalho", sub: "Assinado · 12/10", chip: "Concluído", tom: "a" },
      { titulo: "Termo de confidencialidade", sub: "Enviado para assinatura", chip: "Pendente", tom: "c" },
    ],
  },
  en: {
    pill: "Onboarding · Marta Ferreira",
    checklist: "Onboarding checklist",
    contagem: "4 of 6 steps",
    linhas: [
      { titulo: "Employment contract", sub: "Signed · 12/10", chip: "Done", tom: "a" },
      { titulo: "Confidentiality agreement", sub: "Sent for signature", chip: "Pending", tom: "c" },
    ],
  },
} as const;

export function RhIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/rh.jpg">
      <Pill>{t.pill}</Pill>

      {/* O onboarding é uma checklist: o progresso é o que o gestor quer ver */}
      <Cartao className="grid gap-2 px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <Rotulo>{t.checklist}</Rotulo>
          <b className="text-[11px] font-semibold text-[#0B1B33] leading-none">
            {t.contagem}
          </b>
        </div>
        <Barra pct={67} />
      </Cartao>

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
