import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { coreModules } from "@/lib/data";

export function Workflow() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="workflow"
      className="py-24 md:py-32 bg-[#00072c] text-white relative overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="eyebrow-pill eyebrow-pill--dark mb-6">
            Sistema modular
          </span>
          <h2 className="display-title text-white text-[32px] md:text-[48px] max-w-3xl mx-auto mt-6">
            Selecione os módulos{" "}
            <span className="font-italic-display text-[1.04em]">
              de que necessitam.
            </span>
          </h2>
        </motion.div>

        {/* Capability pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {coreModules.map((mod) => {
            const isActive = selectedIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.04em] transition-all duration-300 border ${
                  isActive
                    ? "bg-[#0028ff] text-white border-[#0028ff]"
                    : "bg-transparent border-white/25 text-white/80 hover:border-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
                {mod.label}
              </button>
            );
          })}
        </div>

        {/* Mockup card */}
        <div className="relative rounded-[20px] overflow-hidden border border-white/10 bg-[#0a1024] p-8 md:p-12 min-h-[380px]">
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[300px] gap-6">
            {/* Hub pill */}
            <div className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-[#00072c] rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.04em]">
              A vossa plataforma
            </div>

            {selectedIds.length === 0 ? (
              <p className="text-white/55 text-sm md:text-base max-w-md">
                Selecione os módulos acima para configurar a vossa plataforma.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
                  {coreModules
                    .filter((m) => selectedIds.includes(m.id))
                    .map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-white/5 border border-white/15 text-white text-[12px] font-display"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0028ff]" />
                        {m.label}
                      </motion.div>
                    ))}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.18em] text-white/55">
                  <span>{selectedIds.length} módulo{selectedIds.length !== 1 ? "s" : ""} ativo{selectedIds.length !== 1 ? "s" : ""}</span>
                </div>
                <Button
                  variant="square"
                  size="square"
                  onClick={() =>
                    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Agendar com esta configuração
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
