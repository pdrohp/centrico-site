import type { ReactElement } from "react";
import type { Lang } from "@/lib/i18n";
import { GedIllustration } from "./GedIllustration";
import { AssinaturasIllustration } from "./AssinaturasIllustration";
import { ProcessosIllustration } from "./ProcessosIllustration";
import { AcessosIllustration } from "./AcessosIllustration";
import { AuditoriaIllustration } from "./AuditoriaIllustration";
import { IntegracoesIllustration } from "./IntegracoesIllustration";
import { RhIllustration } from "./RhIllustration";

/**
 * Ilustrações dos módulos, por id. Um módulo sem ilustração cai no
 * marcador de vídeo que já existia no catálogo.
 */
const ILUSTRACOES: Record<string, (props: { lang?: Lang }) => ReactElement> = {
  ged: GedIllustration,
  ass: AssinaturasIllustration,
  proc: ProcessosIllustration,
  ctrl: AcessosIllustration,
  audit: AuditoriaIllustration,
  integ: IntegracoesIllustration,
  rh: RhIllustration,
};

export function hasIllustration(id: string) {
  return id in ILUSTRACOES;
}

export function ModuleIllustration({ id, lang = "pt" }: { id: string; lang?: Lang }) {
  const Ilustracao = ILUSTRACOES[id];
  return Ilustracao ? <Ilustracao lang={lang} /> : null;
}
