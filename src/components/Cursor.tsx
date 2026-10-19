"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Cursor.module.css";

/**
 * Curseur maison : un anneau amorti qui suit la souris, un point qui la colle,
 * et un état étendu avec libellé sur les éléments porteurs de `data-cursor`.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.dataset.cursorReady = "true";

    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2" });

    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([ring, dot], { autoAlpha: 1, duration: 0.4 });
      }
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      const mode = target?.dataset.cursor;

      if (!mode) {
        ring.dataset.mode = "default";
        label.textContent = "";
        gsap.to(ring, { scale: 1, duration: 0.45 });
        gsap.to(dot, { scale: 1, duration: 0.45 });
        return;
      }

      ring.dataset.mode = mode;
      label.textContent = target?.dataset.cursorLabel ?? "";
      gsap.to(ring, { scale: mode === "label" ? 3.4 : 2.2, duration: 0.55 });
      gsap.to(dot, { scale: 0, duration: 0.4 });
    };

    const onLeave = () => {
      visible = false;
      gsap.to([ring, dot], { autoAlpha: 0, duration: 0.3 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.75, duration: 0.25 });
    const onUp = () => gsap.to(ring, { scale: ring.dataset.mode === "default" ? 1 : 2.2, duration: 0.35 });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      delete document.body.dataset.cursorReady;
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden>
      <div ref={ringRef} className={styles.ring} data-mode="default">
        <span ref={labelRef} className={styles.label} />
      </div>
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
