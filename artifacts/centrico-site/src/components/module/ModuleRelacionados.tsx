import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "../ui/button";
import { hasModuleContent } from "@/lib/modulesContent";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleRelacionados({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
            Combina bem com
          </span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] leading-[1]">
            Módulos que potenciam ainda mais a vossa operação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {content.related.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
              className="bg-white p-10 md:p-12 flex flex-col"
            >
              <span className="display-eyebrow text-[10px] text-foreground/60 mb-4">
                Módulo
              </span>
              <h3 className="display-title text-foreground text-[26px] md:text-[32px] mb-4 leading-[1]">
                {mod.label}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 flex-1">
                {mod.desc}
              </p>
              <div>
                {hasModuleContent(mod.id) ? (
                  <Button asChild variant="pillOutline" size="pillSm" className="group">
                    <Link href={`/modulos/${mod.id}`}>
                      Conhecer {mod.label}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="pillOutline"
                    size="pillSm"
                    disabled
                    className="opacity-60 cursor-not-allowed"
                    title="Página detalhada em breve"
                  >
                    Em breve
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
