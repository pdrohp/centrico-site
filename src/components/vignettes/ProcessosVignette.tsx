import { motion, useReducedMotion } from "framer-motion";

export function ProcessosVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();

  const steps = ["Solicitação", "Revisão", "Aprovação", "Concluído"];
  
  const stepVariants = {
    initial: { borderColor: "var(--border)", backgroundColor: "transparent", color: "var(--muted-foreground)" },
    animate: (i: number) => ({
      borderColor: [
        "var(--border)", 
        i === 0 ? accent : "var(--border)", 
        i === 1 ? accent : "var(--border)", 
        i === 2 ? accent : "var(--border)", 
        i === 3 ? accent : "var(--border)", 
        "var(--border)"
      ],
      backgroundColor: [
        "transparent",
        i === 0 ? `${accent}15` : "transparent",
        i === 1 ? `${accent}15` : "transparent",
        i === 2 ? `${accent}15` : "transparent",
        i === 3 ? `${accent}15` : "transparent",
        "transparent"
      ],
      color: [
        "var(--muted-foreground)",
        i === 0 ? accent : "var(--muted-foreground)",
        i === 1 ? accent : "var(--muted-foreground)",
        i === 2 ? accent : "var(--muted-foreground)",
        i === 3 ? accent : "var(--muted-foreground)",
        "var(--muted-foreground)"
      ],
      transition: { duration: 5, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" as const }
    })
  };

  const pillVariants = {
    initial: { opacity: 0, y: 5 },
    animate: (i: number) => ({
      opacity: [
        0, 
        i === 0 ? 1 : 0, 
        i === 1 ? 1 : 0, 
        i === 2 ? 1 : 0, 
        i === 3 ? 1 : 0, 
        0
      ],
      y: [
        5,
        i === 0 ? 0 : 5,
        i === 1 ? 0 : 5,
        i === 2 ? 0 : 5,
        i === 3 ? 0 : 5,
        5
      ],
      transition: { duration: 5, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" as const }
    })
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="flex items-center justify-center gap-2 md:gap-3 w-full px-8">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="relative flex flex-col items-center">
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center bg-white shadow-sm z-10"
                custom={i}
                variants={!shouldReduceMotion ? stepVariants : undefined}
                initial={shouldReduceMotion ? { borderColor: accent, color: accent } : "initial"}
                animate={!shouldReduceMotion ? "animate" : undefined}
                style={shouldReduceMotion ? { borderColor: accent, color: accent } : undefined}
              >
                {i < 3 ? (
                  <span className="font-mono text-sm md:text-base font-medium">{i + 1}</span>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </motion.div>
              
              <span className="absolute top-14 md:top-16 text-[9px] md:text-[10px] font-medium tracking-wide whitespace-nowrap text-foreground">
                {step}
              </span>
              
              <motion.div
                className="absolute -top-6 bg-white px-2 py-0.5 rounded-full border border-border shadow-sm text-[8px] font-bold uppercase tracking-wider"
                style={{ color: accent }}
                custom={i}
                variants={!shouldReduceMotion ? pillVariants : undefined}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : "initial"}
                animate={!shouldReduceMotion ? "animate" : undefined}
              >
                Automático
              </motion.div>
            </div>
            
            {i < steps.length - 1 && (
              <div className="w-4 md:w-8 h-0.5 bg-border/60 mx-1 md:mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
