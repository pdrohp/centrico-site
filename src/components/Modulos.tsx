import { motion } from "framer-motion";
import type { Module } from "@/lib/data";
import { Button } from "./ui/button";
import { reveal, MotionRoot } from "@/lib/motion";

export function Modulos({
  modules,
  moduleIdsWithContent,
}: {
  modules: Module[];
  moduleIdsWithContent: string[];
}) {
  const hasModuleContent = (id: string) => moduleIdsWithContent.includes(id);
  return (
    <MotionRoot>
      <section id="modulos" className="py-24 md:py-32 bg-background border-y border-border">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div 
            {...reveal()}
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
              const stickyTop = 88 + i * 8;

              return (
                <motion.div
                  key={mod.id}
                  {...reveal()}
                  className="rounded-[12px] overflow-hidden flex flex-col lg:flex-row border border-border lg:sticky lg:shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.18)] mb-8 md:mb-12 lg:mb-40 bg-white"
                  style={{ top: `${stickyTop}px` }}
                >
                  <div 
                    className={`p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2 order-2 bg-[#F6F6F6] ${
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
                          <a href={`/modulos/${mod.id}`}>
                            Conhecer {mod.label}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">&nbsp;&rarr;</span>
                          </a>
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
                      {/* Browser chrome bar */}
                      <div className="absolute top-0 inset-x-0 h-10 bg-white/90 backdrop-blur border-b border-border/50 flex items-center px-4 gap-2 z-20 rounded-tl-[16px] rounded-tr-[16px]">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                          <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                          <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                        </div>
                      </div>

                      {/* Media area */}
                      <div className="absolute inset-0 pt-10 z-10 bg-[#00072c]">
                        {mod.video ? (
                          <video
                            src={mod.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 4.5L16 10L7 15.5V4.5Z" fill="white" fillOpacity="0.5" />
                              </svg>
                            </div>
                            <span className="text-white/30 text-[11px] font-display uppercase tracking-[0.18em]">
                              Vídeo da plataforma
                            </span>
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
    </MotionRoot>
  );
}
