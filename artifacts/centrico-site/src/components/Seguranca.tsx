import { motion } from "framer-motion";
import { Shield, MapPin } from "lucide-react";
import globeImage from "@assets/20018_1776367127367.png";

const NAVY = "#0028ff";

export function Seguranca() {
  return (
    <section id="seguranca" className="py-24 md:py-32 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
                Soberania de dados
              </span>
              <h2 className="display-title text-foreground text-[32px] md:text-[48px] lg:text-[56px] mb-6 leading-[1]">
                Os vossos documentos<br /> não saem da Europa.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg">
                Infraestrutura alojada em centros de dados europeus, com total conformidade ao RGPD e à legislação europeia de proteção de dados. Os vossos documentos permanecem sempre dentro do território da UE.
              </p>

              <div>
                <span className="display-eyebrow inline-block text-[10px] text-foreground/55 mb-3">Certificações</span>
                <div className="flex flex-wrap gap-2">
                  {["ISO 27001", "LGPD / RGPD", "SOC 2"].map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center h-8 px-4 rounded-full border border-foreground/30 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-foreground bg-background"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative w-full aspect-square max-w-md mx-auto">
            <DottedGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}

function DottedGlobe() {
  const europeDots = [
    { x: 41, y: 33, delay: 0 },
    { x: 44, y: 36, delay: 0.4 },
    { x: 39, y: 37, delay: 0.8 },
    { x: 42, y: 39, delay: 0.2 },
    { x: 46, y: 34, delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 rounded-3xl border border-border overflow-hidden flex items-center justify-center bg-[#ffffff]">
      <div
        className="w-[88%] h-[88%] bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${globeImage})` }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {europeDots.map((d, i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                width: 14,
                height: 14,
                marginLeft: -7,
                marginTop: -7,
                backgroundColor: NAVY,
                animation: `centricoGlobePulse 2.4s ease-out ${d.delay}s infinite`,
              }}
            />
            <span
              className="block rounded-full"
              style={{ width: 6, height: 6, backgroundColor: NAVY, boxShadow: `0 0 8px ${NAVY}55` }}
            />
          </span>
        ))}
      </div>
      <div className="absolute bottom-6 left-6 bg-white border border-border px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
        <MapPin size={12} className="text-foreground" />
        <span className="text-[10px] font-display font-semibold uppercase tracking-[0.14em] text-foreground">Frankfurt, DE</span>
      </div>
      <div className="absolute bottom-6 right-6 bg-white border border-border px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
        <Shield size={12} className="text-foreground" />
        <span className="text-[10px] font-display font-semibold uppercase tracking-[0.14em] text-foreground">RGPD</span>
      </div>
      <style>{`
        @keyframes centricoGlobePulse {
          0%   { transform: scale(0.6); opacity: 0.7; }
          70%  { transform: scale(2.6); opacity: 0; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
