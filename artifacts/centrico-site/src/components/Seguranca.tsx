import { motion } from "framer-motion";
import { CheckCircle2, Globe2, Shield, LifeBuoy } from "lucide-react";

export function Seguranca() {
  const trusts = [
    { title: "Hospedado na Europa", icon: Globe2 },
    { title: "LGPD & GDPR conformes", icon: Shield },
    { title: "Dados nunca saem da UE", icon: CheckCircle2 },
    { title: "Suporte contínuo incluso", icon: LifeBuoy },
  ];

  return (
    <section id="seguranca" className="py-24 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">
                Seus dados ficam na Europa. E ficam seguros.
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                Infraestrutura hospedada em servidores europeus, com conformidade total às regulamentações LGPD e GDPR. Seus documentos nunca deixam a UE.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trusts.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1D9E75]"></span>
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative w-full aspect-square max-w-md mx-auto">
            {/* Map Placeholder Graphic */}
            <div className="absolute inset-0 bg-[#F8F7F5] rounded-3xl border border-border overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full opacity-30 text-primary" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M120 150 L160 120 L220 140 L280 110 L300 160 L260 220 L210 280 L140 260 Z" fill="currentColor" opacity="0.1" />
                <path d="M120 150 L160 120 L220 140 L280 110 L300 160 L260 220 L210 280 L140 260 Z" />
                <circle cx="210" cy="180" r="4" fill="#1A2E4A" />
                <circle cx="210" cy="180" r="12" stroke="#1A2E4A" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              
              {/* Pin */}
              <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-primary rounded-full mb-1 shadow-lg border-2 border-white"></div>
                <div className="px-3 py-1 bg-white rounded-full border border-border text-xs font-bold text-primary shadow-sm">
                  Frankfurt, DE
                </div>
              </div>

              {/* Badges */}
              <div className="absolute bottom-8 left-8 bg-white border border-border px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                <Shield size={16} className="text-[#1D9E75]" />
                <span className="text-sm font-bold text-foreground">LGPD</span>
              </div>
              <div className="absolute bottom-8 right-8 bg-white border border-border px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                <Shield size={16} className="text-[#1D9E75]" />
                <span className="text-sm font-bold text-foreground">GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
