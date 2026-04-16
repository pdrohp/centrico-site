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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dashOffset = 0;

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

      // Draw grid
      ctx.beginPath();
      for (let x = 0; x <= w; x += 22) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += 22) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.strokeStyle = "rgba(180, 178, 169, 0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const hubX = w / 2;
      const hubY = 50;
      const hubW = 120;
      const hubH = 36;
      const hubRadius = hubH / 2;

      // Draw hub pill
      ctx.fillStyle = "#1A2E4A";
      ctx.beginPath();
      ctx.roundRect(hubX - hubW / 2, hubY, hubW, hubH, hubRadius);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "500 13px 'DM Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Seu sistema", hubX, hubY + hubH / 2);

      const activeModules = coreModules.filter(m => selectedIds.includes(m.id));

      if (activeModules.length > 0) {
        const startY = hubY + 110;
        const rowH = 110;
        const modH = 84;
        const gapX = 18;
        const idealW = 168;
        const minW = 130;
        // Fit as many columns as the canvas can hold; cap at 3 for visual rhythm
        const maxFit = Math.max(1, Math.floor((w - 24 + gapX) / (minW + gapX)));
        const perRow = Math.min(3, activeModules.length, maxFit);
        const modW = Math.min(
          idealW,
          Math.max(minW, (w - 24 - (perRow - 1) * gapX) / perRow)
        );

        activeModules.forEach((mod, index) => {
          const row = Math.floor(index / perRow);
          const col = index % perRow;

          const rowItems = Math.min(perRow, activeModules.length - row * perRow);
          const rowWidth = rowItems * modW + (rowItems - 1) * gapX;
          const startX = w / 2 - rowWidth / 2;

          const modX = startX + col * (modW + gapX);
          const modY = startY + row * rowH;

          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(hubX, hubY + hubH);

          const endX = modX + modW / 2;
          const endY = modY - 5;

          ctx.bezierCurveTo(
            hubX, hubY + hubH + 40,
            endX, endY - 40,
            endX, endY
          );

          ctx.strokeStyle = "rgba(100, 98, 92, 0.5)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -dashOffset;
          ctx.stroke();

          // Arrow head
          ctx.beginPath();
          ctx.moveTo(endX, endY + 5);
          ctx.lineTo(endX - 4, endY - 3);
          ctx.lineTo(endX + 4, endY - 3);
          ctx.fillStyle = "rgba(100, 98, 92, 0.6)";
          ctx.fill();

          ctx.setLineDash([]);

          // Draw module card
          ctx.fillStyle = "#2C2C2A";
          ctx.beginPath();
          ctx.roundRect(modX, modY, modW, modH, 8);
          ctx.fill();

          // Accent strip on left
          ctx.fillStyle = mod.bg;
          ctx.beginPath();
          ctx.roundRect(modX + 10, modY + 14, 6, modH - 28, 3);
          ctx.fill();

          // Label (truncate if needed)
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "600 12px 'DM Sans', sans-serif";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          let label = mod.label;
          const maxLabelW = modW - 32;
          while (ctx.measureText(label).width > maxLabelW && label.length > 3) {
            label = label.slice(0, -1);
          }
          if (label !== mod.label) label = label.slice(0, -1) + "…";
          ctx.fillText(label, modX + 24, modY + 32);

          // Category subtitle
          ctx.fillStyle = mod.accent;
          ctx.font = "500 9.5px 'DM Sans', sans-serif";
          let cat = mod.category.toUpperCase();
          while (ctx.measureText(cat).width > maxLabelW && cat.length > 3) {
            cat = cat.slice(0, -1);
          }
          if (cat !== mod.category.toUpperCase()) cat = cat.slice(0, -1) + "…";
          ctx.fillText(cat, modX + 24, modY + 54);

          ctx.textAlign = "center";
        });
      } else {
        // Empty state hint
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(100, 98, 92, 0.4)";
        ctx.font = "400 14px 'DM Sans', sans-serif";
        ctx.fillText("Selecione os módulos acima para montar", w / 2, hubY + 120);
      }

      dashOffset += 0.45;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedIds]);

  const activeAreas = new Set(
    coreModules.filter((m) => selectedIds.includes(m.id)).map((m) => m.category)
  ).size;

  // Compute canvas height based on selection (3 rows of 3 max)
  const rowsNeeded = Math.max(1, Math.ceil(selectedIds.length / 3));
  const canvasHeight = 220 + rowsNeeded * 110;

  return (
    <section id="workflow" className="py-24 bg-background">
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-4">
            Monte seu sistema
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
            Escolha os módulos que a sua empresa precisa
          </h2>
        </motion.div>

        <div className="space-y-6 mb-10 max-w-3xl mx-auto">
          {coreModuleCategories.map((category) => {
            const items = coreModules.filter((m) => m.category === category);
            return (
              <div key={category} className="text-center">
                <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  {category}
                </div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {items.map((mod) => {
                    const isActive = selectedIds.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`
                          flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                          ${isActive
                            ? "bg-primary border-primary text-white shadow-md transform -translate-y-0.5"
                            : "bg-white border-border text-foreground hover:border-primary/40 hover:bg-secondary/30"}
                        `}
                      >
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: "#6EE7B7" }}
                          ></span>
                        )}
                        {mod.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border border-border shadow-sm bg-[#F8F6F1] transition-all duration-500"
          style={{ height: `${canvasHeight}px` }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4"
            >
              <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-foreground shadow-sm border border-border/50">
                {selectedIds.length} módulo{selectedIds.length !== 1 ? "s" : ""} ·{" "}
                {activeAreas} área{activeAreas !== 1 ? "s" : ""} coberta
                {activeAreas !== 1 ? "s" : ""}
              </div>
              <Button
                className="shadow-lg px-8"
                onClick={() =>
                  document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Solicitar demo com esse sistema &rarr;
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
