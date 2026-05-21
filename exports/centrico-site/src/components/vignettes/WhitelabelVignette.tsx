import { useReducedMotion } from "framer-motion";

type Props = {
  /** Background of the surrounding stage. */
  bg?: string;
  /** Brand color applied to the logo square + primary action badge. */
  brandColor?: string;
  /** URL displayed in the browser chrome. */
  displayUrl?: string;
  /** Legacy prop kept for backwards compatibility with the Módulos grid;
   *  used as fallback brand color when `brandColor` is not provided. */
  accent?: string;
};

export function WhitelabelVignette({
  bg,
  brandColor,
  displayUrl = "app.centrico.com",
  accent,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const color = brandColor ?? accent ?? "#0028ff";
  const transitionStyle = shouldReduceMotion
    ? undefined
    : { transition: "background-color 350ms ease" };

  return (
    <div
      className="w-full h-full relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <div className="relative w-72 h-56 bg-white rounded-xl shadow-md border border-border overflow-hidden flex flex-col">
        {/* Browser Chrome */}
        <div className="h-8 bg-secondary/30 border-b border-border flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
          </div>
          <div className="mx-auto bg-white/60 border border-border/50 rounded px-4 py-0.5 text-[8px] font-mono text-muted-foreground w-40 text-center truncate">
            {displayUrl}
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-10 border-b border-border/50 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ backgroundColor: color, ...transitionStyle }}
              >
                <div className="w-2 h-2 bg-white rounded-sm" />
              </div>
              <div className="w-16 h-2 rounded bg-secondary/80" />
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary/50" />
              <div className="w-4 h-4 rounded-full bg-secondary/50" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex gap-4 flex-1">
            {/* Sidebar */}
            <div className="w-16 space-y-2">
              <div className="w-full h-2 rounded bg-secondary/40" />
              <div className="w-[80%] h-2 rounded bg-secondary/40" />
              <div className="w-[90%] h-2 rounded bg-secondary/40" />
              <div className="w-[70%] h-2 rounded bg-secondary/40" />
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="w-24 h-3 rounded bg-secondary/80" />
                  <div className="w-16 h-2 rounded bg-secondary/40" />
                </div>
                <div
                  className="w-16 h-5 rounded flex items-center justify-center"
                  style={{ backgroundColor: color, ...transitionStyle }}
                >
                  <div className="w-8 h-1 bg-white/60 rounded" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 rounded border border-border/50 bg-secondary/10" />
                <div className="h-16 rounded border border-border/50 bg-secondary/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
