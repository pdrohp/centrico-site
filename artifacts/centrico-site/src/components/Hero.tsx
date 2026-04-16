import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden flex items-center min-h-[90dvh]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(180, 178, 169, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 178, 169, 0.4) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}></div>

      <div className="container max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-6">
            Gestão documental inteligente para empresas exigentes
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="text-5xl md:text-7xl font-serif text-foreground font-medium leading-[1.1] mb-8"
        >
          A sua empresa continua a depender de quatro sistemas para gerir documentos?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          A Céntrico unifica tudo numa só plataforma. Um sistema. A vossa marca. Os módulos que a vossa operação exige.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 px-8 text-base font-medium shadow-md"
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
          >
            Agendar demonstração
          </Button>
          <button
            onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
            className="text-primary font-medium hover:text-primary/80 transition-colors h-14 px-6 flex items-center justify-center"
          >
            Conhecer a plataforma &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}
