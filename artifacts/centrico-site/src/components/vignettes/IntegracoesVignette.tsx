import { motion, useReducedMotion } from "framer-motion";

export function IntegracoesVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 20, ease: "linear", repeat: Infinity }
    }
  };

  const reverseOrbitVariants = {
    animate: {
      rotate: -360,
      transition: { duration: 20, ease: "linear", repeat: Infinity }
    }
  };

  const lineVariants = {
    animate: {
      strokeDashoffset: [0, -20],
      transition: { duration: 1, ease: "linear", repeat: Infinity }
    }
  };

  const systems = ["SAP", "Salesforce", "M365", "Google", "TOTVS", "AWS"];
  const radius = 90;

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative w-64 h-64 flex items-center justify-center">
        
        {/* Orbital Rings */}
        <div className="absolute w-full h-full rounded-full border border-secondary/40" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-secondary/30" />

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
          {systems.map((_, i) => {
            const angle = (i * (360 / systems.length)) * (Math.PI / 180);
            const x1 = 128 + Math.cos(angle) * 30; // hub edge
            const y1 = 128 + Math.sin(angle) * 30;
            const x2 = 128 + Math.cos(angle) * radius; // outer edge
            const y2 = 128 + Math.sin(angle) * radius;
            return (
              <motion.line
                key={`line-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={accent}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                variants={!shouldReduceMotion ? lineVariants : undefined}
                animate={!shouldReduceMotion ? "animate" : undefined}
              />
            );
          })}
        </svg>

        {/* Orbiting Systems */}
        <motion.div 
          className="absolute inset-0"
          variants={!shouldReduceMotion ? orbitVariants : undefined}
          animate={!shouldReduceMotion ? "animate" : undefined}
        >
          {systems.map((system, i) => {
            const angle = (i * (360 / systems.length)) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={system}
                className="absolute top-1/2 left-1/2"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <motion.div 
                  className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-border text-[9px] font-bold tracking-wide text-foreground"
                  variants={!shouldReduceMotion ? reverseOrbitVariants : undefined}
                  animate={!shouldReduceMotion ? "animate" : undefined}
                >
                  {system}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Central Hub */}
        <div className="relative z-10 w-20 h-20 bg-white rounded-2xl shadow-lg border-2 flex items-center justify-center" style={{ borderColor: accent }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: accent }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
