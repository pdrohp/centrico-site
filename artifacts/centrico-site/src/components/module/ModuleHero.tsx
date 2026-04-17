import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "../ui/button";
import { GedVignette } from "../vignettes/GedVignette";
import type { ModuleContent } from "@/lib/modulesContent";

const vignetteComponents: Record<string, React.ElementType> = {
  ged: GedVignette,
};

type ModuleData = {
  id: string;
  label: string;
  area: string;
  accent: string;
  bg: string;
  headline: string;
};

export function ModuleHero({
  module,
  content,
}: {
  module: ModuleData;
  content: ModuleContent;
}) {
  const Vignette = vignetteComponents[module.id];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120, 118, 109, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 118, 109, 0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
              {content.eyebrow} · {module.area}
            </span>

            <h1 className="display-title text-foreground text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] leading-[1] mb-6">
              {module.label}
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-foreground/75 leading-snug mb-6 max-w-lg">
              {module.headline}
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              {content.subheadline}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center h-8 px-4 rounded-full border border-foreground/30 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-foreground bg-background"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="pill"
                size="pillMd"
                onClick={() =>
                  document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Agendar demonstração
              </Button>
              <Button asChild variant="pillOutline" size="pillMd">
                <Link href="/#modulos">← Voltar aos módulos</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-[560px] aspect-[4/3] relative rounded-2xl shadow-xl overflow-hidden border border-border/60">
              <div className="absolute top-0 inset-x-0 h-10 bg-white/90 backdrop-blur border-b border-border/50 flex items-center px-4 gap-2 z-20">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                </div>
              </div>
              <div className="absolute inset-0 pt-10 z-10 bg-white">
                {Vignette ? (
                  <Vignette accent={module.accent} bg={module.bg} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Vignette indisponível
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
