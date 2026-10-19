"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp, revealLines } from "@/lib/animations";
import { MENU } from "@/lib/data";
import styles from "./Carte.module.css";

export default function Carte() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const revertTitle = revealLines(el.querySelector(`.${styles.title}`));
    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.note}`), { trigger: el });
      fadeUp(el.querySelectorAll(`.${styles.group}`), {
        trigger: el,
        stagger: 0.12,
        y: 40,
      });
    }, el);
    return () => {
      revertTitle();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="carte" className={`section ${styles.carte}`}>
      <div className={`shell ${styles.head}`}>
        <div>
          <span className="eyebrow">La carte</span>
          <h2 className={`sectionTitle ${styles.title}`}>
            Ce que la maison
            <br />
            <em>fait tourner</em>
          </h2>
        </div>
        <p className={styles.note}>
          Ardoise du jour, écrite à la craie. Les prix dansent un peu selon le
          marché — on vise toujours le ticket à 10–20&nbsp;€. Menu 19&nbsp;€.
        </p>
      </div>

      <div className={`shell ${styles.board}`}>
        {MENU.map((group) => (
          <section key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.name} className={styles.row}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.dots} aria-hidden />
                  <span className={styles.price}>{item.price}</span>
                  <span className={styles.detail}>{item.detail}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
