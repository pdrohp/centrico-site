export function Integracoes() {
  const logos = [
    "SAP", "Salesforce", "Microsoft 365", "Google Workspace", 
    "TOTVS", "HubSpot", "Pipedrive", "Slack", "DocuSign", "AWS"
  ];

  return (
    <section id="integracoes" className="py-24 bg-background overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
          Integra-se com os sistemas que já utilizam
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Não é necessário substituir as ferramentas em vigor. Implementação simples e totalmente escalável através de API.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden w-full bg-white py-10 border-y border-border">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="mx-8 md:mx-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-foreground/80">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mt-12">
        <p className="text-sm text-muted-foreground">
          Não encontram a vossa ferramenta? <a href="#cta" className="text-primary underline underline-offset-4 hover:text-primary/80">Falem connosco.</a>
        </p>
      </div>
    </section>
  );
}
