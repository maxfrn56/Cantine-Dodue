"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp, revealLines } from "@/lib/animations";
import { RITUAL } from "@/lib/data";
import styles from "./Rituel.module.css";

export default function Rituel() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const pinEl = pin.current;
    if (!el || !pinEl) return;

    const title = el.querySelector(`.${styles.title}`);
    const revertTitle = revealLines(title, { start: "top 85%" });

    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.lead}`), { trigger: el, y: 24 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 960px)", () => {
        if (prefersReducedMotion()) return;

        const steps = gsap.utils.toArray<HTMLElement>(`.${styles.step}`);
        const visuals = gsap.utils.toArray<HTMLElement>(`.${styles.visual}`);
        const fill = el.querySelector<HTMLElement>(`.${styles.progressFill}`);

        gsap.set(steps.slice(1), { autoAlpha: 0, y: 36 });
        gsap.set(visuals.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(visuals[0], { clipPath: "inset(0% 0% 0% 0%)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${window.innerHeight * (RITUAL.length - 0.15)}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
          },
        });

        RITUAL.forEach((_, i) => {
          if (i === 0) return;
          const at = i;
          tl.to(steps[i - 1], { autoAlpha: 0, y: -28, duration: 0.45 }, at)
            .to(
              visuals[i - 1],
              { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85 },
              at,
            )
            .fromTo(
              steps[i],
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              at + 0.15,
            )
            .fromTo(
              visuals[i],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85 },
              at,
            );
        });

        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: pinEl,
                start: "top top",
                end: () => `+=${window.innerHeight * (RITUAL.length - 0.15)}`,
                scrub: true,
              },
            },
          );
        }

        return () => {
          ScrollTrigger.refresh();
        };
      });
    }, el);

    return () => {
      revertTitle();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="rituel" className={styles.rituel}>
      <div ref={pin} className={styles.pin}>
        <div className={`shell ${styles.layout}`}>
          <header className={styles.header}>
            <span className="eyebrow">Le rituel</span>
            <h2 className={`sectionTitle ${styles.title}`}>
              Du marché
              <br />
              <em>à la broche</em>
            </h2>
            <p className={styles.lead}>
              Quatre gestes, jamais pressés. C’est tout le secret d’un poulet
              qui tombe de l’os et de grenailles qui ont bu le jus.
            </p>
          </header>

          <div className={styles.stage}>
            <div className={styles.progress} aria-hidden>
              <span className={styles.progressFill} />
            </div>

            <div className={styles.copy}>
              {RITUAL.map((step) => (
                <article key={step.index} className={styles.step}>
                  <span className={styles.index}>{step.index}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <div className={styles.visuals}>
              {RITUAL.map((step) => (
                <figure key={step.index} className={`arch ${styles.visual}`}>
                  <Image
                    src={step.image}
                    alt={step.caption}
                    fill
                    sizes="(max-width: 960px) 100vw, 48vw"
                  />
                  <figcaption>{step.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
