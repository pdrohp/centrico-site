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
  PenLine,
  CheckCircle,
  Clock,
  UserCheck,
  GitBranch,
  BellRing,
  LayoutList,
  Eye,
  Key,
  ShieldCheck,
  Activity,
  FileCheck,
  ClipboardList,
  AlertCircle,
  Link2,
  Database,
  RefreshCw,
  Zap,
  Puzzle,
  Users,
  UserPlus,
  Calendar,
  Award,
  Layers,
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

  ass: {
    id: "ass",
    eyebrow: "Módulo",
    subheadline:
      "Recolha assinaturas eletrónicas com validade jurídica plena, sem sair da plataforma e sem papel.",
    tags: [
      "Validade jurídica",
      "Qualificada eIDAS",
      "Auditoria completa",
      "Notificações automáticas",
      "Arquivo integrado",
      "Multi-signatário",
    ],
    vantagensTitle: "Contratos assinados em minutos, arquivados automaticamente",
    vantagensBody:
      "O módulo de Assinaturas elimina a necessidade de imprimir, enviar por correio e digitalizar documentos. Qualquer contrato, acordo ou declaração pode ser enviado para assinatura, acompanhado em tempo real e arquivado automaticamente na GED após conclusão. Compatível com os requisitos do Regulamento eIDAS para assinatura eletrónica qualificada.",
    kpis: [
      { value: "−95%", label: "do tempo médio de fecho de contratos face ao processo em papel" },
      { value: "0 €", label: "em custos de impressão, correio e digitalização" },
      { value: "100%", label: "de rastreabilidade — cada assinatura registada com IP, data e hora" },
    ],
    features: [
      {
        icon: PenLine,
        title: "Assinatura eletrónica qualificada",
        desc: "Suporte a assinatura simples, avançada e qualificada conforme o regulamento eIDAS, com certificados de entidades acreditadas.",
      },
      {
        icon: Clock,
        title: "Acompanhamento em tempo real",
        desc: "Visibilidade total do estado de cada pedido: pendente, visualizado, assinado ou recusado, com histórico de eventos.",
      },
      {
        icon: BellRing,
        title: "Notificações automáticas",
        desc: "Lembretes configuráveis para signatários pendentes, com escalada automática ao responsável se o prazo esgotar.",
      },
      {
        icon: CheckCircle,
        title: "Fluxos multi-signatário",
        desc: "Defina ordens de assinatura sequenciais ou paralelas. Cada parte recebe o documento apenas quando é a sua vez.",
      },
      {
        icon: Archive,
        title: "Arquivo automático na GED",
        desc: "O documento assinado é arquivado na GED com todos os signatários, certificado de assinatura e trilha de auditoria.",
      },
      {
        icon: UserCheck,
        title: "Verificação de identidade",
        desc: "Autenticação de dois fatores por SMS ou email para cada signatário, com registo do método utilizado.",
      },
    ],
    cases: [
      {
        icon: Briefcase,
        sector: "Jurídico e consultoria",
        problem:
          "Contratos de prestação de serviços enviados por email, impressos, assinados à mão e devolvidos por correio com demoras de semanas.",
        resolution:
          "Envio digital com rastreio em tempo real, fecho em menos de 24 horas e arquivo automático no dossier do cliente.",
      },
      {
        icon: Building2,
        sector: "Recursos Humanos",
        problem:
          "Admissões demoradas por acumulação de formulários em papel, com risco de extravio de documentos sensíveis.",
        resolution:
          "Onboarding totalmente digital: contrato, termos e declarações assinadas antes do primeiro dia de trabalho.",
      },
      {
        icon: Stethoscope,
        sector: "Saúde",
        problem:
          "Consentimentos informados impressos, assinados e arquivados manualmente, com risco de perda e dificuldade de rastreio.",
        resolution:
          "Consentimentos recolhidos digitalmente com validade jurídica, arquivados automaticamente no processo do utente.",
      },
    ],
    integrations: ["Microsoft 365", "Google Workspace", "Salesforce", "DocuSign", "TOTVS", "SAP"],
    compliance: ["eIDAS", "LGPD / RGPD", "ISO 27001", "Certificado qualificado"],
    complianceNote:
      "O módulo de Assinaturas cumpre o Regulamento eIDAS para assinatura eletrónica qualificada e os requisitos de proteção de dados do RGPD, com residência de dados na UE.",
    faq: [
      {
        q: "A assinatura eletrónica tem validade jurídica em Portugal e no Brasil?",
        a: "Sim. Em Portugal e na UE, cumpre o Regulamento eIDAS. No Brasil, cumpre a MP 2.200-2 e a Lei 14.063/2020 para os níveis simples e avançado.",
      },
      {
        q: "O signatário precisa de ter conta na Céntrico?",
        a: "Não. Os signatários externos recebem um link por email e assinam diretamente no browser, sem necessidade de registo.",
      },
      {
        q: "É possível definir uma ordem de assinatura?",
        a: "Sim. Pode configurar fluxos sequenciais (parte A assina antes da parte B) ou paralelos, com diferentes prazos por signatário.",
      },
      {
        q: "O que acontece se um signatário recusar?",
        a: "O responsável é notificado imediatamente e pode rever o documento, adicionar comentários e reenviar um novo pedido.",
      },
      {
        q: "Como fica arquivado o documento após assinatura?",
        a: "O documento final com o certificado de assinatura incorporado é arquivado automaticamente na GED, na pasta configurada.",
      },
    ],
    related: [
      {
        id: "ged",
        label: "GED",
        desc: "Repositório central onde os contratos assinados ficam arquivados e versionados.",
      },
      {
        id: "proc",
        label: "Processos",
        desc: "Automatize os circuitos de aprovação que antecedem a recolha de assinatura.",
      },
      {
        id: "audit",
        label: "Auditoria",
        desc: "Rastreabilidade integral de todos os eventos associados a cada assinatura.",
      },
    ],
    ctaHeadline: "Feche contratos mais depressa.",
    ctaSubheadline:
      "Demonstração do módulo de Assinaturas com um caso real da vossa operação. Trinta minutos.",
  },

  proc: {
    id: "proc",
    eyebrow: "Módulo",
    subheadline:
      "Circuitos de aprovação e rotinas internas automatizados, sem dependência de email ou intervenção manual.",
    tags: [
      "Fluxos visuais",
      "Aprovações multinível",
      "Prazos e escalada",
      "Notificações automáticas",
      "Integração GED",
      "Relatórios de processo",
    ],
    vantagensTitle: "Processos que avançam sem perseguir aprovações",
    vantagensBody:
      "O módulo de Processos substitui os circuitos de aprovação conduzidos por email por fluxos configuráveis e auditáveis. Define as etapas, os responsáveis e os prazos — a plataforma trata do encaminhamento, das notificações e do registo de cada decisão. Aplicável a qualquer processo documental recorrente: compras, admissões, aprovação de contratos, pedidos internos e muito mais.",
    kpis: [
      { value: "−70%", label: "do tempo de ciclo médio em processos de aprovação multinível" },
      { value: "0", label: "emails de seguimento — cada interveniente sabe o que fazer e quando" },
      { value: "+3×", label: "de processos concluídos por semana face ao fluxo manual" },
    ],
    features: [
      {
        icon: GitBranch,
        title: "Fluxos visuais configuráveis",
        desc: "Desenhe processos com etapas sequenciais, paralelas e condicionais, sem programação. Drag-and-drop intuitivo.",
      },
      {
        icon: LayoutList,
        title: "Aprovações multinível",
        desc: "Defina hierarquias de aprovação com delegação automática quando o responsável está indisponível.",
      },
      {
        icon: BellRing,
        title: "Notificações e prazos",
        desc: "Cada interveniente recebe alertas no momento certo. Prazos configuráveis com escalada automática ao superior.",
      },
      {
        icon: History,
        title: "Histórico completo",
        desc: "Cada decisão fica registada com utilizador, data, hora e comentário. Histórico imutável e auditável.",
      },
      {
        icon: FileText,
        title: "Ligação a documentos",
        desc: "Associe ficheiros da GED a qualquer etapa do processo. O aprovador vê e assina diretamente no fluxo.",
      },
      {
        icon: Activity,
        title: "Dashboard de operação",
        desc: "Visibilidade em tempo real de todos os processos em curso, com filtros por departamento, tipo e estado.",
      },
    ],
    cases: [
      {
        icon: Building2,
        sector: "Financeiro e compras",
        problem:
          "Pedidos de compra circulavam por email com aprovações perdidas, duplicadas ou esquecidas, sem rastreio.",
        resolution:
          "Fluxo digital com aprovação multinível, limites de valor configuráveis e arquivo automático do pedido aprovado.",
      },
      {
        icon: Briefcase,
        sector: "Jurídico",
        problem:
          "Revisão de contratos com múltiplos intervenientes sem visibilidade sobre quem aprovou, quem falta e há quanto tempo.",
        resolution:
          "Circuito de revisão e aprovação com SLA por etapa, histórico de alterações e recolha de assinatura integrada.",
      },
      {
        icon: Users,
        sector: "Recursos Humanos",
        problem:
          "Pedidos de férias, despesas e formação geridos por email sem uniformidade nem rastreio centralizado.",
        resolution:
          "Portal de pedidos com fluxo configurado por tipo, aprovação do responsável direto e notificação automática ao colaborador.",
      },
    ],
    integrations: ["Microsoft 365", "Google Workspace", "SAP", "TOTVS", "Salesforce", "Slack"],
    compliance: ["LGPD / RGPD", "ISO 27001", "SOC 2", "Auditoria completa"],
    complianceNote:
      "Todos os fluxos de processo geram trilhas de auditoria imutáveis, compatíveis com requisitos de conformidade internos e externos, incluindo auditorias ISO e LGPD/RGPD.",
    faq: [
      {
        q: "É necessário saber programar para configurar um processo?",
        a: "Não. O editor de processos é visual e baseado em drag-and-drop. A configuração é feita por gestores de operação, sem envolvimento de TI.",
      },
      {
        q: "Posso criar processos diferentes por departamento?",
        a: "Sim. Cada departamento pode ter os seus próprios modelos de processo, com etapas, responsáveis e prazos independentes.",
      },
      {
        q: "O que acontece se o aprovador estiver de férias?",
        a: "Pode configurar delegações automáticas por período ou ativar escalada ao superior hierárquico após um prazo definido.",
      },
      {
        q: "Os processos podem incluir documentos para assinar?",
        a: "Sim. Em qualquer etapa pode associar um documento da GED e exigir assinatura eletrónica antes de avançar.",
      },
      {
        q: "Consigo acompanhar o tempo médio de cada processo?",
        a: "Sim. O dashboard de operação mostra métricas por tipo de processo: tempo médio, taxa de conclusão e estrangulamentos.",
      },
    ],
    related: [
      {
        id: "ged",
        label: "GED",
        desc: "O repositório onde os documentos gerados nos processos ficam arquivados.",
      },
      {
        id: "ass",
        label: "Assinaturas",
        desc: "Integre recolha de assinatura como etapa de qualquer fluxo de aprovação.",
      },
      {
        id: "audit",
        label: "Auditoria",
        desc: "Trilha imutável de todas as decisões e ações em cada processo.",
      },
    ],
    ctaHeadline: "Elimine os circuitos de aprovação por email.",
    ctaSubheadline:
      "Demonstração do módulo de Processos com um fluxo real da vossa operação. Trinta minutos.",
  },

  ctrl: {
    id: "ctrl",
    eyebrow: "Módulo",
    subheadline:
      "Permissões granulares por utilizador, departamento e documento — a informação certa para a pessoa certa.",
    tags: [
      "RBAC nativo",
      "Herança por pasta",
      "MFA integrado",
      "Acessos temporários",
      "Revisão periódica",
      "Registo de acessos",
    ],
    vantagensTitle: "Controlo total sem bloquear a operação",
    vantagensBody:
      "O módulo de Acessos permite definir com precisão quem pode consultar, editar, partilhar ou eliminar cada recurso na plataforma. Baseado em controlo de acesso por função (RBAC), suporta herança por estrutura de pastas, acessos temporários e revisão periódica de permissões. Indispensável para organizações com dados sensíveis, auditoria externa ou requisitos LGPD/RGPD.",
    kpis: [
      { value: "100%", label: "de visibilidade sobre quem tem acesso a quê, em tempo real" },
      { value: "−80%", label: "de incidentes de acesso indevido face a gestão manual" },
      { value: "< 5 min", label: "para revogar todos os acessos de um colaborador que sai" },
    ],
    features: [
      {
        icon: Key,
        title: "Controlo por função (RBAC)",
        desc: "Atribua funções com conjuntos de permissões predefinidos. Novos utilizadores herdam as permissões da sua função automaticamente.",
      },
      {
        icon: Layers,
        title: "Herança por estrutura",
        desc: "As permissões definem-se ao nível da pasta e propagam-se para o conteúdo, com possibilidade de exceções por documento.",
      },
      {
        icon: Clock,
        title: "Acessos temporários",
        desc: "Conceda acesso a prestadores externos ou colaboradores temporários com data de expiração automática.",
      },
      {
        icon: Eye,
        title: "Registo de acessos",
        desc: "Cada consulta, download ou tentativa de acesso falhada fica registada com utilizador, data, hora e endereço IP.",
      },
      {
        icon: ShieldCheck,
        title: "Revisão periódica",
        desc: "Alertas automáticos para revisão de permissões de contas inativas, acessos privilegiados e colaboradores que mudaram de função.",
      },
      {
        icon: UserCheck,
        title: "MFA integrado",
        desc: "Autenticação multifator obrigatória para acessos a recursos sensíveis, configurável por nível de classificação.",
      },
    ],
    cases: [
      {
        icon: Briefcase,
        sector: "Serviços financeiros",
        problem:
          "Documentos de due diligence e relatórios financeiros acessíveis a mais colaboradores do que o necessário, com risco regulatório.",
        resolution:
          "Estrutura de acessos por projeto e função, com revisão trimestral automatizada e revogação imediata ao encerrar cada processo.",
      },
      {
        icon: Stethoscope,
        sector: "Saúde",
        problem:
          "Dados clínicos partilhados entre departamentos sem controlo, em incumprimento com a legislação de proteção de dados.",
        resolution:
          "Modelo de acesso baseado no princípio do mínimo privilégio, com registo de cada consulta e relatórios para auditoria RGPD.",
      },
      {
        icon: Building2,
        sector: "Indústria",
        problem:
          "Saída de colaboradores sem revogação imediata de acessos, com risco de fuga de propriedade intelectual.",
        resolution:
          "Revogação centralizada e imediata de todos os acessos, integrada com o processo de offboarding do módulo de RH.",
      },
    ],
    integrations: ["Microsoft 365", "Google Workspace", "Active Directory", "Okta", "SAP", "TOTVS"],
    compliance: ["LGPD / RGPD", "ISO 27001", "SOC 2", "NIS2"],
    complianceNote:
      "O módulo de Acessos implementa o princípio do mínimo privilégio e mantém registos completos de auditoria compatíveis com RGPD, ISO 27001 e NIS2.",
    faq: [
      {
        q: "Posso integrar com o Active Directory ou Okta da empresa?",
        a: "Sim. O módulo sincroniza utilizadores e grupos com diretórios LDAP/AD e IdPs compatíveis com SAML 2.0 e OIDC.",
      },
      {
        q: "Como são geridos os acessos quando um colaborador muda de departamento?",
        a: "A mudança de função atualiza automaticamente as permissões associadas. As permissões anteriores são revogadas e o evento fica registado.",
      },
      {
        q: "É possível dar acesso a externos sem criar uma conta completa?",
        a: "Sim. Os acessos de convidado têm escopo limitado, data de expiração e não consomem licença de utilizador interno.",
      },
      {
        q: "Como funciona a revisão periódica de acessos?",
        a: "O sistema envia alertas aos responsáveis para confirmar ou revogar acessos de utilizadores inativos ou com funções alteradas.",
      },
      {
        q: "Consigo ver quem acedeu a um documento específico?",
        a: "Sim. O registo de acessos por documento mostra cada consulta, download e tentativa falhada, exportável para auditoria.",
      },
    ],
    related: [
      {
        id: "ged",
        label: "GED",
        desc: "O repositório onde as permissões de acesso a documentos são aplicadas.",
      },
      {
        id: "audit",
        label: "Auditoria",
        desc: "Registo imutável de todos os acessos e operações realizadas na plataforma.",
      },
      {
        id: "rh",
        label: "RH",
        desc: "Integração com o ciclo de vida do colaborador para automatizar provisionamento e revogação de acessos.",
      },
    ],
    ctaHeadline: "Saiba sempre quem acede ao quê.",
    ctaSubheadline:
      "Demonstração do módulo de Acessos com a estrutura da vossa organização. Trinta minutos.",
  },

  audit: {
    id: "audit",
    eyebrow: "Módulo",
    subheadline:
      "Rastreabilidade integral de todas as ações na plataforma — um registo inalterável para conformidade e investigação.",
    tags: [
      "Trilha imutável",
      "Alertas em tempo real",
      "Exportação para auditores",
      "Retenção configurável",
      "Relatórios automáticos",
      "Deteção de anomalias",
    ],
    vantagensTitle: "Conformidade que se demonstra, não se declara",
    vantagensBody:
      "O módulo de Auditoria regista automaticamente cada ação realizada na plataforma: consultas, edições, downloads, partilhas, aprovações e acessos falhados. O registo é imutável — nenhum utilizador, incluindo administradores, pode apagar ou alterar entradas. Concebido para responder a auditorias externas, investigações internas e requisitos regulatórios sem esforço adicional.",
    kpis: [
      { value: "100%", label: "das ações registadas automaticamente, sem configuração adicional" },
      { value: "< 2 min", label: "para extrair o relatório de auditoria de qualquer utilizador ou documento" },
      { value: "7 anos", label: "de retenção de logs configurável por política de conformidade" },
    ],
    features: [
      {
        icon: ClipboardList,
        title: "Trilha de auditoria imutável",
        desc: "Cada evento é registado com timestamp, utilizador, ação, recurso e endereço IP. Nenhum registo pode ser alterado ou eliminado.",
      },
      {
        icon: AlertCircle,
        title: "Alertas de anomalia",
        desc: "Deteção automática de comportamentos suspeitos: downloads massivos, acessos fora de horas ou tentativas repetidas falhadas.",
      },
      {
        icon: FileCheck,
        title: "Relatórios para auditores",
        desc: "Exportação em PDF ou CSV com filtros por utilizador, documento, período e tipo de ação. Prontos para entrega a auditores.",
      },
      {
        icon: Activity,
        title: "Dashboard em tempo real",
        desc: "Visibilidade imediata da atividade da plataforma, com métricas de utilização e destacação de eventos críticos.",
      },
      {
        icon: Archive,
        title: "Retenção configurável",
        desc: "Defina políticas de retenção de logs por tipo de evento ou conformidade aplicável, com arquivo seguro de longa duração.",
      },
      {
        icon: Search,
        title: "Pesquisa avançada de eventos",
        desc: "Filtre o histórico por qualquer combinação de utilizador, recurso, ação e período. Resultados em segundos.",
      },
    ],
    cases: [
      {
        icon: Briefcase,
        sector: "Serviços financeiros",
        problem:
          "Auditoria regulatória exigiu prova de quem acedeu a informação confidencial num período de 18 meses, sem sistema centralizado.",
        resolution:
          "Exportação do histórico completo em minutos, com filtros por utilizador e documento, entregue ao auditor sem intervenção de TI.",
      },
      {
        icon: Building2,
        sector: "Indústria",
        problem:
          "Suspeita de fuga de informação técnica sem capacidade de apurar quem descarregou os ficheiros nem quando.",
        resolution:
          "Investigação concluída em menos de uma hora com o registo detalhado de todos os acessos e downloads ao longo dos últimos 90 dias.",
      },
      {
        icon: Stethoscope,
        sector: "Saúde",
        problem:
          "Requisito RGPD de demonstrar quem acedeu a dados de saúde e com que finalidade, sem registo sistemático.",
        resolution:
          "Relatórios automáticos mensais de acesso a registos clínicos, com alertas imediatos para acessos fora do âmbito definido.",
      },
    ],
    integrations: ["Microsoft 365", "Google Workspace", "SAP", "SIEM / Splunk", "TOTVS", "Slack"],
    compliance: ["LGPD / RGPD", "ISO 27001", "SOC 2", "NIS2", "Basileia III"],
    complianceNote:
      "O módulo de Auditoria foi concebido para satisfazer os requisitos de rastreabilidade do RGPD, ISO 27001, SOC 2 e NIS2, com registos imutáveis e retenção configurável até 10 anos.",
    faq: [
      {
        q: "Os administradores podem apagar registos de auditoria?",
        a: "Não. Os registos são imutáveis por design. Nenhum utilizador, incluindo administradores da plataforma, pode alterar ou eliminar entradas.",
      },
      {
        q: "Durante quanto tempo são conservados os registos?",
        a: "O período de retenção é configurável por política, com mínimo de 1 ano e máximo de 10 anos. O padrão é 7 anos.",
      },
      {
        q: "Posso receber alertas quando ocorrem ações específicas?",
        a: "Sim. Pode configurar alertas por tipo de ação, utilizador, documento ou padrão de comportamento, entregues por email ou webhook.",
      },
      {
        q: "Os relatórios de auditoria são aceites em auditorias externas?",
        a: "Sim. Os relatórios exportados incluem metadados de integridade (hash) que permitem verificar que não foram adulterados.",
      },
      {
        q: "É possível integrar com o SIEM da empresa?",
        a: "Sim. O módulo exporta eventos em tempo real para SIEMs compatíveis via webhook ou API REST.",
      },
    ],
    related: [
      {
        id: "ctrl",
        label: "Acessos",
        desc: "Controlo granular de permissões que complementa a rastreabilidade da auditoria.",
      },
      {
        id: "ged",
        label: "GED",
        desc: "O repositório cujas ações ficam integralmente registadas no módulo de auditoria.",
      },
      {
        id: "proc",
        label: "Processos",
        desc: "Trilha de cada decisão e aprovação em fluxos de trabalho documentais.",
      },
    ],
    ctaHeadline: "Demonstre conformidade sem esforço.",
    ctaSubheadline:
      "Demonstração do módulo de Auditoria com um cenário real da vossa operação. Trinta minutos.",
  },

  integ: {
    id: "integ",
    eyebrow: "Módulo",
    subheadline:
      "Conectores nativos e API aberta que colocam a Céntrico no centro do ecossistema de ferramentas da vossa organização.",
    tags: [
      "API REST aberta",
      "Webhooks",
      "Conectores nativos",
      "Sincronização bidirecional",
      "Low-code",
      "Documentação completa",
    ],
    vantagensTitle: "A plataforma que se adapta ao vosso ecossistema",
    vantagensBody:
      "O módulo de Integrações elimina os silos de informação entre a Céntrico e os sistemas que a vossa equipa já utiliza. Com conectores nativos para as principais ferramentas de ERP, CRM, produtividade e comunicação, e uma API REST documentada para integrações à medida, a plataforma encaixa na infraestrutura existente sem obrigar a substituições.",
    kpis: [
      { value: "+40", label: "conectores nativos disponíveis no catálogo de integrações" },
      { value: "< 1 dia", label: "para ligar a Céntrico ao ERP ou CRM já em uso na organização" },
      { value: "0", label: "duplicações de dados — sincronização bidirecional automática" },
    ],
    features: [
      {
        icon: Puzzle,
        title: "Conectores nativos",
        desc: "Biblioteca de conectores pré-construídos para Microsoft 365, Google Workspace, SAP, TOTVS, Salesforce, Slack e mais.",
      },
      {
        icon: Link2,
        title: "API REST documentada",
        desc: "API completa com autenticação OAuth 2.0, documentação OpenAPI e ambiente de sandbox para desenvolvimento.",
      },
      {
        icon: RefreshCw,
        title: "Sincronização bidirecional",
        desc: "Dados atualizados na Céntrico refletem-se nos sistemas ligados e vice-versa, sem intervenção manual.",
      },
      {
        icon: Zap,
        title: "Webhooks em tempo real",
        desc: "Notifique sistemas externos de qualquer evento na plataforma: documento carregado, processo aprovado, assinatura concluída.",
      },
      {
        icon: Database,
        title: "Mapeamento de dados",
        desc: "Interface visual para mapear campos entre sistemas, sem código. Transformações simples configuráveis no editor.",
      },
      {
        icon: Activity,
        title: "Monitorização de fluxos",
        desc: "Dashboard de saúde das integrações com alertas de falha, histórico de chamadas e reprocessamento de erros.",
      },
    ],
    cases: [
      {
        icon: Building2,
        sector: "Indústria",
        problem:
          "Documentos técnicos gerados no SAP precisavam de ser carregados manualmente na GED, com risco de versões desatualizadas.",
        resolution:
          "Conector SAP sincroniza automaticamente os documentos de produção para a GED, com metadados mapeados e versionamento preservado.",
      },
      {
        icon: Briefcase,
        sector: "Serviços profissionais",
        problem:
          "Propostas e contratos criados no CRM não chegavam ao repositório documental, fragmentando o historial do cliente.",
        resolution:
          "Integração Salesforce → GED arquiva automaticamente cada proposta e contrato no dossier do cliente, em tempo real.",
      },
      {
        icon: Stethoscope,
        sector: "Saúde",
        problem:
          "Sistema de gestão clínica não comunicava com o arquivo documental, obrigando a duplicação de ficheiros.",
        resolution:
          "API personalizada sincroniza registos clínicos com a GED, mantendo uma única fonte de verdade com controlo de acesso RGPD.",
      },
    ],
    integrations: ["Microsoft 365", "Google Workspace", "SAP", "TOTVS", "Salesforce", "Slack", "AWS S3", "Zapier"],
    compliance: ["LGPD / RGPD", "ISO 27001", "OAuth 2.0", "OpenAPI 3.0"],
    complianceNote:
      "Todas as integrações utilizam autenticação OAuth 2.0 e comunicação encriptada TLS 1.3. Os dados em trânsito nunca são armazenados fora do território europeu.",
    faq: [
      {
        q: "A API é documentada e aberta?",
        a: "Sim. A API REST é documentada em OpenAPI 3.0 e inclui um ambiente de sandbox para teste sem afetar dados de produção.",
      },
      {
        q: "Consigo ligar a Céntrico a uma ferramenta que não está no catálogo?",
        a: "Sim. A API REST e os webhooks permitem integrar qualquer sistema. A equipa técnica da Céntrico apoia na configuração inicial.",
      },
      {
        q: "As integrações funcionam em tempo real ou em batch?",
        a: "Depende do conector. A maioria suporta ambos os modos. Os webhooks são sempre em tempo real.",
      },
      {
        q: "O que acontece se uma integração falhar?",
        a: "O sistema regista o erro, notifica o responsável e coloca a mensagem em fila para reprocessamento automático.",
      },
      {
        q: "Posso usar ferramentas de low-code como Zapier ou Make?",
        a: "Sim. A Céntrico é compatível com Zapier, Make e n8n através de conectores nativos ou via webhooks genéricos.",
      },
    ],
    related: [
      {
        id: "ged",
        label: "GED",
        desc: "O repositório central que recebe e organiza os documentos sincronizados via integrações.",
      },
      {
        id: "proc",
        label: "Processos",
        desc: "Fluxos de aprovação que podem ser despoletados por eventos em sistemas externos.",
      },
      {
        id: "audit",
        label: "Auditoria",
        desc: "Registo de todas as operações realizadas por integrações externas na plataforma.",
      },
    ],
    ctaHeadline: "Ligue a Céntrico aos vossos sistemas.",
    ctaSubheadline:
      "Demonstração com o mapa de integrações da vossa infraestrutura atual. Trinta minutos.",
  },

  rh: {
    id: "rh",
    eyebrow: "Módulo",
    subheadline:
      "Admissão digital, gestão contratual, férias e cessações — todo o ciclo de vida do colaborador numa só plataforma.",
    tags: [
      "Onboarding digital",
      "Gestão contratual",
      "Férias e ausências",
      "Assinatura integrada",
      "Arquivo legal",
      "Portal do colaborador",
    ],
    vantagensTitle: "Menos burocracia, mais tempo para as pessoas",
    vantagensBody:
      "O módulo de RH digitaliza todo o ciclo de vida do colaborador, da admissão à cessação. Centraliza contratos, adendas, declarações e documentos de formação, com recolha de assinatura integrada e arquivo automático. O portal do colaborador permite acesso a recibos de vencimento, declarações e pedidos de férias, reduzindo a carga administrativa do departamento de RH.",
    kpis: [
      { value: "−60%", label: "do tempo gasto em tarefas administrativas no departamento de RH" },
      { value: "1 dia", label: "para completar o processo de admissão de um novo colaborador" },
      { value: "0 papel", label: "no circuito documental de RH, da admissão à cessação" },
    ],
    features: [
      {
        icon: UserPlus,
        title: "Onboarding digital",
        desc: "Processo de admissão guiado com checklist configurável: contrato, termos, formulários e documentação entregues e assinados digitalmente.",
      },
      {
        icon: FileText,
        title: "Gestão contratual",
        desc: "Arquivo centralizado de contratos, adendas e renovações com alertas automáticos de fim de prazo e renovação.",
      },
      {
        icon: Calendar,
        title: "Férias e ausências",
        desc: "Portal de pedidos de férias com aprovação pelo responsável direto, saldo atualizado em tempo real e sincronização com calendário.",
      },
      {
        icon: Award,
        title: "Formação e certificações",
        desc: "Registo de formações, certificados e competências por colaborador, com alertas de renovação de certificações.",
      },
      {
        icon: Users,
        title: "Portal do colaborador",
        desc: "Acesso self-service a recibos de vencimento, declarações, histórico contratual e pedidos, sem passar pelo departamento de RH.",
      },
      {
        icon: Archive,
        title: "Offboarding e arquivo legal",
        desc: "Processo de saída com checklist, revogação automática de acessos e arquivo do dossier do colaborador pelo período legal.",
      },
    ],
    cases: [
      {
        icon: Building2,
        sector: "Indústria",
        problem:
          "Processo de admissão de operadores com dezenas de formulários em papel, demoras de dias e risco de dossiers incompletos.",
        resolution:
          "Onboarding digital com checklist automática: o novo colaborador assina tudo antes do primeiro dia, o dossier fica completo e arquivado.",
      },
      {
        icon: Briefcase,
        sector: "Serviços profissionais",
        problem:
          "Gestão de contratos de consultores com renovações esquecidas e adendas dispersas por email e drives pessoais.",
        resolution:
          "Repositório centralizado com alertas automáticos de renovação e histórico contratual completo por colaborador.",
      },
      {
        icon: Stethoscope,
        sector: "Saúde",
        problem:
          "Pedidos de férias e escalas geridos por email e folhas de cálculo sem visibilidade centralizada para a gestão.",
        resolution:
          "Portal de férias com aprovação automatizada, visão de equipa em calendário e integração com o sistema de escalas.",
      },
    ],
    integrations: ["Microsoft 365", "Google Workspace", "SAP HCM", "TOTVS RH", "Factorial", "Personio"],
    compliance: ["LGPD / RGPD", "Código do Trabalho PT", "CLT BR", "ISO 27001"],
    complianceNote:
      "O módulo de RH cumpre os requisitos de arquivo documental do Código do Trabalho português e da CLT brasileira, com retenção configurável e acessos restritos por função.",
    faq: [
      {
        q: "O colaborador precisa de acesso à plataforma para assinar os documentos de admissão?",
        a: "Não. O colaborador recebe um link por email e assina diretamente no browser, antes mesmo de ter conta criada na plataforma.",
      },
      {
        q: "Durante quanto tempo ficam arquivados os dossiers dos colaboradores que saem?",
        a: "O período de arquivo é configurável conforme a legislação aplicável. O padrão é 5 anos para legislação portuguesa e 2 anos para brasileira.",
      },
      {
        q: "Posso integrar com o sistema de processamento salarial?",
        a: "Sim. O módulo exporta dados para os principais sistemas de payroll via API ou ficheiro, com mapeamento configurável de campos.",
      },
      {
        q: "O portal do colaborador está disponível em mobile?",
        a: "Sim. O portal está otimizado para mobile, permitindo ao colaborador consultar documentos e submeter pedidos a partir do telemóvel.",
      },
      {
        q: "É possível configurar alertas para renovações contratuais?",
        a: "Sim. Pode definir alertas com antecedência configurável (90, 60 ou 30 dias) para contratos a termo e renovações automáticas.",
      },
    ],
    related: [
      {
        id: "ass",
        label: "Assinaturas",
        desc: "Recolha assinaturas em contratos e documentos de RH com validade jurídica plena.",
      },
      {
        id: "ctrl",
        label: "Acessos",
        desc: "Automatize o provisionamento e revogação de acessos integrado com o ciclo de vida do colaborador.",
      },
      {
        id: "ged",
        label: "GED",
        desc: "Repositório onde todos os dossiers de colaboradores ficam centralizados e seguros.",
      },
    ],
    ctaHeadline: "Digitalize a gestão de pessoas.",
    ctaSubheadline:
      "Demonstração do módulo de RH com o processo de admissão da vossa empresa. Trinta minutos.",
  },
};

export function getModuleContent(id: string): ModuleContent | undefined {
  return modulesContent[id];
}

export function hasModuleContent(id: string): boolean {
  return Boolean(modulesContent[id]);
}
