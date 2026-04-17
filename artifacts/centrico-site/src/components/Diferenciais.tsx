import { motion } from "framer-motion";
import { Link2, Layers, ShieldCheck, Paintbrush } from "lucide-react";

export function Diferenciais() {
  const cards = [
    {
      title: "Integra-se com o que já utilizam",
      desc: "Implementação ágil, totalmente escalável e com acompanhamento dedicado a cada fase.",
      icon: Link2
    },
    {
      title: "Uma plataforma única",
      desc: "Unificamos num só sistema o que a vossa operação hoje espalha por várias ferramentas. Menos contratos, menos atrito, mais foco.",
      icon: Layers
    },
    {
      title: "Os vossos dados permanecem na Europa",
      desc: "Total conformidade com o RGPD e a legislação europeia de proteção de dados. Sem riscos jurídicos.",
      icon: ShieldCheck,
      badge: "LGPD / RGPD"
    },
    {
      title: "A vossa marca, a vossa plataforma",
      desc: "Personalizem o domínio, o logótipo e toda a identidade visual. Os vossos clientes nunca saberão que é Céntrico por trás.",
      icon: Paintbrush
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-20">
          <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">Por que Céntrico</span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] max-w-3xl mx-auto">
            Quatro razões para consolidar tudo num só lugar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
              className="group relative p-10 md:p-14 bg-white hover:bg-background transition-colors duration-300"
            >
              {card.badge && (
                <span className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center h-7 px-3 rounded-full border border-foreground/30 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-foreground bg-background">
                  {card.badge}
                </span>
              )}
              <div className="w-14 h-14 rounded-full border border-foreground/30 flex items-center justify-center text-foreground mb-8 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                <card.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="display-title text-[26px] md:text-[32px] text-foreground mb-4 leading-[1] max-w-sm">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-[15px] max-w-md">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
