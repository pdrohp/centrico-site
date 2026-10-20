// Espelha as chaves de src/lib/icons.ts. Ao adicionar um ícone lá, adicione-o aqui.
export const iconOptions = [
  "FileText", "Search", "History", "ScanLine", "Lock", "Archive", "Building2",
  "Briefcase", "Stethoscope", "PenLine", "CheckCircle", "Clock", "UserCheck",
  "GitBranch", "BellRing", "LayoutList", "Eye", "Key", "ShieldCheck", "Activity",
  "FileCheck", "ClipboardList", "AlertCircle", "Link2", "Database", "RefreshCw",
  "Zap", "Puzzle", "Users", "UserPlus", "Calendar", "Award", "Layers",
].map((value) => ({ title: value, value }));

// Áreas reconhecidas pelo menu do site (src/components/Navbar.tsx, AREA_TO_BUCKET).
export const areaOptions = [
  { title: "Core (Gestão Documental)", value: "Core" },
  { title: "Jurídico (Gestão Documental)", value: "Jurídico" },
  { title: "Recursos Humanos (Gestão Documental)", value: "Recursos Humanos" },
  { title: "Operações (Operação & Compliance)", value: "Operações" },
  { title: "Compliance (Operação & Compliance)", value: "Compliance" },
  { title: "Segurança (Operação & Compliance)", value: "Segurança" },
  { title: "API (Plataforma)", value: "API" },
];
