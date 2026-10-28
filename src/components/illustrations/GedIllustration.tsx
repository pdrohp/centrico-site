import type { Lang } from "@/lib/i18n";
import { Cartao, Chip, Linha, Pill, Rotulo, Vista } from "./kit";

const COPY = {
  pt: {
    pill: "12 480 documentos · 6 departamentos",
    versao: "Versão",
    atual: "v4 atual",
    historico: "3 versões anteriores · 18/09",
    destaque: "Contrato_Fornecimento.pdf",
    linhas: [
      { titulo: "Política_Interna.docx", sub: "Compliance · 02/09", chip: "v2" },
      { titulo: "Ata_Direção_Q3.pdf", sub: "Direção · 29/08", chip: "v1" },
    ],
  },
  en: {
    pill: "12,480 documents · 6 departments",
    versao: "Version",
    atual: "v4 current",
    historico: "3 earlier versions · 18/09",
    destaque: "Supply_Agreement.pdf",
    linhas: [
      { titulo: "Internal_Policy.docx", sub: "Compliance · 02/09", chip: "v2" },
      { titulo: "Board_Minutes_Q3.pdf", sub: "Board · 29/08", chip: "v1" },
    ],
  },
};

export function GedIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/ged.jpg">
      <Pill>{t.pill}</Pill>

      {/* O documento em foco mostra o histórico de versões, que é o coração do GED */}
      <Cartao className="grid gap-1.5 px-3 py-3">
        <Rotulo>{t.versao}</Rotulo>
        <b className="text-[12px] font-semibold text-[#0B1B33] leading-tight truncate">
          {t.destaque}
        </b>
        <div className="flex items-center gap-2">
          <Chip>{t.atual}</Chip>
          <span className="text-[10.5px] text-[#5B6B7A] leading-tight truncate">
            {t.historico}
          </span>
        </div>
      </Cartao>

      {t.linhas.map((l) => (
        <Linha key={l.titulo} titulo={l.titulo} sub={l.sub} chip={<Chip tom="b">{l.chip}</Chip>} />
      ))}
    </Vista>
  );
}
