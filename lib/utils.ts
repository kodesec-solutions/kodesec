import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our design tokens, otherwise `text-eyebrow` is read as a colour
 * and silently removes a real `text-fg-2`. Keep in sync with the @theme block in app/styles/tokens.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["eyebrow", "caption", "body-sm", "lede", "h2", "hero-sm", "display"],
      radius: ["pill", "card", "panel"],
      shadow: ["glow", "panel"],
      ease: ["out-expo", "spring"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
