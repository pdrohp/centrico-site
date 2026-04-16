export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <span className="text-xl font-serif font-semibold tracking-wider text-primary uppercase block mb-4">
              Céntrico
            </span>
            <p className="text-muted-foreground text-sm max-w-xs">
              Plataforma SaaS de gestão documental alojada na Europa. Segura, escalável e disponível em formato whitelabel.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Produto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#modulos" className="hover:text-primary transition-colors">Módulos</a></li>
              <li><a href="#integracoes" className="hover:text-primary transition-colors">Integrações</a></li>
              <li><a href="#seguranca" className="hover:text-primary transition-colors">Segurança</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Falar com a equipa comercial</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Apoio ao cliente</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4 font-medium">
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
