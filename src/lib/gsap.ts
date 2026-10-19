import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let pluginsReady = false;

if (typeof window !== "undefined" && !pluginsReady) {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("dodue", "0.16, 1, 0.3, 1");
  CustomEase.create("dodueIn", "0.7, 0, 0.2, 1");
  gsap.defaults({ ease: "dodue", duration: 1.1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  pluginsReady = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
