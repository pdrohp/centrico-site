import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { modules } from "@/lib/data";

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
      const hubY = 60;
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

      const activeModules = modules.filter(m => selectedIds.includes(m.id));

      if (activeModules.length > 0) {
        const columns = Math.min(activeModules.length, 4);
        const startY = hubY + 120;
        const rowH = 140;
        const modW = 92;
        const modH = 80;
        const gapX = 20;

        activeModules.forEach((mod, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          
          // Calculate center offset for this row
          const rowItems = Math.min(columns, activeModules.length - row * columns);
          const rowWidth = rowItems * modW + (rowItems - 1) * gapX;
          const startX = w / 2 - rowWidth / 2;

          const modX = startX + col * (modW + gapX);
          const modY = startY + row * rowH;

          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(hubX, hubY + hubH);
          
          // curve to module top center
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

          // Icon block
          ctx.fillStyle = mod.bg;
          ctx.beginPath();
          ctx.roundRect(modX + modW/2 - 12, modY + 12, 24, 24, 4);
          ctx.fill();

          ctx.fillStyle = mod.accent;
          ctx.font = "bold 12px sans-serif";
          ctx.fillText(mod.label.charAt(0), modX + modW/2, modY + 24);

          // Labels
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "500 11px 'DM Sans', sans-serif";
          ctx.fillText(mod.label, modX + modW/2, modY + 52);

          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.font = "10px 'DM Sans', sans-serif";
          ctx.fillText(mod.area, modX + modW/2, modY + 68);
        });
      } else {
        // Empty state hint
        ctx.fillStyle = "rgba(100, 98, 92, 0.4)";
        ctx.font = "400 14px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
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

  const activeAreas = new Set(modules.filter(m => selectedIds.includes(m.id)).map(m => m.area)).size;

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

        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl mx-auto">
          {modules.map((mod) => {
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
                {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#6EE7B7" }}></span>}
                {mod.label}
              </button>
            );
          })}
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm bg-[#F8F6F1] h-[500px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />
          
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4"
            >
              <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-foreground shadow-sm border border-border/50">
                {selectedIds.length} módulo{selectedIds.length !== 1 ? 's' : ''} · {activeAreas} área{activeAreas !== 1 ? 's' : ''} coberta{activeAreas !== 1 ? 's' : ''}
              </div>
              <Button 
                className="shadow-lg px-8"
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
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
