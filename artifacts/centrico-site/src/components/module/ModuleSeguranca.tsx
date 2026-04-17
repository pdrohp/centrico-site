import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import type { ModuleContent } from "@/lib/modulesContent";
import { GridPulseBackground } from "./GridPulseBackground";

export function ModuleSeguranca({ content }: { content: ModuleContent }) {
  return (
    <section className="relative py-24 md:py-32 bg-background border-y border-border overflow-hidden">
      <GridPulseBackground />
      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-border bg-white shadow-sm p-10 md:p-14 lg:p-16"
        >
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-14 h-14 rounded-full border border-foreground/30 flex items-center justify-center text-foreground flex-shrink-0">
              <ShieldCheck size={22} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-5">
                Segurança e Compliance
              </span>
              <h2 className="display-title text-foreground text-[28px] md:text-[40px] mb-6 leading-[1.05] max-w-2xl">
                Conforme os requisitos regulatórios da vossa operação
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {content.complianceNote}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.compliance.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center h-8 px-4 rounded-full border border-foreground/30 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-foreground bg-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
