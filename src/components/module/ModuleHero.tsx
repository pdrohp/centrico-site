import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "../ui/button";
import { GedVignette } from "../vignettes/GedVignette";
import { AssinaturasVignette } from "../vignettes/AssinaturasVignette";
import { ProcessosVignette } from "../vignettes/ProcessosVignette";
import { AcessosVignette } from "../vignettes/AcessosVignette";
import { AuditoriaVignette } from "../vignettes/AuditoriaVignette";
import { IntegracoesVignette } from "../vignettes/IntegracoesVignette";
import { RhVignette } from "../vignettes/RhVignette";
import type { ModuleContent } from "@/lib/modulesContent";

const vignetteComponents: Record<string, React.ElementType> = {
  ged: GedVignette,
  ass: AssinaturasVignette,
  proc: ProcessosVignette,
  ctrl: AcessosVignette,
  audit: AuditoriaVignette,
  integ: IntegracoesVignette,
  rh: RhVignette,
};

type ModuleData = {
  id: string;
  label: string;
  area: string;
  accent: string;
  bg: string;
  headline: string;
};

export function ModuleHero({
  module,
  content,
}: {
  module: ModuleData;
  content: ModuleContent;
}) {
  const Vignette = vignetteComponents[module.id];

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#00072c] text-white">
      {/* Atmospheric gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(0,40,255,0.45) 0%, rgba(0,7,44,0) 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,30,194,0.35) 0%, rgba(0,7,44,0) 60%), linear-gradient(180deg, #00072c 0%, #00041a 100%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="eyebrow-pill eyebrow-pill--dark">
              {content.eyebrow} · {module.area}
            </span>

            <div className="h-10 w-px bg-white/15 mt-4 mb-4" aria-hidden />

            <h1 className="display-title text-white text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] leading-[1.02] tracking-[-0.01em] mb-6">
              <span className="font-italic-display text-[1.04em]">Módulo</span>{" "}
              {module.label}
            </h1>

            <p className="text-lg md:text-xl font-medium text-white/85 leading-snug mb-5 max-w-lg">
              {module.headline}
            </p>

            <p className="text-base md:text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              {content.subheadline}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center h-8 px-4 rounded-full border border-white/30 text-[10px] font-display font-semibold uppercase tracking-[0.04em] text-white bg-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="square"
                size="square"
                onClick={() =>
                  document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Agendar demonstração
              </Button>
              <Button asChild variant="squareOutlineDark" size="square">
                <Link href="/#modulos">← Voltar aos módulos</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-[560px] aspect-[4/3] relative rounded-[12px] shadow-2xl overflow-hidden border border-white/10 bg-white">
              <div className="absolute top-0 inset-x-0 h-10 bg-white/95 backdrop-blur border-b border-[#141414]/10 flex items-center px-4 gap-2 z-20">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                </div>
              </div>
              <div className="absolute inset-0 pt-10 z-10 bg-white">
                {Vignette ? (
                  <Vignette accent={module.accent} bg={module.bg} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Vignette indisponível
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
