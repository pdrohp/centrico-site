import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import type { ModuleContent } from "@/lib/modulesContent";
import { reveal, MotionRoot } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const COPY = {
  pt: { eyebrow: "Segurança e Compliance", title: ["Conforme os", "requisitos regulatórios", "da vossa operação"] },
  en: { eyebrow: "Security and compliance", title: ["Meets the", "regulatory requirements", "of your operation"] },
};

export function ModuleSeguranca({ content, lang = "pt" }: { content: ModuleContent; lang?: Lang }) {
  const t = COPY[lang];
  return (
    <MotionRoot>
      <section className="py-24 md:py-32 bg-[#ECECEC]">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            {...reveal()}
            className="rounded-[12px] overflow-hidden bg-[#0028ff] text-white p-10 md:p-14 lg:p-16 relative"
          >
            {/* subtle grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />

            <div className="relative flex flex-col md:flex-row gap-10 items-start">
              <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center text-white flex-shrink-0">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <span className="eyebrow-pill eyebrow-pill--dark mb-6">
                  {t.eyebrow}
                </span>
                <h2 className="display-title text-white text-[28px] md:text-[40px] mt-6 mb-6 leading-[1.05] max-w-2xl">
                  {t.title[0]}{" "}
                  <span className="font-italic-display text-[1.06em]">
                    {t.title[1]}
                  </span>{" "}
                  {t.title[2]}
                </h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                  {content.complianceNote}
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.compliance.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center h-8 px-4 rounded-full border border-white/30 text-[10px] font-display font-semibold uppercase tracking-[0.04em] text-white bg-white/10"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionRoot>
  );
}
