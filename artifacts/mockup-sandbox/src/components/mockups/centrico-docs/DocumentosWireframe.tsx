// Low-fidelity wireframe — grayscale only, no icons, text replaced by gray blocks

const G0  = "#111111";
const G1  = "#333333";
const G2  = "#666666";
const G3  = "#999999";
const G4  = "#c0c0c0";
const G5  = "#d8d8d8";
const G6  = "#e0e0e0";
const GW  = "#ffffff";

function TextBlock({ w = "60%", h = 8, color = G4, style = {} }: {
  w?: string | number; h?: number; color?: string; style?: React.CSSProperties;
}) {
  return <div style={{ width: w, height: h, borderRadius: 3, background: color, flexShrink: 0, ...style }} />;
}

function IconBox({ size = 14, radius = 4, color = G5 }: {
  size?: number; radius?: number | string; color?: string;
}) {
  return <div style={{ width: size, height: size, borderRadius: radius, background: color, flexShrink: 0 }} />;
}

export function DocumentosWireframe() {
  return (
    <div style={{
      display: "flex", height: "100vh",
      fontFamily: "system-ui, sans-serif",
      background: G6, overflow: "hidden",
    }}>

      {/* ── Sidebar (expanded) ── */}
      <div style={{
        width: 210, background: G0, display: "flex", flexDirection: "column",
        flexShrink: 0, paddingBottom: 16,
      }}>
        {/* Logo block */}
        <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: G2, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <TextBlock w={70} h={9} color={G4} />
              <TextBlock w={90} h={7} color={G2} />
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {[true, false, false, false, false, false, false].map((active, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 10px", borderRadius: 6,
              background: active ? "rgba(255,255,255,0.12)" : "transparent",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconBox size={14} radius={3} color={active ? G5 : G3} />
                <TextBlock w={active ? 90 : 70 + i * 5} h={8} color={active ? G5 : G3} />
              </div>
              {(i === 4 || i === 6) && <IconBox size={10} radius={2} color={G2} />}
            </div>
          ))}
        </div>

        {/* User block */}
        <div style={{ padding: "12px 14px", borderTop: `1px solid rgba(255,255,255,0.08)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: G2, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <TextBlock w={80} h={8} color={G4} />
              <TextBlock w={110} h={7} color={G2} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconBox size={12} radius={3} color={G2} />
            <TextBlock w={30} h={7} color={G2} />
          </div>
        </div>
      </div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          background: GW, borderBottom: `1px solid ${G6}`,
          height: 52, padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <IconBox size={18} radius={3} color={G5} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 130, height: 48, borderRadius: 2, background: G2 }} />
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G5 }} />
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: G4 }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>

          {/* Page heading */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <TextBlock w={240} h={18} color={G1} />
              <TextBlock w={340} h={9} color={G4} />
            </div>
            <div style={{ width: 130, height: 48, borderRadius: 2, background: G2, flexShrink: 0 }} />
          </div>

          {/* Search + filter */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{
              flex: 1, height: 40, background: GW,
              border: `1px solid ${G6}`, borderRadius: 6,
              display: "flex", alignItems: "center", gap: 10, padding: "0 14px",
            }}>
              <IconBox size={14} radius={3} color={G5} />
              <TextBlock w="50%" h={8} color={G5} />
            </div>
            <div style={{
              width: 100, height: 40, background: GW,
              border: `1px solid ${G6}`, borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 14px",
            }}>
              <TextBlock w={36} h={8} color={G4} />
              <IconBox size={10} radius={2} color={G5} />
            </div>
          </div>

          {/* Table */}
          <div style={{
            background: GW, borderRadius: 8, border: `1px solid ${G6}`, overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 40px",
              padding: "10px 20px", borderBottom: `1px solid ${G6}`, background: "#f6f6f6",
              gap: 8,
            }}>
              {[120, 80, 60, 60, 60, 20].map((w, i) => (
                <TextBlock key={i} w={w} h={8} color={G5} />
              ))}
            </div>

            {/* Data rows */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 40px",
                padding: "12px 20px",
                borderBottom: i < 9 ? `1px solid #f0f0f0` : "none",
                alignItems: "center", gap: 8,
              }}>
                {/* Documento */}
                <TextBlock w={90 + (i % 3) * 20} h={9} color={G3} />
                {/* Categoria badge */}
                <div style={{
                  display: "inline-flex", padding: "3px 10px",
                  borderRadius: 4, border: `1px solid ${G5}`, background: "#f6f6f6",
                  width: "fit-content",
                }}>
                  <TextBlock w={70} h={7} color={G4} />
                </div>
                {/* Tamanho */}
                <TextBlock w={55} h={8} color={G4} />
                {/* Data */}
                <TextBlock w={65} h={8} color={G4} />
                {/* Status badge */}
                <div style={{
                  display: "inline-flex", padding: "3px 10px",
                  borderRadius: 4,
                  background: i % 2 === 0 ? G4 : "transparent",
                  border: i % 2 === 0 ? "none" : `1px solid ${G5}`,
                  width: "fit-content",
                }}>
                  <TextBlock w={50} h={7} color={i % 2 === 0 ? GW : G4} />
                </div>
                {/* Eye icon */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconBox size={14} radius={3} color={G5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
