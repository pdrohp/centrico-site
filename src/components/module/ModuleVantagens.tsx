import { motion } from "framer-motion";
import type { ModuleContent } from "@/lib/modulesContent";
import { reveal, MotionRoot } from "@/lib/motion";

export function ModuleVantagens({ content }: { content: ModuleContent }) {
  return (
    <MotionRoot>
      <section className="py-24 md:py-32 bg-[#ECECEC]">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              {...reveal()}
            >
              <span className="eyebrow-pill mb-6">Vantagens</span>
              <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 mb-8 leading-[1.05] max-w-xl">
                {content.vantagensTitle}
              </h2>
              <p className="text-base md:text-lg text-[#141414]/65 leading-relaxed max-w-lg">
                {content.vantagensBody}
              </p>
            </motion.div>

            <motion.div
              {...reveal(0.1)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
            >
              {content.kpis.map((kpi, i) => {
                const isBlue = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className={`rounded-[12px] p-8 md:p-10 ${
                      isBlue ? "bg-[#0028ff] text-white" : "bg-white text-[#141414]"
                    }`}
                  >
                    <div
                      className={`display-title text-[44px] md:text-[56px] leading-[1] mb-3 ${
                        isBlue ? "text-white" : "text-[#141414]"
                      }`}
                    >
                      {kpi.value}
                    </div>
                    <p
                      className={`text-[15px] md:text-base leading-relaxed ${
                        isBlue ? "text-white/80" : "text-[#141414]/65"
                      }`}
                    >
                      {kpi.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
