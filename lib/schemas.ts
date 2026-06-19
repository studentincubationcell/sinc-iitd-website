import { z } from "zod";

export const socialSchema = z.object({
  name: z.string(),
  href: z.string().url(),
  label: z.string(),
});

export const statSchema = z.object({
  value: z.number(),
  suffix: z.string().optional(),
  label: z.string(),
  note: z.string().optional(),
});

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const siteSchema = z.object({
  name: z.string(),
  fullName: z.string(),
  tagline: z.string(),
  description: z.string(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    mapEmbed: z.string().url(),
  }),
  socials: z.array(socialSchema),
  nav: z.array(navItemSchema),
  stats: z.array(statSchema),
});

export const programSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
});

export const journeyStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
});

export const eventSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  category: z.enum(["workshop", "hackathon", "networking", "other"]),
  image: z.string().optional(),
  registrationUrl: z.string().url().optional(),
});

export const startupSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  sector: z.string(),
  founder: z.string(),
  website: z.string().url().optional(),
  logo: z.string().optional(),
});

const emptyToUndefined = (val: unknown) =>
  val === "" || val == null ? undefined : val;

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z.string().url().optional()
);

const optionalEmail = z.preprocess(
  emptyToUndefined,
  z.string().email().optional()
);

// Accepts a full URL (https://...) OR a local/relative path (/team/x.jpg)
const optionalImage = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .refine(
      (v) => /^https?:\/\//.test(v) || v.startsWith("/"),
      "Must be a URL or an absolute path starting with /"
    )
    .optional()
);

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  team: z.string(),
  bio: z.string().optional(),
  linkedin: optionalUrl,
  instagram: optionalUrl,
  twitter: optionalUrl,
  github: optionalUrl,
  email: optionalEmail,
  image: optionalImage,
});

export type Site = z.infer<typeof siteSchema>;
export type Program = z.infer<typeof programSchema>;
export type JourneyStep = z.infer<typeof journeyStepSchema>;
export type SiteEvent = z.infer<typeof eventSchema>;
export type Startup = z.infer<typeof startupSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const TEAM_DEPARTMENTS = [
  "Leadership",
  "Events",
  "Tech",
  "Outreach",
  "Incubation",
] as const;
