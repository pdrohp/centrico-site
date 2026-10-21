import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLoopActive } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const COPY = {
  pt: { user: "Utilizador" },
  en: { user: "User" },
};


export function AcessosVignette({ accent, bg, lang = "pt" }: { accent: string; bg: string; lang?: Lang }) {
  const t = COPY[lang];
  const shouldReduceMotion = useReducedMotion();
  // Loops only run while the vignette is on screen and the tab is visible.
  const rootRef = useRef<HTMLDivElement>(null);
  const playing = useLoopActive(rootRef);

  const toggleVariants = {
    initial: { x: 2, backgroundColor: "var(--muted)" },
    animate: (delay: number) => ({
      x: [2, 14, 14, 2],
      backgroundColor: ["var(--muted)", accent, accent, "var(--muted)"],
      transition: { duration: 4, delay, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: "easeInOut" as const }
    })
  };

  const badgeVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [0, 36, 72, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: "easeInOut" as const }
    }
  };

  const rows = [0, 1, 2];
  const cols = [0, 1];

  return (
    <div ref={rootRef} className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative bg-white rounded-xl shadow-md border border-border p-4 w-64">
        {/* Header Row */}
        <div className="flex items-center mb-4 pb-2 border-b border-border/50">
          <div className="w-20 text-[9px] uppercase tracking-wider text-muted-foreground">{t.user}</div>
          <div className="flex-1 flex justify-around">
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              </svg>
              Doc A
            </div>
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              </svg>
              Doc B
            </div>
          </div>
        </div>

        {/* Matrix Rows */}
        <div className="relative space-y-4">
          <motion.div 
            className="absolute -left-3 -top-2 bg-foreground text-background px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider z-10 shadow-sm flex items-center gap-1"
            variants={!shouldReduceMotion ? badgeVariants : undefined}
            initial={shouldReduceMotion ? { opacity: 1, y: 36 } : "initial"}
            animate={!shouldReduceMotion ? (playing ? "animate" : "initial") : undefined}
          >
            Admin
          </motion.div>

          {rows.map((row) => (
            <div key={row} className="flex items-center">
              <div className="w-20 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-secondary flex-shrink-0" />
                <div className="w-10 h-1.5 rounded bg-secondary/60" />
              </div>
              <div className="flex-1 flex justify-around">
                {cols.map((col) => {
                  const delay = (row * 0.5) + (col * 0.2);
                  const isStaticOn = shouldReduceMotion && (row === 0 || (row === 1 && col === 0));
                  
                  return (
                    <div key={col} className="w-7 h-4 rounded-full bg-secondary/30 relative flex items-center p-0.5">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-white shadow-sm"
                        custom={delay}
                        variants={!shouldReduceMotion ? toggleVariants : undefined}
                        initial={isStaticOn ? { x: 14, backgroundColor: accent } : "initial"}
                        animate={!shouldReduceMotion ? (playing ? "animate" : "initial") : undefined}
                        style={isStaticOn ? { x: 14, backgroundColor: accent } : undefined}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
