import { motion } from "framer-motion";
import { Link2, Layers, ShieldCheck, Paintbrush } from "lucide-react";
import { reveal, MotionRoot, stagger } from "@/lib/motion";

type Card = {
  title: string;
  desc: string;
  icon: typeof Link2;
  badge?: string;
  variant: "blue" | "white";
};

export function Diferenciais() {
  const cards: Card[] = [
    {
      title: "Integra-se com o que já utilizam",
      desc: "Implementação ágil, totalmente escalável e com acompanhamento dedicado a cada fase.",
      icon: Link2,
      variant: "blue",
    },
    {
      title: "Uma plataforma única",
      desc: "Unificamos num só sistema o que a vossa operação hoje espalha por várias ferramentas. Menos contratos, menos atrito, mais foco.",
      icon: Layers,
      variant: "white",
    },
    {
      title: "Os vossos dados permanecem na Europa",
      desc: "Total conformidade com o RGPD e a legislação europeia de proteção de dados. Sem riscos jurídicos.",
      icon: ShieldCheck,
      badge: "LGPD / RGPD",
      variant: "white",
    },
    {
      title: "A vossa marca, a vossa plataforma",
      desc: "Personalizem o domínio, o logótipo e toda a identidade visual. Os vossos clientes nunca saberão que é Céntrico por trás.",
      icon: Paintbrush,
      badge: "Whitelabel",
      variant: "blue",
    },
  ];

  return (
    <MotionRoot>
      <section className="py-24 md:py-32 bg-[#ECECEC]">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14 md:mb-20">
            <span className="eyebrow-pill mb-6">Por que Céntrico</span>
            <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] max-w-3xl mx-auto mt-6">
              Quatro razões para consolidar tudo{" "}
              <span className="font-italic-display text-[1.04em]">
                num só lugar
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {cards.map((card, i) => {
              const isBlue = card.variant === "blue";
              return (
                <motion.div
                  key={i}
                  {...reveal(stagger(i))}
                  className={`group relative p-10 md:p-14 rounded-[12px] transition-colors duration-300 ${
                    isBlue
                      ? "bg-[#0028ff] text-white"
                      : "bg-white text-[#141414]"
                  }`}
                >
                  {card.badge && (
                    <span
                      className={`absolute top-6 right-6 md:top-8 md:right-8 inline-flex items-center h-7 px-3 rounded-full border text-[10px] font-display uppercase tracking-[0.04em] ${
                        isBlue
                          ? "border-white/40 text-white/90 bg-white/10"
                          : "border-[#141414]/30 text-[#141414] bg-black/5"
                      }`}
                    >
                      {card.badge}
                    </span>
                  )}
                  <div
                    className={`w-14 h-14 rounded-full border flex items-center justify-center mb-8 transition-all duration-300 ${
                      isBlue
                        ? "border-white/40 text-white"
                        : "border-[#141414]/30 text-[#141414]"
                    }`}
                  >
                    <card.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3
                    className={`display-title text-[26px] md:text-[32px] mb-4 leading-[1.05] max-w-sm ${
                      isBlue ? "text-white" : "text-[#141414]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`leading-relaxed text-[15px] max-w-md ${
                      isBlue ? "text-white/80" : "text-[#141414]/65"
                    }`}
                  >
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
