import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { coreModules, coreModuleCategories } from "@/lib/data";

export function Workflow() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleModule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const groupedActive = coreModuleCategories
    .map((cat) => ({
      category: cat,
      items: coreModules.filter(
        (m) => m.category === cat && selectedIds.includes(m.id)
      ),
    }))
    .filter((g) => g.items.length > 0);

  const activeAreas = groupedActive.length;
  const maxRows = groupedActive.reduce((acc, g) => Math.max(acc, g.items.length), 0);

  const CARD_H = 56;
  const ROW_GAP = 22;
  const TOP_OFFSET = 200;
  const BOTTOM_PAD = selectedIds.length > 0 ? 210 : 60;
  const canvasHeight = Math.max(
    340,
    TOP_OFFSET + Math.max(1, maxRows) * CARD_H + Math.max(0, maxRows - 1) * ROW_GAP + BOTTOM_PAD
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dashOffset = 0;
    let frame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      // Grid background (subtle, on dark)
      ctx.beginPath();
      for (let x = 0; x <= w; x += 22) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += 22) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const hubX = w / 2;
      const hubY = 50;
      const hubW = 160;
      const hubH = 38;
      const hubRadius = hubH / 2;

      // Hub pill (light on dark)
      ctx.fillStyle = "#F4F2EE";
      ctx.beginPath();
      ctx.roundRect(hubX - hubW / 2, hubY, hubW, hubH, hubRadius);
      ctx.fill();

      ctx.fillStyle = "#0E1622";
      ctx.font = "600 11px 'Archivo Narrow', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const hubLabel = "A VOSSA PLATAFORMA";
      ctx.fillText(hubLabel, hubX, hubY + hubH / 2);

      if (groupedActive.length === 0) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "400 14px 'DM Sans', sans-serif";
        ctx.fillText("Selecione os módulos acima para configurar", hubX, hubY + 120);
        dashOffset += 0.45;
        frame += 1;
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const numCols = groupedActive.length;
      const idealCardW = 200;
      const minCardW = 110;
      const sidePad = 16;
      const colGap = numCols > 1 ? Math.max(10, Math.min(32, (w - sidePad * 2 - numCols * minCardW) / Math.max(1, numCols - 1))) : 0;

      const availW = w - sidePad * 2;
      const rawCardW = (availW - (numCols - 1) * colGap) / numCols;
      const cardW = Math.max(72, Math.min(idealCardW, rawCardW));
      const totalW = numCols * cardW + (numCols - 1) * colGap;
      const startX = Math.max(sidePad, (w - totalW) / 2);

      const firstCardY = hubY + hubH + 110;

      const pulse = 0.45 + 0.55 * (Math.sin(frame * 0.08) * 0.5 + 0.5);

      groupedActive.forEach((group, colIdx) => {
        const colX = startX + colIdx * (cardW + colGap);
        const cardCenterX = colX + cardW / 2;

        // Connector from hub
        const firstTopY = firstCardY;
        ctx.beginPath();
        ctx.moveTo(hubX, hubY + hubH);
        ctx.bezierCurveTo(
          hubX, hubY + hubH + 50,
          cardCenterX, firstTopY - 50,
          cardCenterX, firstTopY
        );
        ctx.strokeStyle = "rgba(244, 242, 238, 0.35)";
        ctx.lineWidth = 1.25;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -dashOffset;
        ctx.stroke();
        ctx.setLineDash([]);

        group.items.forEach((mod, rowIdx) => {
          const cardY = firstCardY + rowIdx * (CARD_H + ROW_GAP);

          if (rowIdx > 0) {
            const prevBottomY = firstCardY + (rowIdx - 1) * (CARD_H + ROW_GAP) + CARD_H;
            ctx.beginPath();
            ctx.moveTo(cardCenterX, prevBottomY);
            ctx.lineTo(cardCenterX, cardY);
            ctx.strokeStyle = "rgba(244, 242, 238, 0.35)";
            ctx.lineWidth = 1.25;
            ctx.setLineDash([4, 6]);
            ctx.lineDashOffset = -dashOffset;
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // Card — outlined on dark
          ctx.fillStyle = "rgba(244, 242, 238, 0.04)";
          ctx.strokeStyle = "rgba(244, 242, 238, 0.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(colX, cardY, cardW, CARD_H, 28);
          ctx.fill();
          ctx.stroke();

          // Pulsing dot — single warm off-white tone
          const dotX = colX + 18;
          const dotY = cardY + CARD_H / 2;
          ctx.fillStyle = `rgba(244, 242, 238, ${0.16 * pulse})`;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(244, 242, 238, ${pulse})`;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Label
          ctx.fillStyle = "#F4F2EE";
          ctx.font = "600 11px 'Archivo Narrow', sans-serif";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          let label = mod.label.toUpperCase();
          const maxLabelW = cardW - 44;
          while (ctx.measureText(label).width > maxLabelW && label.length > 3) {
            label = label.slice(0, -1);
          }
          if (label !== mod.label.toUpperCase()) label = label.slice(0, -1) + "…";
          ctx.fillText(label, colX + 34, dotY);
          ctx.textAlign = "center";
        });
      });

      dashOffset += 0.45;
      frame += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <section id="workflow" className="py-24 md:py-32 bg-[#0E1622] text-white">
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="display-eyebrow inline-block text-[11px] text-white/50 mb-6">
            Configure a vossa plataforma
          </span>
          <h2 className="display-title text-white text-[32px] md:text-[48px] max-w-3xl mx-auto">
            Selecione os módulos<br className="hidden md:block" /> de que necessitam.
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {coreModules.map((mod) => {
            const isActive = selectedIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.14em] transition-all duration-300 border
                  ${isActive
                    ? "bg-white text-[#0E1622] border-white"
                    : "bg-transparent border-white/30 text-white/80 hover:border-white/70 hover:text-white"}
                `}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E1622]"></span>
                )}
                {mod.label}
              </button>
            );
          })}
        </div>

        <div
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#131c2a] transition-all duration-500"
          style={{ height: `${canvasHeight}px` }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4"
            >
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.14em] text-white border border-white/20">
                {selectedIds.length} módulo{selectedIds.length !== 1 ? "s" : ""} ·{" "}
                {activeAreas} área{activeAreas !== 1 ? "s" : ""} coberta{activeAreas !== 1 ? "s" : ""}
              </div>
              <Button
                variant="pillInverse"
                size="pillMd"
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
              >
                Agendar com esta configuração
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
