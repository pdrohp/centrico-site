import { motion } from "framer-motion";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleVantagens({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
              Vantagens · Aplicação
            </span>
            <h2 className="display-title text-foreground text-[32px] md:text-[48px] mb-8 leading-[1]">
              {content.vantagensTitle}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              {content.vantagensBody}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-px bg-border border border-border rounded-2xl overflow-hidden"
          >
            {content.kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-8 md:p-10">
                <div className="display-title text-foreground text-[44px] md:text-[56px] leading-[1] mb-3">
                  {kpi.value}
                </div>
                <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed">
                  {kpi.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
