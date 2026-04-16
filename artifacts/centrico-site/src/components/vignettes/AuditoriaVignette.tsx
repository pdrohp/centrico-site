import { motion, useReducedMotion } from "framer-motion";

export function AuditoriaVignette({ accent, bg }: { accent: string; bg: string }) {
  const shouldReduceMotion = useReducedMotion();

  const scrollVariants = {
    animate: {
      y: [0, -120],
      transition: { duration: 8, ease: "linear" as const, repeat: Infinity }
    }
  };

  const logs = [
    { time: "10:42", user: "maria.silva", action: "Consultou documento", doc: "Contrato_Social.pdf" },
    { time: "10:45", user: "joao.santos", action: "Descarregou anexo", doc: "Relatório_Q3.xlsx" },
    { time: "10:48", user: "ana.costa", action: "Alterou permissões", doc: "Pasta_Financeiro", alert: true },
    { time: "10:51", user: "carlos.m", action: "Assinou documento", doc: "Aditivo_01.pdf" },
    { time: "10:55", user: "maria.silva", action: "Restaurou versão", doc: "Apresentação.pptx" },
    { time: "10:58", user: "sistema", action: "Backup automático", doc: "Repositório" },
    // Duplicate for seamless loop
    { time: "10:42", user: "maria.silva", action: "Consultou documento", doc: "Contrato_Social.pdf" },
    { time: "10:45", user: "joao.santos", action: "Descarregou anexo", doc: "Relatório_Q3.xlsx" },
    { time: "10:48", user: "ana.costa", action: "Alterou permissões", doc: "Pasta_Financeiro", alert: true },
  ];

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative w-72 h-56 bg-white rounded-xl shadow-md border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-4 py-2 border-b border-border/50 bg-secondary/20 flex justify-between items-center z-10 relative">
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Log de Auditoria</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Logs Container */}
        <div className="flex-1 relative overflow-hidden">
          {/* Top/Bottom Gradient Masks */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="px-4 pt-4 pb-8 space-y-3"
            variants={!shouldReduceMotion ? scrollVariants : undefined}
            animate={!shouldReduceMotion ? "animate" : undefined}
          >
            {logs.map((log, i) => (
              <div key={i} className="flex flex-col gap-0.5 border-l-2 pl-2" style={{ borderColor: log.alert ? accent : "var(--border)" }}>
                <div className="flex items-center gap-2 text-[9px] font-mono text-muted-foreground">
                  <span>[{log.time}]</span>
                  <span className="font-sans font-medium text-foreground">{log.user}</span>
                  {log.alert && (
                    <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[8px] uppercase tracking-wide">Alerta</span>
                  )}
                </div>
                <div className="text-[10px] text-foreground">
                  {log.action} <span className="text-muted-foreground italic">{log.doc}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
