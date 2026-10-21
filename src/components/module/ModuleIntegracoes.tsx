import type { ModuleContent } from "@/lib/modulesContent";
import { localizePath, type Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    eyebrow: "Integrações relevantes",
    title: ["Conversa com", "os sistemas", "que a vossa operação já utiliza"],
    body: "Conectores nativos e API aberta. Não substituímos as ferramentas em vigor — eliminamos o trabalho duplicado entre elas.",
    missing: "Não encontram a vossa ferramenta?",
    contact: "Falem connosco",
    otherLogo: "Integração",
  },
  en: {
    eyebrow: "Relevant integrations",
    title: ["Talks to", "the systems", "your operation already uses"],
    body: "Native connectors and an open API. We don't replace your current tools — we remove the duplicate work between them.",
    missing: "Can't find your tool?",
    contact: "Talk to us",
    otherLogo: "Integration",
  },
};

export function ModuleIntegracoes({ lang = "pt" }: { content: ModuleContent; lang?: Lang }) {
  const t = COPY[lang];
  const logos = [
    { src: "/logos/google-workspace.png", alt: "Google Workspace" },
    { src: "/logos/m365.png", alt: "Microsoft 365" },
    { src: "/logos/sap.png", alt: "SAP" },
    { src: "/logos/salesforce.png", alt: "Salesforce" },
    { src: "/logos/extra.png", alt: t.otherLogo },
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mb-14">
        <span className="eyebrow-pill mb-6">{t.eyebrow}</span>
        <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 mb-4 leading-[1.05]">
          {t.title[0]}{" "}
          <span className="font-italic-display text-[1.04em]">{t.title[1]}</span>
          <br className="hidden md:block" /> {t.title[2]}
        </h2>
        <p className="text-base md:text-lg text-[#141414]/65 max-w-2xl mx-auto">
          {t.body}
        </p>
      </div>

      <div className="marquee-pausable relative overflow-hidden w-full bg-white border-y border-[#ccd0d7] h-[120px] md:h-[180px]">
        {[0, 1].map((track) => (
          <div
            key={track}
            className={track === 0 ? "animate-marquee" : "animate-marquee2"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: "max-content",
            }}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                className="mx-[24px] md:mx-16 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-auto block h-[60px] md:h-[100px]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center mt-12">
        <p className="text-sm text-muted-foreground flex flex-col sm:block">
          <span>{t.missing}</span>{" "}
          <a href={`${localizePath("/", lang)}#cta`} className="text-foreground font-display font-semibold uppercase tracking-[0.04em] underline underline-offset-4">
            {t.contact}
          </a>
        </p>
      </div>
    </section>
  );
}
