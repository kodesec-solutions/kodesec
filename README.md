# Kodesec Solutions — Landing Page (Coming Soon)

Secure, scalable, and stunning digital experiences. This repository contains the Kodesec Solutions landing page built with Next.js (App Router) featuring animated visuals, a services overview, and a waitlist signup UI.

## Features

- Animated background grid and floating orbs with smooth motion
- Responsive services grid with hover gradients and micro-interactions
- Waitlist input with inline success feedback (client-side)
- Social action buttons and clean footer
- Tailwind-powered design with custom keyframe animations

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- `next/font` with Geist Sans and Mono

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production bundle
- `npm start`: Run the production server
- `npm run lint`: Run ESLint

## Key Files

- `app/page.tsx`: Client component for the landing page UI (`"use client"` directive). Handles animations and the waitlist input.
- `app/layout.tsx`: Global layout, fonts, and SEO metadata. Also includes `suppressHydrationWarning` to avoid extension-induced hydration warnings.
- `app/globals.css`: Tailwind base styles.
- `public/`: Static assets.

## SEO & Social Metadata

Metadata is defined in `app/layout.tsx` using Next.js `metadata` export (Open Graph + Twitter). Update title/description as needed:

```ts
export const metadata = {
	title: "Kodesec Solutions - Web Development, Security & QA Testing Services",
	description: "Crafting secure, scalable, and stunning digital experiences.",
	openGraph: { title: "Kodesec Solutions", description: "..." },
	twitter: { card: "summary_large_image", title: "Kodesec Solutions" }
};
```

## Troubleshooting

- Hooks error (Client Component): If you use `useState`/`useEffect`, ensure the file starts with `"use client"`. This is already applied to `app/page.tsx`.
- Hydration mismatch: Browser extensions can inject attributes (e.g., `cz-shortcut-listen`). We added `suppressHydrationWarning` on `<html>` and `<body>` in `app/layout.tsx` to suppress noisy dev warnings.
- TypeScript event types: Example for mouse tracking: `(e: MouseEvent)` is used in `page.tsx` for stricter typing.

## Deploy

The project works seamlessly on Vercel:

1. Build locally: `npm run build`
2. Deploy via Vercel dashboard or `vercel` CLI

For more, see Next.js deployment docs: https://nextjs.org/docs/app/building-your-application/deploying
