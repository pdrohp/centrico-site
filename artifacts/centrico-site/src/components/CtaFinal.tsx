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
    
    // Simulate API call
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
    <section id="cta" className="py-24 bg-primary text-white">
      <div className="container max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
          Pronto para configurar a plataforma da vossa empresa?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Demonstração sem custo, sem compromisso. Trinta minutos com a vossa equipa.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white/5 p-8 rounded-2xl backdrop-blur border border-white/10 mb-12">
          <div className="space-y-4">
            <Input 
              required 
              type="text" 
              placeholder="Nome completo" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
            />
            <Input 
              required 
              type="email" 
              placeholder="E-mail profissional" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
            />
            <Input 
              required 
              type="text" 
              placeholder="Empresa" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base font-bold bg-[#1D9E75] hover:bg-[#157a5a] text-white border-none mt-2"
            >
              {loading ? "A enviar..." : "Agendar demonstração →"}
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"></span>
            Alojado na Europa
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"></span>
            Conformidade RGPD
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"></span>
            Dados nunca saem da UE
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"></span>
            Acompanhamento permanente
          </div>
        </div>
      </div>
    </section>
  );
}
