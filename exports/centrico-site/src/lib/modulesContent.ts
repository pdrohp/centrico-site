import {
  FileText,
  Search,
  History,
  ScanLine,
  Lock,
  Archive,
  Building2,
  Briefcase,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type ModuleKpi = {
  value: string;
  label: string;
};

export type ModuleFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type ModuleCase = {
  icon: LucideIcon;
  sector: string;
  problem: string;
  resolution: string;
};

export type ModuleFaq = {
  q: string;
  a: string;
};

export type ModuleRelated = {
  id: string;
  label: string;
  desc: string;
};

export type ModuleContent = {
  id: string;
  eyebrow: string;
  subheadline: string;
  tags: string[];
  vantagensTitle: string;
  vantagensBody: string;
  kpis: ModuleKpi[];
  features: ModuleFeature[];
  cases: ModuleCase[];
  integrations: string[];
  compliance: string[];
  complianceNote: string;
  faq: ModuleFaq[];
  related: ModuleRelated[];
  ctaHeadline: string;
  ctaSubheadline: string;
};

export const modulesContent: Record<string, ModuleContent | undefined> = {
  ged: {
    id: "ged",
    eyebrow: "Módulo",
    subheadline:
      "O repositório único e pesquisável que substitui pastas locais, drives dispersos e emails extraviados.",
    tags: [
      "Versionamento nativo",
      "Pesquisa semântica",
      "OCR integrado",
      "Retenção legal",
      "Auditoria completa",
      "Acessos granulares",
    ],
    vantagensTitle: "A base de conhecimento que centraliza a vossa operação",
    vantagensBody:
      "A GED é o módulo onde toda a documentação corporativa passa a viver. Substitui pastas partilhadas, drives departamentais e arquivos físicos por um repositório único, pesquisável e auditável. Aplicação direta nos departamentos jurídico, financeiro, administrativo, comercial e RH — qualquer área que produza ou consuma documentos beneficia da centralização.",
    kpis: [
      { value: "−4h", label: "por colaborador a procurar documentos, todos os dias" },
      { value: "+89%", label: "de conformidade auditável face ao processo manual" },
      { value: "1 só", label: "ponto de verdade para toda a documentação corporativa" },
    ],
    features: [
      {
        icon: FileText,
        title: "Repositório único",
        desc: "Toda a documentação corporativa num só lugar, organizada por hierarquia de pastas, etiquetas e metadados configuráveis.",
      },
      {
        icon: History,
        title: "Versionamento automático",
        desc: "Cada alteração gera uma nova versão com autor, data e comentário. Restauro em um clique a qualquer ponto do histórico.",
      },
      {
        icon: Search,
        title: "Pesquisa semântica",
        desc: "Encontre por conteúdo, não apenas por nome do ficheiro. A pesquisa lê PDFs, imagens digitalizadas e documentos Office.",
      },
      {
        icon: ScanLine,
        title: "OCR integrado",
        desc: "Documentos físicos digitalizados tornam-se pesquisáveis automaticamente, com elevada precisão para PT-PT e PT-BR.",
      },
      {
        icon: Lock,
        title: "Acessos granulares",
        desc: "Permissões por utilizador, grupo, departamento ou documento individual, com herança configurável por pasta.",
      },
      {
        icon: Archive,
        title: "Retenção e arquivo",
        desc: "Políticas automáticas de retenção, expurgo e arquivo legal configuradas conforme o tipo documental.",
      },
    ],
    cases: [
      {
        icon: Building2,
        sector: "Indústria",
        problem:
          "Manuais técnicos, certificados e procedimentos espalhados por dezenas de pastas departamentais.",
        resolution:
          "Repositório central com versionamento, garantindo que produção e qualidade consultam sempre a versão vigente.",
      },
      {
        icon: Briefcase,
        sector: "Serviços profissionais",
        problem:
          "Pareceres, propostas e contratos arquivados em drives pessoais, com risco de perda quando o consultor sai.",
        resolution:
          "Toda a produção intelectual fica organizada por cliente e projeto, com pesquisa por conteúdo e acesso permissionado.",
      },
      {
        icon: Stethoscope,
        sector: "Saúde",
        problem:
          "Prontuários, exames e laudos em sistemas isolados, com dificuldade de reconciliação e risco LGPD.",
        resolution:
          "Centralização com OCR para digitalização do legado e controlo de acesso compatível com a legislação de saúde.",
      },
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "SAP",
      "TOTVS",
      "Salesforce",
      "AWS S3",
    ],
    compliance: ["LGPD / RGPD", "ISO 27001", "Retenção legal", "SOC 2"],
    complianceNote:
      "A GED foi desenhada para satisfazer requisitos de conformidade documental europeus e brasileiros, com trilhas de auditoria, retenção configurável e residência de dados na UE.",
    faq: [
      {
        q: "Em quanto tempo conseguimos colocar a GED em produção?",
        a: "Em média quatro semanas, contando configuração da estrutura de pastas, importação inicial de documentos e formação das equipas-chave.",
      },
      {
        q: "Que formatos de ficheiro são suportados?",
        a: "Todos os formatos de Office (Word, Excel, PowerPoint), PDF, imagens (JPG, PNG, TIFF), CAD (DWG), e-mail (.eml, .msg) e ficheiros comprimidos.",
      },
      {
        q: "Como é feita a migração dos documentos atuais?",
        a: "Disponibilizamos conectores para drives partilhados (SharePoint, Google Drive, OneDrive) e migração assistida com preservação de metadados e estrutura de pastas.",
      },
      {
        q: "Conseguimos exportar tudo se um dia decidirmos sair?",
        a: "Sim. A exportação inclui ficheiros originais, metadados, versões e trilha de auditoria, num formato aberto e documentado.",
      },
      {
        q: "A pesquisa funciona em documentos digitalizados?",
        a: "Sim. O OCR integrado processa documentos digitalizados no momento da carga, tornando-os pesquisáveis por conteúdo.",
      },
      {
        q: "Onde ficam alojados os nossos documentos?",
        a: "Em centros de dados europeus (Frankfurt, DE), com replicação na UE. Os dados nunca saem do território europeu.",
      },
    ],
    related: [
      {
        id: "ass",
        label: "Assinaturas",
        desc: "Recolha assinaturas eletrónicas com validade jurídica, sem sair da plataforma.",
      },
      {
        id: "audit",
        label: "Auditoria",
        desc: "Rastreabilidade integral de quem consultou, alterou ou descarregou cada documento.",
      },
      {
        id: "ctrl",
        label: "Acessos",
        desc: "Permissões granulares por utilizador, departamento e documento individual.",
      },
    ],
    ctaHeadline: "Centralize a vossa documentação.",
    ctaSubheadline:
      "Demonstração da GED com a estrutura documental da vossa operação. Trinta minutos.",
  },
};

export function getModuleContent(id: string): ModuleContent | undefined {
  return modulesContent[id];
}

export function hasModuleContent(id: string): boolean {
  return Boolean(modulesContent[id]);
}
