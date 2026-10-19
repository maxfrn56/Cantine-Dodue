"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { countTo, fadeUp } from "@/lib/animations";
import { RESTAURANT, REVIEWS } from "@/lib/data";
import styles from "./Reviews.module.css";

export default function Reviews() {
  const root = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.rating}`), { trigger: el, y: 40 });
      fadeUp(el.querySelectorAll(`.${styles.card}`), {
        trigger: el,
        stagger: 0.12,
        y: 36,
      });
      countTo(count.current, RESTAURANT.reviewCount, { trigger: el });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`section ${styles.reviews} u-grain`}>
      <div className={`shell ${styles.inner}`}>
        <header className={styles.head}>
          <span className="eyebrow">Ils en parlent</span>
          <p className={styles.rating}>
            <span className="display">{RESTAURANT.rating}</span>
            <span className={styles.meta}>
              <span className="starRow" aria-hidden>
                ★★★★★
              </span>
              <span>
                <span ref={count}>0</span> avis Google
              </span>
            </span>
          </p>
        </header>

        <ul className={styles.list}>
          {REVIEWS.map((review) => (
            <li key={review.author} className={styles.card}>
              <span className={styles.stars} aria-hidden>
                ★★★★★
              </span>
              <p>{review.text}</p>
              <footer>
                <strong>{review.author}</strong>
                <span>
                  {review.when} · {review.visit}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
