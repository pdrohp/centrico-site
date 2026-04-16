import { motion } from "framer-motion";

export function SocialProof() {
  const testimonials = [
    {
      quote: "Automatizamos o fluxo de aprovação de contratos em 3 semanas. Nosso jurídico parou de ser gargalo para a operação.",
      name: "Mariana Costa",
      role: "Diretora Jurídica",
      company: "Rede Varejista"
    },
    {
      quote: "O módulo de RH digitalizou todo nosso processo de admissão. Zero papel, zero perda de documentos e 100% aderente à LGPD.",
      name: "Ricardo Silva",
      role: "Head de Operações",
      company: "Construtora Nova"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="bg-white p-10 rounded-2xl border border-border"
            >
              <div className="text-primary mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" opacity="0.2"/>
                </svg>
              </div>
              <p className="text-xl md:text-2xl font-serif text-foreground mb-8 leading-snug">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role} · {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
