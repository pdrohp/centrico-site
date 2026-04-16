import { motion } from "framer-motion";
import { Link2, Layers, ShieldCheck, Paintbrush } from "lucide-react";

export function Diferenciais() {
  const cards = [
    {
      title: "Conecta com o que você já usa",
      desc: "Simples de implementar, escalável e com suporte contínuo.",
      icon: Link2
    },
    {
      title: "Um sistema, não quatro",
      desc: "Substitui o conjunto de ferramentas que seus concorrentes precisam usar.",
      icon: Layers
    },
    {
      title: "Seus dados ficam na Europa",
      desc: "Conformidade total com LGPD e GDPR. Zero riscos legais.",
      icon: ShieldCheck
    },
    {
      title: "Sua marca, sua plataforma",
      desc: "Personalize domínio, logo e identidade. Seus clientes nem percebem que é Céntrico.",
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
