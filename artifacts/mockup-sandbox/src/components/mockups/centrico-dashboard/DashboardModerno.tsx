import {
  LayoutDashboard, FolderOpen, CheckSquare, GitBranch,
  LayoutGrid, BarChart2, Bell, HelpCircle, Settings,
  Search, ArrowRight, ChevronRight, ChevronDown,
  FileText, Eye, RotateCcw, CheckCircle2, Zap,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const BLUE    = "#0028ff";
const BLUE2   = "#001ec2";
const WHITE   = "#ffffff";
const GRAY_BG = "#f4f5f8";
const GRAY1   = "#111827";
const GRAY2   = "#6b7280";
const GRAY3   = "#9ca3af";
const GRAY4   = "#d1d5db";
const GRAY5   = "#f3f4f6";
const BLUE_08 = "rgba(0,40,255,0.08)";
const BLUE_15 = "rgba(0,30,194,0.15)";

// ── Data ─────────────────────────────────────────────────────────────────────
const recentDocs: {
  name: string; type: string; date: string;
  status: "Aprovado" | "Pendente" | "Erro" | "Processando";
}[] = [
  { name: "NF_032026_Fornecedor_A.pdf", type: "Fatura",       date: "14 Mar", status: "Aprovado"    },
  { name: "items-f16de53c.jpg",         type: "Cupom Fiscal", date: "14 Mar", status: "Pendente"    },
  { name: "IMG_8240.jpeg",              type: "Cupom Fiscal", date: "13 Mar", status: "Pendente"    },
  { name: "Contrato_Servico_2026.pdf",  type: "Fatura",       date: "12 Mar", status: "Processando" },
  { name: "cropped_V0004.jpg",          type: "Cupom Fiscal", date: "11 Mar", status: "Aprovado"    },
  { name: "RelMensal_Mar2026.pdf",      type: "Outros",       date: "10 Mar", status: "Erro"        },
  { name: "NF_018_ABR.pdf",             type: "Fatura",       date: "09 Mar", status: "Aprovado"    },
  { name: "cropped_V0005.jpg",          type: "Cupom Fiscal", date: "08 Mar", status: "Pendente"    },
];

const categoryItems = [
  { initials: "NF", name: "NF_032026_Fornecedor_A.pdf",  sub: "Fatura · 648 KB"       },
  { initials: "CF", name: "items-f16de53c.jpg",           sub: "Cupom Fiscal · 1.1 MB" },
  { initials: "CF", name: "IMG_8240.jpeg",                sub: "Cupom Fiscal · 235 KB" },
  { initials: "NF", name: "NF_018_Parceiro.pdf",          sub: "Fatura · 1.4 MB"       },
  { initials: "OT", name: "RelMensal_Mar2026.pdf",        sub: "Outros · 967 KB"       },
];

const navMain = [
  { icon: LayoutDashboard, label: "Dashboard",       active: true  },
  { icon: FolderOpen,      label: "Meus Documentos", active: false },
  { icon: CheckSquare,     label: "Aprovações",      active: false },
  { icon: GitBranch,       label: "Workflows",       active: false },
  { icon: LayoutGrid,      label: "Módulos",         active: false },
  { icon: BarChart2,       label: "Relatórios",      active: false },
];
const navOther = [
  { icon: Bell,       label: "Notificações", badge: 9    },
  { icon: HelpCircle, label: "Suporte",      badge: null },
  { icon: Settings,   label: "Configurações",badge: null },
];

const statusCfg = {
  Aprovado:    { dot: "#22c55e", text: "#15803d" },
  Pendente:    { dot: "#f59e0b", text: "#b45309" },
  Erro:        { dot: "#ef4444", text: "#b91c1c" },
  Processando: { dot: BLUE,      text: BLUE2     },
} as const;

// ── Primitives ────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 34, bg = BLUE2 }: {
  initials: string; size?: number; bg?: string;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <span style={{ color: WHITE, fontSize: Math.round(size * 0.33), fontWeight: 700 }}>{initials}</span>
    </div>
  );
}

