import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "../ui/button";
import { hasModuleContent } from "@/lib/modulesContent";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleRelacionados({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-[#ECECEC]">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="eyebrow-pill mb-6">Combina bem com</span>
          <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 leading-[1.05]">
            Módulos que potenciam ainda mais a{" "}
            <span className="font-italic-display text-[1.04em]">
              vossa operação
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {content.related.map((mod, i) => {
            const isBlue = i === 1;
            const enabled = hasModuleContent(mod.id);
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className={`rounded-[12px] p-10 md:p-12 flex flex-col ${
                  isBlue ? "bg-[#0028ff] text-white" : "bg-white text-[#141414]"
                }`}
              >
                <span
                  className={`display-eyebrow text-[10px] mb-4 ${
                    isBlue ? "text-white/70" : "text-[#141414]/55"
                  }`}
                >
                  Módulo
                </span>
                <h3
                  className={`display-title text-[26px] md:text-[32px] mb-4 leading-[1.05] ${
                    isBlue ? "text-white" : "text-[#141414]"
                  }`}
                >
                  {mod.label}
                </h3>
                <p
                  className={`text-[15px] leading-relaxed mb-8 flex-1 ${
                    isBlue ? "text-white/80" : "text-[#141414]/65"
                  }`}
                >
                  {mod.desc}
                </p>
                <div>
                  {enabled ? (
                    <Button
                      asChild
                      variant={isBlue ? "squareLight" : "square"}
                      size="squareSm"
                      className="group"
                    >
                      <Link href={`/modulos/${mod.id}`}>
                        Conhecer {mod.label}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          &nbsp;&rarr;
                        </span>
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant={isBlue ? "squareOutlineDark" : "squareLight"}
                      size="squareSm"
                      disabled
                      className="opacity-60 cursor-not-allowed"
                      title="Página detalhada em breve"
                    >
                      Em breve
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
