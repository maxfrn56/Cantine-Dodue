import { gsap, SplitText, prefersReducedMotion } from "./gsap";

type Cleanup = () => void;

/** Révélation ligne par ligne sous masque, déclenchée au scroll. */
export function revealLines(
  el: Element | null,
  options: { start?: string; stagger?: number; delay?: number } = {},
): Cleanup {
  if (!el) return () => {};
  if (prefersReducedMotion()) return () => {};

  const { start = "top 82%", stagger = 0.11, delay = 0 } = options;
  const split = new SplitText(el, { type: "lines", mask: "lines" });

  gsap.from(split.lines, {
    yPercent: 118,
    duration: 1.15,
    ease: "dodue",
    stagger,
    delay,
    scrollTrigger: { trigger: el, start },
  });

  return () => split.revert();
}

/** Apparition douce en cascade pour une liste d'éléments. */
export function fadeUp(
  targets: gsap.TweenTarget,
  options: { trigger?: Element | null; start?: string; y?: number; stagger?: number } = {},
) {
  if (prefersReducedMotion()) return;
  const { trigger, start = "top 85%", y = 34, stagger = 0.09 } = options;

  gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration: 1.05,
    ease: "dodue",
    stagger,
    scrollTrigger: { trigger: (trigger ?? (targets as Element)) as Element, start },
  });
}

/** Parallaxe verticale simple, pilotée par le scroll. */
export function parallax(
  target: Element | null,
  options: { amount?: number; scale?: number; trigger?: Element | null } = {},
) {
  if (!target || prefersReducedMotion()) return;
  const { amount = 12, scale, trigger } = options;

  gsap.fromTo(
    target,
    { yPercent: -amount / 2, ...(scale ? { scale } : {}) },
    {
      yPercent: amount / 2,
      ...(scale ? { scale: 1 } : {}),
      ease: "none",
      scrollTrigger: {
        trigger: (trigger ?? target) as Element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
}

/** Dévoile une image par clip-path, comme un rideau qui se lève. */
export function revealImage(el: Element | null, options: { start?: string } = {}) {
  if (!el || prefersReducedMotion()) return;
  const { start = "top 88%" } = options;

  gsap.fromTo(
    el,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "dodueIn",
      scrollTrigger: { trigger: el, start },
    },
  );
}

/** Compteur chiffré animé (avis Google, millésime, etc.). */
export function countTo(
  el: HTMLElement | null,
  value: number,
  options: { duration?: number; trigger?: Element | null } = {},
) {
  if (!el) return;
  if (prefersReducedMotion()) {
    el.textContent = value.toLocaleString("fr-FR");
    return;
  }

  const state = { value: 0 };
  gsap.to(state, {
    value,
    duration: options.duration ?? 2.2,
    ease: "dodueIn",
    snap: { value: 1 },
    onUpdate: () => {
      el.textContent = Math.round(state.value).toLocaleString("fr-FR");
    },
    scrollTrigger: { trigger: options.trigger ?? el, start: "top 85%" },
  });
}
