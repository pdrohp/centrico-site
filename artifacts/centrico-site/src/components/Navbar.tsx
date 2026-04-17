import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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

  const goToCta = () => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Left: Pill CTA */}
        <button
          onClick={goToCta}
          className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full border border-foreground/40 text-foreground text-[11px] font-display font-semibold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors"
        >
          Agendar demo
        </button>

        {/* Center: Wordmark */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "hero")}
          className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-serif font-semibold tracking-[0.18em] text-foreground uppercase"
        >
          Céntrico
        </a>

        {/* Right: Menu pill */}
        <div className="ml-auto flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-5 mr-2">
            <a href="#modulos" onClick={(e) => handleNavClick(e, "modulos")} className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors">
              Módulos
            </a>
            <a href="#integracoes" onClick={(e) => handleNavClick(e, "integracoes")} className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors">
              Integrações
            </a>
            <a href="#seguranca" onClick={(e) => handleNavClick(e, "seguranca")} className="text-[11px] font-display font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors">
              Segurança
            </a>
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center h-10 px-5 rounded-full border border-foreground/40 text-foreground text-[11px] font-display font-semibold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors"
            aria-label="Toggle menu"
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="sm:hidden">{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-y border-border p-4 flex flex-col gap-1 shadow-lg">
          <a href="#modulos" onClick={(e) => handleNavClick(e, "modulos")} className="text-sm font-display font-semibold uppercase tracking-[0.18em] py-3 text-foreground/80 hover:text-foreground border-b border-border">
            Módulos
          </a>
          <a href="#integracoes" onClick={(e) => handleNavClick(e, "integracoes")} className="text-sm font-display font-semibold uppercase tracking-[0.18em] py-3 text-foreground/80 hover:text-foreground border-b border-border">
            Integrações
          </a>
          <a href="#seguranca" onClick={(e) => handleNavClick(e, "seguranca")} className="text-sm font-display font-semibold uppercase tracking-[0.18em] py-3 text-foreground/80 hover:text-foreground border-b border-border">
            Segurança
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); goToCta(); }}
            className="mt-3 inline-flex items-center justify-center h-11 px-6 rounded-full border border-foreground text-foreground text-xs font-display font-semibold uppercase tracking-[0.18em]"
          >
            Agendar demo
          </button>
        </div>
      )}
    </header>
  );
}
