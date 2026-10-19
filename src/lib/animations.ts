import { gsap, SplitText, prefersReducedMotion } from "./gsap";

type Cleanup = () => void;

const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches;

function motion() {
  const reduced = prefersReducedMotion();
  return {
    duration: reduced ? 0.45 : 1.05,
    y: reduced ? 16 : 34,
  };
}

/** Révélation ligne par ligne sous masque, déclenchée au scroll. */
export function revealLines(
  el: Element | null,
  options: { start?: string; stagger?: number; delay?: number } = {},
): Cleanup {
  if (!el) return () => {};

  const { start = "top 88%", stagger = 0.11, delay = 0 } = options;
  const { duration, y } = motion();

  try {
    if (!isMobile() && !prefersReducedMotion()) {
      const split = new SplitText(el, { type: "lines", mask: "lines" });
      gsap.fromTo(
        split.lines,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: "dodue",
          stagger,
          delay,
          immediateRender: false,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
      return () => split.revert();
    }
  } catch {
    /* SplitText indisponible : on bascule sur un fade. */
  }

  gsap.fromTo(
    el,
    { y, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration,
      ease: "dodue",
      delay,
      immediateRender: false,
      scrollTrigger: { trigger: el, start, once: true },
    },
  );

  return () => {};
}

/** Apparition douce en cascade pour une liste d'éléments. */
export function fadeUp(
  targets: gsap.TweenTarget,
  options: { trigger?: Element | null; start?: string; y?: number; stagger?: number } = {},
) {
  if (!targets) return;
  const { duration, y: defaultY } = motion();
  const { trigger, start = "top 90%", y = defaultY, stagger = 0.09 } = options;
  const triggerEl = (trigger ?? (targets as Element)) as Element | null;
  if (!triggerEl) return;

  gsap.fromTo(
    targets,
    { y, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration,
      ease: "dodue",
      stagger,
      immediateRender: false,
      scrollTrigger: { trigger: triggerEl, start, once: true },
    },
  );
}

/** Parallaxe verticale simple, pilotée par le scroll. */
export function parallax(
  target: Element | null,
  options: { amount?: number; scale?: number; trigger?: Element | null } = {},
) {
  if (!target || prefersReducedMotion() || isMobile()) return;
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
  if (!el) return;
  const { start = "top 90%" } = options;
  const { duration } = motion();

  if (isMobile() || prefersReducedMotion()) {
    gsap.fromTo(
      el,
      { y: 28, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration,
        ease: "dodue",
        immediateRender: false,
        scrollTrigger: { trigger: el, start, once: true },
      },
    );
    return;
  }

  gsap.fromTo(
    el,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "dodueIn",
      immediateRender: false,
      scrollTrigger: { trigger: el, start, once: true },
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
    scrollTrigger: { trigger: options.trigger ?? el, start: "top 88%", once: true },
  });
}
