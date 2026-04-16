import { useState } from "react";

const MODULES = [
  {
    id: "contratos",
    name: "Gestão de Contratos",
    shortName: "Contratos",
    description: "Centralizar e automatizar o ciclo de vida dos seus contratos — da criação com IA à assinatura digital, com alertas de vencimento e trilha de auditoria.",
    letter: "C",
  },
  {
    id: "faturas",
    name: "Automação de Faturas",
    shortName: "Faturas",
    description: "Automatizar o recebimento, validação e aprovação de faturas de fornecedores — eliminando trabalho manual, erros e atrasos no pagamento.",
    letter: "F",
  },
  {
    id: "frotas",
    name: "Gestão de Frotas",
    shortName: "Frotas",
    description: "Gerenciar todos os documentos da sua frota — CRLV, licenciamentos, CNHs e contratos — com alertas automáticos de vencimento.",
    letter: "F",
  },
  {
    id: "seguros",
    name: "Gestão de Seguros",
    shortName: "Seguros",
    description: "Centralizar a gestão de todas as apólices de seguro da empresa — veículos, patrimônio, responsabilidade civil e mais.",
    letter: "S",
  },
  {
    id: "clientes",
    name: "Docs de Clientes",
    shortName: "Clientes",
    description: "Organizar e acessar de forma segura toda a documentação dos seus clientes — contratos, propostas, KYC e comprovantes.",
    letter: "C",
  },
  {
    id: "fornecedores",
    name: "Docs de Fornecedores",
    shortName: "Fornecedores",
    description: "Centralizar a documentação dos seus fornecedores — contratos, certidões, notas fiscais e habilitações — com validade monitorada.",
    letter: "F",
  },
  {
    id: "rh",
    name: "Docs de RH",
    shortName: "RH",
    description: "Digitalizar e gerenciar de forma segura todos os documentos de RH, processos de admissão e prontuários.",
    letter: "R",
  },
];

function ModuleCard({ module, selected, onClick }: {
  module: typeof MODULES[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected ? "rgba(255,255,255,0.04)" : "transparent",
        border: `1px solid ${selected ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "10px",
        padding: "14px 16px",
        cursor: "pointer",
        outline: "none",
        textAlign: "left",
        transition: "all 0.15s ease",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "6px",
            background: selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 600,
            color: selected ? "#000" : "rgba(255,255,255,0.4)",
            flexShrink: 0,
          }}
        >
          {module.letter}
        </div>
        <span style={{
          fontSize: "13px",
          fontWeight: 500,
          color: selected ? "#fff" : "rgba(255,255,255,0.5)",
        }}>
          {module.shortName}
        </span>
        <div style={{ marginLeft: "auto" }}>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: `1.5px solid ${selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)"}`,
            background: selected ? "rgba(255,255,255,0.9)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {selected && (
              <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <p style={{
        fontSize: "11.5px",
        color: selected ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
        lineHeight: 1.5,
        margin: "6px 0 0 36px",
      }}>
        {module.description}
      </p>
    </button>
  );
}

export function ModuleSelector() {
  const [selected, setSelected] = useState<string[]>(["contratos", "faturas", "frotas"]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedModules = MODULES.filter(m => selected.includes(m.id));
  const count = selectedModules.length;

  const svgW = 560;
  const svgH = 440;
  const cx = svgW / 2;
  const cy = 220;
  const radius = 160;

  const nodes = selectedModules.map((m, i) => {
    const angleOffset = -Math.PI / 2;
    const angle = angleOffset + (i / Math.max(count, 1)) * Math.PI * 2;
    return {
      id: m.id,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      module: m,
    };
  });

  const LINE_COLOR = "rgba(255,255,255,0.22)";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0c10",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 1100, width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <p style={{
            fontSize: 11,
            fontWeight: 500,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}>
            Monte seu sistema
          </p>
          <h2 style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#fff",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}>
            Selecione os módulos
          </h2>
          <p style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            maxWidth: 460,
            lineHeight: 1.6,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Cada módulo que você ativa se conecta diretamente ao seu sistema.
          </p>
        </div>

        {/* Module pills */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 36,
          justifyContent: "center",
        }}>
          {MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => toggle(m.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 14px",
                borderRadius: 999,
                border: `1px solid ${selected.includes(m.id) ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
                background: selected.includes(m.id) ? "rgba(255,255,255,0.05)" : "transparent",
                color: selected.includes(m.id) ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                outline: "none",
              }}
            >
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: selected.includes(m.id) ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                flexShrink: 0,
              }} />
              {m.shortName}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div>
          {/* Diagram */}
          <div
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 16,
              padding: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid pattern background */}
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.4 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid-min" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-min)" />
            </svg>

            {/* Main SVG diagram */}
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              style={{ width: "100%", height: "auto", position: "relative", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection lines (static gray) */}
              {nodes.map((node) => (
                <line
                  key={`${node.id}-line`}
                  x1={cx}
                  y1={cy}
                  x2={node.x}
                  y2={node.y}
                  stroke={LINE_COLOR}
                  strokeWidth="1"
                  strokeDasharray="5 5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-10"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </line>
              ))}

              {/* Center node — "Seu Sistema" */}
              <g>
                <rect
                  x={cx - 60}
                  y={cy - 20}
                  width={120}
                  height={40}
                  rx={20}
                  fill="#0f1218"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={1}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={13}
                  fontWeight={500}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  Seu sistema
                </text>
              </g>

              {/* Module nodes */}
              {nodes.map((node) => (
                <g
                  key={node.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggle(node.id)}
                >
                  <rect
                    x={node.x - 48}
                    y={node.y - 22}
                    width={96}
                    height={44}
                    rx={10}
                    fill="#0f1218"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth={1}
                  />
                  <circle
                    cx={node.x - 30}
                    cy={node.y}
                    r={8}
                    fill="rgba(255,255,255,0.08)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                  />
                  <text
                    x={node.x - 30}
                    y={node.y + 3}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize={9}
                    fontWeight={600}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {node.module.letter}
                  </text>
                  <text
                    x={node.x - 16}
                    y={node.y + 3}
                    fill="#fff"
                    fontSize={11}
                    fontWeight={500}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {node.module.shortName}
                  </text>
                </g>
              ))}

              {/* Empty state hint */}
              {count === 0 && (
                <text
                  x={cx}
                  y={cy + 70}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.25)"
                  fontSize={12}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  Selecione módulos acima para começar
                </text>
              )}
            </svg>

            {/* Bottom info bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
              paddingTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", gap: 18 }}>
                {[
                  "Hospedado na Europa",
                  "LGPD & GDPR",
                  "Suporte contínuo",
                ].map(text => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{text}</span>
                  </div>
                ))}
              </div>
              <span style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
              }}>
                {count} módulo{count !== 1 ? "s" : ""} selecionado{count !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
