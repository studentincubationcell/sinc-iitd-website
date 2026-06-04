# SInC IIT Delhi — Website

Premium marketing site for the **Student Incubation Cell (SInC)**, IIT Delhi.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** + **Lenis** smooth scroll
- **React Hook Form** + **Zod**
- Content in JSON files under `data/`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) and point `sinciitd.in` DNS to your deployment.

## Updating content (no code changes needed)

### Site info & stats — `data/site.json`

Contact details, navigation, social links, impact stats.

### Programs — `data/programs.json`

Add/edit program cards on Home and Programs pages.

### Events — `data/events.json`

```json
[
  {
    "slug": "my-event-2026",
    "title": "Startup 101 Workshop",
    "description": "Learn the basics of building a startup.",
    "date": "2026-09-15",
    "category": "workshop",
    "registrationUrl": "https://lu.ma/example"
  }
]
```

Categories: `workshop`, `hackathon`, `networking`, `other`

### Portfolio — `data/startups.json`

```json
[
  {
    "slug": "my-startup",
    "name": "Startup Name",
    "tagline": "One-line description",
    "sector": "CleanTech",
    "founder": "Founder Name",
    "website": "https://example.com"
  }
]
```

### Team — `data/team.json`

Departments: `Leadership`, `Events`, `Tech`, `Outreach`, `Incubation`

```json
[
  {
    "id": "1",
    "name": "",
    "role": "",
    "team": "Leadership",
    "bio": "",
    "linkedin": "",
    "instagram": "",
    "twitter": "",
    "github": "",
    "email": ""
  }
]
```

Leave fields blank until ready. Omit social keys or use `""` — only filled URLs show as icons. Duplicate entries to add more members per department.

All social fields are optional — empty slots show as dashed icon placeholders on the card.

### About copy — `data/about.json`

Mission, vision, values, timeline, partner placeholders.

## Project structure

```
app/           → Pages (routes)
components/    → UI, layout, sections, forms, motion
data/          → JSON content (edit these!)
lib/           → Schemas, data loaders, utils
public/        → logo.svg, static assets
DESIGN.md      → Design mood board & references
```

## Design notes

See [DESIGN.md](./DESIGN.md) for visual direction and inspiration sources.

Built by **SInC Tech Team**.
