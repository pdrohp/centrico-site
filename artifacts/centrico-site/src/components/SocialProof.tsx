import { motion } from "framer-motion";

export function SocialProof() {
  const testimonials = [
    {
      quote: "Automatizámos o circuito de aprovação de contratos em três semanas. O nosso departamento jurídico deixou de ser um entrave à operação.",
      name: "Mariana Costa",
      role: "Diretora Jurídica",
      company: "Grupo de Distribuição"
    },
    {
      quote: "O módulo de Recursos Humanos digitalizou por completo o processo de admissão. Zero papel, zero documentos extraviados e total conformidade com o RGPD.",
      name: "Ricardo Silva",
      role: "Diretor de Operações",
      company: "Construtora Atlântico"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">Quem já confia</span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] max-w-3xl mx-auto">
            A operação acelera quando<br className="hidden md:block" /> o ficheiro está no sítio certo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-[28px] overflow-hidden">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="bg-white p-10 md:p-14"
            >
              <div className="text-foreground/70 mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" opacity="0.25"/>
                </svg>
              </div>
              <p className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-snug">
                "{t.quote}"
              </p>
              <div>
                <p className="font-display font-semibold uppercase tracking-[0.14em] text-[12px] text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.role} · {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
