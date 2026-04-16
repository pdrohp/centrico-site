import { motion } from "framer-motion";
import { CheckCircle2, Globe2, Shield, LifeBuoy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Seguranca() {
  const trusts = [
    { title: "Hospedado na Europa", icon: Globe2 },
    { title: "LGPD & GDPR conformes", icon: Shield },
    { title: "Dados nunca saem da UE", icon: CheckCircle2 },
    { title: "Suporte contínuo incluso", icon: LifeBuoy },
  ];

  return (
    <section id="seguranca" className="py-24 bg-white border-y border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">
                Seus documentos nunca saem da Europa.
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                Infraestrutura hospedada em servidores europeus, com conformidade total às regulamentações LGPD e GDPR. Seus documentos nunca deixam a UE.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trusts.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1D9E75]"></span>
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative w-full aspect-square max-w-md mx-auto">
            <RotatingGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}

function RotatingGlobe() {
  const [phase, setPhase] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      // Slow rotation: full turn every ~24s
      setPhase((p) => (p + dt * (Math.PI * 2) / 24) % (Math.PI * 2));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // SVG viewBox: 400x400, sphere centered at (200, 200) with radius 150
  const cx = 200;
  const cy = 200;
  const r = 150;

  // Build meridian ellipses: 8 meridians evenly spaced, rx = r * |cos(angle)|
  const meridians = Array.from({ length: 8 }, (_, i) => {
    const angle = phase + (i * Math.PI) / 8;
    const rxRaw = Math.cos(angle) * r;
    const rx = Math.abs(rxRaw);
    const onFront = rxRaw >= 0; // simple front/back distinction for opacity
    return { rx, opacity: onFront ? 0.55 : 0.18 };
  });

  // Latitude rings (parallels) — static, just elliptical bands
  const parallels = [
    { y: -r * 0.7, rx: r * Math.cos(Math.asin(0.7)), ry: 8 },
    { y: -r * 0.4, rx: r * Math.cos(Math.asin(0.4)), ry: 12 },
    { y: 0, rx: r, ry: 16 },
    { y: r * 0.4, rx: r * Math.cos(Math.asin(0.4)), ry: 12 },
    { y: r * 0.7, rx: r * Math.cos(Math.asin(0.7)), ry: 8 },
  ];

  // Europe pin: lon ~10°E, lat ~50°N (Frankfurt area)
  const lon = (10 * Math.PI) / 180;
  const lat = (50 * Math.PI) / 180;
  // Project: x = r * cos(lat) * sin(lon - phase), y = -r * sin(lat), z = r * cos(lat) * cos(lon - phase)
  const localLon = lon - phase;
  const px = r * Math.cos(lat) * Math.sin(localLon);
  const py = -r * Math.sin(lat);
  const pz = r * Math.cos(lat) * Math.cos(localLon);
  const pinVisible = pz > -10; // hide when on far side of globe

  // Pulse for the pin
  const t = phase * 4; // pulse speed coupled to phase
  const pulseScale = 1 + 0.5 * (Math.sin(t * 2) * 0.5 + 0.5);
  const pulseOpacity = 0.55 - 0.45 * (Math.sin(t * 2) * 0.5 + 0.5);

  // Pin opacity also fades near the edge for nicer look
  const edgeFade = Math.max(0, Math.min(1, (pz + 30) / 60));

  return (
    <div className="absolute inset-0 bg-[#F8F7F5] rounded-3xl border border-border overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="globeGradient" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#EDEAE0" />
            <stop offset="100%" stopColor="#D3D1C7" />
          </radialGradient>
          <radialGradient id="globeShadow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(26,46,74,0)" />
            <stop offset="100%" stopColor="rgba(26,46,74,0.18)" />
          </radialGradient>
        </defs>

        {/* Sphere body */}
        <circle cx={cx} cy={cy} r={r} fill="url(#globeGradient)" />

        {/* Inner texture group, clipped to sphere */}
        <clipPath id="sphereClip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>

        <g clipPath="url(#sphereClip)">
          {/* Parallels (latitude lines) */}
          {parallels.map((p, i) => (
            <ellipse
              key={`par-${i}`}
              cx={cx}
              cy={cy + p.y}
              rx={p.rx}
              ry={p.ry}
              fill="none"
              stroke="#1A2E4A"
              strokeWidth="1"
              strokeOpacity="0.22"
            />
          ))}

          {/* Meridians (longitude lines) — animated via rx */}
          {meridians.map((m, i) => (
            <ellipse
              key={`mer-${i}`}
              cx={cx}
              cy={cy}
              rx={m.rx}
              ry={r}
              fill="none"
              stroke="#1A2E4A"
              strokeWidth="1"
              strokeOpacity={m.opacity * 0.4}
            />
          ))}

          {/* Subtle dotted "land mass" texture — random fixed dots clipped by sphere */}
          {LAND_DOTS.map((d, i) => {
            // Treat dots as living on the sphere surface (lon/lat)
            const dLon = d.lon - phase;
            const dz = Math.cos(d.lat) * Math.cos(dLon);
            if (dz < 0) return null;
            const dx = r * Math.cos(d.lat) * Math.sin(dLon);
            const dy = -r * Math.sin(d.lat);
            const opacity = 0.15 + 0.35 * dz;
            return (
              <circle
                key={`land-${i}`}
                cx={cx + dx}
                cy={cy + dy}
                r={d.size}
                fill="#1A2E4A"
                opacity={opacity}
              />
            );
          })}
        </g>

        {/* Sphere edge shading */}
        <circle cx={cx} cy={cy} r={r} fill="url(#globeShadow)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1A2E4A" strokeOpacity="0.35" strokeWidth="1" />

        {/* Europe pin */}
        {pinVisible && (
          <g opacity={edgeFade}>
            {/* Pulsing halo */}
            <circle
              cx={cx + px}
              cy={cy + py}
              r={10 * pulseScale}
              fill="#1D9E75"
              opacity={pulseOpacity}
            />
            <circle
              cx={cx + px}
              cy={cy + py}
              r={6}
              fill="#1D9E75"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      {/* Frankfurt label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full border border-border text-xs font-bold text-primary shadow-sm flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
        Frankfurt, DE
      </div>

      {/* Compliance badges */}
      <div className="absolute bottom-6 left-6 bg-white border border-border px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
        <Shield size={14} className="text-[#1D9E75]" />
        <span className="text-xs font-bold text-foreground">LGPD</span>
      </div>
      <div className="absolute bottom-6 right-6 bg-white border border-border px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
        <Shield size={14} className="text-[#1D9E75]" />
        <span className="text-xs font-bold text-foreground">GDPR</span>
      </div>
    </div>
  );
}

// Pseudo-random "land mass" dots distributed across the sphere (lon/lat in radians).
// Concentrated to vaguely suggest continents (Europe, Africa, Americas, Asia).
const LAND_DOTS: { lon: number; lat: number; size: number }[] = (() => {
  const deg = (d: number) => (d * Math.PI) / 180;
  const dots: { lon: number; lat: number; size: number }[] = [];
  const regions = [
    // Europe
    { lonRange: [-10, 35], latRange: [38, 62], count: 28 },
    // Africa
    { lonRange: [-15, 45], latRange: [-32, 30], count: 50 },
    // Asia
    { lonRange: [50, 140], latRange: [10, 60], count: 60 },
    // North America
    { lonRange: [-130, -70], latRange: [25, 60], count: 38 },
    // South America
    { lonRange: [-78, -40], latRange: [-50, 8], count: 32 },
    // Oceania
    { lonRange: [115, 155], latRange: [-40, -12], count: 18 },
  ];
  let seed = 1;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  regions.forEach((reg) => {
    for (let i = 0; i < reg.count; i++) {
      const lon = reg.lonRange[0] + rand() * (reg.lonRange[1] - reg.lonRange[0]);
      const lat = reg.latRange[0] + rand() * (reg.latRange[1] - reg.latRange[0]);
      const size = 1.5 + rand() * 1.8;
      dots.push({ lon: deg(lon), lat: deg(lat), size });
    }
  });
  return dots;
})();
