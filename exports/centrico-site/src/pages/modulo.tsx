import { useEffect } from "react";
import { useRoute } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaFinal } from "@/components/CtaFinal";
import { ModuleHero } from "@/components/module/ModuleHero";
import { ModuleVantagens } from "@/components/module/ModuleVantagens";
import { ModuleFuncionalidades } from "@/components/module/ModuleFuncionalidades";
import { ModuleCasos } from "@/components/module/ModuleCasos";
import { ModuleIntegracoes } from "@/components/module/ModuleIntegracoes";
import { ModuleSeguranca } from "@/components/module/ModuleSeguranca";
import { ModuleFaq } from "@/components/module/ModuleFaq";
import { ModuleRelacionados } from "@/components/module/ModuleRelacionados";
import { modules } from "@/lib/data";
import { getModuleContent } from "@/lib/modulesContent";
import NotFound from "@/pages/not-found";

export default function ModuloPage() {
  const [, params] = useRoute("/modulos/:id");
  const id = params?.id;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const module = id ? modules.find((m) => m.id === id) : undefined;
  const content = id ? getModuleContent(id) : undefined;

  if (!module || !content) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ModuleHero module={module} content={content} />
        <ModuleVantagens content={content} />
        <ModuleFuncionalidades content={content} />
        <ModuleCasos content={content} />
        <ModuleIntegracoes content={content} />
        <ModuleSeguranca content={content} />
        <ModuleFaq content={content} />
        <ModuleRelacionados content={content} />
        <CtaFinal headline={content.ctaHeadline} subheadline={content.ctaSubheadline} />
      </main>
      <Footer />
    </div>
  );
}
