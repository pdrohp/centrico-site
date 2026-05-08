import { motion } from "framer-motion";
import { Link } from "wouter";
import { modules } from "@/lib/data";
import { hasModuleContent } from "@/lib/modulesContent";
import { Button } from "./ui/button";

import { GedVignette } from "./vignettes/GedVignette";
import { AssinaturasVignette } from "./vignettes/AssinaturasVignette";
import { ProcessosVignette } from "./vignettes/ProcessosVignette";
import { AcessosVignette } from "./vignettes/AcessosVignette";
import { AuditoriaVignette } from "./vignettes/AuditoriaVignette";
import { IntegracoesVignette } from "./vignettes/IntegracoesVignette";
import { RhVignette } from "./vignettes/RhVignette";

const vignetteComponents: Record<string, React.ElementType> = {
  ged: GedVignette,
  ass: AssinaturasVignette,
  proc: ProcessosVignette,
  ctrl: AcessosVignette,
  audit: AuditoriaVignette,
  integ: IntegracoesVignette,
  rh: RhVignette,
};

export function Modulos() {
  return (
    <section id="modulos" className="py-24 md:py-32 bg-background border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="eyebrow-pill mb-6">
            Possibilidades de uso
          </span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] mb-6 mt-6">
            Sete formas de{" "}
            <span className="font-italic-display text-[1.04em]">
              transformar a vossa operação
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Ative os módulos de que necessitam hoje e expanda à medida que a operação cresce. Tudo integrado de forma nativa desde o primeiro dia.
          </p>
        </motion.div>

        <div className="relative">
          {modules.map((mod, i) => {
            const isMediaLeft = i % 2 === 0;
            const Vignette = vignetteComponents[mod.id];
            const stickyTop = 88 + i * 8;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="rounded-[12px] overflow-hidden flex flex-col lg:flex-row border border-border sticky shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.18)] mb-24 md:mb-40"
                style={{ backgroundColor: mod.bg, top: `${stickyTop}px` }}
              >
                <div 
                  className={`p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2 order-2 ${
                    isMediaLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="eyebrow-pill eyebrow-pill--badge mb-5 self-start">
                    {mod.area}
                  </span>

                  <h3 className="display-title text-foreground text-[32px] md:text-[44px] mb-4 leading-[1.05]">
                    {mod.label}
                  </h3>
                  
                  <h4 className="text-lg md:text-xl font-medium text-foreground/75 mb-6 leading-snug max-w-md">
                    {mod.headline}
                  </h4>
                  
                  <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    {mod.body}
                  </p>

                  <div className="mt-auto">
                    {hasModuleContent(mod.id) ? (
                      <Button
                        asChild
                        variant="square"
                        size="squareSm"
                        className="group"
                      >
                        <Link href={`/modulos/${mod.id}`}>
                          Conhecer {mod.label}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">&nbsp;&rarr;</span>
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="squareLight"
                        size="squareSm"
                        disabled
                        className="opacity-60 cursor-not-allowed"
                        title="Página detalhada em breve"
                      >
                        Em breve
                      </Button>
                    )}
                  </div>
                </div>

                <div className={`lg:w-1/2 p-6 md:p-12 flex items-center justify-center min-h-[340px] md:min-h-[400px] order-1 ${
                  isMediaLeft ? "lg:order-1" : "lg:order-2"
                }`}>
                  <div className="w-full max-w-[560px] aspect-[4/3] relative rounded-2xl shadow-xl overflow-hidden border border-border/60">
                    <div className="absolute top-0 inset-x-0 h-10 bg-white/90 backdrop-blur border-b border-border/50 flex items-center px-4 gap-2 z-20">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                        <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                        <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 pt-10 z-10 bg-white">
                      {Vignette ? <Vignette accent={mod.accent} bg={mod.bg} /> : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                          Vignette placeholder
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
