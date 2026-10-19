"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp, parallax, revealImage, revealLines } from "@/lib/animations";
import { HOURS, RESTAURANT } from "@/lib/data";
import { getOpenStatus, getTodayIndex } from "@/lib/hours";
import styles from "./Infos.module.css";

export default function Infos() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState({ open: false, label: "Horaires du service" });
  const [today, setToday] = useState(-1);

  useEffect(() => {
    setStatus(getOpenStatus());
    setToday(getTodayIndex());
  }, []);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const revertTitle = revealLines(el.querySelector(`.${styles.title}`));
    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.panel}`), { trigger: el, y: 28 });
      fadeUp(el.querySelectorAll(`.${styles.hours} li`), {
        trigger: el.querySelector(`.${styles.hours}`),
        stagger: 0.05,
        y: 16,
      });
      revealImage(el.querySelector(`.${styles.signReveal}`));
      parallax(el.querySelector(`.${styles.sign} img`), {
        amount: 8,
        scale: 1.08,
        trigger: el.querySelector(`.${styles.sign}`),
      });
    }, el);
    return () => {
      revertTitle();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="infos" className={`section ${styles.infos}`}>
      <div className={`shell ${styles.grid}`}>
        <header className={styles.head}>
          <span className="eyebrow">Nous trouver</span>
          <h2 className={`sectionTitle ${styles.title}`}>
            Rue
            <br />
            <em>Pannecau</em>
          </h2>
          <p className={styles.status} data-open={status.open}>
            <i />
            {status.label}
          </p>
        </header>

        <div className={styles.panel}>
          <p className={styles.address}>
            {RESTAURANT.address}
            <br />
            {RESTAURANT.zip}
          </p>
          <div className={styles.actions}>
            <a className="btn" href={RESTAURANT.phoneHref} data-cursor="link">
              <span className="btn__dot" />
              Réserver · {RESTAURANT.phone}
            </a>
            <a
              className="btn btn--ghost"
              href={RESTAURANT.maps}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              Y aller
            </a>
          </div>
          <a
            className={styles.ig}
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
          >
            {RESTAURANT.instagramHandle}
          </a>
        </div>

        <ul className={styles.hours}>
          {HOURS.map((row, i) => (
            <li key={row.day} data-today={i === today} data-closed={row.closed ?? false}>
              <span>{row.day}</span>
              <span>{row.service}</span>
            </li>
          ))}
        </ul>

        <div className={styles.signReveal}>
          <div className={`figure ${styles.sign}`}>
            <Image
              src="/images/enseigne.png"
              alt="Enseigne ronde Cantine Dodue, rue Pannecau sous un ciel basque"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
