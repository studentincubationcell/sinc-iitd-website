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

export const EVENT_CATEGORIES = [
  "workshop",
  "hackathon",
  "networking",
  "founder-meet",
  "funding",
  "deadline",
  "other",
] as const;

export const eventSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  category: z.enum(EVENT_CATEGORIES),
  image: z.string().optional(),
  registrationUrl: z.string().url().optional(),
  cohortOnly: z.boolean().optional(),
  recurring: z.string().optional(),
});

export const startupSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  sector: z.string(),
  founder: z.string(),
  founderBio: z.string().optional(),
  idea: z.string().optional(),
  valuation: z.string().optional(),
  website: z.string().url().optional(),
  logo: z.string().optional(),
  founderLinkedin: optionalUrl,
});

export const networkPersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  affiliation: z.string(),
  bio: z.string().optional(),
  linkedin: optionalUrl,
});

export const industrialVisitSchema = z.object({
  id: z.string(),
  company: z.string(),
  date: z.string(),
  description: z.string(),
  status: z.enum(["upcoming", "past"]),
});

export const connectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    "alumni-company",
    "investor",
    "institution",
    "partner",
  ]),
  logo: optionalImage,
  href: optionalUrl,
});

export const networkSchema = z.object({
  intro: z.string(),
  connections: z.array(connectionSchema).optional(),
  alumni: z.array(networkPersonSchema),
  investors: z.array(networkPersonSchema),
  experts: z.array(networkPersonSchema),
  visits: z.object({
    upcoming: z.array(industrialVisitSchema),
    past: z.array(industrialVisitSchema),
  }),
  comingSoon: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

export const bountySchema = z.object({
  id: z.string(),
  title: z.string(),
  startup: z.string(),
  reward: z.string(),
  type: z.enum(["Money", "Treat"]),
  deadline: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
  status: z.enum(["open", "closed"]),
});

export const teamMatchingSchema = z.object({
  id: z.string(),
  startup: z.string(),
  role: z.string(),
  commitment: z.string(),
  equity: z.string(),
  description: z.string(),
  requirements: z.array(z.string()),
  gains: z.string(),
  status: z.enum(["open", "closed"]),
});

export const opportunitiesSchema = z.object({
  bounties: z.array(bountySchema),
  teamMatching: z.array(teamMatchingSchema),
});

export const resourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "legal",
    "fundraising",
    "incorporation",
    "operations",
    "schemes",
  ]),
  href: z.string(),
  readingTime: z.string().optional(),
});

export const contentMapSchema = z.object({
  intro: z.string(),
  pillars: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      href: z.string(),
      summary: z.string(),
      includes: z.array(z.string()),
      dataFile: z.string(),
      editNote: z.string().optional(),
      secondaryHref: z.string().optional(),
    })
  ),
});

export const cohortSchema = z.object({
  name: z.string(),
  status: z.string(),
  heroStatement: z.string(),
  tagline: z.string(),
  duration: z.string().optional(),
  cohortSize: z.string().optional(),
  objectives: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .optional(),
  tracks: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  selection: z
    .array(
      z.object({
        phase: z.number(),
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  plan: z.array(
    z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
    })
  ),
  benefits: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  rules: z.array(z.string()),
});

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
export type NetworkPerson = z.infer<typeof networkPersonSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type IndustrialVisit = z.infer<typeof industrialVisitSchema>;
export type Network = z.infer<typeof networkSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type Cohort = z.infer<typeof cohortSchema>;
export type Bounty = z.infer<typeof bountySchema>;
export type TeamMatching = z.infer<typeof teamMatchingSchema>;
export type Opportunities = z.infer<typeof opportunitiesSchema>;
export type ContentMap = z.infer<typeof contentMapSchema>;

export const EVENT_CATEGORY_LABELS: Record<
  (typeof EVENT_CATEGORIES)[number],
  string
> = {
  workshop: "Workshop",
  hackathon: "Hackathon",
  networking: "Networking",
  "founder-meet": "Founder meet",
  funding: "Funding",
  deadline: "Deadline",
  other: "Event",
};

export const TEAM_DEPARTMENTS = [
  "Tech",
  "Leadership",
  "Events",
  "Outreach",
  "Incubation",
] as const;
