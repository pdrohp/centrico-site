import { useEffect, useRef } from "react";

const GRID = 48;
const PULSE_COLOR = [46, 90, 171] as const; // #2E5AAB
const MAX_PULSES = 8;
const MIN_SPAWN_MS = 180;
const MAX_SPAWN_MS = 520;

type Pulse = {
  axis: "h" | "v";
  line: number; // grid line index (in css pixels)
  start: number; // start position along the axis (css px)
  end: number; // end position along the axis (css px)
  length: number; // trail length (css px)
  duration: number; // ms
  born: number; // ms timestamp
};

export function GridPulseBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const pulses: Pulse[] = [];
    let nextSpawn = 0;
    let last = performance.now();
    let raf = 0;
    let running = true;

    const spawn = (now: number) => {
      if (pulses.length >= MAX_PULSES) return;
      if (width < GRID || height < GRID) return;
      const horizontal = Math.random() < 0.5;
      const axis: "h" | "v" = horizontal ? "h" : "v";
      // pick an interior grid line (avoid 0 / edge)
      const lines = horizontal
        ? Math.max(1, Math.floor(height / GRID))
        : Math.max(1, Math.floor(width / GRID));
      const lineIdx = Math.floor(Math.random() * lines);
      const onLine = Math.min(
        horizontal ? height : width,
        Math.max(0, lineIdx * GRID),
      );
      const span = horizontal ? width : height;
      const forward = Math.random() < 0.5;
      const start = forward ? -100 : span + 100;
      const end = forward ? span + 100 : -100;
      const duration = 1500 + Math.random() * 1500; // 1.5–3s
      const length = 90 + Math.random() * 140; // 90–230px trail
      pulses.push({
        axis,
        line: onLine,
        start,
        end,
        length,
        duration,
        born: now,
      });
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const t = (now - p.born) / p.duration;
        if (t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const eased = t; // linear is fine for a pulse
        const head = p.start + (p.end - p.start) * eased;
        const dir = Math.sign(p.end - p.start) || 1;
        const tail = head - dir * p.length;

        const fade = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1;

        const [r, g, b] = PULSE_COLOR;
        let grad: CanvasGradient;
        if (p.axis === "h") {
          grad = ctx.createLinearGradient(tail, p.line, head, p.line);
        } else {
          grad = ctx.createLinearGradient(p.line, tail, p.line, head);
        }
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${0.18 * fade})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${0.85 * fade})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (p.axis === "h") {
          ctx.moveTo(tail, p.line + 0.5);
          ctx.lineTo(head, p.line + 0.5);
        } else {
          ctx.moveTo(p.line + 0.5, tail);
          ctx.lineTo(p.line + 0.5, head);
        }
        ctx.stroke();

        // bright dot at the head
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.9 * fade})`;
        ctx.beginPath();
        if (p.axis === "h") {
          ctx.arc(head, p.line + 0.5, 2, 0, Math.PI * 2);
        } else {
          ctx.arc(p.line + 0.5, head, 2, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (!running) {
        raf = 0;
        return;
      }
      const dt = now - last;
      last = now;
      nextSpawn -= dt;
      while (nextSpawn <= 0) {
        spawn(now);
        nextSpawn +=
          MIN_SPAWN_MS + Math.random() * (MAX_SPAWN_MS - MIN_SPAWN_MS);
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (raf || !running) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      ctx.clearRect(0, 0, width, height);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) startLoop();
          else stopLoop();
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120, 118, 109, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 118, 109, 0.35) 1px, transparent 1px)",
          backgroundSize: `${GRID}px ${GRID}px`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
