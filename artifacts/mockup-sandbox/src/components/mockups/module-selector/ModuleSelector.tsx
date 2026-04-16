import { useState, useEffect, useRef } from "react";

const MODULES = [
  {
    id: "contratos",
    name: "Gestão de Contratos",
    shortName: "Contratos",
    description: "Centralizar e automatizar o ciclo de vida dos seus contratos — da criação com IA à assinatura digital, com alertas de vencimento e trilha de auditoria.",
    color: "#00c8a0",
    bg: "rgba(0,200,160,0.08)",
    border: "rgba(0,200,160,0.25)",
    glow: "rgba(0,200,160,0.15)",
    letter: "C",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#00c8a0" stop-opacity=".15"/><stop offset="100%" stop-color="#00c8a0" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg1)"/><rect x="40" y="15" width="80" height="60" rx="8" fill="rgba(0,200,160,.08)" stroke="rgba(0,200,160,.2)" stroke-width="1"/><rect x="50" y="26" width="50" height="2.5" rx="1.2" fill="rgba(0,200,160,.5)"/><rect x="50" y="33" width="60" height="2" rx="1" fill="rgba(255,255,255,.12)"/><rect x="50" y="39" width="45" height="2" rx="1" fill="rgba(255,255,255,.12)"/><rect x="50" y="45" width="55" height="2" rx="1" fill="rgba(255,255,255,.1)"/><rect x="50" y="56" width="60" height="8" rx="4" fill="rgba(0,200,160,.15)" stroke="rgba(0,200,160,.3)" stroke-width=".8"/><path d="M54 62 C57 57 60 63 64 59" stroke="rgba(0,200,160,.6)" stroke-width="1.2" stroke-linecap="round" fill="none"/><circle cx="140" cy="30" r="18" fill="rgba(0,200,160,.06)" stroke="rgba(0,200,160,.15)" stroke-width="1"/><path d="M133 30 L136 33 L147 24" stroke="rgba(0,200,160,.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    id: "faturas",
    name: "Automação de Faturas",
    shortName: "Faturas",
    description: "Automatizar o recebimento, validação e aprovação de faturas de fornecedores — eliminando trabalho manual, erros e atrasos no processo de pagamento.",
    color: "#0084ff",
    bg: "rgba(0,132,255,0.08)",
    border: "rgba(0,132,255,0.25)",
    glow: "rgba(0,132,255,0.15)",
    letter: "F",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg2b" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0084ff" stop-opacity=".14"/><stop offset="100%" stop-color="#0084ff" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg2b)"/><rect x="32" y="20" width="58" height="52" rx="8" fill="rgba(0,132,255,.07)" stroke="rgba(0,132,255,.18)" stroke-width="1"/><rect x="42" y="30" width="38" height="3" rx="1.5" fill="rgba(0,132,255,.4)"/><rect x="42" y="37" width="30" height="2" rx="1" fill="rgba(255,255,255,.1)"/><rect x="42" y="42" width="34" height="2" rx="1" fill="rgba(255,255,255,.1)"/><rect x="42" y="55" width="38" height="10" rx="5" fill="rgba(0,132,255,.12)" stroke="rgba(0,132,255,.25)" stroke-width=".8"/><text x="61" y="63" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="600" fill="rgba(0,132,255,.7)">R$ 4.200</text><line x1="96" y1="45" x2="114" y2="45" stroke="rgba(0,132,255,.3)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 2"/><path d="M112 41 L116 45 L112 49" stroke="rgba(0,132,255,.4)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="116" y="20" width="52" height="52" rx="8" fill="rgba(0,200,160,.07)" stroke="rgba(0,200,160,.18)" stroke-width="1"/><circle cx="142" cy="38" r="10" fill="rgba(0,200,160,.12)" stroke="rgba(0,200,160,.3)" stroke-width="1"/><path d="M136 38 L139.5 41.5 L148 34" stroke="rgba(0,200,160,.8)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    id: "frotas",
    name: "Gestão de Frotas",
    shortName: "Frotas",
    description: "Gerenciar todos os documentos da sua frota — CRLV, licenciamentos, CNHs e contratos de locação — com alertas automáticos de vencimento por veículo.",
    color: "#00c8a0",
    bg: "rgba(0,200,160,0.08)",
    border: "rgba(0,200,160,0.25)",
    glow: "rgba(0,200,160,0.12)",
    letter: "F",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg5" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#00c8a0" stop-opacity=".12"/><stop offset="100%" stop-color="#00c8a0" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg5)"/><rect x="30" y="30" width="100" height="32" rx="8" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.09)" stroke-width="1"/><rect x="42" y="40" width="6" height="6" rx="3" fill="rgba(0,200,160,.6)"/><rect x="54" y="40" width="50" height="2.5" rx="1.2" fill="rgba(255,255,255,.2)"/><rect x="54" y="46" width="36" height="1.5" rx=".75" fill="rgba(255,255,255,.1)"/><rect x="112" y="38" width="8" height="8" rx="4" fill="rgba(0,200,160,.3)"/><rect x="140" y="20" width="46" height="52" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.07)" stroke-width=".8"/><rect x="148" y="28" width="30" height="2.5" rx="1.2" fill="rgba(0,200,160,.3)"/><rect x="148" y="34" width="22" height="1.5" rx=".75" fill="rgba(255,255,255,.08)"/><rect x="148" y="46" width="30" height="2.5" rx="1.2" fill="rgba(245,158,11,.3)"/><rect x="148" y="52" width="18" height="1.5" rx=".75" fill="rgba(255,255,255,.08)"/><rect x="148" y="58" width="30" height="2.5" rx="1.2" fill="rgba(239,68,68,.3)"/></svg>`,
  },
  {
    id: "seguros",
    name: "Gestão de Seguros",
    shortName: "Seguros",
    description: "Centralizar a gestão de todas as apólices de seguro da empresa — veículos, patrimônio, responsabilidade civil e mais — com controle de vencimentos e sinistros.",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.12)",
    letter: "S",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg_seg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ef4444" stop-opacity=".12"/><stop offset="100%" stop-color="#ef4444" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg_seg)"/><path d="M100 14 L130 26 L130 48 C130 64 116 76 100 80 C84 76 70 64 70 48 L70 26 Z" fill="rgba(239,68,68,.08)" stroke="rgba(239,68,68,.25)" stroke-width="1.2" stroke-linejoin="round"/><rect x="90" y="42" width="20" height="16" rx="3" fill="none" stroke="rgba(239,68,68,.7)" stroke-width="1.3"/><path d="M92 42 L92 38 C92 35.2 94.2 33 97 33 L103 33 C105.8 33 108 35.2 108 38 L108 42" fill="none" stroke="rgba(239,68,68,.5)" stroke-width="1.3" stroke-linecap="round"/><circle cx="100" cy="50" r="2.5" fill="rgba(239,68,68,.8)"/></svg>`,
  },
  {
    id: "clientes",
    name: "Docs de Clientes",
    shortName: "Clientes",
    description: "Organizar, gerenciar e acessar de forma segura toda a documentação dos seus clientes — contratos, propostas, KYC e comprovantes — com busca inteligente.",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.25)",
    glow: "rgba(168,85,247,0.12)",
    letter: "C",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg_cli" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#a855f7" stop-opacity=".13"/><stop offset="100%" stop-color="#a855f7" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg_cli)"/><circle cx="70" cy="34" r="14" fill="rgba(168,85,247,.1)" stroke="rgba(168,85,247,.22)" stroke-width="1"/><circle cx="70" cy="30" r="5" fill="none" stroke="rgba(168,85,247,.6)" stroke-width="1.2"/><path d="M60 42 C60 38 64.5 36 70 36 C75.5 36 80 38 80 42" fill="none" stroke="rgba(168,85,247,.5)" stroke-width="1.2" stroke-linecap="round"/><rect x="88" y="20" width="76" height="52" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.09)" stroke-width="1"/><rect x="96" y="30" width="50" height="2.5" rx="1.2" fill="rgba(168,85,247,.4)"/><rect x="96" y="37" width="60" height="1.5" rx=".75" fill="rgba(255,255,255,.1)"/><rect x="96" y="42" width="44" height="1.5" rx=".75" fill="rgba(255,255,255,.08)"/></svg>`,
  },
  {
    id: "fornecedores",
    name: "Docs de Fornecedores",
    shortName: "Fornecedores",
    description: "Centralizar e organizar toda a documentação dos seus fornecedores — contratos, certidões, notas fiscais e habilitações — com validade monitorada.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    glow: "rgba(245,158,11,0.12)",
    letter: "F",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg_for" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f59e0b" stop-opacity=".13"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg_for)"/><rect x="28" y="22" width="64" height="48" rx="9" fill="rgba(245,158,11,.07)" stroke="rgba(245,158,11,.18)" stroke-width="1"/><rect x="36" y="31" width="48" height="3" rx="1.5" fill="rgba(245,158,11,.4)"/><rect x="36" y="38" width="40" height="2" rx="1" fill="rgba(255,255,255,.1)"/><rect x="36" y="43" width="44" height="2" rx="1" fill="rgba(255,255,255,.1)"/><rect x="36" y="56" width="48" height="8" rx="4" fill="rgba(0,200,160,.1)" stroke="rgba(0,200,160,.22)" stroke-width=".8"/></svg>`,
  },
  {
    id: "rh",
    name: "Docs de RH",
    shortName: "RH",
    description: "Digitalizar e gerenciar de forma segura e eficiente todos os documentos do departamento de Recursos Humanos, processos de admissão e prontuários.",
    color: "#0084ff",
    bg: "rgba(0,132,255,0.08)",
    border: "rgba(0,132,255,0.25)",
    glow: "rgba(0,132,255,0.12)",
    letter: "R",
    svg: `<svg viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg4" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0084ff" stop-opacity=".13"/><stop offset="100%" stop-color="#0084ff" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="45" rx="80" ry="36" fill="url(#mg4)"/><circle cx="50" cy="34" r="13" fill="rgba(0,132,255,.1)" stroke="rgba(0,132,255,.22)" stroke-width="1"/><circle cx="50" cy="30" r="5" fill="none" stroke="rgba(0,132,255,.6)" stroke-width="1.2"/><path d="M40 42 C40 38 44.5 36 50 36 C55.5 36 60 38 60 42" fill="none" stroke="rgba(0,132,255,.5)" stroke-width="1.2" stroke-linecap="round"/><rect x="68" y="18" width="96" height="56" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.09)" stroke-width="1"/><rect x="76" y="28" width="60" height="2.5" rx="1.2" fill="rgba(0,132,255,.4)"/><rect x="76" y="35" width="80" height="1.5" rx=".75" fill="rgba(255,255,255,.1)"/></svg>`,
  },
];

