import type { CSSProperties, ReactNode } from "react";

/**
 * Peças partilhadas das ilustrações dos módulos.
 *
 * Cada ilustração é um fragmento de interface real — cartões brancos a flutuar
 * sobre um fundo desfocado — e não uma imagem exportada. O fundo vem de
 * public/img/desfocadas, gerado por scripts/desfocar.mjs a partir da onda de
 * partículas do hero, para manter as ilustrações no mundo visual da Céntrico.
 */

const SOMBRA = "0 10px 30px rgba(0, 7, 44, 0.28), 0 1px 2px rgba(0, 7, 44, 0.16)";

/** Tons do acento da marca usados nas pills e chips. */
export const TINT = "#DCE3FF";
export const TINT_INK = "#0020C4";
export const TINT_B = "#DCEBF4";
export const TINT_B_INK = "#0B3B45";
export const TINT_C = "#FCE7C8";
export const TINT_C_INK = "#7A4A06";

/**
 * Tamanho nominal da pilha de cartões. A pilha é desenhada sempre nesta medida
 * e depois escalada para caber na moldura, para que a ilustração encolha por
 * inteiro em vez de reorganizar — e nunca fique cortada no telemóvel.
 */
const LARGURA = 320;
const ALTURA = 248;

/** Moldura da ilustração: fundo desfocado com a pilha de cartões centrada. */
export function Vista({
  fundo,
  children,
  className = "",
}: {
  fundo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden grid place-items-center isolate ${className}`}
      style={{
        background: `url(${fundo}) center / cover, #00072c`,
        containerType: "size",
      }}
      aria-hidden
    >
      {/* Degradê suave por cima do fundo, como nas ilustrações do Céntrico Care */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 55%, rgba(0,7,44,0.34))",
        }}
      />
      <div
        className="grid gap-2 justify-items-start"
        style={{
          width: LARGURA,
          minHeight: ALTURA,
          // Divisão de comprimento por comprimento dá um número puro, que é o que
          // o scale aceita. O 92cq… deixa uma margem de respiração à volta.
          transform: `scale(min(calc(92cqw / ${LARGURA}px), calc(92cqh / ${ALTURA}px)))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Cartão branco a flutuar. */
export function Cartao({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`bg-white rounded-xl w-full ${className}`}
      style={{ boxShadow: SOMBRA, ...style }}
    >
      {children}
    </div>
  );
}

/** Pill de acento — o equivalente ao botão verde-menta do Céntrico Care. */
export function Pill({
  children,
  tom = "accent",
}: {
  children: ReactNode;
  tom?: "accent" | "fantasma";
}) {
  const tons = {
    accent: { background: TINT, color: TINT_INK, boxShadow: SOMBRA },
    fantasma: { background: "#EDEFF4", color: "#8E96A6", boxShadow: "none" },
  } as const;
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold leading-none whitespace-nowrap"
      style={tons[tom]}
    >
      {children}
    </span>
  );
}

/** Etiqueta pequena dentro dos cartões. */
export function Chip({
  children,
  tom = "a",
}: {
  children: ReactNode;
  tom?: "a" | "b" | "c";
}) {
  const tons = {
    a: { background: TINT, color: TINT_INK },
    b: { background: TINT_B, color: TINT_B_INK },
    c: { background: TINT_C, color: TINT_C_INK },
  } as const;
  return (
    <span
      className="inline-block px-2 py-[5px] rounded-md text-[10px] font-semibold leading-none whitespace-nowrap"
      style={tons[tom]}
    >
      {children}
    </span>
  );
}

/** Rótulo em maiúsculas por cima de um valor. */
export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#5B6B7A] leading-none">
      {children}
    </span>
  );
}

/** Linha de lista: título e subtítulo à esquerda, etiqueta à direita. */
export function Linha({
  titulo,
  sub,
  chip,
}: {
  titulo: string;
  sub: string;
  chip?: ReactNode;
}) {
  return (
    <Cartao className="flex items-center gap-3 px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <b className="block text-[12px] font-semibold text-[#0B1B33] leading-tight truncate">
          {titulo}
        </b>
        <span className="block text-[10.5px] text-[#5B6B7A] leading-tight truncate">
          {sub}
        </span>
      </div>
      {chip}
    </Cartao>
  );
}

/** Visto usado nas pills de confirmação. */
export function Visto() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}
