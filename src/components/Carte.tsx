"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp, revealLines } from "@/lib/animations";
import { MENU, type MenuItem } from "@/lib/data";
import styles from "./Carte.module.css";

export default function Carte() {
  const root = useRef<HTMLElement>(null);
  const follow = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<MenuItem | null>(null);

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

  const moveFollow = (event: React.PointerEvent) => {
    if (!follow.current || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.to(follow.current, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.7,
      ease: "dodue",
      overwrite: "auto",
    });
  };

  const show = (item: MenuItem) => {
    setActive(item);
    if (!follow.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.to(follow.current, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "dodue" });
  };

  const hide = () => {
    if (!follow.current) return;
    gsap.to(follow.current, { autoAlpha: 0, scale: 0.86, duration: 0.35 });
  };

  return (
    <section
      ref={root}
      id="carte"
      className={`section ${styles.carte}`}
      onPointerMove={moveFollow}
    >
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
                <li key={item.name}>
                  <button
                    type="button"
                    className={styles.row}
                    onPointerEnter={() => show(item)}
                    onPointerLeave={hide}
                    onFocus={() => show(item)}
                    onBlur={hide}
                    data-cursor="link"
                  >
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.dots} aria-hidden />
                    <span className={styles.price}>{item.price}</span>
                    <span className={styles.detail}>{item.detail}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div ref={follow} className={styles.follow} aria-hidden>
        {active ? (
          <Image src={active.image} alt="" fill sizes="280px" />
        ) : null}
      </div>
    </section>
  );
}
