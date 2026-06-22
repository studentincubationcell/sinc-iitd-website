# Content checklist — fill these to go from "thin" to "impressive"

The structure is built. What's left is **real content**. Work top-down; each row is a quick edit to a JSON file.

## High impact (do first)

- [ ] **Real startups** → `data/startups.json`
  - Replace the 6 samples (AgriLink, MedFlow, …) with real Cohort 01 teams.
  - Each needs: `name`, `tagline` (one-line pitch), `sector`, `founder`, `founderBio`, `idea`, `valuation`.
  - Add `logo` (drop file in `public/`, set path like `/startups/acme.png`).
- [ ] **Shiny names** → `data/network.json` → `connections`
  - Replace every `[Add …]` slot with a real institution / investor / alumni company / partner.
  - Optional: add `logo` and `href`.
- [ ] **Cohort tracks** → `data/cohort.json` → `tracks`
  - Replace `Track 01…05` with the real 5 track names + descriptions from the tracks report.
- [ ] **Transparency numbers** → `data/site.json` → `stats`
  - Confirm or update the 4 numbers (startups, events, network, ₹ deployed). Keep them honest.

## Medium impact

- [ ] **Real mentors / investors / alumni** → `data/network.json` (`alumni`, `investors`, `experts`)
  - Swap the placeholder pool entries for named people once cleared. Add `linkedin`.
- [ ] **Industrial visits** → `data/network.json` → `visits`
  - Add real upcoming + past visits with dates and one-line descriptions.
- [ ] **Calendar events** → `data/events.json`
  - Add real dates: founder meets, funding, networking, scheme deadlines. Mark cohort-only with `"cohortOnly": true`.
- [ ] **Opportunities** → `data/opportunities.json`
  - Real team-matching roles and bounties once founders start posting.
- [ ] **Team** → `data/team.json`
  - Fill SInC team names, roles, photos (`image` path in `public/`).

## Polish

- [ ] **About timeline & partners** → `data/about.json` (replace `[PLACEHOLDER]`).
- [ ] **Testimonial** on home — currently a placeholder quote (in `content-review/01-home.md`).
- [ ] **Contact details** → `data/site.json` → `contact` (confirm email/phone/address).

## Built & working (no content needed)

- Home audience routing (Founder / Investor / Connect doors)
- Transparency dashboard (reads `site.json` stats)
- Network connections wall + visits gallery
- Calendar: month picker, organized view, cohort toggle, **subscribe (.ics)**
- Portfolio trading cards
- Cohort **investor one-pager** at `/cohort/brief` (Print → Save as PDF)

---

After editing any `data/*.json`, run:

```
node scripts/export-content-review.mjs
```

This refreshes `ALL-CONTENT.md` and the per-page files so your review copy always matches the live site.
