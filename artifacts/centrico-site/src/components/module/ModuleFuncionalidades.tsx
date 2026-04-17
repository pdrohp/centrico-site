import { motion } from "framer-motion";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleFuncionalidades({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
            Funcionalidades
          </span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] mb-6 leading-[1]">
            O que está incluído neste módulo
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Tudo o que a vossa equipa precisa para operar de forma centralizada, segura e auditável desde o primeiro dia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {content.features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (i % 3) * 0.06 }}
              className="bg-white p-10 group hover:bg-background transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center text-foreground mb-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                <f.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="display-title text-foreground text-[22px] md:text-[26px] mb-3 leading-[1.05]">
                {f.title}
              </h3>
              <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
