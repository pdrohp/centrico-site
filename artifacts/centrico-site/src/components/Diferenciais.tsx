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
      title: "Uma plataforma, não quatro",
      desc: "Consolida num único sistema o conjunto de ferramentas dispersas que a concorrência ainda mantém em paralelo.",
      icon: Layers
    },
    {
      title: "Os vossos dados permanecem na Europa",
      desc: "Total conformidade com o RGPD e a legislação europeia de proteção de dados. Sem riscos jurídicos.",
      icon: ShieldCheck
    },
    {
      title: "A vossa marca, a vossa plataforma",
      desc: "Personalizem o domínio, o logótipo e toda a identidade visual. Os vossos clientes nunca saberão que é Céntrico por trás.",
      icon: Paintbrush
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-border">
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
              className="group p-8 md:p-10 rounded-2xl border border-border bg-background hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300">
                <card.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif font-medium text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
