import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleIntegracoes({ content }: { content: ModuleContent }) {
  const list = [...content.integrations, ...content.integrations];

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mb-14">
        <span className="display-eyebrow inline-block text-[11px] text-foreground/60 mb-6">
          Integrações relevantes
        </span>
        <h2 className="display-title text-foreground text-[32px] md:text-[48px] mb-4 leading-[1]">
          Conversa com os sistemas
          <br className="hidden md:block" /> que a vossa operação já utiliza
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Conectores nativos e API aberta. Não substituímos as ferramentas em vigor — eliminamos o trabalho duplicado entre elas.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden w-full bg-white py-10 border-y border-border">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {list.map((logo, i) => (
            <div
              key={i}
              className="mx-8 md:mx-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span className="display-title text-xl md:text-3xl text-foreground/85">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
