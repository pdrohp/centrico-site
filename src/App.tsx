import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useLayoutEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ModuloPage from "@/pages/modulo";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
import { Whitelabel } from "@/components/Whitelabel";
import { Workflow } from "@/components/Workflow";
import { Modulos } from "@/components/Modulos";
import { Integracoes } from "@/components/Integracoes";
import { Seguranca } from "@/components/Seguranca";
import { SocialProof } from "@/components/SocialProof";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Diferenciais />
        <Whitelabel />
        <Workflow />
        <Modulos />
        <Integracoes />
        <Seguranca />
        <SocialProof />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    const reset = () => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    reset();
    const raf = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(raf);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/modulos/:id" component={ModuloPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
