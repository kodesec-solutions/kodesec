import { sitemapIndexResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

/** Sitemap index: one child sitemap per content type (pages, services, academy, blog). */
export const GET = sitemapIndexResponse;
