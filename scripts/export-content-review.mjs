/**
 * Regenerates content-review/*.md from data/*.json
 * Also writes ALL-CONTENT.md — everything in one file.
 * Run: node scripts/export-content-review.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "content-review");
mkdirSync(out, { recursive: true });

const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const site = read("data/site.json");
const about = read("data/about.json");
const programs = read("data/programs.json");
const journey = read("data/journey.json");
const events = read("data/events.json");
const startups = read("data/startups.json");
const network = read("data/network.json");
const resources = read("data/resources.json");
const cohort = read("data/cohort.json");
const opportunities = read("data/opportunities.json");
const team = read("data/team.json");
const contentMap = read("data/content-map.json");

function w(name, body) {
  writeFileSync(join(out, name), body.trim() + "\n", "utf8");
  console.log("wrote", name);
}

const sections = {};

sections.contentMap = `# Content map

${contentMap.intro}

${contentMap.pillars
  .map(
    (p, i) => `## ${i + 1}. ${p.title} → \`${p.href}\`

${p.summary}

**Includes:**
${p.includes.map((item) => `- ${item}`).join("\n")}

**Data file:** \`${p.dataFile}\`  
**Edit note:** ${p.editNote}${p.secondaryHref ? `\n**Also:** ${p.secondaryHref}` : ""}`
  )
  .join("\n\n")}
`;

sections.siteWide = `# Site-wide content

## Brand
- **Name:** ${site.name}
- **Full name:** ${site.fullName}
- **Tagline:** ${site.tagline}
- **Description:** ${site.description}

## Contact
- **Email:** ${site.contact.email}
- **Phone:** ${site.contact.phone}
- **Address:** ${site.contact.address}

## Navigation
${site.nav.map((n) => `- ${n.label} → ${n.href}`).join("\n")}

## Impact stats (home)
${site.stats.map((s) => `- **${s.value}${s.suffix ?? ""}** — ${s.label}${s.note ? ` (${s.note})` : ""}`).join("\n")}

## Social links
${site.socials.map((s) => `- ${s.label}: ${s.href}`).join("\n")}
`;

sections.home = `# Home page (\`/\`)

## Hero
- **Eyebrow:** Student Incubation Cell · IIT Delhi
- **Headline:** We don't just build engineers. We build founders.
- **Description:** SInC is the starting line for IIT Delhi's most ambitious startups. We back deep-tech builders with term-sheet readiness, R&I lab access, and a network of investors that actually show up.
- **Announcements:**
  - Applications open for Cohort 1.0 → /cohort
  - Meet us at the Biweekly Founder Meet → /events

## Cohort strip
- **Status:** ${cohort.status}
- **Line:** ${cohort.name} · ${cohort.duration}
- **Sub:** ${cohort.cohortSize} · ${cohort.tagline}

## Why SInC (3 pillars)
1. **Pre-incubation, not a poster club** — SInC is built for founders who want term sheets and customers — not just event photos and LinkedIn posts.
2. **Campus + industry in one loop** — Professors, R&I Park, alumni founders, and investors — connected so you're not guessing who to email next.
3. **Deep-tech from day one** — Lab access, IP guidance, and mentors who've shipped hardware and software.

## Journey (home section)
${journey.map((j) => `${j.step}. **${j.title}** — ${j.description}`).join("\n")}

## Network preview
${network.alumni[0]?.bio ? `- Alumni: ${network.alumni[0].bio}` : ""}
${network.investors[0]?.bio ? `- Investors: ${network.investors[0].bio}` : ""}
${network.experts[1]?.bio ? `- Experts: ${network.experts[1].bio}` : ""}

## Portfolio preview (first 3 startups)
${startups
  .slice(0, 3)
  .map((s) => `- **${s.name}** — ${s.tagline} (Founder: ${s.founder}, Valuation: ${s.valuation ?? "—"})`)
  .join("\n")}

## Programs preview
${programs.map((p) => `- ${p.title}: ${p.description}`).join("\n")}

## Calendar preview (next 4 events)
${[...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 4)
  .map((e) => `- **${e.date}** — ${e.title} (${e.category})`)
  .join("\n")}

## Opportunities teaser
${opportunities.teamMatching.find((t) => t.status === "open") ? `- Team matching: ${opportunities.teamMatching.find((t) => t.status === "open").role} at ${opportunities.teamMatching.find((t) => t.status === "open").startup}` : ""}
${opportunities.bounties.find((b) => b.status === "open") ? `- Bounty: ${opportunities.bounties.find((b) => b.status === "open").title}` : ""}

## Stats
${site.stats.map((s) => `- ${s.value}${s.suffix ?? ""} ${s.label}`).join("\n")}

## Testimonial [PLACEHOLDER]
"SInC gave us access to mentors we couldn't have emailed cold. We closed our first ₹15L grant within 3 months of joining." — Arjun M., AgriTech founder
`;

sections.about = `# About page (\`/about\`)

## Intro
${about.intro}

## Mission
${about.mission}

## Vision
${about.vision}

## Values
${about.values}

## Timeline
${about.timeline.map((t) => `### ${t.year} — ${t.title}\n${t.description}`).join("\n\n")}

## Partners [PLACEHOLDER]
${about.partners.map((p) => `- ${p}`).join("\n")}
`;

sections.programs = `# Programs page (\`/programs\`)

## Programs
${programs.map((p) => `### ${p.title}\n${p.description}`).join("\n\n")}

## Founder journey steps
${journey.map((j) => `${j.step}. **${j.title}** — ${j.description}`).join("\n")}
`;

sections.calendar = `# Calendar (\`/events\`)

${events
  .sort((a, b) => a.date.localeCompare(b.date))
  .map(
    (e) => `## ${e.title}
- **Date:** ${e.date}
- **Category:** ${e.category}
- **Cohort only:** ${e.cohortOnly ? "Yes" : "No"}
- **Recurring:** ${e.recurring ?? "—"}
- **Description:** ${e.description}
- **Register:** ${e.registrationUrl ?? "—"}
`
  )
  .join("\n")}
`;

sections.portfolio = `# Portfolio (\`/portfolio\`)

${startups
  .map(
    (s) => `## ${s.name}
- **Slug:** ${s.slug}
- **Sector:** ${s.sector}
- **Tagline (pitch):** ${s.tagline}
- **Founder:** ${s.founder}
- **Founder bio:** ${s.founderBio ?? "[TODO]"}
- **Idea:** ${s.idea ?? "[TODO]"}
- **Valuation:** ${s.valuation ?? "[TODO]"}
- **Website:** ${s.website ?? "[TODO]"}
- **Logo:** ${s.logo ?? "[TODO — add path in public/]"}
`
  )
  .join("\n")}
`;

sections.network = `# Network (\`/network\`)

## Intro
${network.intro}

## Connections wall (shiny names)
${(network.connections ?? []).map((c) => `- **${c.name}** (${c.category})${c.name.startsWith("[") ? " — TODO: replace with a real name" : ""}`).join("\n") || "- [TODO] Add connections in data/network.json"}

## Alumni
${network.alumni.map((p) => `### ${p.name}\n- Role: ${p.role}\n- Affiliation: ${p.affiliation}\n- ${p.bio ?? ""}`).join("\n\n")}

## Investors
${network.investors.map((p) => `### ${p.name}\n- Role: ${p.role}\n- Affiliation: ${p.affiliation}\n- ${p.bio ?? ""}`).join("\n\n")}

## Experts
${network.experts.map((p) => `### ${p.name}\n- Role: ${p.role}\n- Affiliation: ${p.affiliation}\n- ${p.bio ?? ""}`).join("\n\n")}

## Industrial visits — upcoming
${network.visits.upcoming.map((v) => `- **${v.company}** (${v.date}): ${v.description}`).join("\n")}

## Industrial visits — past
${network.visits.past.map((v) => `- **${v.company}** (${v.date}): ${v.description}`).join("\n")}
`;

sections.opportunities = `# Opportunities (\`/opportunities\`)

## Team matching
${opportunities.teamMatching
  .map(
    (t) => `### ${t.startup} — ${t.role} [${t.status}]
${t.description}
- Commitment: ${t.commitment}
- Compensation: ${t.equity}
- Requirements: ${t.requirements.join(", ")}
- What you gain: ${t.gains}
`
  )
  .join("\n")}

## Bounty board
${opportunities.bounties
  .map(
    (b) => `### ${b.title} — ${b.startup} [${b.status}]
${b.description}
- Reward: ${b.reward} (${b.type})
- Deadline: ${b.deadline}
- Skills: ${b.skills.join(", ")}
`
  )
  .join("\n")}
`;

sections.resources = `# Resources (\`/resources\`)

${resources
  .map(
    (r) => `## ${r.title}
- **Category:** ${r.category}
- **Reading time:** ${r.readingTime ?? "—"}
- **Link:** ${r.href}
- ${r.description}
`
  )
  .join("\n")}
`;

sections.cohort = `# Cohort 01 (\`/cohort\`)

- **Name:** ${cohort.name}
- **Status:** ${cohort.status}
- **Hero:** ${cohort.heroStatement}
- **Tagline:** ${cohort.tagline}
- **Duration:** ${cohort.duration ?? "—"}
- **Size:** ${cohort.cohortSize ?? "—"}

## Objectives
${(cohort.objectives ?? []).map((o) => `### ${o.title}\n${o.description}`).join("\n\n")}

## Selection
${(cohort.selection ?? []).map((s) => `### Phase ${s.phase}: ${s.title}\n${s.description}`).join("\n\n")}

## Plan
${cohort.plan.map((p) => `${p.step}. **${p.title}** — ${p.description}`).join("\n")}

## Tracks
${(cohort.tracks ?? []).map((t) => `- **${t.title}:** ${t.description}`).join("\n")}

## Benefits
${cohort.benefits.map((b) => `- **${b.title}:** ${b.description}`).join("\n")}

## Rules
${cohort.rules.map((r) => `- ${r}`).join("\n")}
`;

sections.apply = `# Apply (\`/apply\`)

- **Badge:** ${cohort.status}
- **Title:** Apply — ${cohort.name}
- **Description:** Open to IIT Delhi students. 5 pre-decided tracks + 1 open track. ${cohort.cohortSize} selected.

## Selection steps (from cohort data)
${(cohort.selection ?? []).map((s, i) => `${i + 1}. **${s.title}** — ${s.description}`).join("\n")}

## Eligibility
- Current IIT Delhi student (any program)
- Strong builder or sharp hypothesis (or both)
- Commitment to weekly check-ins if selected
- ${cohort.cohortSize ?? "5–10 ventures"} will be selected

## FAQs (hardcoded in apply page)
- When will I hear back? Rolling review through selection sprint.
- Do I need a team? Solo builders welcome.
- Early-stage idea? Built for ideation through pre-seed.
- IP? You keep it — assignment to your venture, not SInC.
`;

sections.team = `# Team (\`/team\`)

${team
  .map((m) => {
    if (!m.name?.trim()) return `## [PLACEHOLDER] — ${m.team}\n- Role: ${m.role || "[TODO]"}`;
    return `## ${m.name}\n- **Role:** ${m.role}\n- **Bio:** ${m.bio ?? "[TODO]"}\n- **Team:** ${m.team}`;
  })
  .join("\n\n")}
`;

sections.contact = `# Contact (\`/contact\`)

## Header
- **Title:** Get in touch
- **Description:** Questions, partnerships, or just want to say hi.

## Stakeholder paths

### Join as a founder
Current IIT Delhi student with a startup idea? Apply to Cohort 01 or explore programs. → /apply

### Alumni & investors
Mentor founders, attend Demo Day, or scout IIT Delhi deals. → mailto:${site.contact.email}

### Industry partners
Host industrial visits, post bounties, or collaborate on campus programs. → mailto:${site.contact.email}

## Contact details
- Email: ${site.contact.email}
- Phone: ${site.contact.phone}
- Office: ${site.contact.address}
`;

// Individual page files
w("00-CONTENT-MAP.md", sections.contentMap);
w("00-site-wide.md", sections.siteWide);
w("01-home.md", sections.home);
w("02-about.md", sections.about);
w("03-programs.md", sections.programs);
w("04-calendar.md", sections.calendar);
w("05-portfolio.md", sections.portfolio);
w("06-network.md", sections.network);
w("07-opportunities.md", sections.opportunities);
w("08-resources.md", sections.resources);
w("09-cohort.md", sections.cohort);
w("10-apply.md", sections.apply);
w("11-team.md", sections.team);
w("12-contact.md", sections.contact);

const order = [
  { id: "content-map", title: "Content map", body: sections.contentMap },
  { id: "site-wide", title: "Site-wide", body: sections.siteWide },
  { id: "home", title: "Home", body: sections.home },
  { id: "about", title: "About", body: sections.about },
  { id: "programs", title: "Programs", body: sections.programs },
  { id: "calendar", title: "Calendar", body: sections.calendar },
  { id: "portfolio", title: "Portfolio", body: sections.portfolio },
  { id: "network", title: "Network", body: sections.network },
  { id: "opportunities", title: "Opportunities", body: sections.opportunities },
  { id: "resources", title: "Resources", body: sections.resources },
  { id: "cohort", title: "Cohort 01", body: sections.cohort },
  { id: "apply", title: "Apply", body: sections.apply },
  { id: "team", title: "Team", body: sections.team },
  { id: "contact", title: "Contact", body: sections.contact },
];

const generated = new Date().toISOString().slice(0, 10);

const allContent = `# SInC Website — All Content

> Single document with every page's copy. Generated ${generated} from \`data/*.json\`.  
> Edit JSON files, then run: \`node scripts/export-content-review.mjs\`

## Table of contents

${order.map((s) => `- [${s.title}](#${s.id})`).join("\n")}

---

${order.map((s) => `<a id="${s.id}"></a>\n\n${s.body}\n\n---`).join("\n\n")}
`;

w("ALL-CONTENT.md", allContent);

console.log("Done. Edit data/*.json then re-run this script.");
