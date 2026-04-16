import { motion } from "framer-motion";
import { CheckCircle2, Globe2, Shield, LifeBuoy, MapPin } from "lucide-react";
import globeImage from "@assets/20018_1776367127367.png";

export function Seguranca() {
  const trusts = [
    { title: "Alojado na Europa", icon: Globe2 },
    { title: "Conformidade RGPD", icon: Shield },
    { title: "Dados nunca saem da UE", icon: CheckCircle2 },
    { title: "Acompanhamento permanente", icon: LifeBuoy },
  ];

  return (
    <section id="seguranca" className="py-24 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">
                Os vossos documentos nunca saem da Europa.
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                Infraestrutura alojada em centros de dados europeus, com total conformidade ao RGPD e à legislação europeia de proteção de dados. Os vossos documentos permanecem sempre dentro do território da UE.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trusts.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1D9E75]"></span>
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                ))}
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
  // Pulsing dots positioned roughly over Europe on the dotted globe artwork.
  // Coordinates are % of the image container. The image's land mass sits on the
  // upper-left/center quadrant; we cluster a few dots there to suggest Europe.
  const europeDots = [
    { x: 41, y: 33, delay: 0 },
    { x: 44, y: 36, delay: 0.4 },
    { x: 39, y: 37, delay: 0.8 },
    { x: 42, y: 39, delay: 0.2 },
    { x: 46, y: 34, delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 rounded-3xl border border-border overflow-hidden flex items-center justify-center bg-[#ffffff]">
      {/* Slowly rotating dotted globe artwork */}
      <div
        className="w-[88%] h-[88%] bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${globeImage})` }}
      />
      {/* Europe pulsing dots overlay (positioned in container space, not on the spinning globe) */}
      <div className="absolute inset-0 pointer-events-none">
        {europeDots.map((d, i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            <span
              className="absolute inset-0 rounded-full bg-[#1D9E75] opacity-60"
              style={{
                width: 14,
                height: 14,
                marginLeft: -7,
                marginTop: -7,
                animation: `centricoGlobePulse 2.4s ease-out ${d.delay}s infinite`,
              }}
            />
            <span
              className="block rounded-full bg-[#1D9E75] shadow-[0_0_8px_rgba(29,158,117,0.65)]"
              style={{ width: 6, height: 6 }}
            />
          </span>
        ))}
      </div>
      {/* Bottom info: location pin + GDPR */}
      <div className="absolute bottom-6 left-6 bg-white border border-border px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
        <MapPin size={14} className="text-[#1D9E75]" />
        <span className="text-xs font-bold text-foreground">Frankfurt, DE</span>
      </div>
      <div className="absolute bottom-6 right-6 bg-white border border-border px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
        <Shield size={14} className="text-[#1D9E75]" />
        <span className="text-xs font-bold text-foreground">GDPR</span>
      </div>
      <style>{`
        @keyframes centricoGlobeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes centricoGlobePulse {
          0%   { transform: scale(0.6); opacity: 0.7; }
          70%  { transform: scale(2.6); opacity: 0; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
