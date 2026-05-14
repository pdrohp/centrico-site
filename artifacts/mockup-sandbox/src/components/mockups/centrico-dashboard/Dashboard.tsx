import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  Home,
  FileText,
  CheckSquare,
  GitBranch,
  LayoutGrid,
  BarChart2,
  Shield,
  LogOut,
  Bell,
  Plus,
  ChevronDown,
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  FileCheck,
  Copy,
  RotateCcw,
} from "lucide-react";

const NAVY = "#00072c";
const BLUE = "#0028ff";
const BLUE_MID = "#001ec2";
const BG = "#f4f5f7";
const WHITE = "#ffffff";

const monthlyData = [
  { month: "jan. de 26", pages: 0, docs: 0 },
  { month: "fev. de 26", pages: 20, docs: 8 },
  { month: "mar. de 26", pages: 340, docs: 65 },
];

const categories = [
  { label: "Faturas", count: 150, pct: 64.9, color: BLUE_MID },
  { label: "Cupom Fiscal", count: 68, pct: 29.4, color: "#22c55e" },
  { label: "Outros", count: 12, pct: 5.2, color: "#94a3b8" },
  { label: "Comunicações", count: 1, pct: 0.4, color: "#f59e0b" },
];

const recentDocs = [
  { name: "items-f16de53c", pages: 57, tag: "Faturas", time: "há cerca de 2 meses" },
  { name: "408_V0004970_14081024...pdf", pages: 57, tag: "Faturas", time: "há cerca de 2 meses" },
  { name: "408_V0004970_14081024_2...pdf", pages: 57, tag: "Faturas", time: "há cerca de 2 meses" },
  { name: "NF_05_2026_Fornecedor.pdf", pages: 12, tag: "Faturas", time: "há 3 dias" },
  { name: "Contrato_Servico_2026.pdf", pages: 8, tag: "Outros", time: "há 5 dias" },
];

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: FileText, label: "Documentos", active: false },
  { icon: CheckSquare, label: "Aprovações", active: false },
  { icon: GitBranch, label: "Workflows", active: false },
  { icon: LayoutGrid, label: "Módulos", active: false },
  { icon: BarChart2, label: "Relatórios", active: false },
  { icon: Shield, label: "Segurança", active: false },
];

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconBg,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconBg: string;
}) {
  return (
    <div
      style={{
        background: WHITE,
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        border: "1px solid #e8eaee",
        flex: 1,
      }}
    >
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px", fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: NAVY, margin: "0 0 4px", lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{sub}</p>
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={BLUE_MID} />
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Switzer', 'Inter', system-ui, sans-serif",
        background: BG,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 60,
          background: NAVY,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 16,
          paddingBottom: 16,
          gap: 4,
          flexShrink: 0,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 32,
            height: 32,
            background: BLUE_MID,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ color: WHITE, fontWeight: 700, fontSize: 14, fontStyle: "italic" }}>C</span>
        </div>

        {navItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            title={label}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: active ? "rgba(0,40,255,0.25)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            <Icon size={18} color={active ? WHITE : "rgba(255,255,255,0.4)"} />
          </div>
        ))}

        <div style={{ flex: 1 }} />
        <div
          title="Sair"
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <LogOut size={18} color="rgba(255,255,255,0.35)" />
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: BLUE_MID,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <span style={{ color: WHITE, fontWeight: 700, fontSize: 11 }}>SK</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            background: WHITE,
            borderBottom: "1px solid #e8eaee",
            padding: "0 28px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 1, height: 20, background: "#e8eaee" }} />
            <h1 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: 0 }}>Dashboard</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: BLUE,
                color: WHITE,
                border: "none",
                borderRadius: 2,
                padding: "0 16px",
                height: 36,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <Plus size={14} />
              Novo Documento
            </button>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #e8eaee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Bell size={16} color="#6b7280" />
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  background: "#ef4444",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: BLUE_MID,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>SK</span>
              </div>
              <ChevronDown size={14} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "20px 28px 28px" }}>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px" }}>
            Visão geral do processamento OCR e gestão de documentos
          </p>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
            <StatCard label="Páginas Processadas" value="0" sub="Este mês" icon={FileText} iconBg="rgba(0,30,194,0.08)" />
            <StatCard label="Documentos Processados" value="0" sub="Este mês" icon={Copy} iconBg="rgba(0,30,194,0.08)" />
            <StatCard label="Taxa de Sucesso" value="0.0%" sub="Eficiência do OCR" icon={CheckCircle} iconBg="rgba(0,30,194,0.08)" />
            <StatCard label="Tempo Médio" value="0.0s" sub="por documento" icon={Clock} iconBg="rgba(0,30,194,0.08)" />
          </div>

          {/* Charts row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {/* Monthly chart */}
            <div
              style={{
                background: WHITE,
                borderRadius: 12,
                padding: "20px 24px",
                border: "1px solid #e8eaee",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>Processamento Mensal</h3>
                <span
                  style={{
                    fontSize: 12,
                    color: "#22c55e",
                    fontWeight: 600,
                    background: "rgba(34,197,94,0.1)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  ↑ 1024.1%
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8eaee" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="pages"
                    fill={`${BLUE_MID}22`}
                    stroke={BLUE_MID}
                    strokeWidth={2}
                    name="Páginas"
                  />
                  <Bar dataKey="docs" fill={BLUE} barSize={18} radius={[2, 2, 0, 0]} name="Documentos" />
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: `${BLUE_MID}66` }} />
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Páginas</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: BLUE }} />
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Documentos</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div
              style={{
                background: WHITE,
                borderRadius: 12,
                padding: "20px 24px",
                border: "1px solid #e8eaee",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>Categorias Detectadas</h3>
                <Clock size={16} color="#9ca3af" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {categories.map((cat) => (
                  <div key={cat.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      <span style={{ fontSize: 13, color: NAVY, fontWeight: 500 }}>{cat.label}</span>
                      <div style={{ display: "flex", gap: 12 }}>
                        <span style={{ fontSize: 12, color: "#6b7280" }}>{cat.count}</span>
                        <span style={{ fontSize: 12, color: "#6b7280", minWidth: 36, textAlign: "right" }}>
                          {cat.pct}%
                        </span>
                      </div>
                    </div>
                    <div style={{ height: 6, background: "#f0f2f5", borderRadius: 3, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${cat.pct}%`,
                          background: cat.color,
                          borderRadius: 3,
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 16, marginBottom: 0 }}>
                231 documentos classificados
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Recent docs */}
            <div
              style={{
                background: WHITE,
                borderRadius: 12,
                padding: "20px 24px",
                border: "1px solid #e8eaee",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>Documentos Recentes</h3>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: BLUE,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Ver Todos
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recentDocs.map((doc, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: i < recentDocs.length - 1 ? "1px solid #f0f2f5" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <CheckCircle size={16} color={BLUE_MID} style={{ flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 12,
                            color: NAVY,
                            fontWeight: 600,
                            margin: "0 0 3px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 200,
                          }}
                        >
                          {doc.name}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 10, color: "#9ca3af" }}>{doc.pages} páginas</span>
                          <span
                            style={{
                              fontSize: 10,
                              background: "rgba(0,30,194,0.1)",
                              color: BLUE_MID,
                              padding: "1px 6px",
                              borderRadius: 999,
                              fontWeight: 600,
                            }}
                          >
                            {doc.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: "#9ca3af", flexShrink: 0, marginLeft: 8 }}>{doc.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System status */}
            <div
              style={{
                background: WHITE,
                borderRadius: 12,
                padding: "20px 24px",
                border: "1px solid #e8eaee",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>Status do Sistema</h3>
                <BarChart2 size={16} color="#9ca3af" />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  { icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "Pendentes", count: 9 },
                  { icon: RefreshCw, color: BLUE_MID, bg: "rgba(0,30,194,0.1)", label: "Em Processamento", count: 0 },
                  { icon: FileCheck, color: "#22c55e", bg: "rgba(34,197,94,0.1)", label: "Concluídos", count: 0 },
                  { icon: XCircle, color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Erros", count: 0 },
                ].map(({ icon: Icon, color, bg, label, count }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px",
                      background: "#fafafa",
                      borderRadius: 10,
                      border: "1px solid #f0f2f5",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} color={color} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: NAVY,
                          margin: "0 0 2px",
                          lineHeight: 1,
                        }}
                      >
                        {count}
                      </p>
                      <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
      `}</style>
    </div>
  );
}
