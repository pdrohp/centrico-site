import { motion } from "framer-motion";
import type { ModuleContent } from "@/lib/modulesContent";
import { getModuleIcon } from "@/lib/icons";
import { reveal, MotionRoot, stagger } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    eyebrow: "Casos de uso por setor",
    title: "Como diferentes setores",
    titleItalic: "aplicam este módulo",
    before: "Hoje",
    after: "Com a Céntrico",
  },
  en: {
    eyebrow: "Use cases by sector",
    title: "How different sectors",
    titleItalic: "use this module",
    before: "Today",
    after: "With Céntrico",
  },
};

function CaseIcon({ name }: { name: string }) {
  const Icon = getModuleIcon(name);
  return <Icon size={22} strokeWidth={1.5} />;
}

export function ModuleCasos({ content, lang = "pt" }: { content: ModuleContent; lang?: Lang }) {
  const t = COPY[lang];
  return (
    <MotionRoot>
      <section className="py-24 md:py-32 bg-[#ECECEC]">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <span className="eyebrow-pill mb-6">{t.eyebrow}</span>
            <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 leading-[1.05]">
              {t.title}{" "}
              <span className="font-italic-display text-[1.04em]">
                {t.titleItalic}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {content.cases.map((c, i) => {
              const isBlue = i === 1;
              return (
                <motion.div
                  key={i}
                  {...reveal(stagger(i))}
                  className={`rounded-[12px] p-10 md:p-12 flex flex-col ${
                    isBlue ? "bg-[#0028ff] text-white" : "bg-white text-[#141414]"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full border flex items-center justify-center mb-6 ${
                      isBlue
                        ? "border-white/40 text-white"
                        : "border-[#141414]/30 text-[#141414]"
                    }`}
                  >
                    <CaseIcon name={c.icon} />
                  </div>
                  <span
                    className={`display-eyebrow text-[10px] mb-4 ${
                      isBlue ? "text-white/70" : "text-[#141414]/55"
                    }`}
                  >
                    {c.sector}
                  </span>

                  <div className="mb-5">
                    <span
                      className={`display-eyebrow text-[10px] mb-2 block ${
                        isBlue ? "text-white/55" : "text-[#7A1F1F]"
                      }`}
                    >
                      {t.before}
                    </span>
                    <p
                      className={`text-[14px] md:text-[15px] leading-relaxed ${
                        isBlue ? "text-white/75" : "text-[#141414]/65"
                      }`}
                    >
                      {c.problem}
                    </p>
                  </div>

                  <div
                    className={`pt-5 border-t ${
                      isBlue ? "border-white/20" : "border-[#141414]/10"
                    }`}
                  >
                    <span
                      className={`display-eyebrow text-[10px] mb-2 block ${
                        isBlue ? "text-white" : "text-[#1F4D2B]"
                      }`}
                    >
                      {t.after}
                    </span>
                    <p
                      className={`text-[14px] md:text-[15px] leading-relaxed ${
                        isBlue ? "text-white" : "text-[#141414]"
                      }`}
                    >
                      {c.resolution}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
