import { motion, useReducedMotion } from "framer-motion";

export function WhitelabelVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();

  const brandVariants = {
    animate: {
      backgroundColor: ["#1A2E4A", "#1D9E75", "#1A2E4A"], // Navy to Teal to Navy
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const textVariants = {
    animate: {
      opacity: [1, 0, 1, 0, 1],
      y: [0, -5, 0, -5, 0],
      transition: { duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1], ease: "easeInOut" }
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative w-72 h-56 bg-white rounded-xl shadow-md border border-border overflow-hidden flex flex-col">
        
        {/* Browser Chrome */}
        <div className="h-8 bg-secondary/30 border-b border-border flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="mx-auto bg-white/60 border border-border/50 rounded px-4 py-0.5 text-[8px] font-mono text-muted-foreground flex relative overflow-hidden w-32 justify-center">
            {shouldReduceMotion ? (
              <span>docs.empresa.com.br</span>
            ) : (
              <>
                <motion.span 
                  className="absolute"
                  animate={{ opacity: [1, 0, 1], y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
                >
                  app.centrico.com
                </motion.span>
                <motion.span 
                  className="absolute"
                  animate={{ opacity: [0, 1, 0], y: [10, 0, 10] }}
                  transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
                >
                  docs.empresa.com.br
                </motion.span>
              </>
            )}
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-10 border-b border-border/50 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-5 h-5 rounded flex items-center justify-center"
                variants={!shouldReduceMotion ? brandVariants : undefined}
                initial={shouldReduceMotion ? { backgroundColor: accent } : undefined}
                animate={!shouldReduceMotion ? "animate" : undefined}
              >
                <div className="w-2 h-2 bg-white rounded-sm" />
              </motion.div>
              <div className="w-16 h-2 rounded bg-secondary/80" />
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary/50" />
              <div className="w-4 h-4 rounded-full bg-secondary/50" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex gap-4 flex-1">
            {/* Sidebar */}
            <div className="w-16 space-y-2">
              <div className="w-full h-2 rounded bg-secondary/40" />
              <div className="w-[80%] h-2 rounded bg-secondary/40" />
              <div className="w-[90%] h-2 rounded bg-secondary/40" />
              <div className="w-[70%] h-2 rounded bg-secondary/40" />
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="w-24 h-3 rounded bg-secondary/80" />
                  <div className="w-16 h-2 rounded bg-secondary/40" />
                </div>
                <motion.div 
                  className="w-16 h-5 rounded flex items-center justify-center"
                  variants={!shouldReduceMotion ? brandVariants : undefined}
                  initial={shouldReduceMotion ? { backgroundColor: accent } : undefined}
                  animate={!shouldReduceMotion ? "animate" : undefined}
                >
                  <div className="w-8 h-1 bg-white/60 rounded" />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 rounded border border-border/50 bg-secondary/10" />
                <div className="h-16 rounded border border-border/50 bg-secondary/10" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
