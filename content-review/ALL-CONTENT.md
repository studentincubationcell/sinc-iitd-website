# SInC Website — All Content

> Single document with every page's copy. Generated 2026-06-22 from `data/*.json`.  
> Edit JSON files, then run: `node scripts/export-content-review.mjs`

## Table of contents

- [Content map](#content-map)
- [Site-wide](#site-wide)
- [Home](#home)
- [About](#about)
- [Programs](#programs)
- [Calendar](#calendar)
- [Portfolio](#portfolio)
- [Network](#network)
- [Opportunities](#opportunities)
- [Resources](#resources)
- [Cohort 01](#cohort)
- [Apply](#apply)
- [Team](#team)
- [Contact](#contact)

---

<a id="content-map"></a>

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


---

<a id="site-wide"></a>

# Site-wide content

## Brand
- **Name:** SInC
- **Full name:** Student Incubation Cell
- **Tagline:** Your journey from idea to impact begins here.
- **Description:** Official website of the Student Incubation Cell, IIT Delhi — empowering campus founders to build real startups.

## Contact
- **Email:** sinc@iitd.ac.in
- **Phone:** +91 11 2659 1000
- **Address:** Nilgiri Block, IIT Delhi Campus, Hauz Khas, New Delhi – 110016

## Navigation
- Home → /
- Cohort → /cohort
- Portfolio → /portfolio
- Calendar → /events
- Network → /network
- Contact → /contact

## Impact stats (home)
- **40+** — Startups supported
- **60+** — Events hosted
- **120+** — People in our network (Alumni, mentors, investors & founders)
- **50L+** — Incubation deployed (Money spent on startup incubation)

## Social links
- LinkedIn: https://www.linkedin.com/company/sinciitd
- Instagram: https://www.instagram.com/sinciitd/
- Facebook: https://www.facebook.com/sinciitd/


---

<a id="home"></a>

# Home page (`/`)

## Hero
- **Eyebrow:** Student Incubation Cell · IIT Delhi
- **Headline:** We don't just build engineers. We build founders.
- **Description:** SInC is the starting line for IIT Delhi's most ambitious startups. We back deep-tech builders with term-sheet readiness, R&I lab access, and a network of investors that actually show up.
- **Announcements:**
  - Applications open for Cohort 1.0 → /cohort
  - Meet us at the Biweekly Founder Meet → /events

## Cohort strip
- **Status:** Applications opening soon
- **Line:** Cohort 01 · 20 September – 20 December 2026
- **Sub:** 5–10 ventures · A Hacker House / Venture Lab for IIT Delhi's most ambitious builders. 3 months. Real problems. No equity taken by SInC.

## Why SInC (3 pillars)
1. **Pre-incubation, not a poster club** — SInC is built for founders who want term sheets and customers — not just event photos and LinkedIn posts.
2. **Campus + industry in one loop** — Professors, R&I Park, alumni founders, and investors — connected so you're not guessing who to email next.
3. **Deep-tech from day one** — Lab access, IP guidance, and mentors who've shipped hardware and software.

## Journey (home section)
1. **Ideate** — Explore problems worth solving and validate ideas with peers and mentors.
2. **Validate** — Run experiments, talk to users, and refine your value proposition.
3. **Build** — Ship an MVP with access to space, tools, and technical guidance.
4. **Pitch** — Prepare for demo days, investor meetings, and grant applications.
5. **Launch** — Incorporate, scale, and join IIT Delhi's founder alumni network.

## Network preview
- Alumni: Alumni who've built and scaled startups — available for office hours, pitch feedback, and warm intros.
- Investors: Angels and micro-VCs who attend SInC pitch nights and Demo Day — actively scouting IIT Delhi deals.
- Experts: Practitioners from target sectors who stress-test product, GTM, and unit economics with founders.

## Portfolio preview (first 3 startups)
- **AgriLink** — Connecting smallholder farmers directly to institutional buyers. (Founder: Rahul Sharma, Valuation: Pre-seed)
- **MedFlow** — AI-powered diagnostics for rural primary health centres. (Founder: Priya Nair, Valuation: Undisclosed)
- **CarbonTrace** — Real-time carbon footprint tracking for Indian SMEs. (Founder: Arjun Mehta, Valuation: Pre-seed)

## Programs preview
- Mentorship: Connect with professors, industry veterans, and successful founders who guide you at every stage.
- Incubation Space: Access workspace and resources at Research & Innovation Park to build without constraints.
- Legal & Compliance: Navigate incorporation, IP, and regulatory hurdles with expert guidance built for startups.
- Funding Connect: Get pitch-ready and meet investors, grant programs, and campus funding opportunities.
- Founder Community: Join a network of builders who challenge, collaborate, and celebrate wins together.

## Calendar preview (next 4 events)
- **2026-07-10** — Biweekly Founder Meet (founder-meet)
- **2026-07-12** — Startup 101 — From Idea to MVP (workshop)
- **2026-07-25** — Founder Dinner — July Edition (networking)
- **2026-08-02** — SInC Hackathon — Build for Bharat (hackathon)

## Opportunities teaser
- Team matching: Technical Co-Founder (CTO) at StudyLoop
- Bounty: Build a React Native prototype

## Stats
- 40+ Startups supported
- 60+ Events hosted
- 120+ People in our network
- 50L+ Incubation deployed

## Testimonial [PLACEHOLDER]
"SInC gave us access to mentors we couldn't have emailed cold. We closed our first ₹15L grant within 3 months of joining." — Arjun M., AgriTech founder


---

<a id="about"></a>

# About page (`/about`)

## Intro
SInC is IIT Delhi's student-run pre-incubation cell — a launchpad where ambitious students turn classroom ideas into real-world ventures.

## Mission
We empower every student on campus who aims high to turn their ideas into real-world startups. We create an ecosystem that encourages free exploration through constructive discussions with professors, industry veterans, investors, and peers.

## Vision
We want IIT Delhi to become a global flag bearer for student entrepreneurship — providing mentorship, incubation space, legal expertise, and funding access so every budding founder can become established and independent.

## Values
We construct roadmaps and keep to our deadlines. We believe in transparency — our members and partners are always updated on the latest events and opportunities.

## Timeline
### Founding — SInC established
Student Incubation Cell launched at IIT Delhi to support campus founders.

### Growth — Ecosystem expansion
Partnerships with R&I Park, mentors, and industry leaders.

### Today — Next chapter
Building the strongest pre-incubation experience on campus.

## Partners [PLACEHOLDER]
- IIT Delhi
- R&I Park
- EDC
- Industry Mentors


---

<a id="programs"></a>

# Programs page (`/programs`)

## Programs
### Mentorship
Connect with professors, industry veterans, and successful founders who guide you at every stage.

### Incubation Space
Access workspace and resources at Research & Innovation Park to build without constraints.

### Legal & Compliance
Navigate incorporation, IP, and regulatory hurdles with expert guidance built for startups.

### Funding Connect
Get pitch-ready and meet investors, grant programs, and campus funding opportunities.

### Founder Community
Join a network of builders who challenge, collaborate, and celebrate wins together.

## Founder journey steps
1. **Ideate** — Explore problems worth solving and validate ideas with peers and mentors.
2. **Validate** — Run experiments, talk to users, and refine your value proposition.
3. **Build** — Ship an MVP with access to space, tools, and technical guidance.
4. **Pitch** — Prepare for demo days, investor meetings, and grant applications.
5. **Launch** — Incorporate, scale, and join IIT Delhi's founder alumni network.


---

<a id="calendar"></a>

# Calendar (`/events`)

## Biweekly Founder Meet
- **Date:** 2026-07-10
- **Category:** founder-meet
- **Cohort only:** No
- **Recurring:** Every 2nd and 4th Thursday, 6 PM
- **Description:** Standing check-in for cohort and SInC founders — progress updates, blockers, and peer feedback.
- **Register:** —

## Startup 101 — From Idea to MVP
- **Date:** 2026-07-12
- **Category:** workshop
- **Cohort only:** No
- **Recurring:** —
- **Description:** A hands-on workshop covering customer discovery, value proposition design, and getting to your first prototype. Led by IIT Delhi alumni founders.
- **Register:** https://lu.ma/sinciitd

## Founder Dinner — July Edition
- **Date:** 2026-07-25
- **Category:** networking
- **Cohort only:** No
- **Recurring:** —
- **Description:** Informal dinner connecting active SInC founders with industry mentors and R&I Park alumni. Limited seats. Apply to attend.
- **Register:** https://lu.ma/sinciitd

## SInC Hackathon — Build for Bharat
- **Date:** 2026-08-02
- **Category:** hackathon
- **Cohort only:** No
- **Recurring:** —
- **Description:** 48-hour hackathon focused on solutions for Indian markets. Prizes, mentorship, and direct intros to seed investors for top teams.
- **Register:** https://lu.ma/sinciitd

## Cohort tracks — On-campus talk series
- **Date:** 2026-08-10
- **Category:** workshop
- **Cohort only:** No
- **Recurring:** Five sessions through August
- **Description:** Five talks, one per pre-decided track. Walk through the opportunity, the gap, and what building in that space looks like. Applications open alongside.
- **Register:** —

## Investor Connect — Seed Stage
- **Date:** 2026-08-20
- **Category:** funding
- **Cohort only:** No
- **Recurring:** —
- **Description:** Meet angel investors and seed-stage VCs actively looking at IIT Delhi deals. Bring your one-pager and deck.
- **Register:** https://lu.ma/sinciitd

## Cohort 01 — Application deadline
- **Date:** 2026-08-25
- **Category:** deadline
- **Cohort only:** Yes
- **Recurring:** —
- **Description:** Final date to submit your cohort application before the selection sprint.
- **Register:** —

## DPIIT Startup Recognition — Recommended deadline
- **Date:** 2026-08-31
- **Category:** deadline
- **Cohort only:** No
- **Recurring:** —
- **Description:** Complete DPIIT registration on Startup India to unlock seed fund and tax benefit windows.
- **Register:** —

## Cohort 01 — Selection hackathon sprint
- **Date:** 2026-09-01
- **Category:** hackathon
- **Cohort only:** No
- **Recurring:** —
- **Description:** One-week sprint before cohort start. Ship a hypothesis with validation and an early POC. Final selection of 5–10 ventures from this pool.
- **Register:** https://lu.ma/sinciitd

## Legal Clinic — Incorporation & IP
- **Date:** 2026-09-05
- **Category:** workshop
- **Cohort only:** No
- **Recurring:** —
- **Description:** Open clinic with startup lawyers covering company incorporation, co-founder agreements, and IP protection basics for early-stage teams.
- **Register:** https://lu.ma/sinciitd

## Startup India Seed Fund — Application window
- **Date:** 2026-09-15
- **Category:** deadline
- **Cohort only:** No
- **Recurring:** —
- **Description:** Central scheme for early-stage startups with DPIIT recognition. Check current tranche dates on the Startup India portal.
- **Register:** —

## Cohort 01 — Kickoff
- **Date:** 2026-09-20
- **Category:** other
- **Cohort only:** Yes
- **Recurring:** —
- **Description:** Official start of the 3-month Hacker House / Venture Lab. Teams align on monthly gates, mentors, and weekly reporting rhythm.
- **Register:** —

## BIRAC BIG scheme — Cohort reminder
- **Date:** 2026-10-01
- **Category:** deadline
- **Cohort only:** No
- **Recurring:** —
- **Description:** Biotechnology Ignition Grant for deep-tech and life-sciences ventures. Relevant for lab-to-market teams in cohort tracks.
- **Register:** —

## Cohort 01 — Month 1 progress gate
- **Date:** 2026-10-20
- **Category:** deadline
- **Cohort only:** Yes
- **Recurring:** —
- **Description:** First monthly gate: traction check, expenditure report, and optional funding proposal per venture.
- **Register:** —

## NIDHI-EIR — Fellowship application
- **Date:** 2026-11-01
- **Category:** deadline
- **Cohort only:** No
- **Recurring:** —
- **Description:** DST programme offering up to ₹30k/month for idea-stage founders. Useful parallel path while building in the cohort.
- **Register:** —

## Cohort 01 — Month 2 progress gate
- **Date:** 2026-11-20
- **Category:** deadline
- **Cohort only:** Yes
- **Recurring:** —
- **Description:** Second monthly gate: prototype or validation milestone plus spend reconciliation.
- **Register:** —

## Demo Day — Cohort 01
- **Date:** 2026-12-20
- **Category:** funding
- **Cohort only:** No
- **Recurring:** —
- **Description:** Cohort 01 closing Demo Day. Selected ventures present to investors, mentors, and the IIT Delhi community.
- **Register:** https://lu.ma/sinciitd



---

<a id="portfolio"></a>

# Portfolio (`/portfolio`)

## AgriLink
- **Slug:** agrilink
- **Sector:** AgriTech
- **Tagline (pitch):** Connecting smallholder farmers directly to institutional buyers.
- **Founder:** Rahul Sharma
- **Founder bio:** B.Tech Agricultural Engineering, IIT Delhi. Grew up in a farming family in Haryana — saw firsthand how middlemen eat margins.
- **Idea:** A B2B marketplace that lets smallholder farmers sell produce directly to institutional buyers (hotels, canteens, processors) with quality grading and logistics handled by AgriLink.
- **Valuation:** Pre-seed
- **Website:** https://example.com
- **Logo:** [TODO — add path in public/]

## MedFlow
- **Slug:** medflow
- **Sector:** HealthTech
- **Tagline (pitch):** AI-powered diagnostics for rural primary health centres.
- **Founder:** Priya Nair
- **Founder bio:** Dual degree in Biotech + CS. Previously interned at AIIMS on rural health diagnostics research.
- **Idea:** A low-cost diagnostic assistant that runs on tablet hardware at PHCs — triages symptoms, suggests tests, and flags cases for teleconsultation with specialists.
- **Valuation:** Undisclosed
- **Website:** https://example.com
- **Logo:** [TODO — add path in public/]

## CarbonTrace
- **Slug:** carbontrace
- **Sector:** CleanTech
- **Tagline (pitch):** Real-time carbon footprint tracking for Indian SMEs.
- **Founder:** Arjun Mehta
- **Founder bio:** Mechanical Engineering with a focus on energy systems. Built carbon accounting tools during a sustainability fellowship.
- **Idea:** SaaS that plugs into utility bills, fleet data, and supply chain inputs to give SMEs a live carbon footprint — with compliance reports for BRSR and export markets.
- **Valuation:** Pre-seed
- **Website:** https://example.com
- **Logo:** [TODO — add path in public/]

## StudyLoop
- **Slug:** studyloop
- **Sector:** EdTech
- **Tagline (pitch):** Peer-to-peer tutoring platform built for Tier 2 & 3 college students.
- **Founder:** Sneha Gupta
- **Founder bio:** Computer Science. Tutored 200+ students online during undergrad — noticed Tier 2/3 students lack affordable, quality peer tutoring.
- **Idea:** A marketplace where college seniors tutor juniors in their own curriculum — priced for Indian students, with verified profiles and session recordings.
- **Valuation:** Undisclosed
- **Website:** https://example.com
- **Logo:** [TODO — add path in public/]

## LogixAI
- **Slug:** logixai
- **Sector:** DeepTech
- **Tagline (pitch):** Predictive logistics routing for last-mile delivery in dense urban areas.
- **Founder:** Varun Patel
- **Founder bio:** Industrial Engineering + ML minor. Former intern at a logistics unicorn working on route optimization.
- **Idea:** ML models trained on Indian traffic patterns and delivery data to cut last-mile costs by 15–20% for D2C and hyperlocal brands.
- **Valuation:** Pre-seed
- **Website:** https://example.com
- **Logo:** [TODO — add path in public/]

## BuildOS
- **Slug:** buildos
- **Sector:** B2B SaaS
- **Tagline (pitch):** Construction project management SaaS for India's mid-tier contractors.
- **Founder:** Karan Singh
- **Founder bio:** Civil Engineering. Family runs a mid-size construction firm — saw how WhatsApp and Excel break down on multi-site projects.
- **Idea:** Mobile-first project management for contractors: daily progress photos, material tracking, labour attendance, and client dashboards — built for how Indian sites actually work.
- **Valuation:** Undisclosed
- **Website:** https://example.com
- **Logo:** [TODO — add path in public/]



---

<a id="network"></a>

# Network (`/network`)

## Intro
SInC sits at the intersection of campus innovation and India's startup ecosystem. Our network spans IIT Delhi alumni, industry mentors, seed investors, and partners who show up for founders.

## Connections wall (shiny names)
- **IIT Delhi** (institution)
- **FITT, IIT Delhi** (institution)
- **R&I Park** (institution)
- **IIT Delhi Alumni Association** (alumni-company)
- **[Add investor firm]** (investor) — TODO: replace with a real name
- **[Add alumni startup]** (alumni-company) — TODO: replace with a real name
- **[Add industry partner]** (partner) — TODO: replace with a real name
- **[Add angel network]** (investor) — TODO: replace with a real name

## Alumni
### IIT Delhi Alumni Founders
- Role: Mentor pool
- Affiliation: R&I Park & beyond
- Alumni who've built and scaled startups — available for office hours, pitch feedback, and warm intros.

### Campus E-Cell Network
- Role: Peer founders
- Affiliation: IIT Delhi
- Cross-club collaboration with E-Cell and domain clubs for hackathons, ideation sprints, and co-building.

## Investors
### Seed-stage angel network
- Role: Active angels
- Affiliation: Investor Connect sessions
- Angels and micro-VCs who attend SInC pitch nights and Demo Day — actively scouting IIT Delhi deals.

### R&I Park, IIT Delhi
- Role: Institutional partner
- Affiliation: IIT Delhi
- Research & Innovation Park provides infrastructure, lab access, and a bridge to deep-tech commercialization.

## Experts
### Startup legal clinic
- Role: Legal mentors
- Affiliation: External counsel partners
- Lawyers covering incorporation, co-founder agreements, and IP — open clinic format for cohort teams.

### Industry mentors
- Role: Domain experts
- Affiliation: AgriTech, HealthTech, DeepTech
- Practitioners from target sectors who stress-test product, GTM, and unit economics with founders.

## Industrial visits — upcoming
- **Industrial partner visit** (2026-08-15): Site visit with an industrial partner — open to Cohort 1.0 teams. Details shared with accepted founders.

## Industrial visits — past
- **R&I Park tour** (2026-05-10): Orientation visit for early SInC founders — labs, incubation space, and mentor introductions.


---

<a id="opportunities"></a>

# Opportunities (`/opportunities`)

## Team matching
### StudyLoop — Technical Co-Founder (CTO) [open]
Looking for a full-stack engineer to lead the development of our peer-to-peer tutoring marketplace. Must be comfortable with Next.js and Firebase.
- Commitment: 20 hrs/week
- Compensation: 15-20%
- Requirements: Next.js, Firebase, Leadership
- What you gain: Equity, direct access to SInC incubation, and a chance to build a product from scratch.

### LogixAI — Machine Learning Intern [open]
Help us train our predictive routing models. You'll work directly with real traffic data and our core algorithm team.
- Commitment: 10-15 hrs/week
- Compensation: Paid Internship
- Requirements: Python, PyTorch, Data Science
- What you gain: Real-world ML experience, letter of recommendation, and potential for full-time role.


## Bounty board
### Build a React Native prototype — MedFlow [open]
We have the Figma designs for our rural health tablet app. Need a frontend dev to wire up the UI and basic navigation in React Native.
- Reward: ₹15,000 (Money)
- Deadline: 2026-07-15
- Skills: React Native, Figma, Frontend

### Data scraping script for commodity prices — AgriLink [open]
Need a Python script to scrape daily mandi prices from government portals and dump them into a CSV/Postgres DB.
- Reward: Pizza + Coffee + ₹2,000 (Treat)
- Deadline: 2026-06-30
- Skills: Python, BeautifulSoup, Data Scraping

### Design a pitch deck template — CarbonTrace [closed]
We have the content. Need a sharp, investor-ready 10-slide pitch deck in Canva or Figma.
- Reward: ₹5,000 (Money)
- Deadline: 2026-07-05
- Skills: Figma, Graphic Design, Presentations



---

<a id="resources"></a>

# Resources (`/resources`)

## How to incorporate a startup in India
- **Category:** incorporation
- **Reading time:** 8 min
- **Link:** https://www.startupindia.gov.in/
- Private limited vs LLP, DPIIT recognition, and the documents you need before you file.

## Co-founder agreement essentials
- **Category:** legal
- **Reading time:** 6 min
- **Link:** /contact
- Equity splits, vesting, IP assignment, and exit clauses — what to nail down before you build.

## DPIIT startup recognition
- **Category:** schemes
- **Reading time:** 5 min
- **Link:** https://www.startupindia.gov.in/registration
- Step-by-step guide to registering on the Startup India portal and unlocking tax benefits.

## Fundraising 101 for campus founders
- **Category:** fundraising
- **Reading time:** 10 min
- **Link:** /programs
- Pre-seed vs seed, SAFE notes, cap tables, and how to prepare a one-pager investors actually read.

## IP & patents for early-stage teams
- **Category:** legal
- **Reading time:** 7 min
- **Link:** /events/legal-clinic-sep-2026
- When to file, what to protect, and how to avoid giving away your core tech in early partnerships.

## Government schemes & grants
- **Category:** schemes
- **Reading time:** 12 min
- **Link:** https://www.startupindia.gov.in/content/sih/en/government-schemes.html
- Startup India seed fund, BIRAC, DST grants — a starter map of schemes relevant to IIT Delhi founders.

## First 90 days ops checklist
- **Category:** operations
- **Reading time:** 4 min
- **Link:** /resources
- Bank account, accounting basics, founder agreements filed, and a simple cap table — before you scale.



---

<a id="cohort"></a>

# Cohort 01 (`/cohort`)

- **Name:** Cohort 01
- **Status:** Applications opening soon
- **Hero:** We don't just build engineers. We build founders.
- **Tagline:** A Hacker House / Venture Lab for IIT Delhi's most ambitious builders. 3 months. Real problems. No equity taken by SInC.
- **Duration:** 20 September – 20 December 2026
- **Size:** 5–10 ventures

## Objectives
### Real learning by doing
Pick a real problem and work on it for three months — not a thesis-for-the-sake-of-thesis project.

### Ventures that get created
The explicit goal is great ventures out of IIT Delhi in the next two to three years. Every structural choice compounds toward this.

### Cross-border talent pollination
Not everyone becomes a founder. Some join European or US startups, or work on licensed IP. The cohort opens founder and operator doors.

## Selection
### Phase 1: Education & applications
Tracks published in a documented report. Five on-campus talks — one per track. Applications open alongside.

### Phase 2: Hackathon sprint
One-week sprint. Teams ship a hypothesis with literature/validation and an early POC. Evaluated on builder strength and hypothesis strength.

### Phase 3: Final selection
5–10 ventures selected. Strong builder + strong hypothesis go through directly. Others may get a short retry window. Non-selected applicants feed builder and hypothesis reserves.

## Plan
1. **Selection sprint** — One-week hackathon. Build a hypothesis, ship an early POC. We're looking for strong builders and sharp hypotheses.
2. **Build & validate** — 3 months of execution (20 Sep – 20 Dec). Weekly SInC check-ins, biweekly mentor reviews, monthly progress gates.
3. **Funding & growth** — Propose what you need at monthly gates. Capital via SAFEs or milestone tranches based on traction shown.
4. **Demo Day** — Present to seed investors, alumni, and partners. Don't raise? You retain full rights to your IP and entity.

## Tracks
- **Track 01:** Pre-decided problem space — details published in the tracks report.
- **Track 02:** Pre-decided problem space — details published in the tracks report.
- **Track 03:** Pre-decided problem space — details published in the tracks report.
- **Track 04:** Pre-decided problem space — details published in the tracks report.
- **Track 05:** Pre-decided problem space — details published in the tracks report.
- **Open track:** Bring your own hypothesis. Same bar — strong builder, sharp idea, early proof of concept.

## Benefits
- **Build budget & cloud:** Up to ₹43,000/month per venture for APIs, AWS/GCP, AI tooling, and incorporation — reimbursed against actual bills.
- **Founder fellowship:** ₹20,000/month stipend for every selected student, equity-free, separate from any venture investment.
- **Investor intros:** Investor Connect sessions, Demo Day exposure, and pre-seed conversations for the strongest ventures.
- **Legal & workspace:** IP assignment to your venture (not SInC), co-founder agreements, and optional FITT R&I Park workspace.

## Rules
- You own your IP. Every student signs an IP assignment to their own venture, not SInC.
- Real learning by doing — you must ship, not just pitch.
- Weekly check-ins are the floor. Disengagement without communication leads to removal.
- Funding is proposal-based, primarily via SAFEs, at investor discretion.
- 5–10 ventures selected across 5 pre-decided tracks + 1 open track.


---

<a id="apply"></a>

# Apply (`/apply`)

- **Badge:** Applications opening soon
- **Title:** Apply — Cohort 01
- **Description:** Open to IIT Delhi students. 5 pre-decided tracks + 1 open track. 5–10 ventures selected.

## Selection steps (from cohort data)
1. **Education & applications** — Tracks published in a documented report. Five on-campus talks — one per track. Applications open alongside.
2. **Hackathon sprint** — One-week sprint. Teams ship a hypothesis with literature/validation and an early POC. Evaluated on builder strength and hypothesis strength.
3. **Final selection** — 5–10 ventures selected. Strong builder + strong hypothesis go through directly. Others may get a short retry window. Non-selected applicants feed builder and hypothesis reserves.

## Eligibility
- Current IIT Delhi student (any program)
- Strong builder or sharp hypothesis (or both)
- Commitment to weekly check-ins if selected
- 5–10 ventures will be selected

## FAQs (hardcoded in apply page)
- When will I hear back? Rolling review through selection sprint.
- Do I need a team? Solo builders welcome.
- Early-stage idea? Built for ideation through pre-seed.
- IP? You keep it — assignment to your venture, not SInC.


---

<a id="team"></a>

# Team (`/team`)

## Gagan Tak
- **Role:** Coordinator
- **Bio:** Leading SInC's mission to turn campus ideas into real ventures.
- **Team:** Tech

## [PLACEHOLDER] — Leadership
- Role: Coordinator

## [PLACEHOLDER] — Events
- Role: [TODO]

## [PLACEHOLDER] — Outreach
- Role: [TODO]

## [PLACEHOLDER] — Incubation
- Role: [TODO]


---

<a id="contact"></a>

# Contact (`/contact`)

## Header
- **Title:** Get in touch
- **Description:** Questions, partnerships, or just want to say hi.

## Stakeholder paths

### Join as a founder
Current IIT Delhi student with a startup idea? Apply to Cohort 01 or explore programs. → /apply

### Alumni & investors
Mentor founders, attend Demo Day, or scout IIT Delhi deals. → mailto:sinc@iitd.ac.in

### Industry partners
Host industrial visits, post bounties, or collaborate on campus programs. → mailto:sinc@iitd.ac.in

## Contact details
- Email: sinc@iitd.ac.in
- Phone: +91 11 2659 1000
- Office: Nilgiri Block, IIT Delhi Campus, Hauz Khas, New Delhi – 110016


---
