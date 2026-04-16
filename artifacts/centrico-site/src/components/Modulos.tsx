import { motion } from "framer-motion";
import { modules } from "@/lib/data";

import { GedVignette } from "./vignettes/GedVignette";
import { AssinaturasVignette } from "./vignettes/AssinaturasVignette";
import { ProcessosVignette } from "./vignettes/ProcessosVignette";
import { AcessosVignette } from "./vignettes/AcessosVignette";
import { AuditoriaVignette } from "./vignettes/AuditoriaVignette";
import { IntegracoesVignette } from "./vignettes/IntegracoesVignette";
import { RhVignette } from "./vignettes/RhVignette";
import { WhitelabelVignette } from "./vignettes/WhitelabelVignette";

// Map modules to their specific vignettes
const vignetteComponents: Record<string, React.ElementType> = {
  ged: GedVignette,
  ass: AssinaturasVignette,
  proc: ProcessosVignette,
  ctrl: AcessosVignette,
  audit: AuditoriaVignette,
  integ: IntegracoesVignette,
  rh: RhVignette,
  wl: WhitelabelVignette,
};

export function Modulos() {
  return (
    <section id="modulos" className="py-24 md:py-32 bg-[#F8F7F5] border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Section Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-4">
            Possibilidades de uso
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground mb-4">
            Oito formas de transformar sua operação.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Ative o que você precisa hoje. Expanda quando sua operação exigir. Tudo integrado nativamente desde o primeiro dia.
          </p>
        </motion.div>

        {/* Stacked Modules Grid */}
        <div className="space-y-8 md:space-y-12">
          {modules.map((mod, i) => {
            const isMediaLeft = i % 2 === 0;
            const Vignette = vignetteComponents[mod.id];

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="rounded-[32px] overflow-hidden flex flex-col lg:flex-row"
                style={{ backgroundColor: mod.bg }}
              >
                {/* Text Side */}
                <div 
                  className={`p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2 order-2 ${
                    isMediaLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span 
                    className="text-[11px] font-bold uppercase tracking-widest mb-4"
                    style={{ color: mod.accent }}
                  >
                    {mod.area}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-3">
                    {mod.label}
                  </h3>
                  
                  <h4 className="text-xl md:text-2xl font-serif font-medium text-foreground/80 mb-6">
                    {mod.headline}
                  </h4>
                  
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    {mod.body}
                  </p>

                  <div className="mt-auto">
                    <button 
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
                      style={{ 
                        color: mod.accent, 
                        border: `1.5px solid ${mod.accent}`,
                        backgroundColor: "transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${mod.accent}24`; // roughly 14% opacity
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Conheça {mod.label} 
                      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Media Side (Vignette) */}
                <div className={`lg:w-1/2 p-6 md:p-12 flex items-center justify-center min-h-[340px] md:min-h-[400px] order-1 ${
                  isMediaLeft ? "lg:order-1" : "lg:order-2"
                }`}>
                  <div className="w-full max-w-[560px] aspect-[4/3] relative rounded-2xl shadow-xl overflow-hidden border border-border/50">
                    {/* Faux Browser Chrome */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-white/80 backdrop-blur border-b border-border/50 flex items-center px-4 gap-2 z-20">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5EA]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5EA]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5EA]" />
                      </div>
                    </div>
                    
                    {/* Vignette Content */}
                    <div className="absolute inset-0 pt-12 z-10 bg-white">
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
