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

  // Group selected modules by category, preserving the canonical category order
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

  // Layout constants (must match canvas drawing)
  const CARD_H = 56;
  const ROW_GAP = 22;
  const TOP_OFFSET = 200; // hub area + connector down to first card
  const BOTTOM_PAD = selectedIds.length > 0 ? 130 : 60;
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

      // Grid background
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

      // Hub pill
      ctx.fillStyle = "#1A2E4A";
      ctx.beginPath();
      ctx.roundRect(hubX - hubW / 2, hubY, hubW, hubH, hubRadius);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "500 13px 'DM Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Seu sistema", hubX, hubY + hubH / 2);

      if (groupedActive.length === 0) {
        ctx.fillStyle = "rgba(100, 98, 92, 0.4)";
        ctx.font = "400 14px 'DM Sans', sans-serif";
        ctx.fillText("Selecione os módulos acima para montar", hubX, hubY + 120);
        dashOffset += 0.45;
        frame += 1;
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const numCols = groupedActive.length;
      const idealCardW = 200;
      const minCardW = 110;
      const sidePad = 16;
      // Adapt the column gap to available width so things never clip
      const colGap = numCols > 1 ? Math.max(10, Math.min(32, (w - sidePad * 2 - numCols * minCardW) / Math.max(1, numCols - 1))) : 0;

      const availW = w - sidePad * 2;
      const rawCardW = (availW - (numCols - 1) * colGap) / numCols;
      const cardW = Math.max(72, Math.min(idealCardW, rawCardW));
      const totalW = numCols * cardW + (numCols - 1) * colGap;
      const startX = Math.max(sidePad, (w - totalW) / 2);

      const firstCardY = hubY + hubH + 110;

      // Pulse opacity for "active" indicator (~1.5s cycle)
      const pulse = 0.45 + 0.55 * (Math.sin(frame * 0.08) * 0.5 + 0.5);

      groupedActive.forEach((group, colIdx) => {
        const colX = startX + colIdx * (cardW + colGap);
        const cardCenterX = colX + cardW / 2;

        // Connector from hub to first card top (curved bezier)
        const firstTopY = firstCardY;
        ctx.beginPath();
        ctx.moveTo(hubX, hubY + hubH);
        ctx.bezierCurveTo(
          hubX, hubY + hubH + 50,
          cardCenterX, firstTopY - 50,
          cardCenterX, firstTopY
        );
        ctx.strokeStyle = "rgba(100, 98, 92, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.lineDashOffset = -dashOffset;
        ctx.stroke();
        ctx.setLineDash([]);

        group.items.forEach((mod, rowIdx) => {
          const cardY = firstCardY + rowIdx * (CARD_H + ROW_GAP);

          // Vertical chain line between previous card bottom and this card top
          if (rowIdx > 0) {
            const prevBottomY = firstCardY + (rowIdx - 1) * (CARD_H + ROW_GAP) + CARD_H;
            ctx.beginPath();
            ctx.moveTo(cardCenterX, prevBottomY);
            ctx.lineTo(cardCenterX, cardY);
            ctx.strokeStyle = "rgba(100, 98, 92, 0.5)";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 5]);
            ctx.lineDashOffset = -dashOffset;
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // Minimal card
          ctx.fillStyle = "#2C2C2A";
          ctx.beginPath();
          ctx.roundRect(colX, cardY, cardW, CARD_H, 10);
          ctx.fill();

          // Pulsing green dot
          const dotX = colX + 18;
          const dotY = cardY + CARD_H / 2;
          // Soft halo
          ctx.fillStyle = `rgba(110, 231, 183, ${0.18 * pulse})`;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 9, 0, Math.PI * 2);
          ctx.fill();
          // Core dot
          ctx.fillStyle = `rgba(110, 231, 183, ${pulse})`;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
          ctx.fill();

          // Label (truncate gracefully)
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "500 13px 'DM Sans', sans-serif";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          let label = mod.label;
          const maxLabelW = cardW - 44;
          while (ctx.measureText(label).width > maxLabelW && label.length > 3) {
            label = label.slice(0, -1);
          }
          if (label !== mod.label) label = label.slice(0, -1) + "…";
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

        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-3xl mx-auto">
          {coreModules.map((mod) => {
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
