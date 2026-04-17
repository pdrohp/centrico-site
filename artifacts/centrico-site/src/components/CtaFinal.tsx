import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

export function CtaFinal() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const form = e.target as HTMLFormElement;
      form.reset();
      toast({
        title: "Pedido recebido",
        description: "A nossa equipa entrará em contacto brevemente para agendar a demonstração.",
      });
    }, 1000);
  };

  return (
    <section id="cta" className="relative py-32 md:py-48 bg-[#0E1622] text-white overflow-hidden">
      {/* Faint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center relative z-10">
        <span className="display-eyebrow inline-block text-[11px] text-white/50 mb-8">
          Próximo passo
        </span>

        {/* vertical connector */}
        <div className="mx-auto h-16 w-px bg-white/25 mb-8" aria-hidden />

        <h2 className="display-title text-white text-[36px] md:text-[56px] lg:text-[64px] leading-[1] mb-10">
          Configure a vossa plataforma.
        </h2>

        <p className="text-base md:text-lg text-white/70 mb-16 max-w-xl mx-auto">
          Demonstração sem custo, sem compromisso. Trinta minutos com a vossa equipa.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left mb-16">
          <div className="space-y-3">
            <Input 
              required 
              type="text" 
              placeholder="Nome completo" 
              className="bg-transparent border-white/30 text-white placeholder:text-white/40 h-12 rounded-full px-5 focus-visible:border-white"
            />
            <Input 
              required 
              type="email" 
              placeholder="E-mail profissional" 
              className="bg-transparent border-white/30 text-white placeholder:text-white/40 h-12 rounded-full px-5 focus-visible:border-white"
            />
            <Input 
              required 
              type="text" 
              placeholder="Empresa" 
              className="bg-transparent border-white/30 text-white placeholder:text-white/40 h-12 rounded-full px-5 focus-visible:border-white"
            />
            <Button
              type="submit"
              disabled={loading}
              variant="pillInverse"
              size="pillMd"
              className="w-full mt-2"
            >
              {loading ? "A enviar..." : "Agendar demonstração →"}
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-white/55 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            Alojado na Europa
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            Conformidade RGPD
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            Dados nunca saem da UE
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/60"></span>
            Acompanhamento permanente
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["ISO 27001", "LGPD / RGPD", "SOC 2"].map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center h-8 px-4 rounded-full border border-white/30 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-white/85"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
