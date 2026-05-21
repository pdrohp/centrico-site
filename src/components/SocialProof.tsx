import { useState, useEffect } from "react";

const QuoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" opacity="0.25"/>
  </svg>
);

type Testimonial = { quote: string; name: string; role: string; company: string };

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white p-10 md:p-14 border-r border-border flex-1">
      <div className="text-foreground/70 mb-6">
        <QuoteIcon />
      </div>
      <p className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-snug">
        "{t.quote}"
      </p>
      <div>
        <p className="font-display font-semibold uppercase tracking-[0.04em] text-[12px] text-foreground">{t.name}</p>
        <p className="text-sm text-muted-foreground mt-1">{t.role} · {t.company}</p>
      </div>
    </div>
  );
}

export function SocialProof() {
  const testimonials: Testimonial[] = [
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
    },
    {
      quote: "Conseguimos reduzir o tempo de resposta a clientes em 60%. A centralização de documentos comerciais foi transformadora para a nossa equipa.",
      name: "Ana Ferreira",
      role: "Diretora Comercial",
      company: "Ibertech Solutions"
    },
    {
      quote: "A integração com o SAP foi feita em menos de uma semana. A equipa de TI ficou surpreendida com a simplicidade do processo e a robustez da API.",
      name: "João Monteiro",
      role: "CTO",
      company: "Meridian Logística"
    }
  ];

  const total = testimonials.length;

  // Responsive: 1 card per view on mobile (<768px), 2 on desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const factor = isMobile ? 100 : 50; // % of container each card occupies

  // Strip layout: [clone(-1), t0, t1, ..., t(n-1), clone(0), clone(1)]
  // Real range: stripIdx = 1..total
  // Prepend 1 clone (t[total-1]), append 2 clones (t[0], t[1]) so edge transitions always have a visible next card
  const extended: Testimonial[] = [
    testimonials[total - 1],
    ...testimonials,
    testimonials[0],
    testimonials[1],
  ];
  const extLen = extended.length; // total + 3

  // stripIdx: which card is in the LEFT slot (0-indexed into extended[])
  // Start at 1 so the first two real cards are visible
  const [stripIdx, setStripIdx] = useState(1);
  const [realSlide, setRealSlide] = useState(0);
  const [instant, setInstant] = useState(false);

  const go = (dir: number) => {
    setInstant(false);
    setStripIdx((i) => i + dir);
    setRealSlide((s) => (s + dir + total) % total);
  };

  const handleTransitionEnd = () => {
    // Snap back from clone positions
    if (stripIdx >= total + 1) {
      setInstant(true);
      setStripIdx(1);
    } else if (stripIdx <= 0) {
      setInstant(true);
      setStripIdx(total);
    }
  };

  useEffect(() => {
    if (instant) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setInstant(false))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [instant]);

  // translateX so that extended[stripIdx] is the leftmost visible card
  // Each card occupies (100 / extLen)% of the strip
  // Strip width = extLen * 50% of container  →  1 card = (100/extLen)% of strip
  const translateX = -(stripIdx * 100) / extLen;

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="eyebrow-pill mb-6">Quem já confia</span>
          <h2 className="display-title text-foreground text-[32px] md:text-[48px] max-w-3xl mx-auto mt-6">
            A operação acelera quando{" "}
            <span className="font-italic-display text-[1.04em]">
              o ficheiro está no sítio certo
            </span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[12px] border border-border">
          <div
            className="flex"
            style={{
              width: `${extLen * factor}%`,
              transform: `translateX(${translateX}%)`,
              transition: instant ? "none" : "transform 0.45s ease-in-out",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((t, i) => (
              <div
                key={i}
                style={{ width: `calc(100% / ${extLen})` }}
                className="flex flex-col"
              >
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="w-10 h-10 rounded-[2px] border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const dir = i > realSlide ? 1 : -1;
                  const steps = Math.abs(i - realSlide);
                  setInstant(false);
                  setStripIdx((s) => s + dir * steps);
                  setRealSlide(i);
                }}
                aria-label={`Depoimento ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === realSlide ? "w-6 bg-foreground" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Próximo"
            className="w-10 h-10 rounded-[2px] border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
