import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { MotionConfig, useInView, useReducedMotion } from "framer-motion";

// Motion tokens shared by every island. Keep CSS counterparts in index.css
// (--ease-out, --dur-*) in sync with these values.
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.7,
};

const STAGGER = 0.07;
const MAX_STAGGER_STEPS = 5;

/** Delay for the i-th item of a list, capped so long lists don't drag. */
export function stagger(i: number) {
  return Math.min(i, MAX_STAGGER_STEPS) * STAGGER;
}

/**
 * Scroll reveal: a short rise + fade, played once when ~15% of the element is
 * in view. Spread onto any motion element: <motion.div {...reveal(0.1)} />.
 */
export function reveal(delay = 0, distance = 16) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: duration.slow, ease: ease.out, delay },
  } as const;
}

/**
 * Each Astro island is its own React root, so the reduced-motion preference
 * has to be applied per island. With "user", framer-motion drops transform
 * animations for people who ask for less motion and keeps the fades.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Whether a looping ambient animation should run: only while its element is
 * on screen, the tab is visible, and the user hasn't asked for reduced motion.
 */
export function useLoopActive(ref: RefObject<Element | null>) {
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.2 });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return !reduced && inView && pageVisible;
}
