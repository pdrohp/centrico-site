import { motion } from "framer-motion";
import globeImage from "@/assets/20018_1776367127367.png";
import certIso from "@/assets/cert-iso27001.png";
import certRgpd from "@/assets/cert-rgpd.png";
import certEu from "@/assets/cert-eu.png";
import certSoc from "@/assets/cert-soc2.png";
import { reveal, MotionRoot } from "@/lib/motion";

const NAVY = "#001ec2";

export function Seguranca() {
  return (
    <MotionRoot>
      <section
        id="seguranca"
        className="relative py-24 md:py-32 overflow-hidden border-y bg-white lg:bg-[linear-gradient(90deg,#ECECEC_0%,#ECECEC_50%,#ffffff_50%,#ffffff_100%)]"
        style={{ borderColor: "#ccd0d7" }}
      >
        <div className="container max-w-6xl mx-auto px-6 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text column */}
            <div className="relative z-10 md:max-w-[58%] lg:max-w-none">
              <motion.div
                {...reveal()}
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
                  <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
                    <img
                      src={certIso.src}
                      alt="ISO 27001"
                      className="h-12 w-auto object-contain"
                    />
                    <img
                      src={certRgpd.src}
                      alt="LGPD Compliance Software"
                      className="h-11 w-auto object-contain"
                    />
                    <img
                      src={certEu.src}
                      alt="RGPD"
                      className="h-12 w-auto object-contain"
                    />
                    <img
                      src={certSoc.src}
                      alt="AICPA SOC 2"
                      className="h-11 w-auto object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Globe column — oversized, overflows right. Below lg it sits
                beside the text (md) or under it (mobile), cropped by the section. */}
            <div className="relative h-[300px] -mr-[30%] ml-[25%] md:absolute md:inset-y-0 md:right-0 md:w-[42%] md:h-auto md:m-0 md:translate-x-[6%] lg:relative lg:inset-auto lg:w-auto lg:h-[560px] lg:translate-x-0">
              <DottedGlobe />
            </div>
          </div>
        </div>
      </section>
    </MotionRoot>
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
          backgroundImage: `url(${globeImage.src})`,
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
        @media (max-width: 1023px) {
          #seguranca { background: #ffffff !important; }
        }
      `}</style>
    </div>
  );
}
