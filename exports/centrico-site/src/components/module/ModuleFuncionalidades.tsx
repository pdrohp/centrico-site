import { motion } from "framer-motion";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleFuncionalidades({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="eyebrow-pill mb-6">Funcionalidades</span>
          <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 mb-6 leading-[1.05]">
            O que está{" "}
            <span className="font-italic-display text-[1.04em]">incluído</span>{" "}
            neste módulo
          </h2>
          <p className="text-base md:text-lg text-[#141414]/65 leading-relaxed">
            Tudo o que a vossa equipa precisa para operar de forma centralizada,
            segura e auditável desde o primeiro dia.
          </p>
        </motion.div>

        <div className="relative">
          {content.features.map((f, i) => {
            const isMediaLeft = i % 2 === 0;
            const isBlue = i % 2 === 1;
            const Icon = f.icon;
            const num = String(i + 1).padStart(2, "0");
            const stickyTop = 88 + i * 8;

            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`rounded-[12px] overflow-hidden flex flex-col lg:flex-row sticky shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.18)] mb-10 md:mb-16 ${
                  isBlue ? "bg-[#0028ff] text-white" : "bg-[#ECECEC] text-[#141414]"
                }`}
                style={{ top: `${stickyTop}px` }}
              >
                {/* TEXT */}
                <div
                  className={`p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2 order-2 ${
                    isMediaLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full border flex items-center justify-center mb-6 ${
                      isBlue
                        ? "border-white/40 text-white"
                        : "border-[#141414]/30 text-[#141414]"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <span
                    className={`display-eyebrow text-[10px] mb-3 ${
                      isBlue ? "text-white/70" : "text-[#141414]/55"
                    }`}
                  >
                    Funcionalidade · {num}
                  </span>

                  <h3
                    className={`display-title text-[28px] md:text-[40px] mb-5 leading-[1.05] ${
                      isBlue ? "text-white" : "text-[#141414]"
                    }`}
                  >
                    {f.title}
                  </h3>

                  <p
                    className={`text-[15px] md:text-base leading-relaxed max-w-lg ${
                      isBlue ? "text-white/80" : "text-[#141414]/65"
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>

                {/* MEDIA */}
                <div
                  className={`lg:w-1/2 p-6 md:p-12 flex items-center justify-center min-h-[300px] md:min-h-[380px] order-1 ${
                    isMediaLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="w-full max-w-[520px] aspect-[4/3] relative rounded-[12px] shadow-xl overflow-hidden border border-black/10 bg-white">
                    {/* browser chrome */}
                    <div className="absolute top-0 inset-x-0 h-10 bg-white/95 backdrop-blur border-b border-[#141414]/10 flex items-center px-4 gap-2 z-20">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                        <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                        <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                      </div>
                    </div>

                    <div className="absolute inset-0 pt-10 z-10 flex items-center justify-center">
                      <FeatureIllustration Icon={Icon} />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type IllustrationProps = {
  Icon: React.ElementType;
};

function FeatureIllustration({ Icon }: IllustrationProps) {
  const accent = "#0028ff";
  return (
    <div className="relative w-full h-full flex items-center justify-center px-8 py-6 bg-[#ECECEC]">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00072c 1px, transparent 1px), linear-gradient(to bottom, #00072c 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      {/* card frame */}
      <div className="relative w-[78%] max-w-[300px] rounded-[12px] border border-[#141414]/10 shadow-md p-5 flex flex-col gap-4 bg-white">
        {/* icon badge */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accent, color: "#ffffff" }}
        >
          <Icon size={20} strokeWidth={1.5} />
        </div>

        {/* skeleton lines */}
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-[#141414]/15 w-[85%]" />
          <div className="h-2 rounded-full bg-[#141414]/12 w-[65%]" />
          <div className="h-2 rounded-full bg-[#141414]/10 w-[75%]" />
        </div>

        <div className="pt-2 flex items-center gap-2">
          <div className="h-6 px-3 rounded-full bg-[#141414]/10 flex items-center">
            <div className="h-1.5 w-10 rounded-full bg-[#141414]/30" />
          </div>
          <div className="h-6 px-3 rounded-full border border-[#141414]/15 flex items-center">
            <div className="h-1.5 w-8 rounded-full bg-[#141414]/25" />
          </div>
        </div>
      </div>

      {/* floating accent dot */}
      <div
        className="absolute top-5 right-5 w-3 h-3 rounded-full"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
    </div>
  );
}
