import logo1 from "@/assets/int-1.png";
import logo2 from "@/assets/int-2.png";
import logo3 from "@/assets/int-3.png";
import logo4 from "@/assets/int-4.png";
import logo5 from "@/assets/int-5.png";

export function Integracoes() {
  const logos = [
    { src: logo1, alt: "Integração 1", h: "h-16 md:h-20" },
    { src: logo2, alt: "Integração 2", h: "h-20 md:h-28" },
    { src: logo3, alt: "Integração 3", h: "h-14 md:h-16" },
    { src: logo4, alt: "Integração 4", h: "h-16 md:h-20" },
    { src: logo5, alt: "Integração 5", h: "h-16 md:h-20" },
  ];

  return (
    <section id="integracoes" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mb-16">
        <span className="eyebrow-pill mb-6">
          Ecossistema
        </span>
        <h2 className="display-title text-foreground text-[32px] md:text-[48px] mb-4 mt-6">
          Integra-se com os sistemas{" "}
          <span className="font-italic-display text-[1.04em]">
            que já utilizam
          </span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Não é necessário substituir as ferramentas em vigor. Implementação simples e totalmente escalável através de API.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden w-full bg-white py-10 border-y border-[#ccd0d7]">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="mx-10 md:mx-16 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.h} w-auto object-contain`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mt-12">
        <p className="text-sm text-muted-foreground">
          Não encontram a vossa ferramenta?{" "}
          <a href="#cta" className="text-foreground font-display font-semibold uppercase tracking-[0.04em] underline underline-offset-4">
            Falem connosco
          </a>
        </p>
      </div>
    </section>
  );
}
