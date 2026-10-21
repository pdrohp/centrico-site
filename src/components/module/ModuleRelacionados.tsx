import { motion } from "framer-motion";
import { Button } from "../ui/button";
import type { ModuleContent } from "@/lib/modulesContent";
import { reveal, MotionRoot, stagger } from "@/lib/motion";
import { localizePath, type Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    eyebrow: "Combina bem com",
    title: "Módulos que potenciam ainda mais a",
    titleItalic: "vossa operação",
    module: "Módulo",
    explore: (label: string) => `Conhecer ${label}`,
    soon: "Em breve",
    soonTitle: "Página detalhada em breve",
  },
  en: {
    eyebrow: "Works well with",
    title: "Modules that take",
    titleItalic: "your operation further",
    module: "Module",
    explore: (label: string) => `Explore ${label}`,
    soon: "Coming soon",
    soonTitle: "Detailed page coming soon",
  },
};

export function ModuleRelacionados({
  content,
  moduleIdsWithContent,
  lang = "pt",
}: {
  content: ModuleContent;
  moduleIdsWithContent: string[];
  lang?: Lang;
}) {
  const t = COPY[lang];
  const hasModuleContent = (id: string) => moduleIdsWithContent.includes(id);
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
            {content.related.map((mod, i) => {
              const isBlue = i === 1;
              const enabled = hasModuleContent(mod.id);
              return (
                <motion.div
                  key={mod.id}
                  {...reveal(stagger(i))}
                  className={`rounded-[12px] p-10 md:p-12 flex flex-col ${
                    isBlue ? "bg-[#0028ff] text-white" : "bg-white text-[#141414]"
                  }`}
                >
                  <span
                    className={`display-eyebrow text-[10px] mb-4 ${
                      isBlue ? "text-white/70" : "text-[#141414]/55"
                    }`}
                  >
                    {t.module}
                  </span>
                  <h3
                    className={`display-title text-[26px] md:text-[32px] mb-4 leading-[1.05] ${
                      isBlue ? "text-white" : "text-[#141414]"
                    }`}
                  >
                    {mod.label}
                  </h3>
                  <p
                    className={`text-[15px] leading-relaxed mb-8 flex-1 ${
                      isBlue ? "text-white/80" : "text-[#141414]/65"
                    }`}
                  >
                    {mod.desc}
                  </p>
                  <div>
                    {enabled ? (
                      <Button
                        asChild
                        variant={isBlue ? "squareLight" : "square"}
                        size="squareSm"
                        className="group"
                      >
                        <a href={localizePath(`/modulos/${mod.id}`, lang)}>
                          {t.explore(mod.label)}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            &nbsp;&rarr;
                          </span>
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant={isBlue ? "squareOutlineDark" : "squareLight"}
                        size="squareSm"
                        disabled
                        className="opacity-60 cursor-not-allowed"
                        title={t.soonTitle}
                      >
                        {t.soon}
                      </Button>
                    )}
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
