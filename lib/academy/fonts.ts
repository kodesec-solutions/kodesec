import { Caveat } from "next/font/google";

/** Handwriting for the motion player's notes and arrows. Self-hosted by next/font, so no CSP change. */
export const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });
