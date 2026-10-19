"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp, parallax, revealImage, revealLines } from "@/lib/animations";
import { RESTAURANT } from "@/lib/data";
import styles from "./Anais.module.css";

export default function Anais() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const revertTitle = revealLines(el.querySelector(`.${styles.script}`));
    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.copy}`), { trigger: el, y: 30 });
      fadeUp(el.querySelector(`.${styles.quote}`), { trigger: el, y: 24 });
      revealImage(el.querySelector(`.${styles.portraitReveal}`));
      parallax(el.querySelector(`.${styles.portrait} img`), {
        amount: 10,
        scale: 1.1,
        trigger: el.querySelector(`.${styles.portrait}`),
      });
    }, el);
    return () => {
      revertTitle();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="anais" className={`section ${styles.anais}`}>
      <div className={`shell ${styles.grid}`}>
        <div className={styles.portraitWrap}>
          <span className={`eyebrow ${styles.kicker}`}>La cheffe</span>
          <h2 className={`script ${styles.script}`}>Anaïs</h2>
          <div className={`arch ${styles.portraitReveal}`}>
            <div className={`figure ${styles.portrait}`}>
              <Image
                src="/images/anais.png"
                alt="Anaïs en cuisine, préparation des brochettes de poulet mariné"
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <p className="lede">
            Après dix ans derrière les fourneaux, {RESTAURANT.chef} ouvre enfin
            sa maison. Une rôtisserie volontairement rustique, généreuse, où l’on
            vient autant pour le poulet que pour le sourire derrière le comptoir.
          </p>
          <p>
            Dès sept heures, la marinade d’Espelette est déjà au travail, les
            brochettes s’alignent, les grenailles patientent sous la broche. Rien
            n’est accéléré. Ici, le temps est un ingrédient — le plus important,
            peut-être.
          </p>
          <blockquote className={styles.quote}>
            « On vient manger bien, mais surtout se sentir accueilli comme on
            aime : avec le sourire, sans chichi, et la même envie de partager. »
          </blockquote>
          <p className={styles.sign}>{RESTAURANT.chef} · cheffe & fondatrice</p>
        </div>
      </div>
    </section>
  );
}
