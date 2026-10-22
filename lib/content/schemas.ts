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
  /** Search-result title (<= 55 chars, "| Kodesec" is appended) when the headline is longer. */
  seoTitle: z.string().max(60).optional(),
  /** Search-result description (120-160 chars) when the lede is longer. */
  seoDescription: z.string().max(165).optional(),
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
  /** Search-result title (<= 50 chars) when the lesson title is longer. */
  seoTitle: z.string().max(60).optional(),
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
  cover: localPath.nullish(),
  coverAlt: z.string().optional(),
});
export type Track = z.infer<typeof trackSchema>;

export const moduleSchema = z.object({
  title: z.string(),
  seoTitle: z.string().max(60).optional(),
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

// A place on the site that shows one video: a YouTube/Loom link, or a small mp4 in public/media/video/.
// The link wins when both are set. Both empty = the section is hidden.
const videoSlot = z.object({
  title: z.string().min(3).max(120),
  caption: z.string().max(240).optional(),
  url: z.string().default(""),
  file: z.union([z.literal(""), localPath.regex(/\.(mp4|webm)$/i, "use an .mp4 or .webm file")]).default(""),
  poster: z.union([z.literal(""), localPath]).default(""),
});
export type VideoSlot = z.infer<typeof videoSlot>;

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
  about: z.object({ video: videoSlot }).optional(),
  analytics: z.object({ gtmId: z.string().optional(), ga4Id: z.string().optional() }),
  social: z.array(link.extend({ icon: z.string() })),
  nav: z.array(link.extend({ children: z.enum(["services", "academy"]).optional() })),
  footer: z.array(z.object({ title: z.string(), links: z.union([z.literal("services"), z.array(link)]) })),
});
export type Site = z.infer<typeof siteSchema>;

// ---------------------------------------------------------------- OWASP academy (for business owners)

export const owaspCategories = {
  data: "Data and logins",
  website: "Your website",
  partners: "Third parties",
  running: "How you run it",
} as const;

export const owaspBusinessSchema = z.object({
  slug,
  label: z.string(),
  /** "an online shop": used in sentences like "For an online shop: …" */
  bizName: z.string(),
  person: z.string(),
  people: z.string(),
  record: z.string(),
  records: z.string(),
  doc: z.string(),
});
export type OwaspBusiness = z.infer<typeof owaspBusinessSchema>;

const cardList = z.object({
  title: z.string(),
  cards: z.array(z.object({ label: z.string().optional(), title: z.string(), text: z.string() })),
});
/** One colour per lesson: the simulation, its gallery tile and its accents use it. */
export const owaspThemes = ["violet", "orange", "sky", "teal", "amber", "rose", "indigo", "fuchsia", "lime", "red"] as const;

export const owaspTopicSchema = z.object({
  slug,
  rank: z.number().int().min(1).max(10),
  title: z.string(),
  /** The bold line on the gallery card. Keep it short. */
  tagline: z.string().max(48),
  question: z.string(),
  summary: z.string(),
  category: z.enum(Object.keys(owaspCategories) as [keyof typeof owaspCategories]),
  readMinutes: z.number().int().positive(),
  theme: z.enum(owaspThemes),
  /** Gallery tile. The tile plays the simulation on its own (no text) unless a preview video is set. */
  preview: z.object({
    size: z.enum(["tall", "square", "wide"]),
    /** Silent looping clip for the tile, e.g. /academy/owasp/broken-access-control-loop.mp4 */
    video: mediaPath.optional(),
    poster: mediaPath.optional(),
  }),
  /** The "watch instead of read" video at the end of the lesson. Empty = a "coming soon" panel. */
  video: z
    .object({
      youtube: z.string().regex(/^[A-Za-z0-9_-]{6,64}$/, "YouTube video id, not a URL").optional(),
      src: mediaPath.optional(),
      poster: mediaPath.optional(),
      minutes: z.number().positive().optional(),
    })
    .default({}),
  seo: z.object({ title: z.string().max(60), description: z.string().max(170) }),
  /** Per-business words for the placeholders, keyed by business slug. */
  vars: z.record(z.string(), z.record(z.string(), z.string())).default({}),
  /** What OWASP says (Top 10:2025, CC BY 3.0), paraphrased for owners. Shown in the knowledge clip. */
  owasp: z.object({
    summary: z.string(),
    prevent: z.array(z.string()).min(3).max(5),
    /** Three 2–3 word versions of the safety measures, for the card's motion graphic. */
    keywords: z.array(z.string().max(24)).length(3),
    url: z.string().url(),
  }),
  quick: cardList,
  variants: cardList.optional(),
  /**
   * The interactive simulation. The scene itself is code (components/owasp/sims/<slug>.tsx); its steps' words live
   * here. Step ids must match the ones the scene expects, in order (checked by the tests).
   */
  simulation: z.object({
    title: z.string(),
    lede: z.string(),
    /** The motion-graphic film for this lesson. When set it replaces the step list on the page. */
    film: z.object({ src: mediaPath, poster: mediaPath.optional() }).optional(),
    steps: z
      .array(
        z.object({
          id: slug,
          /** Short name in the directions list, e.g. "Change the number" */
          title: z.string(),
          /** What to click, e.g. "Click the number {a} in the address bar." */
          direction: z.string(),
          /** What just happened, shown once the step is done. */
          explain: z.string(),
        }),
      )
      .min(2),
    /** Shown when the visitor finishes: the risk in one or two plain sentences. */
    definition: z.string(),
  }),
  map: z.object({
    title: z.string(),
    lede: z.string().optional(),
    zones: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          here: z.string(),
          wrong: z.string(),
          ask: z.string(),
          term: z.string(),
          /** The simulation shows this zone: adds a "Try it in the simulation" button. */
          simulate: z.boolean().optional(),
        }),
      )
      .min(1),
  }),
  cost: cardList.extend({ note: z.string().optional() }),
  checklist: z.object({
    items: z
      .array(
        z.object({
          statement: z.string(),
          question: z.string(),
          /** The simulation shows this risk: a "that's us" answer offers to replay it. */
          simulate: z.boolean().optional(),
        }),
      )
      .min(1),
    /** Shown when three or more items are ticked. */
    verdict: z.string(),
  }),
  cases: z.object({
    title: z.string(),
    items: z
      .array(
        z.object({
          tab: z.string(),
          tag: z.string(),
          title: z.string(),
          what: z.string(),
          fallout: z.string(),
          lesson: z.string(),
          sources: z.string().optional(),
          /** A real clip about this incident (news report, official statement): YouTube id, not a URL. */
          youtube: z.string().regex(/^[A-Za-z0-9_-]{6,64}$/, "YouTube video id, not a URL").optional(),
        }),
      )
      .min(1),
  }),
  decisions: z.object({ title: z.string(), items: z.array(z.object({ title: z.string(), text: z.string() })) }),
  devNotes: z.array(z.string()).default([]),
  takeaways: z.object({ title: z.string(), items: z.array(z.string()) }),
});
export type OwaspTopic = z.infer<typeof owaspTopicSchema>;
