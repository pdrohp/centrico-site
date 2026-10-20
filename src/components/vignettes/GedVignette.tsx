import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLoopActive } from "@/lib/motion";

export function GedVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();
  // Loops only run while the vignette is on screen and the tab is visible.
  const rootRef = useRef<HTMLDivElement>(null);
  const playing = useLoopActive(rootRef);

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.5, repeat: Infinity, repeatDelay: 2 }
    }
  };

  const cardVariants = {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [0, -4, 0],
      transition: { duration: 4, ease: "easeInOut" as const, repeat: Infinity }
    }
  };

  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.8],
      transition: { duration: 5, times: [0, 0.1, 0.8, 1], repeat: Infinity }
    }
  };

  return (
    <div ref={rootRef} className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <motion.div 
        className="relative w-48 h-56"
        variants={!shouldReduceMotion ? containerVariants : undefined}
        initial="initial"
        animate={playing ? "animate" : "initial"}
      >
        {/* Background Card */}
        <motion.div 
          className="absolute top-4 left-4 right-[-1rem] bottom-[-1rem] bg-white/40 rounded-xl border border-white/60 shadow-sm"
          variants={!shouldReduceMotion ? cardVariants : undefined}
          style={{ transformOrigin: "bottom right" }}
        />
        
        {/* Main Card */}
        <motion.div 
          className="absolute inset-0 bg-white rounded-xl border border-border shadow-md p-4 flex flex-col gap-3"
          variants={!shouldReduceMotion ? cardVariants : undefined}
        >
          {/* Faux Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: accent }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="w-16 h-3 rounded-full bg-secondary/60" />
          </div>
          
          {/* Faux Lines */}
          <div className="w-full h-2 rounded-full bg-secondary/40" />
          <div className="w-[80%] h-2 rounded-full bg-secondary/40" />
          <div className="w-[90%] h-2 rounded-full bg-secondary/40" />
          <div className="w-[60%] h-2 rounded-full bg-secondary/40" />
          
          {/* Version Badge Overlay */}
          <motion.div 
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg border border-border p-2 flex items-center gap-2"
            variants={!shouldReduceMotion ? badgeVariants : undefined}
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : "initial"}
          >
            <span className="text-[10px] font-mono text-muted-foreground">v2</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            <span className="text-[10px] font-mono font-medium" style={{ color: accent }}>v3</span>
          </motion.div>
          
          {/* Restore Pill */}
          <motion.div 
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white shadow-md border border-border text-[9px] font-medium tracking-wide"
            style={{ color: accent }}
            variants={!shouldReduceMotion ? badgeVariants : undefined}
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : "initial"}
          >
            Versão restaurada
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
