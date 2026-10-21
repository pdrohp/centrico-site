import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLoopActive } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    title: "Log de Auditoria",
    alert: "Alerta",
    system: "sistema",
    actions: ["Consultou documento", "Descarregou anexo", "Alterou permissões", "Assinou documento", "Restaurou versão", "Backup automático"],
    docs: ["Contrato_Social.pdf", "Relatório_Q3.xlsx", "Pasta_Financeiro", "Aditivo_01.pdf", "Apresentação.pptx", "Repositório"],
  },
  en: {
    title: "Audit Log",
    alert: "Alert",
    system: "system",
    actions: ["Viewed document", "Downloaded attachment", "Changed permissions", "Signed document", "Restored version", "Automatic backup"],
    docs: ["Articles_of_Association.pdf", "Report_Q3.xlsx", "Finance_Folder", "Addendum_01.pdf", "Presentation.pptx", "Repository"],
  },
};


export function AuditoriaVignette({ accent, bg, lang = "pt" }: { accent: string; bg: string; lang?: Lang }) {
  const t = COPY[lang];
  const shouldReduceMotion = useReducedMotion();
  // Loops only run while the vignette is on screen and the tab is visible.
  const rootRef = useRef<HTMLDivElement>(null);
  const playing = useLoopActive(rootRef);

  const scrollVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -120],
      transition: { duration: 8, ease: "linear" as const, repeat: Infinity }
    }
  };

  const entries = [
    { time: "10:42", user: "maria.silva" },
    { time: "10:45", user: "joao.santos" },
    { time: "10:48", user: "ana.costa", alert: true },
    { time: "10:51", user: "carlos.m" },
    { time: "10:55", user: "maria.silva" },
    { time: "10:58", user: t.system },
  ].map((e, i) => ({ ...e, action: t.actions[i], doc: t.docs[i] }));
  // Duplicate the first three for a seamless loop
  const logs = [...entries, ...entries.slice(0, 3)];

  return (
    <div ref={rootRef} className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="relative w-72 h-56 bg-white rounded-xl shadow-md border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-4 py-2 border-b border-border/50 bg-secondary/20 flex justify-between items-center z-10 relative">
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">{t.title}</span>
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
            animate={!shouldReduceMotion ? (playing ? "animate" : "initial") : undefined}
          >
            {logs.map((log, i) => (
              <div key={i} className="flex flex-col gap-0.5 border-l-2 pl-2" style={{ borderColor: log.alert ? accent : "var(--border)" }}>
                <div className="flex items-center gap-2 text-[9px] font-mono text-muted-foreground">
                  <span>[{log.time}]</span>
                  <span className="font-sans font-medium text-foreground">{log.user}</span>
                  {log.alert && (
                    <span className="px-1.5 py-0.5 rounded bg-foreground text-background text-[8px] uppercase tracking-wider">{t.alert}</span>
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
