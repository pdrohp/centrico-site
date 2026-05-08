export function Integracoes() {
  const logos = [
    "SAP", "Salesforce", "Microsoft 365", "Google Workspace", 
    "TOTVS", "HubSpot", "Pipedrive", "Slack", "DocuSign", "AWS"
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

      <div className="relative flex overflow-x-hidden w-full bg-white py-10 border-y border-border">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="mx-8 md:mx-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="display-title text-xl md:text-3xl text-foreground/85">
                {logo}
              </span>
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
