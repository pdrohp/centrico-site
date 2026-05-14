import { motion } from "framer-motion";
import globeImage from "@assets/20018_1776367127367.png";
import certIso from "@assets/cert-iso27001.png";
import certRgpd from "@assets/cert-rgpd.png";
import certEu from "@assets/cert-eu.png";
import certSoc from "@assets/cert-soc2.png";

const NAVY = "#001ec2";

export function Seguranca() {
  return (
    <section
      id="seguranca"
      className="relative py-24 md:py-32 overflow-hidden border-y"
      style={{
        borderColor: "#ccd0d7",
        background:
          "linear-gradient(90deg, #ECECEC 0%, #ECECEC 50%, #ffffff 50%, #ffffff 100%)",
      }}
    >
      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-display font-medium text-[#141414] text-[36px] md:text-[44px] lg:text-[48px] leading-[1] mb-6 tracking-[-0.01em]">
                Os vossos documentos
                <br />
                não saem da Europa.
              </h2>
              <p className="text-base text-[#5c6470] leading-[1.5] mb-10 max-w-lg">
                Infraestrutura alojada em centros de dados europeus, com total
                conformidade ao RGPD e à legislação europeia de proteção de
                dados. Os vossos documentos permanecem sempre dentro do
                território da UE.
              </p>

              <div>
                <p className="font-display font-semibold text-[16px] text-[#141414] mb-4">
                  Certificações:
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                  <img
                    src={certIso}
                    alt="ISO 27001"
                    className="h-12 w-auto object-contain"
                  />
                  <img
                    src={certRgpd}
                    alt="LGPD Compliance Software"
                    className="h-11 w-auto object-contain"
                  />
                  <img
                    src={certEu}
                    alt="RGPD"
                    className="h-12 w-auto object-contain"
                  />
                  <img
                    src={certSoc}
                    alt="AICPA SOC 2"
                    className="h-11 w-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Globe column — oversized, overflows right */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
            <DottedGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}

function DottedGlobe() {
  // Cluster of dots positioned over Europe in the globe image
  const europeDots = [
    { x: 47, y: 38, delay: 0 },
    { x: 50, y: 41, delay: 0.4 },
    { x: 44, y: 42, delay: 0.8 },
    { x: 48, y: 45, delay: 0.2 },
    { x: 52, y: 39, delay: 0.6 },
  ];

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-[28px]"
      style={{
        width: "min(900px, 130%)",
        aspectRatio: "1 / 1",
      }}
    >
      <div
        className="w-full h-full bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(${globeImage})`,
          mixBlendMode: "darken",
        }}
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
                width: 32,
                height: 32,
                marginLeft: -16,
                marginTop: -16,
                backgroundColor: NAVY,
                animation: `centricoGlobePulse 2.4s ease-out ${d.delay}s infinite`,
              }}
            />
            <span
              className="block rounded-full"
              style={{
                width: 14,
                height: 14,
                backgroundColor: NAVY,
                boxShadow: `0 0 18px rgba(46, 90, 171, 0.33)`,
              }}
            />
          </span>
        ))}
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
