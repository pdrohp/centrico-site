import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleIntegracoes({ content }: { content: ModuleContent }) {
  const list = [...content.integrations, ...content.integrations];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mb-14">
        <span className="eyebrow-pill mb-6">Integrações relevantes</span>
        <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 mb-4 leading-[1.05]">
          Conversa com{" "}
          <span className="font-italic-display text-[1.04em]">os sistemas</span>
          <br className="hidden md:block" /> que a vossa operação já utiliza
        </h2>
        <p className="text-base md:text-lg text-[#141414]/65 max-w-2xl mx-auto">
          Conectores nativos e API aberta. Não substituímos as ferramentas em
          vigor — eliminamos o trabalho duplicado entre elas.
        </p>
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="relative flex overflow-x-hidden w-full bg-[#ECECEC] py-10 rounded-[12px]">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {list.map((logo, i) => (
              <div
                key={i}
                className="mx-8 md:mx-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <span className="display-title text-xl md:text-3xl text-[#141414]/85">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
