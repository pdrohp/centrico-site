// Low-fidelity wireframe — grayscale only, no icons, text replaced by gray blocks

// ── Grayscale tokens ──────────────────────────────────────────────────────────
const G0  = "#111111"; // near-black (sidebar)
const G1  = "#333333"; // dark gray
const G2  = "#666666"; // mid gray
const G3  = "#999999"; // light-mid gray
const G4  = "#c0c0c0"; // light gray
const G5  = "#d8d8d8"; // very light gray
const G6  = "#e8e8e8"; // border / divider
const G7  = "#f2f2f2"; // near-white background
const GW  = "#ffffff"; // white

// ── Primitives ────────────────────────────────────────────────────────────────

/** Solid gray rectangle that simulates a line of text */
function TextBlock({ w = "60%", h = 8, color = G4, style = {} }: {
  w?: string | number; h?: number; color?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 3,
      background: color, flexShrink: 0, ...style,
    }} />
  );
}

/** Gray circle or square to replace an icon */
function IconBox({ size = 18, radius = 6, color = G5 }: {
  size?: number; radius?: number | string; color?: string;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: color, flexShrink: 0,
    }} />
  );
}

/** A full card container */
function Card({ children, style = {} }: {
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: GW, borderRadius: 10, border: `1px solid ${G6}`,
      padding: "18px 20px", ...style,
    }}>
      {children}
    </div>
  );
}

/** Card header: title block + optional right element */
function CardHeader({ rightSlot }: { rightSlot?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <TextBlock w="40%" h={10} color={G2} />
      {rightSlot ?? <IconBox size={14} radius={3} color={G5} />}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard() {
  return (
    <Card style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <TextBlock w={80} h={8} color={G4} />
        <TextBlock w={40} h={20} color={G2} />
        <TextBlock w={60} h={7} color={G5} />
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: G7, border: `1px solid ${G6}`, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <IconBox size={16} radius={4} color={G4} />
      </div>
    </Card>
  );
}

// ── Chart placeholder ─────────────────────────────────────────────────────────
function ChartPlaceholder() {
  const lines = [0.2, 0.6, 0.35, 0.8, 0.55, 0.9];
  return (
    <div style={{ width: "100%", height: 180, background: G7, borderRadius: 6, position: "relative", overflow: "hidden" }}>
      {/* Horizontal grid lines */}
      {[0.25, 0.5, 0.75].map((pct, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: `${pct * 100}%`, height: 1, background: G6,
        }} />
      ))}
      {/* Fake bars */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "flex-end", gap: 4, padding: "0 12px 8px",
        height: "100%",
      }}>
        {lines.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
            <div style={{ width: "60%", height: `${h * 65}%`, background: G4, borderRadius: "3px 3px 0 0" }} />
          </div>
        ))}
      </div>
      {/* Fake area curve hint */}
      <div style={{
        position: "absolute", bottom: 8, left: 12, right: 12, height: "45%",
        background: "linear-gradient(to bottom, rgba(150,150,150,0.18) 0%, rgba(150,150,150,0) 100%)",
        borderRadius: 6,
      }} />
    </div>
  );
}

// ── Category bars ─────────────────────────────────────────────────────────────
const catWidths = [65, 29, 5, 1];

function Categories() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {catWidths.map((w, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <TextBlock w={80 + i * 12} h={8} color={G3} />
            <div style={{ display: "flex", gap: 10 }}>
              <TextBlock w={24} h={8} color={G4} />
              <TextBlock w={30} h={8} color={G4} />
            </div>
          </div>
          <div style={{ height: 6, background: G6, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${w}%`, background: G3, borderRadius: 3 }} />
          </div>
        </div>
      ))}
      <TextBlock w="50%" h={7} color={G5} style={{ alignSelf: "center", marginTop: 4 }} />
    </div>
  );
}

// ── Recent docs row ───────────────────────────────────────────────────────────
function DocRow({ last = false }: { last?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "9px 0",
      borderBottom: last ? "none" : `1px solid ${G7}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <IconBox size={16} radius="50%" color={G4} />
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <TextBlock w={140} h={8} color={G2} />
          <div style={{ display: "flex", gap: 6 }}>
            <TextBlock w={50} h={7} color={G4} />
            <TextBlock w={40} h={7} color={G5} style={{ borderRadius: 999 }} />
          </div>
        </div>
      </div>
      <TextBlock w={80} h={7} color={G5} />
    </div>
  );
}

// ── Status card ───────────────────────────────────────────────────────────────
function StatusCell() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: 12, background: G7, borderRadius: 8, border: `1px solid ${G6}`,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 8, background: G6,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <IconBox size={14} radius={4} color={G4} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <TextBlock w={28} h={14} color={G2} />
        <TextBlock w={60} h={7} color={G4} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function DashboardWireframe() {
  return (
    <div style={{
      display: "flex", height: "100vh",
      fontFamily: "system-ui, sans-serif",
      background: G7, overflow: "hidden",
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 60, background: G0, display: "flex", flexDirection: "column",
        alignItems: "center", paddingTop: 16, paddingBottom: 16, gap: 6, flexShrink: 0,
      }}>
        {/* Logo placeholder */}
        <div style={{ width: 32, height: 32, borderRadius: 6, background: G2, marginBottom: 20 }} />

        {/* Nav items — 7 rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{
            width: 40, height: 36, borderRadius: 7,
            background: i === 0 ? G2 : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconBox size={16} radius={4} color={i === 0 ? G5 : G3} />
          </div>
        ))}

        <div style={{ flex: 1 }} />
        {/* Logout */}
        <IconBox size={16} radius={4} color={G3} />
        {/* Avatar */}
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: G2, marginTop: 8 }} />
      </div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{
          background: GW, borderBottom: `1px solid ${G6}`,
          height: 56, padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <TextBlock w={100} h={12} color={G2} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* CTA button */}
            <div style={{
              width: 130, height: 48, borderRadius: 2, background: G2,
            }} />
            {/* Bell */}
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: G7, border: `1px solid ${G6}` }} />
            {/* Avatar */}
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: G4 }} />
            <IconBox size={10} radius={2} color={G4} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "18px 24px 24px" }}>
          {/* Subtitle */}
          <TextBlock w="38%" h={8} color={G4} style={{ marginBottom: 18 }} />

          {/* Stat cards row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <StatCard /><StatCard /><StatCard /><StatCard />
          </div>

          {/* Charts row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

            {/* Monthly chart */}
            <Card>
              <CardHeader rightSlot={
                <div style={{ width: 56, height: 20, borderRadius: 4, background: G6 }} />
              } />
              <ChartPlaceholder />
              {/* Legend */}
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                {[0, 1].map(i => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <IconBox size={10} radius="50%" color={G4} />
                    <TextBlock w={50} h={7} color={G4} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader />
              <Categories />
            </Card>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

            {/* Recent docs */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <TextBlock w="40%" h={10} color={G2} />
                <TextBlock w={48} h={8} color={G3} />
              </div>
              {[0,1,2,3,4].map(i => <DocRow key={i} last={i === 4} />)}
            </Card>

            {/* System status */}
            <Card>
              <CardHeader />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <StatusCell /><StatusCell />
                <StatusCell /><StatusCell />
              </div>
            </Card>

          </div>
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}
