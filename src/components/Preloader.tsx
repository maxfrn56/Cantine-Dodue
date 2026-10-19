"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { useAppState } from "@/components/AppState";
import styles from "./Preloader.module.css";

const WORDS = ["Poulets fermiers", "Grenailles confites", "Produits locaux", "Petit Bayonne"];
const TILES = 12;

export default function Preloader() {
  const { completeIntro } = useAppState();
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setHidden(true);
      completeIntro();
    };

    const safety = window.setTimeout(finish, 5200);

    const ctx = gsap.context(() => {
      try {
      const reduced = prefersReducedMotion();
      const counter = { value: 0 };
      const counterEl = el.querySelector<HTMLElement>(`.${styles.count}`);

      const tl = gsap.timeline({
        defaults: { ease: "dodue" },
        onComplete: finish,
      });

      if (reduced) {
        tl.to(counter, {
          value: 100,
          duration: 0.8,
          onUpdate: () => {
            if (counterEl) {
              counterEl.textContent = String(Math.round(counter.value)).padStart(2, "0");
            }
          },
        }).to(`.${styles.tile}`, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.55,
          stagger: { each: 0.03, from: "center" },
        });
        return;
      }

      tl.from(`.${styles.letter}`, {
        yPercent: 125,
        rotate: 7,
        duration: 1.15,
        stagger: 0.055,
      })
        .from(
          `.${styles.eyebrow}`,
          { autoAlpha: 0, letterSpacing: "1.2em", duration: 1 },
          0.15,
        )
        .from(`.${styles.rule}`, { scaleX: 0, duration: 1.3 }, 0.35)
        .to(
          counter,
          {
            value: 100,
            duration: 2.1,
            ease: "dodueIn",
            onUpdate: () => {
              if (counterEl) {
                counterEl.textContent = String(Math.round(counter.value)).padStart(2, "0");
              }
            },
          },
          0,
        );

      WORDS.forEach((_, i) => {
        tl.to(
          `.${styles.word}`,
          {
            yPercent: -100 * (i + 1),
            duration: 0.55,
            ease: "dodueIn",
          },
          0.55 + i * 0.42,
        );
      });

      tl.to(
        `.${styles.center}`,
        { yPercent: -18, autoAlpha: 0, duration: 0.9 },
        "exit",
      )
        .to(`.${styles.meta}`, { autoAlpha: 0, duration: 0.6 }, "exit")
        .to(
          `.${styles.tile}`,
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1.05,
            ease: "dodueIn",
            stagger: { each: 0.045, from: "center" },
          },
          "exit+=0.25",
        );
      } catch {
        finish();
      }
    }, el);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, [completeIntro]);

  if (hidden) return null;

  return (
    <div ref={root} className={styles.root}>
      <div className={styles.tiles} aria-hidden>
        {Array.from({ length: TILES }).map((_, i) => (
          <span key={i} className={styles.tile} />
        ))}
      </div>

      <div className={styles.center}>
        <span className={styles.eyebrow}>Cantine</span>
        <h1 className={styles.logo} aria-label="Cantine Dodue">
          {"Dodue".split("").map((char, i) => (
            <span key={i} className={styles.letterMask}>
              <span className={styles.letter}>{char}</span>
            </span>
          ))}
        </h1>
        <span className={styles.rule} />
      </div>

      <div className={styles.meta}>
        <div className={styles.wordsWindow}>
          <div className={styles.wordsTrack}>
            {[...WORDS, WORDS[WORDS.length - 1]].map((word, i) => (
              <span key={i} className={styles.word}>
                {word}
              </span>
            ))}
          </div>
        </div>
        <p className={styles.counter}>
          <span className={styles.count}>00</span>
          <span className={styles.percent}>%</span>
        </p>
      </div>
    </div>
  );
}
