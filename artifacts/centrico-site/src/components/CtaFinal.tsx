import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

type CtaFinalProps = {
  headline?: string;
  subheadline?: string;
};

export function CtaFinal({ headline, subheadline }: CtaFinalProps = {}) {
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
    <section
      id="cta"
      className="relative bg-[#001376] text-white overflow-hidden px-6 md:px-12 lg:px-20 py-24 md:py-36 lg:py-48"
    >
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="bg-[#001ec2] rounded-[8px] p-8 md:p-12 lg:p-14">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-start justify-center">
            {/* Left: text */}
            <div className="flex flex-col gap-9 max-w-[576px] w-full lg:w-[576px] pt-2 items-center lg:items-start text-center lg:text-left">
              <span className="font-display font-semibold uppercase text-[11px] tracking-[0.18em] text-white/50">
                Próximo passo
              </span>
              <h2 className="font-display font-medium text-white text-[36px] md:text-[44px] lg:text-[48px] leading-none tracking-[-0.01em] w-full">
                {headline ?? "Configure a vossa plataforma."}
              </h2>
              <p className="text-[18px] leading-[28px] text-white/70">
                {subheadline ?? (
                  <>
                    Demonstração sem custo, sem compromisso.
                    <br />
                    Trinta minutos com a vossa equipa.
                  </>
                )}
              </p>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-[448px] flex flex-col gap-3"
            >
              <Input
                required
                type="text"
                placeholder="Nome completo"
                className="bg-transparent border-white/30 text-white placeholder:text-white/75 h-12 rounded-[8px] px-5 focus-visible:border-white"
              />
              <Input
                required
                type="email"
                placeholder="E-mail profissional"
                className="bg-transparent border-white/30 text-white placeholder:text-white/75 h-12 rounded-[8px] px-5 focus-visible:border-white"
              />
              <Input
                required
                type="text"
                placeholder="Empresa"
                className="bg-transparent border-white/30 text-white placeholder:text-white/75 h-12 rounded-[8px] px-5 focus-visible:border-white"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-1 rounded-[8px] bg-white text-[#0e1622] hover:bg-white/90 font-display font-medium text-[16px] uppercase"
              >
                {loading ? "A enviar..." : "Agendar demonstração →"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
