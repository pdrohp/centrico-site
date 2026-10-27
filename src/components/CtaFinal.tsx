import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    toastTitle: "Pedido recebido",
    toastBody: "A nossa equipa entrará em contacto brevemente para agendar a demonstração.",
    eyebrow: "Próximo passo",
    headline: "Configure a vossa plataforma.",
    subheadline: ["Demonstração sem custo, sem compromisso.", "Trinta minutos com a vossa equipa."],
    name: "Nome completo",
    email: "E-mail profissional",
    company: "Empresa",
    sending: "A enviar...",
    submit: "Agendar demonstração →",
    errorTitle: "Não foi possível enviar",
    errorBody: "Os seus dados continuam no formulário. Tente novamente dentro de alguns minutos.",
  },
  en: {
    toastTitle: "Request received",
    toastBody: "Our team will be in touch shortly to schedule your demo.",
    eyebrow: "Next step",
    headline: "Set up your platform.",
    subheadline: ["A free demo, with no commitment.", "Thirty minutes with your team."],
    name: "Full name",
    email: "Work email",
    company: "Company",
    sending: "Sending...",
    submit: "Book a demo →",
    errorTitle: "We couldn't send your request",
    errorBody: "Your details are still in the form. Please try again in a few minutes.",
  },
};

type CtaFinalProps = {
  headline?: string;
  subheadline?: string;
  lang?: Lang;
};

export function CtaFinal({ headline, subheadline, lang = "pt" }: CtaFinalProps = {}) {
  const t = COPY[lang];
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  // Momento em que o formulário apareceu: o servidor descarta envios rápidos demais (bots).
  const [abertoEm] = useState(() => Date.now());

  // Envia para /api/demonstracao (função da Vercel que grava na base "Leads Centrico"
  // do Notion). Só confirma quando o servidor responde ok; em erro, os dados ficam no form.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      .filter((k) => params.get(k))
      .map((k) => `${k.replace("utm_", "")}: ${params.get(k)}`)
      .join(" | ");

    setLoading(true);
    try {
      const res = await fetch("/api/demonstracao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          email: data.get("email"),
          empresa: data.get("empresa"),
          idioma: lang,
          pagina: window.location.pathname,
          origem: utm,
          _site: data.get("_site"),
          _ts: abertoEm,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      toast({ title: t.toastTitle, description: t.toastBody });
    } catch {
      toast({ variant: "destructive", title: t.errorTitle, description: t.errorBody });
    } finally {
      setLoading(false);
    }
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
                {t.eyebrow}
              </span>
              <h2 className="font-display font-medium text-white text-[36px] md:text-[44px] lg:text-[48px] leading-none tracking-[-0.01em] w-full">
                {headline ?? t.headline}
              </h2>
              <p className="text-[18px] leading-[28px] text-white/70">
                {subheadline ?? (
                  <>
                    {t.subheadline[0]}
                    <br />
                    {t.subheadline[1]}
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
                name="nome"
                autoComplete="name"
                aria-label={t.name}
                placeholder={t.name}
                className="bg-transparent border-white/30 text-white placeholder:text-white/75 h-12 rounded-[8px] px-5 focus-visible:border-white"
              />
              <Input
                required
                type="email"
                name="email"
                autoComplete="email"
                aria-label={t.email}
                placeholder={t.email}
                className="bg-transparent border-white/30 text-white placeholder:text-white/75 h-12 rounded-[8px] px-5 focus-visible:border-white"
              />
              <Input
                required
                type="text"
                name="empresa"
                autoComplete="organization"
                aria-label={t.company}
                placeholder={t.company}
                className="bg-transparent border-white/30 text-white placeholder:text-white/75 h-12 rounded-[8px] px-5 focus-visible:border-white"
              />
              {/* Anti-spam: campo invisível que só bots preenchem */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                <label htmlFor="cta-site">Site</label>
                <input id="cta-site" name="_site" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-1 rounded-[8px] bg-white text-[#0e1622] hover:bg-white/90 font-display font-medium text-[16px] uppercase"
              >
                {loading ? t.sending : t.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
