"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { useAppState } from "@/components/AppState";
import { RESTAURANT } from "@/lib/data";
import styles from "./Hero.module.css";

export default function Hero() {
  const { introDone } = useAppState();
  const root = useRef<HTMLElement>(null);

  // Entrée orchestrée, déclenchée à la sortie du préloader
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || !introDone) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      const tagline = el.querySelector<HTMLElement>(`.${styles.tagline}`);
      const split = tagline && !reduced
        ? new SplitText(tagline, { type: "lines", mask: "lines", linesClass: "heroLine" })
        : null;

      const tl = gsap.timeline({ defaults: { ease: "dodue" } });

      tl.to(el, { autoAlpha: 1, duration: 0.01 })
        .fromTo(
          `.${styles.bgInner}`,
          { clipPath: "inset(42% 22% 42% 22% round 40vw 40vw 1rem 1rem)", scale: 1.18 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            scale: 1,
            duration: 1.8,
            ease: "dodueIn",
          },
        )
        .from(
          `.${styles.logo}`,
          { autoAlpha: 0, scale: 0.7, duration: 1.05 },
          0.45,
        )
        .from(
          `.${styles.topLetter}`,
          { yPercent: 130, duration: 1, stagger: 0.035 },
          0.55,
        )
        .from(
          `.${styles.scriptLetter}`,
          { yPercent: 118, rotate: 9, duration: 1.25, stagger: 0.06 },
          0.7,
        );

      if (split) {
        tl.from(split.lines, { yPercent: 110, duration: 1, stagger: 0.12 }, 1.05);
      } else if (tagline) {
        tl.from(tagline, { autoAlpha: 0, duration: 1 }, 1.05);
      }

      tl.from(
        `.${styles.ctas} > *`,
        { y: 34, autoAlpha: 0, duration: 0.9, stagger: 0.1 },
        1.2,
      )
        .from(`.${styles.meta} > *`, { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 1.4)
        .from(`.${styles.eyebrow}`, { autoAlpha: 0, y: 14, duration: 0.9 }, 0.5)
        .from(`.${styles.corner}`, { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.1 }, 1.35)
        .from(`.${styles.cue}`, { autoAlpha: 0, duration: 0.8 }, 1.5);
    }, el);

    return () => ctx.revert();
  }, [introDone]);

  // Parallaxe de sortie : le damier glisse, le titre s'échappe vers le haut
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(`.${styles.bgInner}`, { yPercent: 10, scale: 1.08, ease: "none" }, 0)
        .to(`.${styles.inner}`, { yPercent: -18, autoAlpha: 0.2, ease: "none" }, 0)
        .to(`.${styles.corner}`, { autoAlpha: 0, ease: "none", duration: 0.4 }, 0);
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={root} id="top" className={styles.hero}>
      <div className={styles.bg} aria-hidden>
        <div className={styles.bgInner} />
        <div className={styles.veil} />
      </div>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>
          Rôtisserie &amp; garde-manger · Petit Bayonne
        </span>

        <div className={styles.wordmark}>
          <Image
            src="/images/logo-dodue.png"
            alt=""
            width={160}
            height={160}
            priority
            className={styles.logo}
          />

          <h1 className={styles.title}>
          <span className={styles.top} aria-hidden>
            {"Cantine".split("").map((char, i) => (
              <span key={i} className={styles.topMask}>
                <span className={styles.topLetter}>{char}</span>
              </span>
            ))}
          </span>
          <span className={styles.scriptWord} aria-hidden>
            {"Dodue".split("").map((char, i) => (
              <span key={i} className={styles.scriptMask}>
                <span className={styles.scriptLetter}>{char}</span>
              </span>
            ))}
          </span>
          <span className="visually-hidden">Cantine Dodue</span>
        </h1>
        </div>

        <p className={styles.tagline}>
          La cantine de quartier qui fait tourner ses poulets fermiers sur la
          broche, confit ses grenailles dans le jus et ne travaille qu’avec des
          produits frais et locaux.
        </p>

        <div className={styles.ctas}>
          <a className="btn btn--cream" href="#carte" data-cursor="link">
            <span className="btn__dot" />
            Découvrir la carte
          </a>
          <a
            className="btn btn--ghost"
            href={RESTAURANT.phoneHref}
            data-cursor="link"
          >
            Réserver — {RESTAURANT.phone}
          </a>
        </div>

        <div className={styles.meta}>
          <span>
            {RESTAURANT.address} · {RESTAURANT.city}
          </span>
          <span>
            {RESTAURANT.rating} <i aria-hidden>★</i> · {RESTAURANT.reviewCount} avis Google
          </span>
        </div>
      </div>

      <div className={`${styles.corner} ${styles.cornerLeft}`}>
        <span className={styles.cornerLabel}>Nous trouver</span>
        <p>
          {RESTAURANT.address}
          <br />
          {RESTAURANT.zip}
        </p>
      </div>

      <div className={`${styles.corner} ${styles.cornerRight}`}>
        <span className={styles.cornerLabel}>Avis Google</span>
        <p>
          <strong className={styles.rating}>{RESTAURANT.rating}</strong>
          <span className="starRow" aria-hidden>
            ★★★★★
          </span>
          <br />
          {RESTAURANT.reviewCount.toLocaleString("fr-FR")} avis
        </p>
      </div>

      <a className={styles.cue} href="#maison" data-cursor="link" aria-label="Défiler vers la suite">
        <span className={styles.cueLine} />
        <span className={styles.cueText}>Passez à table</span>
      </a>
    </section>
  );
}
