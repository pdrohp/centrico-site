/**
 * Tradução inicial para inglês do conteúdo que está no Sanity. Usada apenas por
 * scripts/seed-en.ts para preencher os campos "English" de cada documento.
 * Depois disso, o Studio passa a ser a fonte de verdade também para o inglês.
 *
 * As listas (indicadores, funcionalidades, casos, FAQ, relacionados) seguem a
 * mesma ordem das listas em português — os ícones vêm sempre da versão PT.
 */

type ModuleEn = {
  title: string;
  desc: string;
  headline: string;
  body: string;
  page: {
    eyebrow: string;
    subheadline: string;
    tags: string[];
    vantagensTitle: string;
    vantagensBody: string;
    kpis: { value: string; label: string }[];
    features: { title: string; desc: string }[];
    cases: { sector: string; problem: string; resolution: string }[];
    compliance: string[];
    complianceNote: string;
    faq: { q: string; a: string }[];
    related: { desc: string }[];
    ctaHeadline: string;
    ctaSubheadline: string;
  };
};

export const siteSettingsEn = {
  title: "Céntrico — Intelligent document management",
  description:
    "Céntrico brings everything together in one platform. One system, your brand, the modules your operation needs. Enterprise document management with full GDPR compliance and hosting in Europe.",
  ogDescription:
    "Complete document management for companies. Hosted in Europe, fully GDPR compliant.",
};

export const workflowCategoriesEn: Record<string, string> = {
  "workflowCategory-ia-estrategica": "Strategic AI",
  "workflowCategory-automacao-de-processos": "Process Automation",
  "workflowCategory-recursos-avancados": "Advanced Features",
};

export const workflowModulesEn: Record<string, { title: string; desc: string }> = {
  "workflowModule-auto-dados": { title: "Data Automation", desc: "Automatic extraction of the key information." },
  "workflowModule-gestao-contratos": { title: "Contract Management", desc: "Organise, track and automate contracts." },
  "workflowModule-compliance": { title: "Compliance & Security", desc: "End-to-end protection and GDPR compliance." },
  "workflowModule-workflows": { title: "Smart Workflows", desc: "Automate tasks and reduce operational errors." },
  "workflowModule-gestao-docs": { title: "Document Management", desc: "Centralise your files and find them with ease." },
  "workflowModule-integracoes": { title: "Integrations", desc: "Connect systems and streamline workflows." },
  "workflowModule-ocr": { title: "Smart OCR", desc: "Digitise paper documents with high accuracy." },
  "workflowModule-analytics": { title: "Analytics", desc: "Detailed reports and timely indicators." },
  "workflowModule-seg-avancada": { title: "Advanced Security", desc: "Top-level encryption and access control." },
};

