import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let hasRegistered = false;

export function ensureGsapPlugins() {
  if (!hasRegistered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    hasRegistered = true;
  }

  return { gsap, ScrollTrigger };
}
