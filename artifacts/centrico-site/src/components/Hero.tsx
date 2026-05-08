import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-24 md:pt-36 md:pb-32 overflow-hidden flex items-center bg-[#00072c] text-white"
    >
      {/* Atmospheric gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(0,40,255,0.45) 0%, rgba(0,7,44,0) 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,30,194,0.35) 0%, rgba(0,7,44,0) 60%), linear-gradient(180deg, #00072c 0%, #00041a 100%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="eyebrow-pill eyebrow-pill--dark"
        >
          Gestão documental inteligente
        </motion.span>

        <div className="mx-auto h-12 w-px bg-white/15 mt-2 mb-2" aria-hidden />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="display-title text-white text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] leading-[1.02] tracking-[-0.01em] max-w-4xl mx-auto pt-2"
        >
          Ajudamos a vossa empresa a{" "}
          <span className="font-italic-display text-[1.04em]">
            unificar a gestão documental.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          className="text-base md:text-lg text-white/75 mt-10 max-w-xl mx-auto leading-relaxed"
        >
          Simplificamos o circuito documental num só sistema. A vossa marca. Os
          módulos que a vossa operação exige.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-12"
        >
          <Button
            variant="square"
            size="square"
            onClick={() =>
              document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Agendar demonstração
          </Button>
          <Button
            variant="squareDark"
            size="square"
            onClick={() =>
              document
                .getElementById("workflow")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Conhecer a plataforma
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
