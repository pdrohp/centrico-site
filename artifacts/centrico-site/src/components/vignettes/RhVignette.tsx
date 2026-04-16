import { motion, useReducedMotion } from "framer-motion";

export function RhVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();

  const tasks = [
    "Contrato assinado",
    "Documentos recebidos",
    "Acesso provisionado",
    "Welcome email enviado"
  ];

  const checkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 1, 1, 0],
      opacity: [0, 1, 1, 1, 0],
      transition: { duration: 6, delay: i * 0.8, repeat: Infinity, times: [0, 0.1, 0.8, 0.9, 1] }
    })
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: ["0%", "25%", "50%", "75%", "100%", "0%"],
      transition: { duration: 6, repeat: Infinity, times: [0, 0.15, 0.3, 0.45, 0.8, 1], ease: "easeInOut" }
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative w-64 bg-white rounded-xl shadow-md border border-border p-5">
        <div className="mb-4 pb-3 border-b border-border/50">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">Onboarding</h4>
          <p className="text-[9px] text-muted-foreground">Ana Costa • Analista</p>
        </div>

        <div className="space-y-3 mb-6">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border border-secondary flex items-center justify-center relative bg-secondary/20">
                <motion.div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accent }}
                  custom={i}
                  variants={!shouldReduceMotion ? checkVariants : undefined}
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : "initial"}
                  animate={!shouldReduceMotion ? "animate" : undefined}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              </div>
              <span className="text-[10px] font-medium text-foreground">{task}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>Progresso</span>
            <span style={{ color: accent }}>Concluído</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-secondary/50 overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: accent }}
              variants={!shouldReduceMotion ? progressVariants : undefined}
              initial={shouldReduceMotion ? { width: "100%" } : "initial"}
              animate={!shouldReduceMotion ? "animate" : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
