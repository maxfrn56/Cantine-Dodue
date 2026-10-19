"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import styles from "./Marquee.module.css";

type Props = {
  items: string[];
  duration?: number;
  reverse?: boolean;
  variant?: "cream" | "wine" | "rose";
  className?: string;
};

/**
 * Bandeau infini. La vitesse suit la vélocité du scroll (et s'inverse si on
 * remonte la page) : petit détail qui fait beaucoup pour la sensation premium.
 */
export default function Marquee({
  items,
  duration = 26,
  reverse = false,
  variant = "cream",
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const track = el.querySelector<HTMLElement>(`.${styles.track}`);
    if (!track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      if (prefersReducedMotion()) {
        tween.pause();
        return;
      }

      const enter = () => gsap.to(tween, { timeScale: 0.25, duration: 0.6 });
      const leave = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(-4, 4, velocity / 420);
          gsap.to(tween, {
            timeScale: 1 + Math.abs(boost) * 0.9,
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    }, el);

    return () => ctx.revert();
  }, [duration, reverse]);

  const group = (
    <div className={styles.group}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {item}
          <i className={styles.sep} aria-hidden>
            ✳
          </i>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`${styles.root} ${className}`} data-variant={variant}>
      <div className={styles.track}>
        {group}
        {group}
      </div>
    </div>
  );
}