function AnimatedConnection({ x1, y1, x2, y2, color, delay = 0, visible }: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; delay?: number; visible: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number>();

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }
    let start: number | null = null;
    const duration = 500;
    const delayMs = delay;

    const timeout = setTimeout(() => {
      const animate = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setProgress(eased);
        if (p < 1) animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [visible, delay]);

  const cx = x1 + (x2 - x1) * progress;
  const cy = y1 + (y2 - y1) * progress;

  if (!visible && progress === 0) return null;

  return (
    <g>
      <line
        x1={x1} y1={y1}
        x2={x1 + (x2 - x1) * progress}
        y2={y1 + (y2 - y1) * progress}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="6 4"
        opacity={0.5}
      />
      {progress > 0.1 && (
        <circle
          cx={cx}
          cy={cy}
          r="3"
          fill={color}
          opacity={0.9}
        />
      )}
      {progress >= 1 && (
        <circle
          cx={x2}
          cy={y2}
          r="5"
          fill={color}
          opacity={0.3}
        >
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function ModuleCard({ module, selected, onClick, index, total }: {
  module: typeof MODULES[0];
  selected: boolean;
  onClick: () => void;
  index: number;
  total: number;
}) {
  return (
    <button
      onClick={onClick}
      className="relative group text-left transition-all duration-300"
      style={{
        background: selected ? module.bg : "rgba(255,255,255,0.03)",
        border: `1px solid ${selected ? module.border : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        outline: "none",
        boxShadow: selected ? `0 0 20px ${module.glow}, inset 0 0 20px ${module.glow}` : "none",
        transform: selected ? "translateY(-1px)" : "none",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "8px",
            background: selected ? module.color : "rgba(255,255,255,0.06)",
            border: `1px solid ${selected ? module.color : "rgba(255,255,255,0.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            color: selected ? "#000" : "rgba(255,255,255,0.4)",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
        >
          {module.letter}
        </div>
        <span style={{
          fontSize: "13px",
          fontWeight: 600,
          color: selected ? "#fff" : "rgba(255,255,255,0.55)",
          transition: "color 0.2s",
          lineHeight: 1.2,
        }}>
          {module.shortName}
        </span>
        <div style={{ marginLeft: "auto" }}>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: `1.5px solid ${selected ? module.color : "rgba(255,255,255,0.15)"}`,
            background: selected ? module.color : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
          }}>
            {selected && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <p style={{
        fontSize: "11px",
        color: selected ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)",
        lineHeight: 1.5,
        margin: 0,
        transition: "color 0.2s",
      }}>
        {module.description.slice(0, 80)}...
      </p>
    </button>
  );
}

export function ModuleSelector() {
  const [selected, setSelected] = useState<string[]>(["contratos", "faturas", "frotas"]);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedModules = MODULES.filter(m => selected.includes(m.id));
  const count = selectedModules.length;

  const getNodePositions = () => {
    const w = 560;
    const centerX = w / 2;
    const centerY = 220;
    const radius = 170;

    return selectedModules.map((m, i) => {
      const angleOffset = -Math.PI / 2;
      const angle = angleOffset + (i / Math.max(count, 1)) * Math.PI * 2;
      return {
        id: m.id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        module: m,
      };
    });
  };

  const nodes = getNodePositions();
  const svgW = 560;
  const svgH = 440;
  const cx = svgW / 2;
  const cy = 220;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0c10 0%, #0d1117 50%, #0a0c10 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 1100, width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <p style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#00c8a0",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}>
            Monte seu sistema
          </p>
          <h2 style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
          }}>
            Selecione os módulos
          </h2>
          <p style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.45)",
            margin: 0,
            maxWidth: 480,
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
          gap: 10,
          marginBottom: 40,
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
                padding: "8px 16px",
                borderRadius: 999,
                border: `1.5px solid ${selected.includes(m.id) ? m.color : "rgba(255,255,255,0.1)"}`,
                background: selected.includes(m.id) ? `${m.bg}` : "rgba(255,255,255,0.02)",
                color: selected.includes(m.id) ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                outline: "none",
                boxShadow: selected.includes(m.id) ? `0 0 12px ${m.glow}` : "none",
              }}
            >
              <span style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: selected.includes(m.id) ? m.color : "rgba(255,255,255,0.2)",
                flexShrink: 0,
                transition: "all 0.2s",
              }} />
              {m.shortName}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 24,
          alignItems: "start",
        }}>
          {/* Module list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MODULES.map((m, i) => (
              <ModuleCard
                key={m.id}
                module={m}
                selected={selected.includes(m.id)}
                onClick={() => toggle(m.id)}
                index={i}
                total={MODULES.length}
              />
            ))}
          </div>

          {/* Diagram */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid pattern background */}
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Main SVG diagram */}
            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgW} ${svgH}`}
              style={{ width: "100%", height: "auto", position: "relative" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection lines */}
              {nodes.map((node, i) => (
                <AnimatedConnection
                  key={`${node.id}-line`}
                  x1={cx}
                  y1={cy}
                  x2={node.x}
                  y2={node.y}
                  color={node.module.color}
                  delay={i * 80}
                  visible={selected.includes(node.id)}
                />
              ))}

              {/* Center node — "Seu Sistema" */}
              <g>
                <ellipse cx={cx} cy={cy} rx={68} ry={30} fill="rgba(0,200,160,0.04)" />
                <ellipse cx={cx} cy={cy} rx={68} ry={30} fill="none" stroke="rgba(0,200,160,0.12)" strokeWidth={1} />
                <rect
                  x={cx - 60}
                  y={cy - 22}
                  width={120}
                  height={44}
                  rx={22}
                  fill="#0e2720"
                  stroke="#00c8a0"
                  strokeWidth={1.5}
                />
                <text
                  x={cx}
                  y={cy + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={13}
                  fontWeight={600}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  Seu sistema
                </text>
                {/* Pulsing ring */}
                <circle cx={cx} cy={cy} r={68} fill="none" stroke="rgba(0,200,160,0.08)" strokeWidth={1}>
                  <animate attributeName="r" values="68;80;68" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Module nodes */}
              {nodes.map((node, i) => (
                <g
                  key={node.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggle(node.id)}
                >
                  {/* Glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={52}
                    fill={node.module.glow}
                    opacity={0.5}
                  />
                  {/* Node bg */}
                  <rect
                    x={node.x - 48}
                    y={node.y - 42}
                    width={96}
                    height={84}
                    rx={12}
                    fill="#11151c"
                    stroke={node.module.color}
                    strokeWidth={1.5}
                    strokeOpacity={0.6}
                  />
                  {/* Module SVG illustration */}
                  <foreignObject x={node.x - 48} y={node.y - 42} width={96} height={56}>
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      dangerouslySetInnerHTML={{ __html: node.module.svg.replace(/viewBox="[^"]*"/, 'viewBox="0 0 200 90" style="width:96px;height:56px;"') }}
                    />
                  </foreignObject>
                  {/* Module name */}
                  <text
                    x={node.x}
                    y={node.y + 32}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={10}
                    fontWeight={600}
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
                  y={cy + 80}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.2)"
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
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  { dot: "#00c8a0", text: "Hospedado na Europa" },
                  { dot: "#00c8a0", text: "LGPD & GDPR" },
                  { dot: "#00c8a0", text: "Suporte contínuo" },
                ].map(item => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <span style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                fontWeight: 500,
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
        button:hover { filter: brightness(1.05); }
      `}</style>
    </div>
  );
}
