import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { coreModules, coreModuleCategories } from "@/lib/data";

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

        {/* Capability pills — desktop: wrap; mobile: 2 scrollable rows */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto">
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

        <div className="md:hidden flex flex-col gap-2 mb-12">
          {[
            coreModules.slice(0, Math.ceil(coreModules.length / 2)),
            coreModules.slice(Math.ceil(coreModules.length / 2)),
          ].map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-nowrap overflow-x-auto gap-2 px-6 pb-1"
              style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {row.map((mod) => {
                const isActive = selectedIds.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.04em] transition-all duration-300 border ${
                      isActive
                        ? "bg-[#0028ff] text-white border-[#0028ff]"
                        : "bg-transparent border-white/25 text-white/80"
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
          ))}
        </div>

        {/* Mockup card */}
        <div className="relative rounded-[20px] overflow-hidden border border-white/10 bg-[#0a1024] p-8 md:p-12 min-h-[420px]">
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center min-h-[340px] gap-8">
            {/* Hub pill */}
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#00072c] rounded-[2px] text-[11px] font-display font-semibold uppercase tracking-[0.04em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0028ff]" />
              A vossa plataforma
            </div>

            {selectedIds.length === 0 ? (
              <p className="text-white/55 text-sm md:text-base max-w-md text-center w-full flex justify-center mt-[80px]">
                Selecione os módulos
              </p>
            ) : (
              <>
                {/* Connections diagram */}
                <ConnectionsDiagram selectedIds={selectedIds} />

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
                  Agendar demo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectionsDiagram({ selectedIds }: { selectedIds: string[] }) {
  const groups = useMemo(() => {
    return coreModuleCategories
      .map((category) => ({
        category,
        items: coreModules.filter(
          (m) => m.category === category && selectedIds.includes(m.id)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [selectedIds]);

  if (groups.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Trunk down from hub */}
      <div className="flex justify-center">
        <div className="w-px h-8 bg-[#0028ff]" />
      </div>

      {/* Horizontal trunk spanning the columns */}
      <div className="relative">
        {groups.length > 1 && (
          <div
            className="absolute top-0 h-px bg-[#0028ff]"
            style={{
              left: `calc((100% / ${groups.length}) / 2)`,
              right: `calc((100% / ${groups.length}) / 2)`,
            }}
          />
        )}

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))`,
          }}
        >
          <AnimatePresence>
            {groups.map((group) => (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {/* Branch down to category header */}
                <div className="w-px h-6 bg-[#0028ff]" />

                {/* Category header */}
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-[2px] border border-[#0028ff]/40 bg-[#0028ff]/10 text-[10px] font-display font-semibold uppercase tracking-[0.1em] text-white text-center">
                  {group.category}
                </div>

                {/* Branch down to modules */}
                <div className="w-px h-4 bg-[#0028ff]/60" />

                {/* Modules column */}
                <div className="flex flex-col items-stretch gap-2 w-full px-2">
                  <AnimatePresence>
                    {group.items.map((m, idx) => (
                      <motion.div
                        key={m.id}
                        layout
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        className="relative"
                      >
                        {idx > 0 && (
                          <span className="absolute left-1/2 -top-2 w-px h-2 bg-[#0028ff]/60" />
                        )}
                        <div className="inline-flex items-center gap-2 w-full px-3 py-2 rounded-[2px] bg-[#0028ff] text-white text-[11px] font-display font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          <span className="truncate">{m.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
