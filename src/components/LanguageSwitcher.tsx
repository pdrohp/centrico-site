import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { HTML_LANG, langFromPath, localizePath, type Lang } from "@/lib/i18n";

const LANG_OPTIONS: { id: Lang; label: string; short: string }[] = [
  { id: "pt", label: "Português", short: "PT" },
  { id: "en", label: "English", short: "EN" },
];

export function FlagPT({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <clipPath id="flag-pt-clip">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-pt-clip)">
        <rect width="24" height="24" fill="#DA291C" />
        <rect width="9.6" height="24" fill="#046A38" />
        <circle cx="9.6" cy="12" r="4.2" fill="none" stroke="#FFE900" strokeWidth="1.3" />
        <path d="M7.6 9.8h4v3.4a2 2 0 0 1-4 0z" fill="#fff" stroke="#DA291C" strokeWidth="0.9" />
      </g>
      <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,0.12)" />
    </svg>
  );
}

export function FlagGB({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <clipPath id="flag-gb-clip">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-gb-clip)">
        <rect width="24" height="24" fill="#012169" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4.8" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.6" />
        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="8" />
        <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="4.8" />
      </g>
      <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,0.12)" />
    </svg>
  );
}

const FLAGS: Record<Lang, typeof FlagPT> = { pt: FlagPT, en: FlagGB };

type LanguageSwitcherProps = {
  pathname: string;
  onDark?: boolean;
};

export function LanguageSwitcher({ pathname, onDark = false }: LanguageSwitcherProps) {
  const current = langFromPath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const CurrentFlag = FLAGS[current];

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={current === "en" ? "Change language" : "Mudar idioma"}
        className={`flex items-center gap-1.5 h-8 px-1.5 text-[11px] font-display font-semibold uppercase tracking-[0.18em] transition-colors ${
          onDark ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
        }`}
      >
        <CurrentFlag />
        <span>{LANG_OPTIONS.find((l) => l.id === current)?.short}</span>
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-2 min-w-[160px] bg-background border border-border rounded-md shadow-xl py-1 animate-in fade-in duration-200 ease-[var(--ease-out)]">
          {LANG_OPTIONS.map((lang) => {
            const Flag = FLAGS[lang.id];
            const active = lang.id === current;
            return (
              <li key={lang.id}>
                <a
                  href={localizePath(pathname, lang.id)}
                  hrefLang={HTML_LANG[lang.id]}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <Flag />
                  <span className="flex-1">{lang.label}</span>
                  {active && <Check size={14} className="text-foreground/60" />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
