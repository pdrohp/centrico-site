import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden flex items-center min-h-[90dvh]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(120, 118, 109, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 118, 109, 0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }}></div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-8">
            Gestão documental inteligente · Empresas exigentes
          </span>
        </motion.div>

        {/* Top connector line */}
        <div className="mx-auto h-12 w-px bg-foreground/20 mb-2" aria-hidden />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="display-title text-foreground text-[40px] sm:text-[56px] md:text-[76px] lg:text-[88px] leading-[0.95] mb-10"
        >
          A vossa empresa ainda depende de quatro sistemas para gerir documentos?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed"
        >
          A Céntrico unifica tudo numa só plataforma. Um sistema. A vossa marca. Os módulos que a vossa operação exige.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background text-[12px] font-display font-semibold uppercase tracking-[0.18em] hover:bg-foreground/85 transition-colors"
          >
            Agendar demonstração
          </button>
          <button
            onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-foreground/40 text-foreground text-[12px] font-display font-semibold uppercase tracking-[0.18em] hover:border-foreground hover:bg-foreground/5 transition-colors"
          >
            Conhecer a plataforma
          </button>
        </motion.div>
      </div>
    </section>
  );
}
