import { motion, useReducedMotion } from "framer-motion";

export function AssinaturasVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();

  const drawVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 4, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" as const }
    }
  };

  const checkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 4, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: "backOut" as const }
    }
  };

  const cursorVariants = {
    initial: { x: -20, y: 10, opacity: 0 },
    animate: {
      x: [-20, 60, 60, -20],
      y: [10, -10, -10, 10],
      opacity: [0, 1, 0, 0],
      transition: { duration: 4, times: [0, 0.3, 0.4, 1], repeat: Infinity, ease: "easeInOut" as const }
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative w-56 h-64 bg-white rounded-xl shadow-md border border-border p-5 flex flex-col">
        {/* Document Faux Content */}
        <div className="w-1/2 h-3 rounded bg-secondary/80 mb-6" />
        <div className="space-y-2 mb-auto">
          <div className="w-full h-1.5 rounded bg-secondary/40" />
          <div className="w-[90%] h-1.5 rounded bg-secondary/40" />
          <div className="w-[95%] h-1.5 rounded bg-secondary/40" />
          <div className="w-[80%] h-1.5 rounded bg-secondary/40" />
          <div className="w-full h-1.5 rounded bg-secondary/40" />
          <div className="w-[60%] h-1.5 rounded bg-secondary/40" />
        </div>
        
        {/* Signature Area */}
        <div className="mt-8 border-t-2 border-dashed border-secondary/60 pt-4 relative">
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground absolute -top-2 bg-white px-1">Assinatura</span>
          
          <div className="h-12 relative flex items-center justify-center">
            {/* Signature Path */}
            <svg viewBox="0 0 100 40" className="w-24 h-10 absolute z-10" style={{ stroke: accent }}>
              <motion.path
                d="M10,20 C15,5 25,5 20,25 C15,45 30,10 35,20 C40,30 45,20 50,25 C55,30 60,10 65,20 C70,30 75,15 80,25 C85,35 90,20 90,20"
                fill="transparent"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={!shouldReduceMotion ? drawVariants : undefined}
                initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : "initial"}
                animate={!shouldReduceMotion ? "animate" : undefined}
              />
            </svg>
            
            {/* Cursor */}
            <motion.div 
              className="absolute z-20"
              variants={!shouldReduceMotion ? cursorVariants : undefined}
              initial={shouldReduceMotion ? { opacity: 0 } : "initial"}
              animate={!shouldReduceMotion ? "animate" : undefined}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" />
              </svg>
            </motion.div>
            
            {/* Checkmark Badge */}
            <motion.div 
              className="absolute -right-4 -bottom-2 bg-white rounded-full p-1 shadow-sm border border-border"
              variants={!shouldReduceMotion ? checkVariants : undefined}
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : "initial"}
              animate={!shouldReduceMotion ? "animate" : undefined}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
