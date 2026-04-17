export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
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
            <h4 className="display-eyebrow text-[10px] text-foreground/70 mb-5">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Falar com a equipa comercial</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Apoio ao cliente</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Alojado na Europa</span>
            <span>·</span>
            <span>Conformidade RGPD</span>
          </div>
          <p>© 2026 Céntrico. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