export const modulesEn: Record<string, ModuleEn> = {
  "module-ged": {
    title: "DMS",
    desc: "Store, organise and version-control your documents",
    headline: "The foundation of all your organisation's knowledge.",
    body: "Centralise company files with full security and version history. Forget local folders and lost emails: get a single, searchable and structured repository for your whole operation.",
    page: {
      eyebrow: "Module",
      subheadline: "The single, searchable repository that replaces local folders, scattered drives and lost emails.",
      tags: ["Native versioning", "Semantic search", "Built-in OCR", "Legal retention", "Full audit trail", "Granular access"],
      vantagensTitle: "The knowledge base that centralises your operation",
      vantagensBody:
        "The DMS is the module where all your company documentation lives. It replaces shared folders, departmental drives and paper archives with a single, searchable and auditable repository. It applies directly to legal, finance, administration, sales and HR — any area that produces or uses documents benefits from centralisation.",
      kpis: [
        { value: "−4h", label: "per employee spent searching for documents, every day" },
        { value: "+89%", label: "auditable compliance compared with the manual process" },
        { value: "1", label: "single source of truth for all company documentation" },
      ],
      features: [
        { title: "Single repository", desc: "All company documentation in one place, organised by folder hierarchy, tags and configurable metadata." },
        { title: "Automatic versioning", desc: "Every change creates a new version with author, date and comment. Restore any point in the history in one click." },
        { title: "Semantic search", desc: "Search by content, not just file name. Search reads PDFs, scanned images and Office documents." },
        { title: "Built-in OCR", desc: "Scanned paper documents become searchable automatically, with high accuracy for Portuguese and English." },
        { title: "Granular access", desc: "Permissions by user, group, department or individual document, with configurable inheritance per folder." },
        { title: "Retention and archiving", desc: "Automatic retention, disposal and legal archiving policies configured by document type." },
      ],
      cases: [
        {
          sector: "Manufacturing",
          problem: "Technical manuals, certificates and procedures scattered across dozens of departmental folders.",
          resolution: "A central, versioned repository, so production and quality teams always consult the current version.",
        },
        {
          sector: "Professional services",
          problem: "Opinions, proposals and contracts stored on personal drives, at risk of being lost when a consultant leaves.",
          resolution: "All intellectual output organised by client and project, with full-text search and permission-based access.",
        },
        {
          sector: "Healthcare",
          problem: "Medical records, test results and reports in isolated systems, hard to reconcile and a data protection risk.",
          resolution: "Centralisation with OCR to digitise the legacy archive and access control aligned with healthcare legislation.",
        },
      ],
      compliance: ["GDPR / LGPD", "ISO 27001", "Legal retention", "SOC 2"],
      complianceNote:
        "The DMS was designed to meet European and Brazilian document compliance requirements, with audit trails, configurable retention and data residency in the EU.",
      faq: [
        { q: "How long does it take to put the DMS into production?", a: "Four weeks on average, including setting up the folder structure, the initial document import and training for key teams." },
        { q: "Which file formats are supported?", a: "All Office formats (Word, Excel, PowerPoint), PDF, images (JPG, PNG, TIFF), CAD (DWG), email (.eml, .msg) and compressed files." },
        { q: "How are our current documents migrated?", a: "We provide connectors for shared drives (SharePoint, Google Drive, OneDrive) and assisted migration that preserves metadata and folder structure." },
        { q: "Can we export everything if we ever decide to leave?", a: "Yes. The export includes original files, metadata, versions and the audit trail, in an open, documented format." },
        { q: "Does search work on scanned documents?", a: "Yes. The built-in OCR processes scanned documents on upload, making their content searchable." },
        { q: "Where are our documents hosted?", a: "In European data centres (Frankfurt, DE), with replication within the EU. Your data never leaves European territory." },
      ],
      related: [
        { desc: "Collect legally valid electronic signatures without leaving the platform." },
        { desc: "Full traceability of who viewed, changed or downloaded each document." },
        { desc: "Granular permissions by user, department and individual document." },
      ],
      ctaHeadline: "Centralise your documentation.",
      ctaSubheadline: "A DMS demo built on your operation's document structure. Thirty minutes.",
    },
  },

  "module-ass": {
    title: "Signatures",
    desc: "Fully legally valid signatures, without paper",
    headline: "Contracts signed in minutes.",
    body: "Collect electronic signatures with recognised legal validity without leaving the platform. Track their status in real time and automatically archive the final document in the repository.",
    page: {
      eyebrow: "Module",
      subheadline: "Collect fully legally valid electronic signatures, without leaving the platform and without paper.",
      tags: ["Legally valid", "eIDAS qualified", "Full audit trail", "Automatic notifications", "Built-in archiving", "Multiple signers"],
      vantagensTitle: "Contracts signed in minutes, archived automatically",
      vantagensBody:
        "The Signatures module removes the need to print, post and scan documents. Any contract, agreement or declaration can be sent for signature, tracked in real time and automatically archived in the DMS once complete. Compatible with the eIDAS Regulation requirements for qualified electronic signatures.",
      kpis: [
        { value: "−95%", label: "average contract turnaround time compared with paper" },
        { value: "€0", label: "in printing, postage and scanning costs" },
        { value: "100%", label: "traceability — every signature logged with IP, date and time" },
      ],
      features: [
        { title: "Qualified electronic signature", desc: "Support for simple, advanced and qualified signatures under the eIDAS regulation, with certificates from accredited providers." },
        { title: "Real-time tracking", desc: "Full visibility of each request's status: pending, viewed, signed or declined, with an event history." },
        { title: "Automatic notifications", desc: "Configurable reminders for pending signers, with automatic escalation to the owner when the deadline passes." },
        { title: "Multi-signer workflows", desc: "Set sequential or parallel signing orders. Each party receives the document only when it is their turn." },
        { title: "Automatic archiving in the DMS", desc: "The signed document is archived in the DMS with every signer, the signature certificate and the audit trail." },
        { title: "Identity verification", desc: "Two-factor authentication by SMS or email for each signer, with the method used recorded." },
      ],
      cases: [
        {
          sector: "Legal and consulting",
          problem: "Service contracts sent by email, printed, signed by hand and returned by post, with weeks of delay.",
          resolution: "Digital sending with real-time tracking, closing in under 24 hours and automatic archiving in the client file.",
        },
        {
          sector: "Human Resources",
          problem: "Slow onboarding due to piles of paper forms, with the risk of losing sensitive documents.",
          resolution: "Fully digital onboarding: contract, terms and declarations signed before the first day of work.",
        },
        {
          sector: "Healthcare",
          problem: "Informed consent forms printed, signed and filed by hand, at risk of loss and hard to trace.",
          resolution: "Legally valid consent collected digitally and archived automatically in the patient's record.",
        },
      ],
      compliance: ["eIDAS", "GDPR / LGPD", "ISO 27001", "Qualified certificate"],
      complianceNote:
        "The Signatures module complies with the eIDAS Regulation for qualified electronic signatures and with GDPR data protection requirements, with data residency in the EU.",
      faq: [
        { q: "Are electronic signatures legally valid in Portugal and Brazil?", a: "Yes. In Portugal and the EU, they comply with the eIDAS Regulation. In Brazil, they comply with MP 2.200-2 and Law 14.063/2020 for simple and advanced levels." },
        { q: "Do signers need a Céntrico account?", a: "No. External signers receive a link by email and sign directly in the browser, with no registration needed." },
        { q: "Can we set a signing order?", a: "Yes. You can configure sequential flows (party A signs before party B) or parallel ones, with different deadlines per signer." },
        { q: "What happens if a signer declines?", a: "The owner is notified immediately and can review the document, add comments and send a new request." },
        { q: "How is the document archived after signing?", a: "The final document, with the signature certificate embedded, is archived automatically in the configured DMS folder." },
      ],
      related: [
        { desc: "The central repository where signed contracts are archived and versioned." },
        { desc: "Automate the approval flows that come before collecting a signature." },
        { desc: "Full traceability of every event linked to each signature." },
      ],
      ctaHeadline: "Close contracts faster.",
      ctaSubheadline: "A Signatures demo with a real case from your operation. Thirty minutes.",
    },
  },

  "module-proc": {
    title: "Processes",
    desc: "Automate approval flows and internal routines",
    headline: "Work moves forward without relying on email.",
    body: "Design approval flows that route requests between departments automatically. Remove manual bottlenecks and make sure every step is properly recorded and auditable.",
    page: {
      eyebrow: "Module",
      subheadline: "Automated approval flows and internal routines, with no reliance on email or manual intervention.",
      tags: ["Visual workflows", "Multi-level approvals", "Deadlines and escalation", "Automatic notifications", "DMS integration", "Process reports"],
      vantagensTitle: "Processes that move forward without chasing approvals",
      vantagensBody:
        "The Processes module replaces email-driven approval chains with configurable, auditable workflows. You define the steps, owners and deadlines — the platform handles routing, notifications and recording every decision. It applies to any recurring document process: purchasing, onboarding, contract approval, internal requests and much more.",
      kpis: [
        { value: "−70%", label: "average cycle time in multi-level approval processes" },
        { value: "0", label: "follow-up emails — everyone knows what to do and when" },
        { value: "+3×", label: "processes completed per week compared with the manual flow" },
      ],
      features: [
        { title: "Configurable visual workflows", desc: "Design processes with sequential, parallel and conditional steps, without code. Intuitive drag-and-drop." },
        { title: "Multi-level approvals", desc: "Set approval hierarchies with automatic delegation when the owner is unavailable." },
        { title: "Notifications and deadlines", desc: "Everyone involved is alerted at the right moment. Configurable deadlines with automatic escalation to a manager." },
        { title: "Complete history", desc: "Every decision is recorded with user, date, time and comment. An immutable, auditable history." },
        { title: "Linked documents", desc: "Attach DMS files to any process step. Approvers view and sign directly in the workflow." },
        { title: "Operations dashboard", desc: "Real-time visibility of all ongoing processes, with filters by department, type and status." },
      ],
      cases: [
        {
          sector: "Finance and purchasing",
          problem: "Purchase requests circulated by email, with approvals lost, duplicated or forgotten and no tracking.",
          resolution: "A digital flow with multi-level approval, configurable value limits and automatic archiving of the approved request.",
        },
        {
          sector: "Legal",
          problem: "Contract reviews with many people involved and no visibility of who approved, who is pending and for how long.",
          resolution: "A review and approval flow with per-step SLAs, change history and built-in signature collection.",
        },
        {
          sector: "Human Resources",
          problem: "Holiday, expense and training requests handled by email, with no consistency or central tracking.",
          resolution: "A request portal with flows configured by type, approval by the line manager and automatic notification to the employee.",
        },
      ],
      compliance: ["GDPR / LGPD", "ISO 27001", "SOC 2", "Full audit trail"],
      complianceNote:
        "Every process flow produces immutable audit trails, compatible with internal and external compliance requirements, including ISO and GDPR/LGPD audits.",
      faq: [
        { q: "Do we need to know how to code to set up a process?", a: "No. The process editor is visual and drag-and-drop. Setup is done by operations managers, with no IT involvement." },
        { q: "Can I create different processes for each department?", a: "Yes. Each department can have its own process templates, with independent steps, owners and deadlines." },
        { q: "What happens if the approver is on holiday?", a: "You can set up automatic delegation for a period, or escalate to the line manager after a set deadline." },
        { q: "Can processes include documents to sign?", a: "Yes. At any step you can attach a DMS document and require an electronic signature before moving on." },
        { q: "Can I track the average time of each process?", a: "Yes. The operations dashboard shows metrics by process type: average time, completion rate and bottlenecks." },
      ],
      related: [
        { desc: "The repository where documents produced in processes are archived." },
        { desc: "Add signature collection as a step in any approval flow." },
        { desc: "An immutable trail of every decision and action in each process." },
      ],
      ctaHeadline: "Stop running approvals by email.",
      ctaSubheadline: "A Processes demo with a real workflow from your operation. Thirty minutes.",
    },
  },

  "module-ctrl": {
    title: "Access",
    desc: "Permissions by user, department and document",
    headline: "The right information for the right person.",
    body: "Decide who can view, edit or delete each file. Granular controls protect sensitive data while keeping the transparency your team needs to operate.",
    page: {
      eyebrow: "Module",
      subheadline: "Granular permissions by user, department and document — the right information for the right person.",
      tags: ["Native RBAC", "Folder inheritance", "Built-in MFA", "Temporary access", "Periodic review", "Access log"],
      vantagensTitle: "Full control without slowing the operation",
      vantagensBody:
        "The Access module lets you define precisely who can view, edit, share or delete each resource on the platform. Built on role-based access control (RBAC), it supports inheritance through the folder structure, temporary access and periodic permission reviews. Essential for organisations with sensitive data, external audits or GDPR/LGPD requirements.",
      kpis: [
        { value: "100%", label: "real-time visibility of who has access to what" },
        { value: "−80%", label: "improper access incidents compared with manual management" },
        { value: "< 5 min", label: "to revoke all access for an employee who leaves" },
      ],
      features: [
        { title: "Role-based control (RBAC)", desc: "Assign roles with predefined permission sets. New users inherit their role's permissions automatically." },
        { title: "Structure-based inheritance", desc: "Permissions are set at folder level and flow down to the content, with per-document exceptions." },
        { title: "Temporary access", desc: "Give external contractors or temporary staff access with an automatic expiry date." },
        { title: "Access log", desc: "Every view, download or failed access attempt is logged with user, date, time and IP address." },
        { title: "Periodic review", desc: "Automatic alerts to review permissions for inactive accounts, privileged access and employees who changed role." },
        { title: "Built-in MFA", desc: "Mandatory multi-factor authentication for sensitive resources, configurable by classification level." },
      ],
      cases: [
        {
          sector: "Financial services",
          problem: "Due diligence documents and financial reports available to more staff than necessary, creating regulatory risk.",
          resolution: "Access structured by project and role, with automated quarterly reviews and immediate revocation when each deal closes.",
        },
        {
          sector: "Healthcare",
          problem: "Clinical data shared between departments without control, in breach of data protection law.",
          resolution: "A least-privilege access model, with every view logged and reports ready for GDPR audits.",
        },
        {
          sector: "Manufacturing",
          problem: "Employees leaving without their access being revoked immediately, risking intellectual property leaks.",
          resolution: "Immediate, centralised revocation of all access, integrated with the HR module's offboarding process.",
        },
      ],
      compliance: ["GDPR / LGPD", "ISO 27001", "SOC 2", "NIS2"],
      complianceNote:
        "The Access module applies the principle of least privilege and keeps complete audit logs compatible with GDPR, ISO 27001 and NIS2.",
      faq: [
        { q: "Can I integrate with our company's Active Directory or Okta?", a: "Yes. The module syncs users and groups with LDAP/AD directories and identity providers that support SAML 2.0 and OIDC." },
        { q: "How is access managed when an employee changes department?", a: "A change of role updates the related permissions automatically. Previous permissions are revoked and the event is logged." },
        { q: "Can external people get access without a full account?", a: "Yes. Guest access has a limited scope and an expiry date, and does not use an internal user licence." },
        { q: "How does the periodic access review work?", a: "The system alerts owners to confirm or revoke access for inactive users or users whose role has changed." },
        { q: "Can I see who accessed a specific document?", a: "Yes. The per-document access log shows every view, download and failed attempt, and can be exported for audits." },
      ],
      related: [
        { desc: "The repository where document access permissions are applied." },
        { desc: "An immutable log of all access and operations on the platform." },
        { desc: "Integration with the employee lifecycle to automate granting and revoking access." },
      ],
      ctaHeadline: "Always know who accesses what.",
      ctaSubheadline: "An Access demo built on your organisation's structure. Thirty minutes.",
    },
  },

  "module-audit": {
    title: "Audit",
    desc: "Full traceability of actions and access",
    headline: "A tamper-proof record of every action.",
    body: "Know exactly who viewed, changed or downloaded each document. Audit reports ready for compliance and information security requirements, in just a few clicks.",
    page: {
      eyebrow: "Module",
      subheadline: "Full traceability of every action on the platform — a tamper-proof record for compliance and investigations.",
      tags: ["Immutable trail", "Real-time alerts", "Export for auditors", "Configurable retention", "Automatic reports", "Anomaly detection"],
      vantagensTitle: "Compliance you can prove, not just claim",
      vantagensBody:
        "The Audit module automatically records every action taken on the platform: views, edits, downloads, shares, approvals and failed access attempts. The record is immutable — no user, administrators included, can delete or change entries. Built to answer external audits, internal investigations and regulatory requirements with no extra effort.",
      kpis: [
        { value: "100%", label: "of actions recorded automatically, with no extra setup" },
        { value: "< 2 min", label: "to pull the audit report for any user or document" },
        { value: "7 years", label: "of log retention, configurable by compliance policy" },
      ],
      features: [
        { title: "Immutable audit trail", desc: "Every event is recorded with timestamp, user, action, resource and IP address. No record can be changed or deleted." },
        { title: "Anomaly alerts", desc: "Automatic detection of suspicious behaviour: bulk downloads, out-of-hours access or repeated failed attempts." },
        { title: "Reports for auditors", desc: "PDF or CSV export with filters by user, document, period and action type. Ready to hand to auditors." },
        { title: "Real-time dashboard", desc: "Immediate visibility of platform activity, with usage metrics and critical events highlighted." },
        { title: "Configurable retention", desc: "Set log retention policies by event type or applicable regulation, with secure long-term archiving." },
        { title: "Advanced event search", desc: "Filter the history by any combination of user, resource, action and period. Results in seconds." },
      ],
      cases: [
        {
          sector: "Financial services",
          problem: "A regulatory audit required proof of who accessed confidential information over 18 months, with no central system.",
          resolution: "The full history exported in minutes, filtered by user and document, and handed to the auditor without IT involvement.",
        },
        {
          sector: "Manufacturing",
          problem: "A suspected leak of technical information, with no way to find out who downloaded the files or when.",
          resolution: "Investigation closed in under an hour using the detailed log of every access and download over the last 90 days.",
        },
        {
          sector: "Healthcare",
          problem: "A GDPR requirement to show who accessed health data and for what purpose, with no systematic logging.",
          resolution: "Automatic monthly reports on access to clinical records, with immediate alerts for access outside the defined scope.",
        },
      ],
      compliance: ["GDPR / LGPD", "ISO 27001", "SOC 2", "NIS2", "Basel III"],
      complianceNote:
        "The Audit module was built to meet the traceability requirements of GDPR, ISO 27001, SOC 2 and NIS2, with immutable records and retention configurable up to 10 years.",
      faq: [
        { q: "Can administrators delete audit records?", a: "No. Records are immutable by design. No user, including platform administrators, can change or delete entries." },
        { q: "How long are records kept?", a: "The retention period is set by policy, from a minimum of 1 year to a maximum of 10 years. The default is 7 years." },
        { q: "Can I get alerts when specific actions happen?", a: "Yes. You can set alerts by action type, user, document or behaviour pattern, delivered by email or webhook." },
        { q: "Are the audit reports accepted in external audits?", a: "Yes. Exported reports include integrity metadata (hash) that lets you verify they have not been tampered with." },
        { q: "Can it integrate with our company's SIEM?", a: "Yes. The module streams events in real time to compatible SIEMs via webhook or REST API." },
      ],
      related: [
        { desc: "Granular permission control that complements audit traceability." },
        { desc: "The repository whose actions are fully recorded by the audit module." },
        { desc: "A trail of every decision and approval in document workflows." },
      ],
      ctaHeadline: "Prove compliance effortlessly.",
      ctaSubheadline: "An Audit demo with a real scenario from your operation. Thirty minutes.",
    },
  },

  "module-integ": {
    title: "Integrations",
    desc: "Connect to ERP, CRM and existing tools via API",
    headline: "Céntrico at the centre of your ecosystem.",
    body: "Connect the platform to the systems your team already uses. Sync data automatically and remove duplicate work between applications and databases.",
    page: {
      eyebrow: "Module",
      subheadline: "Native connectors and an open API that put Céntrico at the centre of your organisation's tool ecosystem.",
      tags: ["Open REST API", "Webhooks", "Native connectors", "Two-way sync", "Low-code", "Full documentation"],
      vantagensTitle: "The platform that adapts to your ecosystem",
      vantagensBody:
        "The Integrations module removes the information silos between Céntrico and the systems your team already uses. With native connectors for the main ERP, CRM, productivity and communication tools, and a documented REST API for custom integrations, the platform fits your existing infrastructure without forcing you to replace anything.",
      kpis: [
        { value: "40+", label: "native connectors available in the integrations catalogue" },
        { value: "< 1 day", label: "to connect Céntrico to the ERP or CRM your organisation already uses" },
        { value: "0", label: "duplicated data — automatic two-way sync" },
      ],
      features: [
        { title: "Native connectors", desc: "A library of ready-made connectors for Microsoft 365, Google Workspace, SAP, TOTVS, Salesforce, Slack and more." },
        { title: "Documented REST API", desc: "A complete API with OAuth 2.0 authentication, OpenAPI documentation and a sandbox environment for development." },
        { title: "Two-way sync", desc: "Data updated in Céntrico is reflected in connected systems and vice versa, with no manual work." },
        { title: "Real-time webhooks", desc: "Notify external systems of any platform event: document uploaded, process approved, signature completed." },
        { title: "Data mapping", desc: "A visual interface to map fields between systems, without code. Simple transformations set up in the editor." },
        { title: "Flow monitoring", desc: "An integration health dashboard with failure alerts, call history and error reprocessing." },
      ],
      cases: [
        {
          sector: "Manufacturing",
          problem: "Technical documents generated in SAP had to be uploaded to the DMS by hand, with the risk of outdated versions.",
          resolution: "The SAP connector syncs production documents to the DMS automatically, with mapped metadata and versioning preserved.",
        },
        {
          sector: "Professional services",
          problem: "Proposals and contracts created in the CRM never reached the document repository, fragmenting the client history.",
          resolution: "A Salesforce → DMS integration archives every proposal and contract in the client file automatically, in real time.",
        },
        {
          sector: "Healthcare",
          problem: "The clinical management system did not talk to the document archive, forcing files to be duplicated.",
          resolution: "A custom API syncs clinical records with the DMS, keeping a single source of truth with GDPR access control.",
        },
      ],
      compliance: ["GDPR / LGPD", "ISO 27001", "OAuth 2.0", "OpenAPI 3.0"],
      complianceNote:
        "All integrations use OAuth 2.0 authentication and TLS 1.3 encrypted communication. Data in transit is never stored outside European territory.",
      faq: [
        { q: "Is the API documented and open?", a: "Yes. The REST API is documented in OpenAPI 3.0 and includes a sandbox environment for testing without affecting production data." },
        { q: "Can I connect Céntrico to a tool that is not in the catalogue?", a: "Yes. The REST API and webhooks let you integrate any system. Céntrico's technical team supports the initial setup." },
        { q: "Do integrations run in real time or in batches?", a: "It depends on the connector. Most support both modes. Webhooks are always real time." },
        { q: "What happens if an integration fails?", a: "The system logs the error, notifies the owner and queues the message for automatic reprocessing." },
        { q: "Can I use low-code tools like Zapier or Make?", a: "Yes. Céntrico works with Zapier, Make and n8n through native connectors or generic webhooks." },
      ],
      related: [
        { desc: "The central repository that receives and organises documents synced through integrations." },
        { desc: "Approval flows that can be triggered by events in external systems." },
        { desc: "A log of every operation performed on the platform by external integrations." },
      ],
      ctaHeadline: "Connect Céntrico to your systems.",
      ctaSubheadline: "A demo built on the integration map of your current infrastructure. Thirty minutes.",
    },
  },

  "module-rh": {
    title: "HR",
    desc: "Digital onboarding, holidays, offboarding and contract management",
    headline: "Bureaucracy kept to a minimum in people management.",
    body: "Digitise the entire employee lifecycle, from hiring to the end of the contract. Collect documents, issue contracts and manage the department's processes in one place.",
    page: {
      eyebrow: "Module",
      subheadline: "Digital onboarding, contract management, holidays and offboarding — the entire employee lifecycle on one platform.",
      tags: ["Digital onboarding", "Contract management", "Holidays and absences", "Built-in signatures", "Legal archiving", "Employee portal"],
      vantagensTitle: "Less bureaucracy, more time for people",
      vantagensBody:
        "The HR module digitises the entire employee lifecycle, from hiring to offboarding. It centralises contracts, addenda, declarations and training records, with built-in signature collection and automatic archiving. The employee portal gives access to payslips, declarations and holiday requests, reducing the HR department's administrative load.",
      kpis: [
        { value: "−60%", label: "of time spent on administrative tasks in the HR department" },
        { value: "1 day", label: "to complete onboarding for a new employee" },
        { value: "0 paper", label: "in the HR document flow, from hiring to offboarding" },
      ],
      features: [
        { title: "Digital onboarding", desc: "A guided hiring process with a configurable checklist: contract, terms, forms and documents delivered and signed digitally." },
        { title: "Contract management", desc: "A central archive of contracts, addenda and renewals with automatic alerts for expiry and renewal." },
        { title: "Holidays and absences", desc: "A holiday request portal with line manager approval, a real-time balance and calendar sync." },
        { title: "Training and certifications", desc: "Training, certificates and skills recorded per employee, with alerts when certifications are due for renewal." },
        { title: "Employee portal", desc: "Self-service access to payslips, declarations, contract history and requests, without going through HR." },
        { title: "Offboarding and legal archiving", desc: "An exit process with a checklist, automatic access revocation and archiving of the employee file for the legal period." },
      ],
      cases: [
        {
          sector: "Manufacturing",
          problem: "Hiring operators involved dozens of paper forms, days of delay and the risk of incomplete files.",
          resolution: "Digital onboarding with an automatic checklist: the new hire signs everything before day one, and the file is complete and archived.",
        },
        {
          sector: "Professional services",
          problem: "Consultant contracts managed with forgotten renewals and addenda scattered across email and personal drives.",
          resolution: "A central repository with automatic renewal alerts and a full contract history for each employee.",
        },
        {
          sector: "Healthcare",
          problem: "Holiday requests and rotas managed by email and spreadsheets, with no central view for management.",
          resolution: "A holiday portal with automated approval, a team calendar view and integration with the rota system.",
        },
      ],
      compliance: ["GDPR / LGPD", "Portuguese Labour Code", "Brazilian CLT", "ISO 27001"],
      complianceNote:
        "The HR module meets the document archiving requirements of the Portuguese Labour Code and Brazil's CLT, with configurable retention and role-restricted access.",
      faq: [
        { q: "Does the employee need platform access to sign onboarding documents?", a: "No. The employee receives a link by email and signs directly in the browser, even before their platform account is created." },
        { q: "How long are the files of departing employees kept?", a: "The archiving period is configurable to the applicable law. The default is 5 years under Portuguese law and 2 years under Brazilian law." },
        { q: "Can I integrate with our payroll system?", a: "Yes. The module exports data to the main payroll systems via API or file, with configurable field mapping." },
        { q: "Is the employee portal available on mobile?", a: "Yes. The portal is optimised for mobile, so employees can view documents and submit requests from their phone." },
        { q: "Can we set alerts for contract renewals?", a: "Yes. You can set alerts with configurable notice (90, 60 or 30 days) for fixed-term contracts and automatic renewals." },
      ],
      related: [
        { desc: "Collect fully legally valid signatures on contracts and HR documents." },
        { desc: "Automate granting and revoking access in step with the employee lifecycle." },
        { desc: "The repository where every employee file is kept central and secure." },
      ],
      ctaHeadline: "Digitise people management.",
      ctaSubheadline: "An HR demo built on your company's onboarding process. Thirty minutes.",
    },
  },
};
