import { z } from "zod";

/**
 * Content schemas. The single source of truth for every Markdown/YAML file in content/.
 * Used at build time (loaders), in CI (scripts/validate-content.ts) and in the admin panel.
 */

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase letters, numbers and dashes only");
const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD"));
const localPath = z.string().regex(/^\/[^\s]*$/, "must be a site path starting with /");

export const blogSchema = z.object({
  title: z.string().min(10).max(140),
  slug,
  description: z.string().min(50).max(300),
  date: isoDate,
  updated: isoDate.optional(),
  authors: z.array(slug).min(1),
  category: z.string().min(2),
  tags: z.array(z.string()).default([]),
  cover: localPath.nullish(),
  coverAlt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  relatedServices: z.array(slug).default([]),
});
export type BlogFrontmatter = z.infer<typeof blogSchema>;

export const roles = ["red", "blue", "dev", "cloud", "devops"] as const;
export const levels = ["beginner", "practitioner", "expert"] as const;

export const lessonSchema = z.object({
  title: z.string().min(5).max(120),
  slug,
  track: slug,
  module: slug,
  order: z.number().int().positive(),
  level: z.enum(levels),
  roles: z.array(z.enum(roles)).default([]),
  duration: z.string(),
  prerequisites: z.array(slug).default([]),
  objectives: z.array(z.string()).default([]),
  video: z.string().url().optional(),
  updated: isoDate,
  authors: z.array(slug).min(1),
  draft: z.boolean().default(false),
});
export type LessonFrontmatter = z.infer<typeof lessonSchema>;

export const trackSchema = z.object({
  title: z.string(),
  slug,
  order: z.number().int(),
  icon: z.string(),
  status: z.enum(["published", "coming-soon"]),
  summary: z.string(),
  roles: z.array(z.enum(roles)).default([]),
});
export type Track = z.infer<typeof trackSchema>;

export const moduleSchema = z.object({
  title: z.string(),
  slug,
  order: z.number().int(),
  summary: z.string(),
});
export type Module = z.infer<typeof moduleSchema>;

const titled = z.object({ title: z.string(), description: z.string() });

const mediaPath = z.string().regex(/^\/[^\s]*\.(svg|gif|webp|png|jpe?g|mp4|webm)$/i, "use an .svg/.gif/.webp/.png/.jpg/.mp4/.webm file");

export const accents = ["emerald", "violet", "sky", "amber", "rose"] as const;

export const subServiceSchema = z.object({
  title: z.string(),
  slug,
  icon: z.string(),
  summary: z.string().max(220),
  offerings: z.array(z.string()).min(1),
  problems: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  media: mediaPath.optional(),
});
export type SubService = z.infer<typeof subServiceSchema>;

export const serviceSchema = z.object({
  title: z.string(),
  slug,
  order: z.number().int(),
  icon: z.string(),
  accent: z.enum(accents),
  /** shown as kodesec/<label> */
  label: z.string(),
  tagline: z.string(),
  summary: z.string(),
  seo: z.object({ title: z.string().max(60), description: z.string().max(170) }),
  media: mediaPath,
  highlights: z.array(z.object({ title: z.string(), text: z.string(), media: mediaPath })).default([]),
  process: z.array(titled).default([]),
  deliverables: z.array(titled).default([]),
  technologies: z.array(z.string()).default([]),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  subservices: z.array(subServiceSchema).min(1),
});
export type ServiceFrontmatter = z.infer<typeof serviceSchema>;

export const teamSchema = z.object({
  name: z.string(),
  slug,
  role: z.string(),
  bio: z.string(),
  image: localPath,
  kind: z.enum(["person", "organization"]).default("person"),
  expertise: z.array(z.string()).default([]),
  links: z.record(z.string(), z.string().url()).default({}),
});
export type TeamMember = z.infer<typeof teamSchema>;

export const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  updated: isoDate,
});

export const pricingSchema = z.object({
  intro: z.object({ title: z.string(), subtitle: z.string() }),
  models: z.array(
    z.object({
      id: slug,
      name: z.string(),
      description: z.string(),
      from: z.string().nullable(),
      unit: z.string(),
      bestFor: z.string(),
      highlight: z.boolean().default(false),
      features: z.array(z.string()),
      cta: z.string(),
    }),
  ),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
});
export type Pricing = z.infer<typeof pricingSchema>;

const link = z.object({ label: z.string(), href: z.string() });

export const siteSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  url: z.string().url(),
  tagline: z.string(),
  description: z.string(),
  email: z.string().email(),
  location: z.string(),
  phone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postcode: z.string(),
    country: z.string().length(2),
    countryName: z.string(),
  }),
  booking: z.object({ calLink: z.string(), defaultEvent: z.string() }),
  film: z.object({
    video: localPath.regex(/\.(mp4|webm)$/i, "use an .mp4 or .webm file"),
    poster: localPath,
    heading: z.array(z.string()).min(1).max(3),
    lines: z.tuple([z.string(), z.string()]),
  }),
  topBar: z.object({ text: z.string(), href: z.string() }).optional(),
  partners: z
    .array(
      z.object({
        name: z.string(),
        short: z.string().optional(),
        url: z.string().url(),
        logo: z.string(), // "" = text wordmark
        about: z.string(),
        together: z.string(),
      }),
    )
    .default([]),
  announcement: z.object({
    label: z.string(),
    title: z.string().min(5).max(120),
    summary: z.string().max(240),
    date: isoDate,
    youtube: z.string(), // empty = fall back to the film video
    cta: link.optional(),
  }),
  analytics: z.object({ gtmId: z.string().optional(), ga4Id: z.string().optional() }),
  social: z.array(link.extend({ icon: z.string() })),
  nav: z.array(link.extend({ children: z.enum(["services", "academy"]).optional() })),
  footer: z.array(z.object({ title: z.string(), links: z.union([z.literal("services"), z.array(link)]) })),
});
export type Site = z.infer<typeof siteSchema>;
