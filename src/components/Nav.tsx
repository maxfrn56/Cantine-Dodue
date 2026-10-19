"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { useAppState } from "@/components/AppState";
import { NAV_LINKS, RESTAURANT } from "@/lib/data";
import styles from "./Nav.module.css";

export default function Nav() {
  const { introDone } = useAppState();
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Apparition après le préloader
  useIsoLayoutEffect(() => {
    if (!introDone || !root.current) return;
    // `y: 0` est indispensable : GSAP lit le translateY(-120%) CSS en pixels,
    // donc animer uniquement yPercent laisserait le header hors écran.
    gsap.to(root.current, { y: 0, yPercent: 0, autoAlpha: 1, duration: 1.2, delay: 0.35 });
  }, [introDone]);

  // Inversion des couleurs dès qu'on quitte le hero + masquage au scroll descendant
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => {
          const scrolled = self.scroll() > window.innerHeight * 0.85;
          el.dataset.solid = String(scrolled);
          const mobile = window.matchMedia("(max-width: 899px)").matches;
          const hide = !mobile && self.direction === 1 && scrolled;
          gsap.to(el, {
            yPercent: hide ? -130 : 0,
            duration: 0.7,
            overwrite: "auto",
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useIsoLayoutEffect(() => {
    const lenis = window.__lenis;
    document.body.style.overflow = open ? "hidden" : "";
    if (!lenis) return;
    if (open) lenis.stop();
    else if (introDone) lenis.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, introDone]);

  return (
    <>
      <header ref={root} className={styles.root} data-solid="false">
        <a className={styles.brand} href="#top" data-cursor="link" aria-label="Cantine Dodue, retour en haut">
          <Image
            src="/images/logo-dodue.png"
            alt=""
            width={96}
            height={96}
            className={styles.brandMark}
            priority
          />
          <span className={styles.brandText}>
            <span className={styles.brandTop}>Cantine</span>
            <span className={styles.brandScript}>Dodue</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link} data-cursor="link">
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={`btn ${styles.reserve}`}
            href={RESTAURANT.phoneHref}
            data-cursor="link"
          >
            <span className="btn__dot" />
            Réserver
          </a>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            data-cursor="link"
          >
            <span data-open={open} />
            <span data-open={open} />
          </button>
        </div>
      </header>

      <div
        ref={panel}
        className={`${styles.panel} u-damier`}
        data-open={open}
        role="dialog"
        aria-modal="true"
      >
        <nav className={styles.panelNav}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.panelLink}
              onClick={() => setOpen(false)}
              data-cursor="link"
            >
              <em>0{i + 1}</em>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className={styles.panelFoot}>
          <p>
            {RESTAURANT.address}
            <br />
            {RESTAURANT.zip}
          </p>
          <p>
            <a href={RESTAURANT.phoneHref} data-cursor="link">
              {RESTAURANT.phone}
            </a>
            <br />
            <a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" data-cursor="link">
              {RESTAURANT.instagramHandle}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
