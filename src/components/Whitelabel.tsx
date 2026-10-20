import { useState } from "react";
import { motion } from "framer-motion";
import { WhitelabelVignette } from "./vignettes/WhitelabelVignette";
import { reveal, MotionRoot } from "@/lib/motion";

type Palette = {
  id: string;
  label: string;
  color: string;
  url: string;
};

const PALETTES: Palette[] = [
  { id: "centrico", label: "Azul Céntrico", color: "#0028ff", url: "app.centrico.com" },
  { id: "floresta", label: "Verde floresta", color: "#119d36", url: "docs.empresa.pt" },
  { id: "bordeaux", label: "Bordeaux", color: "#b30909", url: "portal.advocacia.pt" },
];

const PILLS = ["Domínio próprio", "Logótipo", "Identidade visual"];

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function Whitelabel() {
  const [selectedId, setSelectedId] = useState(PALETTES[0].id);
  const selected = PALETTES.find((p) => p.id === selectedId) ?? PALETTES[0];

  return (
    <MotionRoot>
      <section
        id="whitelabel"
        className="py-24 md:py-32 bg-[#ECECEC]"
      >
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            {...reveal()}
            className="rounded-[20px] overflow-hidden flex flex-col lg:flex-row"
          >
            {/* TEXT — deep blue panel */}
            <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2 bg-[#001ec2] text-white">
              <span className="eyebrow-pill eyebrow-pill--dark mb-6 self-start">
                Funcionalidade
              </span>
              <h3 className="display-title text-white text-[32px] md:text-[44px] mb-6 leading-[1.05]">
                A plataforma é{" "}
                <span className="font-italic-display text-[1.06em]">vossa</span>
              </h3>
              <p className="text-[15px] md:text-base text-white/75 leading-relaxed mb-8 max-w-lg">
                Os vossos clientes acedem a um portal com a vossa identidade
                visual — sem qualquer referência à Céntrico. Experimente: troque
                a cor de marca em baixo e veja a interface adaptar-se em tempo
                real.
              </p>
              <div className="flex flex-wrap gap-2">
                {PILLS.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center h-8 px-4 rounded-full border border-white/30 text-[10px] font-display uppercase tracking-[0.04em] text-white bg-white/10"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* ILLUSTRATION + ROTATED PICKER — white panel */}
            <div className="lg:w-1/2 relative bg-white flex items-stretch min-h-[420px] md:min-h-[520px]">
              {/* Vertical (rotated) picker on the left edge */}
              <div className="relative w-16 shrink-0 border-r border-[#141414]/10 flex items-center justify-center">
                <div
                  className="flex items-center gap-3 -rotate-90 origin-center whitespace-nowrap"
                  role="group"
                  aria-label="Selecionar cor de marca"
                >
                  <span className="text-[10px] font-display uppercase tracking-[0.18em] text-[#141414]/50">
                    Cor de marca
                  </span>
                  {PALETTES.map((p) => {
                    const active = p.id === selectedId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedId(p.id)}
                        aria-label={`Aplicar cor ${p.label}`}
                        aria-pressed={active}
                        className={`w-6 h-6 rounded-full transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/40 ${
                          active
                            ? "ring-2 ring-[#141414] ring-offset-2 ring-offset-white scale-110"
                            : "ring-1 ring-[#141414]/15 hover:scale-110"
                        }`}
                        style={{ backgroundColor: p.color }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Mockup stage */}
              <div className="flex-1 p-6 md:p-10 flex items-center justify-center">
                <div className="w-full max-w-[520px] aspect-[4/3] relative rounded-[12px] shadow-xl overflow-hidden border border-[#141414]/10 bg-white">
                  <div className="absolute top-0 inset-x-0 h-10 bg-white/95 backdrop-blur border-b border-[#141414]/10 flex items-center px-4 gap-2 z-20">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                      <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                      <div className="w-2 h-2 rounded-full bg-[#C9D0DA]" />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 pt-10 z-10 transition-colors duration-[350ms]"
                    style={{ backgroundColor: hexToRgba(selected.color, 0.08) }}
                  >
                    <WhitelabelVignette
                      brandColor={selected.color}
                      displayUrl={selected.url}
                      bg="transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionRoot>
  );
}
