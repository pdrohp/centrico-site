import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { modules } from "@/lib/data";
import { hasModuleContent } from "@/lib/modulesContent";
import { Button } from "./ui/button";
import { CentricoLogo } from "./CentricoLogo";

// Map each module's `area` (from data.ts) to one of three navbar buckets.
// Every area in the catalog must be mapped here — modules with an unmapped
// area appear in the fallback "Plataforma" bucket so nothing is ever hidden.
const AREA_TO_BUCKET: Record<string, string> = {
  Core: "Gestão Documental",
  Jurídico: "Gestão Documental",
  "Recursos Humanos": "Gestão Documental",
  Operações: "Operação & Compliance",
  Compliance: "Operação & Compliance",
  Segurança: "Operação & Compliance",
  API: "Plataforma",
};

const BUCKET_ORDER = [
  "Gestão Documental",
  "Operação & Compliance",
  "Plataforma",
];

const MODULE_GROUPS = BUCKET_ORDER.map((title) => ({
  title,
  modules: modules.filter(
    (m) => (AREA_TO_BUCKET[m.area] ?? "Plataforma") === title,
  ),
})).filter((g) => g.modules.length > 0);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulosOpen, setModulosOpen] = useState(false);
  const [mobileModulosOpen, setMobileModulosOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setModulosOpen(false);
    setMobileMenuOpen(false);
    setMobileModulosOpen(false);
  }, [location]);

  useEffect(() => {
    if (!modulosOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModulosOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(t) &&
        triggerRef.current &&
        !triggerRef.current.contains(t)
      ) {
        setModulosOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [modulosOpen]);

  const isHome = location === "/";
  const isModulePage = location.startsWith("/modulos/");
  // Home and module pages both have dark heroes; navbar text is white until scrolled
  const onDark = (isHome || isModulePage) && !scrolled && !modulosOpen;

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setModulosOpen(false);
  };

  const goToCta = (e?: React.MouseEvent) => {
    if (isHome) {
      e?.preventDefault();
      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setModulosOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || modulosOpen
          ? "bg-background/85 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between gap-6 relative">
        {/* LEFT — Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <CentricoLogo
            height={18}
            wordmarkColor={onDark ? "#ffffff" : "#00072c"}
            className="transition-all duration-300"
          />
        </Link>

        {/* CENTER — Links */}
        <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setModulosOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={modulosOpen}
            aria-controls="modulos-mega-menu"
            className={`flex items-center gap-1 text-[11px] font-display font-semibold uppercase tracking-[0.18em] transition-colors ${
              modulosOpen
                ? "text-foreground"
                : onDark
                  ? "text-white/80 hover:text-white"
                  : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Módulos
            <ChevronDown
              size={12}
              strokeWidth={2.5}
              className={`transition-transform duration-200 ${
                modulosOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <a
            href={isHome ? "#integracoes" : "/#integracoes"}
            onClick={(e) => handleAnchorClick(e, "integracoes")}
            className={`text-[11px] font-display font-semibold uppercase tracking-[0.18em] transition-colors ${
              onDark ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Integrações
          </a>
          <a
            href={isHome ? "#seguranca" : "/#seguranca"}
            onClick={(e) => handleAnchorClick(e, "seguranca")}
            className={`text-[11px] font-display font-semibold uppercase tracking-[0.18em] transition-colors ${
              onDark ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Segurança
          </a>
        </nav>

        {/* RIGHT — CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            asChild
            variant="square"
            size="squareSm"
            className="hidden md:inline-flex"
          >
            <a href={isHome ? "#cta" : "/#cta"} onClick={goToCta}>
              Agendar demo
            </a>
          </Button>
          <Button
            variant={onDark ? "squareOutlineDark" : "squareLight"}
            size="squareSm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="sm:hidden inline-flex">
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </span>
          </Button>
        </div>
      </div>

      {/* MEGA-DROPDOWN — Módulos */}
      {modulosOpen && (
        <div
          ref={dropdownRef}
          id="modulos-mega-menu"
          role="region"
          aria-label="Menu de módulos"
          className="hidden lg:block absolute top-full left-0 right-0 bg-background border-y border-border shadow-xl animate-in fade-in duration-150"
        >
          <div className="container max-w-7xl mx-auto px-6 md:px-8 py-10">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 grid grid-cols-3 gap-8">
                {MODULE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h4 className="display-eyebrow text-[10px] text-foreground/50 mb-5">
                      {group.title}
                    </h4>
                    <ul className="space-y-4">
                      {group.modules.map((mod) => {
                        const enabled = hasModuleContent(mod.id);
                        const inner = (
                          <>
                            <div className="text-[14px] font-display font-semibold uppercase tracking-[0.05em] text-foreground leading-tight">
                              {mod.label}
                            </div>
                            <div className="text-[12px] text-muted-foreground mt-1 leading-snug">
                              {mod.desc}
                            </div>
                          </>
                        );
                        return (
                          <li key={mod.id}>
                            {enabled ? (
                              <Link
                                href={`/modulos/${mod.id}`}
                                className="block -mx-2 px-2 py-1 rounded-md hover:bg-foreground/5 transition-colors"
                              >
                                {inner}
                              </Link>
                            ) : (
                              <a
                                href={isHome ? "#modulos" : "/#modulos"}
                                onClick={(e) => handleAnchorClick(e, "modulos")}
                                className="block -mx-2 px-2 py-1 rounded-md hover:bg-foreground/5 transition-colors"
                              >
                                {inner}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Highlight card */}
              <div className="col-span-4 bg-primary text-primary-foreground rounded-2xl p-8 flex flex-col">
                <h3 className="display-title text-[22px] md:text-[26px] leading-[1.05] mb-4 text-white">
                  Transforme a vossa gestão documental
                </h3>
                <p className="text-[13px] text-white/75 leading-relaxed mb-6">
                  Demonstração com a estrutura documental da vossa operação.
                  Trinta minutos.
                </p>
                <div className="mt-auto">
                  <Button asChild variant="pillInverse" size="pillSm">
                    <a
                      href={isHome ? "#cta" : "/#cta"}
                      onClick={goToCta}
                    >
                      Solicitar demo →
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-y border-border p-4 flex flex-col gap-1 shadow-lg max-h-[80vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => setMobileModulosOpen((o) => !o)}
            className="flex items-center justify-between text-sm font-display font-semibold uppercase tracking-[0.18em] py-3 text-foreground/80 hover:text-foreground border-b border-border"
            aria-expanded={mobileModulosOpen}
          >
            <span>Módulos</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                mobileModulosOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileModulosOpen && (
            <div className="pl-2 pt-3 pb-3 space-y-5 border-b border-border">
              {MODULE_GROUPS.map((group) => (
                <div key={group.title}>
                  <div className="display-eyebrow text-[10px] text-foreground/50 mb-2">
                    {group.title}
                  </div>
                  <ul className="space-y-1">
                    {group.modules.map((mod) => {
                      const enabled = hasModuleContent(mod.id);
                      return (
                        <li key={mod.id}>
                          {enabled ? (
                            <Link
                              href={`/modulos/${mod.id}`}
                              className="block py-1.5 text-[13px] font-display font-semibold uppercase tracking-[0.05em] text-foreground"
                            >
                              {mod.label}
                            </Link>
                          ) : (
                            <a
                              href={isHome ? "#modulos" : "/#modulos"}
                              onClick={(e) => handleAnchorClick(e, "modulos")}
                              className="block py-1.5 text-[13px] font-display font-semibold uppercase tracking-[0.05em] text-foreground/70"
                            >
                              {mod.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
          <a
            href={isHome ? "#integracoes" : "/#integracoes"}
            onClick={(e) => handleAnchorClick(e, "integracoes")}
            className="text-sm font-display font-semibold uppercase tracking-[0.18em] py-3 text-foreground/80 hover:text-foreground border-b border-border"
          >
            Integrações
          </a>
          <a
            href={isHome ? "#seguranca" : "/#seguranca"}
            onClick={(e) => handleAnchorClick(e, "seguranca")}
            className="text-sm font-display font-semibold uppercase tracking-[0.18em] py-3 text-foreground/80 hover:text-foreground border-b border-border"
          >
            Segurança
          </a>
          <Button asChild variant="square" size="square" className="mt-3 w-full">
            <a href={isHome ? "#cta" : "/#cta"} onClick={goToCta}>
              Agendar demo
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
