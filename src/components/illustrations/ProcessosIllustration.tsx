import type { Lang } from "@/lib/i18n";
import { Cartao, Chip, Linha, Pill, Rotulo, Vista } from "./kit";

const COPY = {
  pt: {
    pill: "Pedido de compra · 12 400 €",
    etapa: "Etapa 3 de 4",
    etapaValor: "Direção geral",
    etapaSub: "Prazo em 2 dias · escala para o superior",
    linhas: [
      { titulo: "Chefia direta", sub: "Aprovado · 09/10", chip: "Aprovado", tom: "a" },
      { titulo: "Direção financeira", sub: "Aprovado · 10/10", chip: "Aprovado", tom: "a" },
    ],
  },
  en: {
    pill: "Purchase request · €12,400",
    etapa: "Step 3 of 4",
    etapaValor: "Executive board",
    etapaSub: "Due in 2 days · escalates to manager",
    linhas: [
      { titulo: "Line manager", sub: "Approved · 09/10", chip: "Approved", tom: "a" },
      { titulo: "Finance director", sub: "Approved · 10/10", chip: "Approved", tom: "a" },
    ],
  },
} as const;

export function ProcessosIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/proc.jpg">
      <Pill>{t.pill}</Pill>

      {t.linhas.map((l) => (
        <Linha
          key={l.titulo}
          titulo={l.titulo}
          sub={l.sub}
          chip={<Chip tom={l.tom}>{l.chip}</Chip>}
        />
      ))}

      {/* A etapa em curso fica em destaque, com o prazo e a escalada automática */}
      <Cartao className="grid gap-1.5 px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <Rotulo>{t.etapa}</Rotulo>
          <Chip tom="c">{t.etapaValor}</Chip>
        </div>
        <span className="text-[10.5px] text-[#5B6B7A] leading-tight">{t.etapaSub}</span>
      </Cartao>
    </Vista>
  );
}
