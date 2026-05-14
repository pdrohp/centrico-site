import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  GitBranch,
  LayoutGrid,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Plus,
  Search,
  Eye,
  PanelLeft,
} from "lucide-react";

// ── Céntrico design tokens ────────────────────────────────────────────────────
const NAVY    = "#00072c";
const BLUE    = "#0028ff";
const BLUE2   = "#001ec2";
const WHITE   = "#ffffff";
const BG      = "#f4f5f7";
const BLUE_08 = "rgba(0,40,255,0.08)";
const BLUE_12 = "rgba(0,30,194,0.12)";

// ── Data ─────────────────────────────────────────────────────────────────────
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",        active: false, sub: false },
  { icon: FolderOpen,      label: "Meus documentos",  active: true,  sub: false },
  { icon: CheckSquare,     label: "Aprovações",        active: false, sub: false },
  { icon: GitBranch,       label: "Workflows",         active: false, sub: false },
  { icon: LayoutGrid,      label: "Módulos Especiais", active: false, sub: true  },
  { icon: BarChart2,       label: "Relatórios",        active: false, sub: false },
  { icon: Settings,        label: "Administração",     active: false, sub: true  },
];

const docs: { name: string; cat: string; size: string; date: string; status: "Aprovado" | "Pendente" }[] = [
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "648.8 KB", date: "03/03/2026", status: "Aprovado" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.1 MB",   date: "03/03/2026", status: "Aprovado" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.6 MB",   date: "03/03/2026", status: "Pendente" },
  { name: "IMG_8240.jpeg", cat: "Cupom Fiscal", size: "235.5 KB", date: "03/03/2026", status: "Pendente" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.4 MB",   date: "01/03/2026", status: "Pendente" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "967.6 KB", date: "01/03/2026", status: "Aprovado" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.4 MB",   date: "01/03/2026", status: "Pendente" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.1 MB",   date: "01/03/2026", status: "Aprovado" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.7 MB",   date: "01/03/2026", status: "Pendente" },
  { name: "cropped.jpg",   cat: "Cupom Fiscal", size: "1.4 MB",   date: "01/03/2026", status: "Aprovado" },
];

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: "Aprovado" | "Pendente" }) {
  const approved = status === "Aprovado";
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      background: approved ? BLUE2 : BLUE_12,
      color: approved ? WHITE : BLUE2,
      border: approved ? "none" : `1px solid ${BLUE2}`,
    }}>
      {status}
    </span>
  );
}

// ── Category badge ────────────────────────────────────────────────────────────
function CatBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 500,
      background: BLUE_08,
      color: BLUE2,
      border: `1px solid rgba(0,30,194,0.20)`,
    }}>
      {label}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function Documentos() {
  return (
    <div style={{
      display: "flex", height: "100vh",
      fontFamily: "'Switzer', 'Archivo', 'Inter', system-ui, sans-serif",
      background: BG, overflow: "hidden",
    }}>

      {/* ── Sidebar (expanded) ── */}
      <div style={{
        width: 210, background: NAVY, display: "flex", flexDirection: "column",
        flexShrink: 0, paddingBottom: 16,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 6, background: BLUE2,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ color: WHITE, fontWeight: 800, fontSize: 14, fontStyle: "italic" }}>C</span>
            </div>
            <div>
              <p style={{ color: WHITE, fontWeight: 700, fontSize: 14, margin: 0, lineHeight: 1.2 }}>Céntrico</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, margin: 0 }}>Gestão Inteligente</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ icon: Icon, label, active, sub }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 10px", borderRadius: 6, cursor: "pointer",
              background: active ? `${BLUE2}33` : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon size={15} color={active ? WHITE : "rgba(255,255,255,0.45)"} />
                <span style={{
                  fontSize: 13, color: active ? WHITE : "rgba(255,255,255,0.55)",
                  fontWeight: active ? 600 : 400,
                }}>{label}</span>
              </div>
              {sub && <ChevronDown size={12} color="rgba(255,255,255,0.30)" />}
            </div>
          ))}
        </div>

        {/* User */}
        <div style={{
          padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", background: BLUE2, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>SK</span>
            </div>
            <div>
              <p style={{ color: WHITE, fontSize: 12, fontWeight: 600, margin: 0 }}>Sistema Khipo</p>
              <p style={{ color: "rgba(255,255,255,0.40)", fontSize: 10, margin: 0 }}>sistema@khipo.com.br</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <LogOut size={13} color="rgba(255,255,255,0.35)" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Sair</span>
          </div>
        </div>
      </div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          background: WHITE, borderBottom: "1px solid #e8eaee",
          height: 52, padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <PanelLeft size={18} color="#9ca3af" style={{ cursor: "pointer" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: BLUE, color: WHITE, border: "none", borderRadius: 2,
              padding: "0 14px", height: 48, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              <Plus size={13} />
              Novo Documento
            </button>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={16} color="#6b7280" />
              <span style={{
                position: "absolute", top: -3, right: -3, width: 8, height: 8,
                background: BLUE, borderRadius: "50%", border: "2px solid white",
              }} />
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: BLUE2,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>SK</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>

          {/* Page heading */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: NAVY, margin: "0 0 4px" }}>
                Gestão de Documentos
              </h1>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                Organize, compartilhe e controle todos os documentos da empresa
              </p>
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: BLUE, color: WHITE, border: "none", borderRadius: 2,
              padding: "0 16px", height: 48, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
            }}>
              <Plus size={13} />
              Novo Documento
            </button>
          </div>

          {/* Search + filter row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{
              flex: 1, display: "flex", alignItems: "center", gap: 10,
              background: WHITE, border: "1px solid #e8eaee", borderRadius: 6,
              padding: "0 14px", height: 40,
            }}>
              <Search size={15} color="#9ca3af" />
              <span style={{ fontSize: 13, color: "#9ca3af" }}>Pesquisar documentos...</span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: WHITE, border: "1px solid #e8eaee", borderRadius: 6,
              padding: "0 14px", height: 40, cursor: "pointer", minWidth: 100,
            }}>
              <span style={{ fontSize: 13, color: NAVY, fontWeight: 500 }}>Todos</span>
              <ChevronDown size={14} color="#9ca3af" />
            </div>
          </div>

          {/* Table */}
          <div style={{
            background: WHITE, borderRadius: 8, border: "1px solid #e8eaee",
            overflow: "hidden",
          }}>
            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 40px",
              padding: "10px 20px",
              borderBottom: "1px solid #e8eaee",
              background: "#fafafa",
            }}>
              {["DOCUMENTO", "CATEGORIA", "TAMANHO", "DATA", "STATUS", ""].map((h, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {docs.map((doc, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 40px",
                padding: "11px 20px",
                borderBottom: i < docs.length - 1 ? "1px solid #f0f2f5" : "none",
                alignItems: "center",
              }}>
                <span style={{ fontSize: 13, color: NAVY, fontWeight: 500 }}>{doc.name}</span>
                <div><CatBadge label={doc.cat} /></div>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{doc.size}</span>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{doc.date}</span>
                <div><StatusBadge status={doc.status} /></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Eye size={15} color="#9ca3af" style={{ cursor: "pointer" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
      `}</style>
    </div>
  );
}
