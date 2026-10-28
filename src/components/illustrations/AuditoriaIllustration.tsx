import type { Lang } from "@/lib/i18n";
import { Cartao, Chip, Linha, Pill, Rotulo, Vista } from "./kit";

const COPY = {
  pt: {
    pill: "1 248 eventos · últimos 7 dias",
    alerta: "Alerta de anomalia",
    alertaValor: "42 downloads em 3 minutos",
    alertaSub: "Fora de horas · 03:14 · 10.0.4.21",
    linhas: [
      { titulo: "Download · Contrato_Fornecimento.pdf", sub: "ana.ribeiro · 14:02", chip: "Registado" },
      { titulo: "Alteração de permissões", sub: "miguel.faria · 11:48", chip: "Registado" },
    ],
  },
  en: {
    pill: "1,248 events · last 7 days",
    alerta: "Anomaly alert",
    alertaValor: "42 downloads in 3 minutes",
    alertaSub: "Outside hours · 03:14 · 10.0.4.21",
    linhas: [
      { titulo: "Download · Supply_Agreement.pdf", sub: "ana.ribeiro · 14:02", chip: "Logged" },
      { titulo: "Permissions changed", sub: "miguel.faria · 11:48", chip: "Logged" },
    ],
  },
} as const;

export function AuditoriaIllustration({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <Vista fundo="/img/desfocadas/audit.jpg">
      <Pill>{t.pill}</Pill>

      {/* A deteção de anomalia é o que distingue a trilha de um simples histórico */}
      <Cartao className="grid gap-1.5 px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <Rotulo>{t.alerta}</Rotulo>
          <Chip tom="c">!</Chip>
        </div>
        <b className="text-[12px] font-semibold text-[#0B1B33] leading-tight">
          {t.alertaValor}
        </b>
        <span className="text-[10.5px] text-[#5B6B7A] leading-tight">{t.alertaSub}</span>
      </Cartao>

      {t.linhas.map((l) => (
        <Linha key={l.titulo} titulo={l.titulo} sub={l.sub} chip={<Chip tom="b">{l.chip}</Chip>} />
      ))}
    </Vista>
  );
}
