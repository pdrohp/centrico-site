import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "hero")}
            className="text-2xl font-serif font-semibold tracking-wider text-primary uppercase"
          >
            Céntrico
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#modulos" onClick={(e) => handleNavClick(e, "modulos")} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Módulos
            </a>
            <a href="#integracoes" onClick={(e) => handleNavClick(e, "integracoes")} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Integrações
            </a>
            <a href="#seguranca" onClick={(e) => handleNavClick(e, "seguranca")} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Segurança
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden sm:inline-flex"
          >
            Solicitar demo
          </Button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border p-4 flex flex-col gap-4 shadow-lg">
          <a href="#modulos" onClick={(e) => handleNavClick(e, "modulos")} className="text-base font-medium p-2 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded">
            Módulos
          </a>
          <a href="#integracoes" onClick={(e) => handleNavClick(e, "integracoes")} className="text-base font-medium p-2 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded">
            Integrações
          </a>
          <a href="#seguranca" onClick={(e) => handleNavClick(e, "seguranca")} className="text-base font-medium p-2 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded">
            Segurança
          </a>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full mt-2"
          >
            Solicitar demo
          </Button>
        </div>
      )}
    </header>
  );
}
