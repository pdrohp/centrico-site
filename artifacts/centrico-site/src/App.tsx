import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
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
