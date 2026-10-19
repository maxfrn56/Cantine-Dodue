"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { fadeUp } from "@/lib/animations";
import { NAV_LINKS, RESTAURANT } from "@/lib/data";
import Marquee from "@/components/Marquee";
import styles from "./Footer.module.css";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      fadeUp(el.querySelector(`.${styles.wordmark}`), { trigger: el, y: 50 });
      fadeUp(el.querySelector(`.${styles.grid}`), { trigger: el, y: 24 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className={`${styles.footer} u-damier`}>
      <Marquee
        items={["Petit Bayonne", "Rôtisserie", "Garde-manger", "Sur place & à emporter"]}
        variant="wine"
        reverse
        duration={32}
      />

      <div className={`shell ${styles.body}`}>
        <a href="#top" className={styles.wordmark} data-cursor="link" aria-label="Retour en haut">
          <Image src="/images/logo-dodue.png" alt="" width={88} height={88} />
          <span className="script">Dodue</span>
        </a>

        <div className={styles.grid}>
          <p>
            {RESTAURANT.address}
            <br />
            {RESTAURANT.zip}
            <br />
            <a href={RESTAURANT.phoneHref} data-cursor="link">
              {RESTAURANT.phone}
            </a>
          </p>
          <nav aria-label="Pied de page">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} data-cursor="link">
                {link.label}
              </a>
            ))}
          </nav>
          <p>
            <a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" data-cursor="link">
              Instagram
              <br />
              {RESTAURANT.instagramHandle}
            </a>
          </p>
        </div>
      </div>

      <p className={`shell ${styles.legal}`}>
        <span>© {new Date().getFullYear()} {RESTAURANT.name}</span>
        <span>Rôtisserie & garde-manger · Bayonne</span>
      </p>
    </footer>
  );
}
