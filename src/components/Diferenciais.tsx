import { motion } from "framer-motion";
import { Link2, Layers, ShieldCheck, Paintbrush } from "lucide-react";
import { reveal, MotionRoot, stagger } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

type Card = {
  title: string;
  desc: string;
  icon: typeof Link2;
  badge?: string;
  variant: "blue" | "white";
};

const COPY = {
  pt: {
    eyebrow: "Por que Céntrico",
    title: "Quatro razões para consolidar tudo",
    titleItalic: "num só lugar",
    cards: [
      {
        title: "Integra-se com o que já utilizam",
        desc: "Implementação ágil, totalmente escalável e com acompanhamento dedicado a cada fase.",
      },
      {
        title: "Uma plataforma única",
        desc: "Unificamos num só sistema o que a vossa operação hoje espalha por várias ferramentas. Menos contratos, menos atrito, mais foco.",
      },
      {
        title: "Os vossos dados permanecem na Europa",
        desc: "Total conformidade com o RGPD e a legislação europeia de proteção de dados. Sem riscos jurídicos.",
        badge: "LGPD / RGPD",
      },
      {
        title: "A vossa marca, a vossa plataforma",
        desc: "Personalizem o domínio, o logótipo e toda a identidade visual. Os vossos clientes nunca saberão que é Céntrico por trás.",
        badge: "Whitelabel",
      },
    ],
  },
  en: {
    eyebrow: "Why Céntrico",
    title: "Four reasons to bring everything together",
    titleItalic: "in one place",
    cards: [
      {
        title: "Works with the tools you already use",
        desc: "Fast implementation, fully scalable, with dedicated support at every stage.",
      },
      {
        title: "One single platform",
        desc: "We bring into one system what your operation now spreads across several tools. Fewer contracts, less friction, more focus.",
      },
      {
        title: "Your data stays in Europe",
        desc: "Full compliance with the GDPR and European data protection law. No legal risk.",
        badge: "GDPR / LGPD",
      },
      {
        title: "Your brand, your platform",
        desc: "Customise the domain, the logo and the whole visual identity. Your clients will never know Céntrico is behind it.",
        badge: "White-label",
      },
    ],
  },
};

const CARD_STYLE: Pick<Card, "icon" | "variant">[] = [
  { icon: Link2, variant: "blue" },
  { icon: Layers, variant: "white" },
  { icon: ShieldCheck, variant: "white" },
  { icon: Paintbrush, variant: "blue" },
];

export function Diferenciais({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  const cards: Card[] = t.cards.map((c, i) => ({ ...c, ...CARD_STYLE[i] }));

  return (
    <MotionRoot>
      <section className="py-24 md:py-32 bg-[#ECECEC]">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14 md:mb-20">
            <span className="eyebrow-pill mb-6">{t.eyebrow}</span>
            <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] max-w-3xl mx-auto mt-6">
              {t.title}{" "}
              <span className="font-italic-display text-[1.04em]">
                {t.titleItalic}
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
