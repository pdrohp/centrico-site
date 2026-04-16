import { motion } from "framer-motion";
import { modules } from "@/lib/data";

export function Modulos() {
  return (
    <section id="modulos" className="py-24 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
              className="group p-6 rounded-2xl border border-border bg-background hover:bg-white hover:shadow-sm transition-all duration-300 relative overflow-hidden"
              style={{
                '--hover-border': mod.accent,
              } as React.CSSProperties}
            >
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--hover-border)] rounded-2xl transition-colors duration-300 opacity-0 group-hover:opacity-100" />
              
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: mod.bg, color: mod.accent }}
              >
                <span className="font-bold text-xl font-serif">{mod.label.charAt(0)}</span>
              </div>
              
              <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                {mod.label}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {mod.desc}
              </p>

              <div className="mt-auto pt-2 flex items-center text-xs font-medium uppercase tracking-wider" style={{ color: mod.accent }}>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Saiba mais &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
