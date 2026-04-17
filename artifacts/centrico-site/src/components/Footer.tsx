import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span className="text-xl font-serif font-semibold tracking-[0.2em] text-foreground uppercase block mb-4">
              Céntrico
            </span>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Plataforma SaaS de gestão documental alojada na Europa. Segura, escalável e disponível em formato whitelabel.
            </p>
          </div>

          <div>
            <h4 className="display-eyebrow text-[10px] text-foreground/70 mb-5">Produto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#modulos" className="hover:text-foreground transition-colors">Módulos</a></li>
              <li><a href="#integracoes" className="hover:text-foreground transition-colors">Integrações</a></li>
              <li><a href="#seguranca" className="hover:text-foreground transition-colors">Segurança</a></li>
            </ul>
          </div>

          <div>
            <h4 className="display-eyebrow text-[10px] text-foreground/70 mb-5">Contactos</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contato@centrico.com.br" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail size={14} className="flex-shrink-0" />
                  <span>contato@centrico.com.br</span>
                </a>
              </li>
              <li>
                <a href="tel:+5511939073709" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone size={14} className="flex-shrink-0" />
                  <span>🇧🇷 +55 11 93907-3709</span>
                </a>
              </li>
              <li>
                <a href="tel:+351916368201" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone size={14} className="flex-shrink-0" />
                  <span>🇵🇹 +351 916 368 201</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} className="flex-shrink-0" />
                  <span>São Paulo, SP – Brasil</span>
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="mailto:contato@centrico.com.br"
                aria-label="Email"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Mail size={14} />
              </a>
              <a
                href="#cta"
                aria-label="Mensagem"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 justify-center md:justify-start">
            <span>Alojado na Europa</span>
            <span>·</span>
            <span>Conformidade RGPD</span>
            <span>·</span>
            <span>ISO 27001</span>
            <span>·</span>
            <span>SOC 2</span>
          </div>
          <p>© 2026 Céntrico. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
