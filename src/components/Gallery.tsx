"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp, revealLines } from "@/lib/animations";
import { GALLERY } from "@/lib/data";
import styles from "./Gallery.module.css";

const WIDTHS = ["32vw", "42vw", "28vw", "34vw", "40vw", "26vw", "22vw"];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const rail = track.current;
    if (!el || !rail) return;

    const revertTitle = revealLines(el.querySelector(`.${styles.title}`));
    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.kicker}`), { trigger: el, y: 16 });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        if (prefersReducedMotion()) return;

        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 48);

        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, el);

    return () => {
      revertTitle();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className={styles.gallery}>
      <div className={`shell ${styles.head}`}>
        <span className={`eyebrow ${styles.kicker}`}>L’esprit du lieu</span>
        <h2 className={`sectionTitle ${styles.title}`}>
          Sur la <em>table</em>
        </h2>
      </div>

      <div ref={track} className={styles.track}>
        {GALLERY.map((item, i) => (
          <figure
            key={item.src}
            className={styles.item}
            style={{ ["--w" as string]: WIDTHS[i] ?? "32vw" }}
            data-cursor="label"
            data-cursor-label={item.label}
          >
            <div className={styles.frame}>
              <Image
                src={item.src}
                alt={`${item.label} — ${item.meta}`}
                fill
                sizes="42vw"
              />
            </div>
            <figcaption>
              <strong>{item.label}</strong>
              <span>{item.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
