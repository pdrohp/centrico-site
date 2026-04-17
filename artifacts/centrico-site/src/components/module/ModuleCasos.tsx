import { motion } from "framer-motion";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleCasos({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
            Casos de uso por setor
          </span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] leading-[1]">
            Como diferentes setores aplicam este módulo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {content.cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
              className="bg-white p-10 md:p-12 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center text-foreground mb-6">
                <c.icon size={20} strokeWidth={1.5} />
              </div>
              <span className="display-eyebrow text-[10px] text-foreground/60 mb-3">
                {c.sector}
              </span>

              <div className="mb-5">
                <span className="display-eyebrow text-[10px] mb-2 block" style={{ color: "#7A1F1F" }}>
                  Hoje
                </span>
                <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                  {c.problem}
                </p>
              </div>

              <div className="pt-5 border-t border-border">
                <span className="display-eyebrow text-[10px] mb-2 block" style={{ color: "#1F4D2B" }}>
                  Com a Céntrico
                </span>
                <p className="text-[14px] md:text-[15px] text-foreground leading-relaxed">
                  {c.resolution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
