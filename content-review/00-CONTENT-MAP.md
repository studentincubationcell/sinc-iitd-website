# Content map

This map mirrors the SInC website skeleton. Each pillar is a section of the site — use it to know what content belongs where and what still needs real data.

## 1. Startup Portfolio → `/portfolio`

Showcase every venture SInC supports — who built it, what they're building, and where they are today.

**Includes:**
- Founder name
- Short background (2–3 lines)
- One-line pitch
- Company logo
- Core idea (paragraph)
- Current valuation or stage

**Data file:** `data/startups.json`  
**Edit note:** Add one object per startup. Logo goes in public/ and path in logo field.

## 2. Master Calendar → `/events`

One place for everything time-based — recurring founder meets, funding, networking, scheme deadlines, and cohort-only milestones.

**Includes:**
- Biweekly founder meets
- Funding events & Demo Day
- Networking dinners & sessions
- Government scheme deadlines (DPIIT, Startup India, BIRAC, NIDHI-EIR)
- Cohort 01 gates & application dates

**Data file:** `data/events.json`  
**Edit note:** Use category + cohortOnly + recurring fields. Month picker reads dates automatically.

## 3. Network & Resources → `/network`

Show off connections — alumni, investors, industrial experts, visits — plus open guides for founders.

**Includes:**
- Alumni & peer founders
- Investors & institutional partners
- Industry mentors & legal clinic
- Upcoming & past industrial visits
- Resource hub (legal, schemes, fundraising) → /resources

**Data file:** `data/network.json`  
**Edit note:** Replace placeholder names with real mentors and partners when cleared.
**Also:** /resources

## 4. Cohort 01 → `/cohort`

The Hacker House / Venture Lab — bold IIT Delhi founder story for students and investors. Rules, plan, what founders get.

**Includes:**
- Hero statement & duration (20 Sep – 20 Dec 2026)
- Three objectives from operating proposal
- Selection: talks → sprint → final pick
- 5 tracks + 1 open track
- Benefits: ₹43k build budget, ₹20k fellowship, SAFE funding
- Rules: IP ownership, weekly check-ins

**Data file:** `data/cohort.json`  
**Edit note:** Fill track titles/descriptions when tracks report is published.

## 5. Opportunities → `/opportunities`

Team matching for co-builders and a bounty board for students who want to ship tasks for startups.

**Includes:**
- Founder posts: role, commitment, equity/reward
- Student skill tags & screening before contact
- Bounties: task, reward (money or treat), deadline

**Data file:** `data/opportunities.json`  
**Edit note:** Phase 2: backend for applications. For now, static listings + contact.

## 6. Join & Connect → `/contact`

How to join SInC as a founder, and clear paths for alumni, investors, and industry partners.

**Includes:**
- Founders → /apply
- Alumni & investors → email with intro
- Industry partners → visits, bounties, collaborations
- Office location & contact form

**Data file:** `data/site.json`  
**Edit note:** Stakeholder paths live on /contact page.
**Also:** /apply
