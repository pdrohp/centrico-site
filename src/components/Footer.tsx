import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";
import { CentricoLogo } from "./CentricoLogo";
import { localizePath, type Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    tagline: ["Plataforma de gestão documental,", "segura, escalável e whitelabel."],
    product: "Produto",
    modules: "Módulos",
    integrations: "Integrações",
    security: "Segurança",
    contacts: "Contactos",
    location: "São Paulo, SP – Brasil",
    message: "Mensagem",
    compliance: "Conformidade RGPD",
    privacy: "Política de Privacidade",
    rights: "© 2026 Céntrico. Todos os direitos reservados.",
  },
  en: {
    tagline: ["A secure, scalable and white-label", "document management platform."],
    product: "Product",
    modules: "Modules",
    integrations: "Integrations",
    security: "Security",
    contacts: "Contact",
    location: "São Paulo, SP – Brazil",
    message: "Message",
    compliance: "GDPR compliance",
    privacy: "Privacy Policy",
    rights: "© 2026 Céntrico. All rights reserved.",
  },
};

export function Footer({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  const home = localizePath("/", lang);
  return (
    <footer className="bg-[#000627] text-white border-t border-[#ccd0d7] pt-16 pb-16 px-6 md:px-12 lg:px-36">
      <div className="container max-w-6xl mx-auto px-0 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="/" className="inline-flex items-center mb-4">
              <CentricoLogo height={20} wordmarkColor="#ffffff" />
            </a>
            <p className="text-[14px] leading-[22.75px] text-white max-w-[284px]">
              {t.tagline[0]}
              <br />
              {t.tagline[1]}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-[0.18em] text-white/70 mb-5">
              {t.product}
            </h4>
            <ul className="space-y-3 text-[14px] text-white">
              <li>
                <a href={`${home}#modulos`} className="hover:text-white/70 transition-colors">
                  {t.modules}
                </a>
              </li>
              <li>
                <a href={`${home}#integracoes`} className="hover:text-white/70 transition-colors">
                  {t.integrations}
                </a>
              </li>
              <li>
                <a href={`${home}#seguranca`} className="hover:text-white/70 transition-colors">
                  {t.security}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-[0.18em] text-white/70 mb-5">
              {t.contacts}
            </h4>
            <ul className="space-y-3 text-[14px] text-white">
              <li>
                <a
                  href="mailto:contato@centrico.com.br"
                  className="inline-flex items-center gap-2 hover:text-white/70 transition-colors"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  <span>contato@centrico.com.br</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511939073709"
                  className="inline-flex items-center gap-2 hover:text-white/70 transition-colors"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  <span>🇧🇷 +55 11 93907-3709</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+351916368201"
                  className="inline-flex items-center gap-2 hover:text-white/70 transition-colors"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  <span>🇵🇹 +351 916 368 201</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} className="flex-shrink-0" />
                  <span>{t.location}</span>
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#ccd0d7] bg-white text-[#0e1622] hover:text-[#001ec2] transition-colors"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="mailto:contato@centrico.com.br"
                aria-label="Email"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#ccd0d7] bg-white text-[#0e1622] hover:text-[#001ec2] transition-colors"
              >
                <Mail size={14} />
              </a>
              <a
                href="#cta"
                aria-label={t.message}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#ccd0d7] bg-white text-[#0e1622] hover:text-[#001ec2] transition-colors"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#ccd0d7] flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white uppercase">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 justify-center md:justify-start">
            <span>{t.compliance}</span>
            <span className="text-[#5c6470]">·</span>
            <span>ISO 27001</span>
            <span className="text-[#5c6470]">·</span>
            <span>SOC 2</span>
            <span className="text-[#5c6470]">·</span>
            <a
              href={localizePath("/privacidade", lang)}
              className="hover:text-white/70 transition-colors"
            >
              {t.privacy}
            </a>
          </div>
          <p className="text-[12px] normal-case text-white/70">
            {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
