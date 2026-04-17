import { useState } from "react";
import { motion } from "framer-motion";
import { WhitelabelVignette } from "./vignettes/WhitelabelVignette";

type Palette = {
  id: string;
  label: string;
  color: string;
  url: string;
};

const PALETTES: Palette[] = [
  { id: "centrico", label: "Azul Céntrico", color: "#2E5AAB", url: "app.centrico.com" },
  { id: "floresta", label: "Verde floresta", color: "#1F4D2B", url: "docs.empresa.pt" },
  { id: "bordeaux", label: "Bordeaux", color: "#7A1F1F", url: "portal.advocacia.pt" },
];

const PILLS = ["Domínio próprio", "Logótipo", "Identidade visual"];

export function Whitelabel() {
  const [selectedId, setSelectedId] = useState(PALETTES[0].id);
  const selected = PALETTES.find((p) => p.id === selectedId) ?? PALETTES[0];

  return (
    <section
      id="whitelabel"
      className="py-24 md:py-32 bg-background border-y border-border"
    >
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-[28px] overflow-hidden flex flex-col lg:flex-row border border-border bg-[#EAEDF1]"
        >
          {/* TEXT */}
          <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2">
            <span className="display-eyebrow text-[10px] text-foreground/60 mb-4">
              Funcionalidade
            </span>
            <h3 className="display-title text-foreground text-[32px] md:text-[44px] mb-4 leading-[1]">
              A plataforma é vossa
            </h3>
            <h4 className="text-lg md:text-xl font-medium text-foreground/75 mb-6 leading-snug max-w-md">
              Domínio, logótipo e paleta de cores configurados à imagem da
              vossa marca.
            </h4>
            <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Os vossos clientes acedem a um portal com a vossa identidade
              visual — sem qualquer referência à Céntrico. Experimente: troque
              a cor de marca em baixo e veja a interface adaptar-se em tempo
              real.
            </p>
            <div className="flex flex-wrap gap-2">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center h-8 px-4 rounded-full border border-foreground/30 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-foreground bg-white"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* ILLUSTRATION + PICKER */}
          <div className="lg:w-1/2 p-6 md:p-12 flex items-center justify-center min-h-[340px] md:min-h-[400px]">
            <div className="w-full max-w-[560px] aspect-[4/3] relative rounded-2xl shadow-xl overflow-hidden border border-border/60">
              {/* Browser-style top bar of the stage */}
              <div className="absolute top-0 inset-x-0 h-10 bg-white/90 backdrop-blur border-b border-border/50 flex items-center px-4 gap-2 z-20">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                </div>
              </div>

              {/* Vignette */}
              <div className="absolute inset-0 pt-10 z-10 bg-white">
                <WhitelabelVignette
                  brandColor={selected.color}
                  displayUrl={selected.url}
                  bg="#F1F3F6"
                />
              </div>

              {/* Color picker */}
              <div
                className="absolute top-14 right-4 z-30 flex items-center gap-2 bg-white/90 backdrop-blur border border-border/60 rounded-full p-1.5 shadow-md"
                role="group"
                aria-label="Selecionar cor de marca"
              >
                {PALETTES.map((p) => {
                  const active = p.id === selectedId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      aria-label={`Aplicar cor ${p.label}`}
                      aria-pressed={active}
                      className={`w-6 h-6 rounded-full transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                        active
                          ? "ring-2 ring-foreground ring-offset-2 ring-offset-white scale-105"
                          : "ring-1 ring-foreground/15 hover:scale-110"
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