function LinkBtn({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      background: "none", border: "none", fontSize: 12, color: BLUE2,
      fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
      fontFamily: "inherit", padding: 0,
    }}>
      {children}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, badgeText, badgeColor, detail, detailSub }: {
  icon: React.ElementType; label: string;
  value: React.ReactNode; badgeText: string; badgeColor: string;
  detail: string; detailSub: string;
}) {
  return (
    <div style={{
      background: WHITE, borderRadius: 16, padding: "20px 22px 16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.04)",
      flex: 1, display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11, background: BLUE_08,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={18} color={BLUE2} />
        </div>
        <span style={{ fontSize: 13, color: GRAY2, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 34, fontWeight: 800, color: GRAY1, lineHeight: 1 }}>{value}</span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: badgeColor,
          background: `${badgeColor}18`, padding: "2px 8px", borderRadius: 999,
          whiteSpace: "nowrap",
        }}>{badgeText}</span>
      </div>
      <div style={{ height: 1, background: GRAY5, margin: "4px 0 10px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: GRAY3 }}>{detail}</span>
        <LinkBtn>{detailSub} <ArrowRight size={12} /></LinkBtn>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function DashboardModerno() {
  return (
    <div style={{
      display: "flex", height: "100vh",
      fontFamily: "'Switzer', 'Archivo', 'Inter', system-ui, sans-serif",
      background: GRAY_BG, overflow: "hidden",
    }}>

      {/* ════ SIDEBAR ════ */}
      <div style={{
        width: 220, background: WHITE, display: "flex", flexDirection: "column",
        borderRight: `1px solid ${GRAY5}`, flexShrink: 0,
        boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 18px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid ${GRAY5}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9, background: BLUE2,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: WHITE, fontWeight: 800, fontSize: 15, fontStyle: "italic" }}>C</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: GRAY1, lineHeight: 1.2 }}>Céntrico</p>
              <p style={{ margin: 0, fontSize: 10, color: GRAY3 }}>Gestão Inteligente</p>
            </div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: 7, background: GRAY5,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <LayoutGrid size={14} color={GRAY3} />
          </div>
        </div>

        {/* Main menu */}
        <div style={{ padding: "10px 10px 0" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: GRAY3, letterSpacing: "0.08em", margin: "8px 8px 6px", textTransform: "uppercase" }}>Menu Principal</p>
          {navMain.map(({ icon: Icon, label, active }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 2,
              background: active ? BLUE_08 : "transparent",
            }}>
              <Icon size={16} color={active ? BLUE : GRAY3} />
              <span style={{ fontSize: 13, color: active ? BLUE : GRAY2, fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Other menu */}
        <div style={{ padding: "0 10px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: GRAY3, letterSpacing: "0.08em", margin: "14px 8px 6px", textTransform: "uppercase" }}>Outro</p>
          {navOther.map(({ icon: Icon, label, badge }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon size={16} color={GRAY3} />
                <span style={{ fontSize: 13, color: GRAY2 }}>{label}</span>
              </div>
              {badge != null && (
                <span style={{
                  background: "#ef4444", color: WHITE, fontSize: 10, fontWeight: 700,
                  padding: "1px 6px", borderRadius: 999, lineHeight: "16px",
                }}>{badge}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Upgrade card */}
        <div style={{
          margin: "0 12px 16px", borderRadius: 14, padding: "16px 16px 14px",
          background: `linear-gradient(140deg, ${BLUE2} 0%, ${BLUE} 100%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -24, right: -24, width: 90, height: 90,
            borderRadius: "50%", background: "rgba(255,255,255,0.07)",
          }} />
          <div style={{
            width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10,
          }}>
            <Zap size={16} color={WHITE} />
          </div>
          <p style={{ color: WHITE, fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>Acesso completo</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, margin: "0 0 14px", lineHeight: 1.5 }}>
            Sem limites de documentos e utilizadores.
          </p>
          <button style={{
            width: "100%", padding: "8px", borderRadius: 7, border: "none",
            background: WHITE, color: BLUE2, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}>Fazer Upgrade</button>
        </div>

        {/* User */}
        <div style={{
          padding: "12px 16px", borderTop: `1px solid ${GRAY5}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar initials="SK" size={32} bg={BLUE2} />
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: GRAY1 }}>Sistema Khipo</p>
              <p style={{ margin: 0, fontSize: 10, color: GRAY3 }}>Administrador</p>
            </div>
          </div>
          <ChevronDown size={14} color={GRAY3} style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <div style={{ flex: 1, overflow: "auto", padding: "28px 26px 24px" }}>

          <h1 style={{ fontSize: 24, fontWeight: 800, color: GRAY1, margin: "0 0 24px", letterSpacing: "-0.3px" }}>Dashboard</h1>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <StatCard
              icon={FileText} label="Páginas Processadas"
              value="340" badgeText="+1024% este mês" badgeColor="#15803d"
              detail="Total: 360 páginas" detailSub="Detalhes"
            />
            <StatCard
              icon={FolderOpen} label="Documentos"
              value={<>65<span style={{ fontSize: 18, color: GRAY3, fontWeight: 500 }}>/74</span></>}
              badgeText="−8% desde ontem" badgeColor="#b45309"
              detail="Pendentes: 9" detailSub="Detalhes"
            />
            <StatCard
              icon={CheckCircle2} label="Taxa de Sucesso"
              value="96.9%" badgeText="87% concluído" badgeColor={BLUE2}
              detail="2 a processar" detailSub="Detalhes"
            />
          </div>

          {/* Documents table */}
          <div style={{
            background: WHITE, borderRadius: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>
            {/* Table toolbar */}
            <div style={{
              padding: "18px 22px 14px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: `1px solid ${GRAY5}`,
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: GRAY1, margin: 0 }}>Documentos Recentes</h3>
              <LinkBtn>Ver Todos <ArrowRight size={13} /></LinkBtn>
            </div>

            {/* Column headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "2.4fr 1fr 0.7fr 1.1fr 72px",
              padding: "9px 22px", background: GRAY5,
            }}>
              {["Documento", "Tipo", "Data", "Status", "Acção"].map((h, i) => (
                <span key={i} style={{
                  fontSize: 11, fontWeight: 700, color: GRAY3,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {recentDocs.map((doc, i) => {
              const cfg = statusCfg[doc.status];
              const isLast = i === recentDocs.length - 1;
              return (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "2.4fr 1fr 0.7fr 1.1fr 72px",
                  padding: "13px 22px", alignItems: "center",
                  borderBottom: isLast ? "none" : `1px solid ${GRAY5}`,
                  transition: "background 0.1s",
                }}>
                  {/* Doc name with avatar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <Avatar
                      initials={doc.name.substring(0, 2).toUpperCase()}
                      size={32}
                      bg={i % 2 === 0 ? BLUE_08 : BLUE_15}
                    />
                    <span style={{
                      fontSize: 13, color: GRAY1, fontWeight: 500,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220,
                    }}>{doc.name}</span>
                  </div>
                  <span style={{ fontSize: 13, color: GRAY2 }}>{doc.type}</span>
                  <span style={{ fontSize: 13, color: GRAY2 }}>{doc.date}</span>
                  {/* Status dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: cfg.text, fontWeight: 500 }}>{doc.status}</span>
                  </div>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: 12 }}>
                    <Eye size={15} color={GRAY3} style={{ cursor: "pointer" }} />
                    <RotateCcw size={15} color={GRAY3} style={{ cursor: "pointer" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════ RIGHT PANEL ════ */}
      <div style={{
        width: 284, background: WHITE, borderLeft: `1px solid ${GRAY5}`,
        display: "flex", flexDirection: "column", flexShrink: 0,
        boxShadow: "-2px 0 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{ flex: 1, overflow: "auto", padding: "22px 18px" }}>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: GRAY5, borderRadius: 9, padding: "9px 13px", marginBottom: 22,
          }}>
            <Search size={14} color={GRAY3} />
            <span style={{ fontSize: 12, color: GRAY3 }}>Pesquisar</span>
          </div>

          {/* Category status */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: GRAY1, margin: 0 }}>Status por Categoria</h3>
              <LinkBtn>Ver Todos <ArrowRight size={11} /></LinkBtn>
            </div>

            {/* Tabs */}
            <div style={{
              display: "flex", gap: 2, background: GRAY5, borderRadius: 9,
              padding: 3, marginBottom: 14,
            }}>
              {["Faturas", "Cupom", "Outros"].map((t, i) => (
                <button key={t} style={{
                  flex: 1, padding: "6px 0", borderRadius: 7, border: "none",
                  background: i === 0 ? BLUE : "transparent",
                  color: i === 0 ? WHITE : GRAY3,
                  fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}>{t}</button>
              ))}
            </div>

            {/* Item list */}
            {categoryItems.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 0",
                borderBottom: i < categoryItems.length - 1 ? `1px solid ${GRAY5}` : "none",
              }}>
                <Avatar initials={item.initials} size={36} bg={i % 2 === 0 ? BLUE_08 : BLUE_15} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{
                    margin: 0, fontSize: 12, fontWeight: 600, color: GRAY1,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{item.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: GRAY3 }}>{item.sub}</p>
                </div>
                <ChevronRight size={14} color={GRAY4} style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>

          {/* Processing overview */}
          <div style={{ borderRadius: 13, border: `1px solid ${GRAY5}`, padding: "16px 16px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: GRAY1, margin: 0 }}>Processamento</h3>
              <div style={{
                display: "flex", alignItems: "center", gap: 4, cursor: "pointer",
                background: GRAY5, borderRadius: 7, padding: "4px 9px",
              }}>
                <span style={{ fontSize: 11, color: GRAY2, fontWeight: 500 }}>Mar 2026</span>
                <ChevronDown size={11} color={GRAY3} />
              </div>
            </div>

            <p style={{ fontSize: 11, color: GRAY3, margin: "0 0 4px" }}>Total de Documentos</p>
            <p style={{ fontSize: 26, fontWeight: 800, color: GRAY1, margin: "0 0 16px", lineHeight: 1, letterSpacing: "-0.5px" }}>231</p>

            {/* Progress bar */}
            <div style={{ height: 10, background: GRAY5, borderRadius: 999, overflow: "hidden", marginBottom: 16 }}>
              <div style={{
                height: "100%", width: "65%",
                background: `linear-gradient(90deg, ${BLUE2} 0%, ${BLUE} 100%)`,
                borderRadius: 999,
              }} />
            </div>

            {/* Legend */}
            {[
              { color: BLUE,  label: "Aprovados", value: "150" },
              { color: GRAY4, label: "Pendentes", value: "81"  },
            ].map(l => (
              <div key={l.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
                  <span style={{ fontSize: 12, color: GRAY2 }}>{l.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: GRAY1 }}>{l.value}</span>
              </div>
            ))}

            <button style={{
              width: "100%", marginTop: 6, padding: "9px", borderRadius: 9,
              border: `1px solid ${GRAY4}`, background: WHITE,
              fontSize: 12, fontWeight: 600, color: GRAY2, cursor: "pointer", fontFamily: "inherit",
            }}>Ver Todos</button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
      `}</style>
    </div>
  );
}
