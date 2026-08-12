# SInC Website — Content Review

All website copy in one place for manual review and editing.

## Start here

**[ALL-CONTENT.md](./ALL-CONTENT.md)** — everything combined in one file (content map, every page, all data).

**[CONTENT-CHECKLIST.md](./CONTENT-CHECKLIST.md)** — what to fill in to go from "thin" to "impressive", in priority order.

**[SInC-Website-Content.docx](./SInC-Website-Content.docx)** — same content as a Word doc for sharing with the team. Regenerate: `node scripts/export-content-docx.mjs`

## How to use

1. Open **ALL-CONTENT.md** and read or search (Ctrl+F) through the full site copy.
2. Edit text in the matching `data/*.json` file.
3. Re-run `node scripts/export-content-review.mjs` to refresh ALL-CONTENT.md and the split files below.

## Split files (optional)

Same content, one file per page — useful if you prefer editing section by section:

| File | Page / route | Data source |
|------|----------------|-------------|
| [00-CONTENT-MAP.md](./00-CONTENT-MAP.md) | Site structure & pillars | `data/content-map.json` |
| [00-site-wide.md](./00-site-wide.md) | Nav, footer, stats, contact | `data/site.json` |
| [01-home.md](./01-home.md) | Home `/` | Components + `data/*` |
| [02-about.md](./02-about.md) | About `/about` | `data/about.json` |
| [03-programs.md](./03-programs.md) | Programs `/programs` | `data/programs.json`, `data/journey.json` |
| [04-calendar.md](./04-calendar.md) | Calendar `/events` | `data/events.json` |
| [05-portfolio.md](./05-portfolio.md) | Portfolio `/portfolio` | `data/startups.json` |
| [06-network.md](./06-network.md) | Network `/network` | `data/network.json` |
| [07-opportunities.md](./07-opportunities.md) | Opportunities `/opportunities` | `data/opportunities.json` |
| [08-resources.md](./08-resources.md) | Resources `/resources` | `data/resources.json` |
| [09-cohort.md](./09-cohort.md) | Cohort 01 `/cohort` | `data/cohort.json` |
| [10-apply.md](./10-apply.md) | Apply `/apply` | `data/cohort.json` + apply page |
| [11-team.md](./11-team.md) | Team `/team` | `data/team.json` |
| [12-contact.md](./12-contact.md) | Contact `/contact` | `data/site.json` + contact page |

## Status legend

- `[PLACEHOLDER]` — sample or empty content; replace with real data
- `[EXTERNAL]` — link goes outside the site
- `[TODO]` — needs your team to fill in
