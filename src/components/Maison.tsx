"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { countTo, fadeUp, parallax, revealImage, revealLines } from "@/lib/animations";
import { RESTAURANT } from "@/lib/data";
import styles from "./Maison.module.css";

const STATS = [
  { value: RESTAURANT.rating, label: "Avis Google", key: "rating" },
  { value: RESTAURANT.reviewCount, label: "Coups de cœur", key: "count" },
  { value: RESTAURANT.priceRange, label: "Le ticket", key: "price" },
  { value: "Sur place", label: "& à emporter", key: "place" },
];

export default function Maison() {
  const root = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const title = el.querySelector(`.${styles.title}`);
    const revertTitle = revealLines(title);

    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.eyebrow}`), { trigger: el, y: 16 });
      fadeUp(el.querySelector(`.${styles.story}`), { trigger: el, y: 28 });
      fadeUp(el.querySelectorAll(`.${styles.stat}`), {
        trigger: el.querySelector(`.${styles.stats}`),
        stagger: 0.08,
      });
      revealImage(el.querySelector(`.${styles.facadeReveal}`));
      revealImage(el.querySelector(`.${styles.polaroid}`));
      parallax(el.querySelector(`.${styles.facadeImg}`), {
        amount: 12,
        scale: 1.12,
        trigger: el.querySelector(`.${styles.facade}`),
      });
      countTo(countRef.current, RESTAURANT.reviewCount, {
        trigger: el.querySelector(`.${styles.stats}`),
      });
    }, el);

    return () => {
      revertTitle();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="maison" className={`section ${styles.maison}`}>
      <div className={`shell ${styles.grid}`}>
        <header className={styles.intro}>
          <span className={`eyebrow ${styles.eyebrow}`}>La maison</span>
          <h2 className={`sectionTitle ${styles.title}`}>
            Une cantine
            <br />
            <em>de quartier</em>
          </h2>
        </header>

        <figure className={styles.sketch}>
          <Image
            src="/images/illu-facade.png"
            alt="Croquis de la façade, rue Pannecau"
            width={640}
            height={480}
            className={styles.sketchImg}
          />
          <figcaption>46 rue Pannecau · Petit Bayonne</figcaption>
        </figure>

        <div className={styles.story}>
          <p className="lede">
            Il y a des tables où l’on entre pour manger, et d’autres où l’on reste
            parce qu’on s’y sent déjà chez soi. Rue Pannecau, Cantine Dodue a
            pris la suite de Chez Aitatxi — un clin d’œil à la cuisine de
            grand-mère, aux assiettes dépareillées et au jus qui caramélise tout
            seul.
          </p>
          <p>
            {RESTAURANT.tagline} Les poulets fermiers Label Rouge des Landes
            tournent à la broche, les légumes de saison grillent à côté, le pain
            arrive encore chaud. Rien de plus, rien de moins.
          </p>
          <a className="btn" href="#rituel" data-cursor="link">
            <span className="btn__dot" />
            Le rituel de la broche
          </a>
        </div>

        <div className={styles.facade}>
          <div className={`arch ${styles.facadeReveal}`}>
            <div className={`figure ${styles.facadeFrame}`}>
              <Image
                src="/images/devanture.png"
                alt="La devanture de Cantine Dodue, volets brique et store rouge"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.facadeImg}
              />
            </div>
          </div>
          <figure className={styles.polaroid}>
            <Image
              src="/images/equipe.png"
              alt="La brigade de Cantine Dodue, avant le service"
              width={720}
              height={900}
            />
            <figcaption>La brigade, avant le coup de feu</figcaption>
          </figure>
        </div>
      </div>

      <ul className={`shell ${styles.stats}`}>
        {STATS.map((stat) => (
          <li key={stat.key} className={styles.stat}>
            <strong>
              {stat.key === "count" ? (
                <span ref={countRef}>0</span>
              ) : (
                stat.value
              )}
            </strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
