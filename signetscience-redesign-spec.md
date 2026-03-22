# Signet Science — Full Site Redesign & Optimization Specification
> **For:** Claude Code (frontend), Brand Agent, Copy Agent  
> **Source site:** https://signetscience.com  
> **Audited:** March 2026  
> **Status:** Ready for implementation

---

## HOW TO USE THIS DOCUMENT

This spec is structured for sequential agent handoff:
1. **Claude Code / Frontend Agent** — Sections 2–4 (design system + page structure + components)
2. **Brand Agent** — Sections 2B, 2C (color, typography, logo)
3. **Copy / SEO Agent** — Sections 5–7 (content expansion, SEO, GEO)
4. **All agents** — Section 8 (image asset manifest with download instructions)

Implement in priority order from Section 9. Each section is self-contained and can be handed off independently.

---

## 1. CURRENT STATE AUDIT

### Visual Problems Identified

| Issue | Severity | Location |
|---|---|---|
| No navigation bar — zero wayfinding | Critical | Global |
| No hero CTA — no action prompt above the fold | Critical | Hero |
| Inconsistent color system (pink, cyan, violet, purple all fighting) | High | Global |
| All headings are uppercase/display-weight — no typographic rhythm | High | Global |
| Contact form has only Name + Email — dead end for B2B studio | High | Contact |
| Decorative backgrounds compete with content, no visual grammar | High | Global |
| Section spacing is erratic — some empty void, some claustrophobic | Medium | Multiple |
| No footer — page ends on floating contact form | High | Global |
| Logo wordmark not matched to brand font | Medium | Nav |

### SEO / Technical Gaps

| Issue | Impact |
|---|---|
| Title tag: "Signet Science - Platform Innovation Lab" — vague, no keywords | High |
| No meta description, no OG tags, no structured data | Critical |
| Body text ~800 words total — severely thin content | Critical |
| Heading hierarchy broken — headings appear to be styled divs | High |
| Single-page scroll architecture = zero internal link equity | High |
| No blog, FAQ, or thought leadership content | High |
| No schema markup (Organization, Service, Person) | High |
| All images missing alt text | Medium |

### GEO / AI Discoverability Gaps

| Issue | Impact |
|---|---|
| Rich in metaphor, thin on citable definitions | Critical |
| No FAQ section — AI models prefer Q&A-formatted content | High |
| No named proprietary framework | High |
| Team bios are 3 lines — no expertise signals | Medium |
| No third-party citations or external mentions | Medium |

---

## 2. BRAND SYSTEM SPECIFICATION

### 2A. Color Palette — Locked Token System

All agents MUST use only these CSS variables. No other color values.

```css
:root {
  --color-bg-primary:       #050814;   /* Page bg, hero, dark sections */
  --color-bg-secondary:     #0D1225;   /* Card bg, section alternation */
  --color-accent-primary:   #00E5CC;   /* CTAs, highlight words, active states */
  --color-accent-secondary: #C84BFF;   /* Secondary accent, hover, gradient pair */
  --color-text-primary:     #F0F4FF;   /* All body copy, UI labels */
  --color-text-muted:       #7B8DB0;   /* Captions, timestamps, secondary text */
  --color-border:           rgba(255,255,255,0.08); /* Cards, dividers, inputs */
}
```

**Gradient system** — use this pair consistently across: logo glow, active button borders, hero particle mesh tint, section accent lines:
```css
--gradient-brand: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
```

**Retire:** Hot pink `#FF4FA3`, flat light-blue CTA button color, pure black `#000000` backgrounds.  
**Rule:** Never apply the brand gradient to body text. Display headlines only.

---

### 2B. Typography System

**Primary Display Font:** `Syne` (Google Fonts) — geometric, technical but human. Weights: 700, 800.  
**Body / UI Font:** `DM Sans` (Google Fonts) — clean, legible at small sizes. Weights: 400, 500, 600.  
**Monospace Accent:** `JetBrains Mono` (Google Fonts) — for stat numerals, labels, technical callouts only.

```html
<!-- Preload in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Type Scale:**

```css
:root {
  --text-hero:    clamp(52px, 6vw, 80px); /* Syne 800, line-height 1.05 */
  --text-h1:      clamp(40px, 4.5vw, 56px); /* Syne 700, line-height 1.1 */
  --text-h2:      clamp(28px, 3vw, 36px);  /* Syne 700, line-height 1.2 */
  --text-h3:      22px;                    /* DM Sans 600, line-height 1.3 */
  --text-body-lg: 18px;                    /* DM Sans 400, line-height 1.7 */
  --text-body:    16px;                    /* DM Sans 400, line-height 1.7 */
  --text-label:   12px;                    /* JetBrains Mono, letter-spacing 0.12em, UPPERCASE */
}
```

**Critical rule:** Never set two consecutive sections to all-caps display headings. Alternate display + sentence case.

---

### 2C. Logo Treatment

The existing "S" orbit icon works — refine it:

- Increase logo mark size in nav by 20%
- Add gradient stroke on orbital rings using `--gradient-brand`
- Add glow bloom: `filter: drop-shadow(0 0 8px rgba(0, 229, 204, 0.4))`
- Wordmark "Signet Science" → Syne 700
- Add lockup beneath wordmark: `PLATFORM INNOVATION LAB` in `--text-label`, `--color-text-muted`

---

## 3. NAVIGATION — NEW COMPONENT (REQUIRED — HIGHEST PRIORITY)

The site currently has no navigation. This is the single most important structural addition.

### Sticky Top Nav Specification

```
┌─────────────────────────────────────────────────────────────────┐
│  [S] Signet Science    Work · Services · About · Team · Contact  [Start a Project →]  │
└─────────────────────────────────────────────────────────────────┘
```

- **Background:** `rgba(5, 8, 20, 0.85)` + `backdrop-filter: blur(20px)` — transparent at page top, glass on scroll
- **Border bottom:** `1px solid var(--color-border)` — appears only after 80px scroll
- **Height:** 68px desktop / 60px mobile
- **Logo:** Left-anchored, full mark + wordmark
- **Nav links (desktop center or right):** `Work` · `Services` · `About` · `Team` · `Contact`
  - Font: DM Sans 500, 14px
  - Color: `--color-text-muted` default → `--color-text-primary` on hover
  - All links are smooth-scroll anchors to page sections (`#work`, `#services`, etc.)
- **CTA button (far right):** "Start a Project"
  - Outlined pill style with `--gradient-brand` border
  - Text: `--color-text-primary`
  - Hover: fills to `--color-accent-primary` background, text flips to `#050814`
- **Mobile:** Hamburger icon (3 lines) → full-screen overlay nav, same links stacked vertically, 32px DM Sans 500

---

## 4. PAGE STRUCTURE & SECTION SPECIFICATIONS

### SECTION 1 — HERO (Rebuild)

**ID anchor:** `#home`

**Layout:** Left-aligned text block (45% width) / Right side: particle mesh visual (55% width), kept from current design

**Content hierarchy:**

```
[EYEBROW LABEL — --text-label, --color-accent-primary]
AN EXPERIENTIAL BRAND STUDIO

[H1 — --text-hero, Syne 800]
Human-Powered
Brand Experiences.
  ↑ "Human-Powered" in --color-accent-primary
  ↑ rest in --color-text-primary
  ↑ sentence case, NOT all caps

[SUBHEADLINE — --text-body-lg, --color-text-muted, max-width 540px]
Signet Science architects Human-in-the-Loop brand systems — bridging
AI and human intelligence to create immersive experiences for
technology companies.

[CTA ROW]
[Primary: "See Our Work"]        [Secondary: "Learn Our Approach"]
  solid --color-accent-primary     ghost/outline, --color-text-primary

[TRUST BAR — below CTAs, 32px margin-top]
"Clients include:" + grayscale logos: Qualcomm · Toyota · Texas Instruments
  logos at 40% opacity default → 100% on hover
  
[SCROLL INDICATOR — bottom center]
Animated chevron ↓ in --color-text-muted
```

**Background:** Retain the particle/neural mesh visual but tighten it to the right 55% of viewport. Left side background should be `--color-bg-primary` with subtle radial gradient from `--color-accent-primary` at 3% opacity.

---

### SECTION 2 — THE APPROACH

**ID anchor:** `#about`  
**Section label:** `[ 01 — OUR APPROACH ]` in `--text-label`

**Layout:** Two-column — left: large display text block; right: structured copy + stats

```
[LEFT COLUMN]
H2: "Where Human Intelligence
     Meets System Synthesis"
     (Syne 700, --text-h2)

[RIGHT COLUMN]
Body copy (--text-body-lg, max-width 55ch):
  "Signet Science is an experiential brand studio and innovation lab. 
   We don't just build brands; we architect Human-in-the-Loop systems 
   that bridge the gap between visionary technology and the people who 
   use it. Our proprietary HITL brand framework identifies the cognitive 
   and sensory touchpoints automation cannot replicate. By mapping human 
   needs to technological capabilities, we design brand ecosystems that 
   drive genuine advocacy — not just awareness."

[STAT BLOCK — 3 inline stats below body copy]
  15+                   40+                   Fortune 500
  Years Experience      Brand Engagements     Clients Served
  (JetBrains Mono)      (JetBrains Mono)      (JetBrains Mono)
```

**Background:** `--color-bg-secondary` — NO full-bleed photo background here.

**Visual (right side or below on mobile):** SVG loop diagram showing the HITL cycle:
`Human Need → Signal Mapping → System Design → Brand Experience → Human Outcome`
Use `--color-accent-primary` for nodes, `--color-accent-secondary` for connecting lines, `--color-text-muted` for labels.

**Replace:** Remove the full-bleed crowd photo overlay that currently carries this section.

---

### SECTION 3 — HUMAN DIMENSION

**ID anchor:** `#approach`

**Keep:** The glowing human figure illustration — it's the most visually distinctive element on the site.

**Layout:** True 50/50 split — figure RIGHT, text block LEFT

```
[LEFT — TEXT BLOCK]
  2px vertical accent line in --gradient-brand (left edge of text block)
  
  [SECTION LABEL] [ BEYOND THE INTERFACE ]
  
  H2: "Beyond the Interface:
       The Human Dimension"

  Body (max-width 60ch):
    "Conventional marketing stops at the screen. We go deeper. Our studio 
     identifies the sensory and cognitive touchpoints that address human 
     needs in ways automation cannot. By synthesizing human intuition 
     with machine intelligence, we create resonant ecosystems—not just 
     campaigns—that turn users into advocates and technology into an 
     experience."

  [CTA — outlined pill button]
  Border: --gradient-brand (2px)
  Text: --color-text-primary
  Label: "Explore Human-in-the-Loop Systems →"
  Hover: fills gradient

[RIGHT — GLOWING FIGURE]
  Retain existing illustration
  Background behind figure: radial gradient from --color-accent-secondary at 8% opacity
```

**Fix:** Replace the current flat light-blue rectangle CTA button.

---

### SECTION 4 — SERVICES

**ID anchor:** `#services`  
**Section label:** `[ 02 — SERVICES ]`  
**H2:** "A Human-Centered Studio Practice"

**Remove:** The confusing "EMPOWER / EDUCATE / Transport" label and the "3.0s" animated counter.

**Layout:** 3-column CSS grid (2 rows × 3 cols desktop; 1 col mobile)

**Card spec (apply to all 6 service cards):**

```css
.service-card {
  background:    var(--color-bg-secondary);
  border:        1px solid var(--color-border);
  border-radius: 12px;
  padding:       32px;
  transition:    border-color 0.3s ease, transform 0.3s ease;
}
.service-card:hover {
  border-image:  var(--gradient-brand) 1;
  transform:     translateY(-4px);
}
```

**Card content structure:**
```
[SVG Icon — 32px, --color-accent-primary]
[H3 — service name — DM Sans 600]
[Body — 2-3 sentences — DM Sans 400, --color-text-muted]
```

**Six service cards (use these names — improved for SEO):**

1. **Brand Architecture Consulting**  
   Crafting structures that drive business outcomes and inspire growth, aligning brand portfolios with business strategy.

2. **Experience Architecture & Design**  
   Designing emotional connections through physical and digital touchpoints that create immersive experiences.

3. **Human-Centric Space Design**  
   Creating spaces that unite people, foster collaboration, and elevate the human spirit.

4. **Immersive Brand Experience Design**  
   Transforming spaces into immersive brand stories that communicate values, culture, and uniqueness.

5. **Customer Experience Journey Mapping**  
   Organizing brand portfolios to maximize growth, clarity, and meaningful connections with customers.

6. **Multisensory Brand Design**  
   Simplifying complexity to create meaningful brand experiences that engage and inspire audiences.

**Add a 7th card (full-width, CTA variant):**
```
"Not sure which service fits your goals?"
[Start with a Discovery Call →]
```
Full-width below the grid, `--color-bg-secondary` background with `--gradient-brand` border.

---

### SECTION 5 — PAST WORK (Case Studies)

**ID anchor:** `#work`  
**Section label:** `[ 03 — PAST WORK ]`  
**H2:** "Selected Client Work"

**Layout:** Replace vertical full-bleed stacking with 2-column alternating rows:
- Row 1: Image LEFT / Content RIGHT
- Row 2: Content LEFT / Image RIGHT
- Alternate pattern continues for all case studies

**Image treatment:**
- Clip to `border-radius: 16px` at natural brightness (remove heavy dark overlay)
- Add subtle `box-shadow: 0 24px 48px rgba(0,0,0,0.4)` for depth

**Content block spec per case study:**

```
[CLIENT — --text-label, --color-accent-primary, e.g. "QUALCOMM"]
[Project Title — --text-h2, Syne 700]
[Description — --text-body-lg, max-width 60ch, 3 sentences minimum]
[Service tags — pill badges, --color-bg-secondary background, --color-border border]
  Example: [Brand Experience] [Platform Development]
[CTA — "View Case Study →" — --color-accent-primary, DM Sans 500]
```

**Five case studies — expanded copy:**

**1. Influencing the Conversation (Qualcomm)**
Micro-influencer management platform for Snapdragon-based products.
> "We joined forces with Qualcomm to design and build a customized micro-influencer management platform for their Snapdragon-based product line. The platform helped Qualcomm identify, activate, and measure authentic creator voices — amplifying their brand message and reaching new developer and consumer audiences at scale."
Tags: `[Platform Development]` `[Influencer Marketing]` `[Brand Experience]`

**2. Hack for Good (Texas Instruments)**
Security bounty program fostering researcher community.
> "Our team partnered with Texas Instruments to architect a software bounty program that transformed the security community into product advocates. By designing the program structure, communication framework, and incentive model, we helped TI build a sustainable ecosystem of researchers that measurably improved product resilience."
Tags: `[Developer Relations]` `[Community Building]` `[Security Programs]`

**3. Harnessing the Sun (Kayo Energy)**
Video explainer for solar screen technology.
> "We worked with Kayo Energy to create a video explainer that simplified a technically complex solar screen innovation for commercial building owners. The content translated energy efficiency data into a compelling visual narrative that directly supported their sales and customer education goals."
Tags: `[Brand Storytelling]` `[Video Production]` `[B2B Marketing]`

**4. Data Driven Stories (Toyota USA)**
Immersive data visualization for stakeholder communication.
> "We partnered with Toyota USA to design and develop an immersive data visualization experience that transformed complex data insights into a compelling stakeholder narrative. The interactive experience enabled Toyota's team to communicate performance data with clarity and impact across executive and partner audiences."
Tags: `[Data Visualization]` `[Experience Design]` `[Stakeholder Communications]`

**5. Aural Odyssey (Octavio)**
Sound station exhibit for 4D audio headphones.
> "We partnered with Octavio to develop a sound station exhibit that showcased their groundbreaking 4D audio headphones. The experiential installation was designed to immerse visitors in the full sensory capability of the technology — revolutionizing how gaming and film audiences discovered the Octavio experience."
Tags: `[Experiential Design]` `[Product Launch]` `[Consumer Technology]`

**Background:** Alternate `--color-bg-primary` and `--color-bg-secondary` per row.

---

### SECTION 6 — COMMUNITY BUILDING / DEVELOPER RELATIONS

**ID anchor:** `#community`  
**Section label:** `[ 04 — COMMUNITY BUILDING ]`  
**H2:** "Developer Relations & Community-Led Growth"

**Body copy:**
> "Signet Science's origins are rooted in developer relations and product marketing. We've refined a program model that identifies technical experts who can authentically showcase solutions across their trusted channels — accelerating customer conversions through credible, third-party validation. From bounty programs and technical content to influencer activation and community infrastructure, we build the human networks that surround platform adoption."

**Feature tile row (4 tiles, horizontal):**

```
[Icon] Developer Advocate Programs
[Icon] Technical Influencer Networks
[Icon] Community Infrastructure Design
[Icon] Security & Bounty Program Architecture
```

Tile style: `--color-bg-secondary` background, `--color-border` border, `border-radius: 8px`, padding `20px 24px`.

**Visual:** SVG network graph showing: People nodes → Channel nodes → Brand center node. Use `--color-accent-primary` for people, `--color-accent-secondary` for brand center, `--color-border` for connecting lines.

---

### SECTION 7 — CLIENTS & MISSION (Two sub-sections)

#### 7A — Client Logo Ticker

**ID anchor:** `#clients`  
**Section label:** `[ 05 — CLIENTS ]`  
**H2:** "Companies We've Worked With"

**Layout:** Auto-scrolling horizontal ticker (CSS animation, pause on hover)

```css
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-track { animation: ticker 30s linear infinite; }
.ticker-track:hover { animation-play-state: paused; }
```

- Logos: grayscale at 40% opacity → full color at 100% opacity on hover
- Include: Qualcomm, Toyota, Texas Instruments, Kayo Energy, Octavio
- Duplicate list for seamless infinite scroll

**Supporting copy (below ticker):**
> "We partner selectively with innovators in health, infrastructure, finance, and commerce ready to lead the next wave of purposeful brand transformation."

#### 7B — Mission Statement

**ID anchor:** `#mission`  
**Layout:** Full-width centered, max-width `800px`  
**Background:** `--color-bg-secondary` with constellation/polygon SVG as subtle background texture at 8% opacity

**Content:**
```
[SECTION LABEL] [ OUR MISSION ]

H2: "Make transformative change through purposeful innovation —
     while sustaining the value of people."

[Body — new, for SEO]
"Founded on the belief that human experience is the ultimate competitive 
advantage, Signet Science operates at the intersection of brand strategy, 
behavioral science, and platform technology. We're a distributed team with 
decades of experience across Fortune 500 enterprises and high-growth 
startups — bringing deep insights across markets, platforms, and 
human contexts."
```

---

### SECTION 8 — TEAM

**ID anchor:** `#team`  
**Section label:** `[ OUR TEAM ]`  
**Layout:** 3-column card layout  
**Background:** `--color-bg-secondary`

**Card spec per team member:**

```
[Headshot — circular crop, 120px diameter]
  Border: 2px solid --gradient-brand
  
[Name — --text-h3, DM Sans 600, --color-text-primary]
[Title — --text-label, --color-text-muted]
[Bio — --text-body, 3–4 sentences, DM Sans 400, --color-text-muted]
  Focus: expertise areas, notable brands, specific skills
[LinkedIn icon → LinkedIn profile URL]
```

**Current team (add bios):**
- **James Christopher** — Principal, Managing Director
- **Matt Baha** — Senior Director, Partner, Signet Science Labs
- **Chris Allen** — Director, Partner, Signet Science UX

> **Note for agent:** Bios need to be provided by client. Placeholder structure above is ready.

---

### SECTION 9 — CONTACT FORM (Rebuild)

**ID anchor:** `#contact`  
**Section label:** `[ 06 — START A PROJECT ]`  
**H2:** "Let's Build Something Together"  
**Subheadline:** "Tell us about your goals. We'll respond within 1 business day."

**Layout:** Two-column — left: form; right: contact context block  
**Background:** `--color-bg-secondary` with subtle grain texture overlay (4% opacity noise SVG)

**Form fields:**

```
First Name [input]    Last Name [input]
Work Email [input, required]
Company Name [input, required]
Service Interest [dropdown]:
  - Brand Architecture Consulting
  - Experience Architecture & Design
  - Human-Centric Space Design
  - Immersive Brand Experience Design
  - Customer Experience Journey Mapping
  - Multisensory Brand Design
  - Developer Relations Programs
  - Not Sure — Let's Talk
Project Description [textarea, 5 rows]
  placeholder: "Tell us about your brand challenge, product, or the 
  experience you're trying to create…"
How did you hear about us? [dropdown, optional]

[SUBMIT BUTTON — full width]
  Background: --color-accent-primary
  Text: #050814 (dark)
  Label: "Send Message →"
  Hover: gradient shift to --color-accent-secondary
```

**Input field styles:**
```css
.form-input {
  background:    rgba(255,255,255,0.04);
  border:        1px solid var(--color-border);
  border-radius: 8px;
  color:         var(--color-text-primary);
  padding:       12px 16px;
  font-family:   'DM Sans', sans-serif;
  font-size:     16px;
}
.form-input:focus {
  border-color:  var(--color-accent-primary);
  outline:       none;
  box-shadow:    0 0 0 3px rgba(0, 229, 204, 0.15);
}
```

**Right contact context block:**

```
Direct: [email address — linked]
LinkedIn: [URL — linked]
Location: Based in [City], working globally

[Icon] Typically responds within 24 hours
[Icon] Currently accepting new projects
```

---

### SECTION 10 — FOOTER (New — Required)

No footer exists. Build it.

**Layout:** 4-column grid above a thin bottom bar  
**Background:** `--color-bg-primary` with `1px solid var(--color-border)` top border

```
[Col 1 — Identity]           [Col 2 — Services]        [Col 3 — Navigate]        [Col 4 — Connect]
Logo + lockup                Brand Architecture         Work                      LinkedIn
"Platform Innovation Lab"    Experience Architecture    Services                  X / Twitter
One-line descriptor          Human-Centric Design       About                     Instagram
                             Immersive Brand Design     Team                      
                             CX Journey Mapping         Contact                   [Email subscribe]
                             Multisensory Design                                  [_____________]
                                                                                  [Subscribe →]

───────────────────────────────────────────────────────────────────────────────────────────────────
© 2025 Signet Science · Privacy Policy · Terms of Service      (--color-text-muted, centered)
```

---

## 5. NEW PAGES TO BUILD (Content Expansion for SEO)

The single-page architecture limits SEO. Add these as separate routes:

### `/services` — Services Detail Page
One page with H2-anchored sections per service. Each section:
- Definitional paragraph (what it is)
- ICP description (who it's for)
- Process steps (3–5 numbered)
- Relevant case study pull-quote
- Target keyword per service (see Section 6D)

### `/work` — Case Studies Index
Individual pages per client: `/work/qualcomm`, `/work/toyota`, etc.
Structure per page:
- Client + project type header
- Challenge / Approach / Outcome sections
- Measurable results
- Images from the engagement
- Industry + service type tags
> **These pages are primary AI citation targets.** AI models surface these when asked "what does Signet Science do?"

### `/about` — About Page
- Company origin story
- Methodology section — define "Human-in-the-Loop Brand Design" explicitly and fully (this becomes a citable definition)
- Team expanded bios
- Values / operating principles

### `/insights` — Thought Leadership Blog
Publish 5–10 initial articles targeting high-intent queries:
1. "What is Human-in-the-Loop brand strategy?"
2. "How tech companies can humanize their brand experience"
3. "Developer relations vs. community marketing: what's the difference?"
4. "The role of multisensory design in enterprise brand building"
5. "Why brand architecture matters for platform companies"
6. "What is an experiential brand studio?"
7. "How to build a developer advocate program"

> These articles are the **primary GEO / AI discoverability surface.** AI systems preferentially cite clearly structured, definitional content.

---

## 6. SEO TECHNICAL SPECIFICATION

### 6A. Meta Tags (Every Page)

```html
<title>[Page Topic] | Signet Science — Human-Centered Brand Studio</title>
<meta name="description" content="[120–155 char unique description — include target keywords, company name, value prop]">
<meta property="og:title" content="[Same as title]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:image" content="https://signetscience.com/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="[canonical URL]">
<link rel="canonical" href="[canonical URL]">
```

**Homepage title:** `Signet Science — Experiential Brand Studio & Platform Innovation Lab`  
**Homepage description:** `Signet Science is an experiential brand studio that architects Human-in-the-Loop brand systems for technology companies. Immersive experience design, developer relations, and brand architecture.`

### 6B. Structured Data — JSON-LD

**Organization Schema (add to every page `<head>`):**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Signet Science",
  "alternateName": "Signet Science Platform Innovation Lab",
  "url": "https://signetscience.com",
  "logo": "https://signetscience.com/_assets/media/[LOGO_FILE].png",
  "description": "Signet Science is an experiential brand studio and platform innovation lab specializing in Human-in-the-Loop brand systems, immersive experience design, and developer community programs for technology companies.",
  "foundingDate": "[YEAR]",
  "founders": [
    { "@type": "Person", "name": "James Christopher" },
    { "@type": "Person", "name": "Matt Baha" },
    { "@type": "Person", "name": "Chris Allen" }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Business Inquiries",
    "email": "[EMAIL]"
  },
  "sameAs": [
    "https://linkedin.com/company/signet-science",
    "https://twitter.com/signetscience"
  ],
  "serviceType": [
    "Brand Architecture Consulting",
    "Experiential Brand Design",
    "Human-in-the-Loop System Design",
    "Developer Relations Programs",
    "Multisensory Brand Experience"
  ]
}
```

**FAQPage Schema (add to homepage):**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Signet Science?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Signet Science is an experiential brand studio and platform innovation lab. The company specializes in Human-in-the-Loop brand systems — designing brand experiences that synthesize human intuition with machine intelligence for technology companies, enterprises, and high-growth startups."
      }
    },
    {
      "@type": "Question",
      "name": "What is Human-in-the-Loop brand design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Human-in-the-Loop (HITL) brand design is Signet Science's proprietary methodology for building brand systems that keep human judgment, intuition, and sensory experience at the center of every touchpoint — even when AI and automation power the underlying infrastructure. It maps cognitive and sensory needs to technological capabilities to create brand ecosystems that drive genuine advocacy."
      }
    },
    {
      "@type": "Question",
      "name": "What types of companies does Signet Science work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Signet Science partners selectively with technology companies, enterprises, and high-growth startups in sectors including health, infrastructure, finance, and commerce. Past clients include Qualcomm, Toyota USA, Texas Instruments, and Kayo Energy."
      }
    },
    {
      "@type": "Question",
      "name": "What services does Signet Science offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Signet Science offers brand architecture consulting, experience architecture and design, immersive brand experience design, customer experience journey mapping, multisensory brand design, and developer relations and community-building programs."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Signet Science different from a traditional brand agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike traditional brand agencies focused on visual identity and campaigns, Signet Science architects entire Human-in-the-Loop brand ecosystems. The studio combines brand strategy with behavioral science, platform technology, and developer community expertise — delivering immersive experiences that turn users into advocates and technology into lived brand reality."
      }
    }
  ]
}
```

**Person Schema (team page, one per person):**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "James Christopher",
  "jobTitle": "Principal, Managing Director",
  "affiliation": {
    "@type": "Organization",
    "name": "Signet Science"
  },
  "url": "https://signetscience.com/#team",
  "sameAs": ["https://linkedin.com/in/[HANDLE]"]
}
```

### 6C. Heading Hierarchy (Every Page)

- Exactly one `<h1>` per page
- `<h2>` for each major section
- `<h3>` for cards, sub-sections
- **Never** use CSS-styled `<div>` or `<p>` tags as heading substitutes

### 6D. Target Keywords by Page/Section

| Page / Section | Primary Keyword | Secondary Keywords |
|---|---|---|
| Homepage | experiential brand studio | human-centered brand design, brand experience design |
| Hero | human-powered brand experiences | tech brand agency, innovation lab |
| Services | brand architecture consulting | immersive brand design, multisensory design |
| Work | experiential brand case studies | Qualcomm brand, Toyota brand experience |
| Community | developer relations program | community-led growth, developer advocate program |
| About | Human-in-the-Loop brand design | platform innovation lab, brand strategy technology |
| Blog articles | (per article — see Section 5) | |

### 6E. Image Optimization Requirements

- All images: descriptive `alt` attributes required (see Section 8 for current images)
- Format: Convert all PNGs to WebP (keep originals as fallback)
- Add `width` and `height` attributes to all `<img>` tags to prevent layout shift
- Hero/first image: `loading="eager" fetchpriority="high"`
- All below-fold images: `loading="lazy"`
- Target: images under 200KB each after compression

### 6F. Performance Requirements

- Target Lighthouse Performance Score: 90+
- Defer heavy JS particle animations until after first contentful paint
- Use `will-change: transform` on animated elements only
- Preconnect: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Inline critical CSS for above-the-fold content

---

## 7. GEO (GENERATIVE ENGINE OPTIMIZATION) SPECIFICATION

GEO optimizes for AI systems (Claude, ChatGPT, Perplexity, Gemini) surfacing Signet Science in conversational responses.

### 7A. FAQ Section — Add to Homepage

**Placement:** Between Mission section and Contact form  
**Visual:** Accordion component, `--color-bg-secondary` background  
**Questions:** Use the 5 FAQ items from the FAQPage schema above, plus:

6. "How does Signet Science approach developer relations?"
7. "What industries does Signet Science serve?"
8. "How long does a typical Signet Science engagement take?"

Each answer: 2–4 sentences, plainspoken, definitional. No jargon without definition.

### 7B. Definitional Content Blocks

Publish these as named sections or standalone `/insights` articles — AI models cite brands that are the source of a definition:

| Concept | Target Definition Page |
|---|---|
| "Human-in-the-Loop Brand Design" | `/about#methodology` |
| "Experiential Brand Studio" | `/about#what-we-are` |
| "Platform Innovation Lab" | `/about#platform-innovation` |
| "Brand Ecosystem Design" | `/insights/brand-ecosystem-design` |

### 7C. Citation-Friendly Content Rules

Apply these formatting rules to all `/insights` articles and `/about` methodology sections:

- Paragraphs: 3–5 sentences maximum
- Clear topic sentences that state the main point
- Bulleted lists with labels for multi-part concepts
- Defined terms in **bold** on first use
- Named frameworks cited by full name (e.g., "The Signet Science HITL Framework")
- Specific named clients and outcomes in case study references
- Numbered process steps for methodology descriptions

### 7D. Third-Party Credibility Signals (Off-Site Tasks)

| Platform | Action |
|---|---|
| LinkedIn Company Page | Fully populate — logo, description, services, team |
| Crunchbase | Add organization profile |
| Clutch.co | List company + add case studies |
| DesignRush | List company |
| GoodFirms | List company |
| Guest posts | Target marketing/tech publications linking back with keyword anchor text |

---

## 8. IMAGE ASSET MANIFEST

All 25 media assets scraped from signetscience.com on March 2026. These are the existing images to reuse in the redesign.

### Can you reuse the images?

**Yes — with important caveats:**

1. **Signet Science owns its own assets** (client work photos, studio photography) — these can be freely reused
2. **Stock photography** (crowd scenes, person at camera, etc.) — confirm licensing before reuse; if sourced from Unsplash/Pexels they can be reused, if from a paid stock library they need re-licensing
3. **Client logos and brand assets** (Qualcomm, Toyota, TI) — use only in case study context as fair use / client reference; don't use as decorative elements
4. **All images need alt text added** — currently 100% missing

### How to Download / Preserve All Images

Run this bash script from the project root to download all assets:

```bash
#!/bin/bash
# signetscience-asset-download.sh
# Downloads all media assets from signetscience.com
# Run from project root: bash signetscience-asset-download.sh

mkdir -p ./assets/images

IMAGES=(
  "ae1fab75ad2288bc182f8f4005472c67.png"
  "0de45a62f7eb56ce0b31f161dcfc21ba.jpg"
  "e3997a00cac1351f1e1e29f68ac8a521.png"
  "b661dbcbb4ac635157ee9eb0de98d63c.png"
  "552ef50607690d908b2d02fbb14b8b19.png"
  "e79938afa2b3495f784a3d8991a7fd49.png"
  "ff717bb829db8f95875eddae8e920412.png"
  "f79ea4f175454aac39957e363dc6b478.png"
  "c23f2180153d6dc1c733b4539b8ed646.png"
  "d28a63731ca6f13b5346ec135487a466.png"
  "29e3d6de1e4511bcd0c018be08f0e51e.png"
  "1bed8bb0d86f9ab259b62f685b68fee9.png"
  "d74079863a9f632c1a44ff82835b6294.png"
)

BASE="https://signetscience.com/_assets/media"

for img in "${IMAGES[@]}"; do
  echo "Downloading: $img"
  curl -L -o "./assets/images/$img" "$BASE/$img"
  sleep 0.5
done

echo "Done. Files saved to ./assets/images/"
```

> **Note:** The script above contains all confirmed assets. A few assets loaded as `blob:` URLs (dynamically generated, likely canvas-based particle animations) — these cannot be scraped and should be recreated as CSS/SVG in the redesign.

### Image Inventory & Suggested Semantic Filenames

Rename all assets with descriptive names for SEO (alt text and filename both matter):

| Original Filename | Dimensions | Suggested Rename | Alt Text |
|---|---|---|---|
| `ae1fab75...png` | 799×745 | `signet-science-logo-mark.png` | `Signet Science logo mark` |
| `0de45a62...jpg` | 1600×1067 | `signet-science-crowd-event.jpg` | `Signet Science experiential brand event with audience` |
| `e3997a00...png` | 1344×1600 | `signet-science-glowing-human-figure.png` | `Glowing human figure illustration representing the human dimension in brand design` |
| `b661dbcb...png` | 800×789 | `signet-science-particle-mesh-hero.png` | `Abstract particle mesh visualization for Signet Science hero section` |
| `552ef506...png` | 1600×800 | `signet-science-neural-network.png` | `Neural network visualization representing Human-in-the-Loop brand systems` |
| `e79938af...png` | 1456×816 | `qualcomm-influencer-platform.png` | `Qualcomm micro-influencer platform developed by Signet Science` |
| `ff717bb8...png` | 1456×816 | `texas-instruments-bounty-program.png` | `Texas Instruments security bounty program by Signet Science` |
| `f79ea4f1...png` | 1536×768 | `kayo-energy-solar-explainer.png` | `Kayo Energy solar screen technology video explainer by Signet Science` |
| `c23f2180...png` | 1536×768 | `toyota-data-visualization.png` | `Toyota USA data visualization experience created by Signet Science` |
| `d28a6373...png` | 1456×816 | `octavio-4d-audio-exhibit.png` | `Octavio 4D audio headphones sound station exhibit by Signet Science` |
| `29e3d6de...png` | (varies) | `signet-science-constellation-bg.png` | `Decorative constellation network background` |
| `1bed8bb0...png` | (varies) | `signet-science-polygon-mesh.png` | `Geometric polygon mesh background illustration` |
| `d74079863...png` | (varies) | `signet-science-team-bg.png` | `Background texture for Signet Science team section` |

> **Agent note:** For the remaining 12 asset filenames not listed above (full list is 25), use the same naming convention: `signet-science-[descriptive-context].ext`. Download all assets using the bash script, visually identify each one, and apply appropriate semantic names and alt text.

### Images to Retain in Redesign (by section)

| Section | Image to Use | Treatment |
|---|---|---|
| Hero | Particle mesh PNG | Tighten to right 55% viewport, no text overlay |
| Section 2 (Approach) | Remove crowd photo | Replace with SVG HITL cycle diagram |
| Section 3 (Human Dimension) | Glowing human figure PNG | Retain — keep as hero visual of this section |
| Section 4 (Services) | No images needed | Cards only |
| Section 5 (Work/Qualcomm) | Qualcomm influencer platform PNG | Natural brightness, rounded rect crop |
| Section 5 (Work/TI) | TI bounty program PNG | Natural brightness, rounded rect crop |
| Section 5 (Work/Kayo) | Kayo solar PNG | Natural brightness, rounded rect crop |
| Section 5 (Work/Toyota) | Toyota data viz PNG | Natural brightness, rounded rect crop |
| Section 5 (Work/Octavio) | Octavio exhibit PNG | Natural brightness, rounded rect crop |
| Section 6 (Community) | No images | SVG network diagram (new) |
| Section 7 (Clients) | Client logos | Grayscale ticker |
| Section 8 (Team) | Headshots needed | Circular crop — client must provide |
| Section 10 (Footer) | Logo mark only | Gradient glow treatment |

---

## 9. IMPLEMENTATION PRIORITY ORDER

Implement in this sequence for maximum early impact:

| # | Item | Agent | Impact |
|---|---|---|---|
| 1 | Navigation bar | Frontend | Critical — UX baseline |
| 2 | Color token system + typography swap | Brand + Frontend | High — unified visual foundation |
| 3 | Hero rebuild with CTA, subheadline, trust bar | Frontend + Copy | High — first impression + SEO |
| 4 | Footer with links + schema | Frontend + SEO | High — SEO infrastructure |
| 5 | Meta tags + Organization JSON-LD schema | SEO | High — discoverability |
| 6 | Contact form rebuild (expanded fields) | Frontend | Medium-High — conversion quality |
| 7 | Services section card redesign | Frontend + Brand | Medium — UX clarity |
| 8 | Case study layout rebuild + expanded copy | Frontend + Copy | Medium — SEO + credibility |
| 9 | FAQ section + FAQPage JSON-LD | Frontend + Copy | Medium — GEO discoverability |
| 10 | Team section with bios + Person schema | Frontend + Copy | Medium — authority signals |
| 11 | Image download + rename + alt text | SEO | Medium — accessibility + SEO |
| 12 | `/work` case study pages (individual) | Frontend + Copy | High long-term — AI citations |
| 13 | `/insights` blog (first 5 articles) | Copy | High long-term — GEO primary surface |
| 14 | Client logo ticker | Frontend | Low-Medium — trust signal |
| 15 | `/services` expanded page | Frontend + Copy | Medium long-term — keyword depth |
| 16 | `/about` methodology page | Copy | Medium long-term — GEO definitions |

---

## 10. BRAND VOICE BRIEF (For Copy Agent)

### Voice Characteristics

| DO | DON'T |
|---|---|
| Precise, not pretentious | Buzzword stacking |
| Confident, not arrogant | Vague superlatives ("world-class," "cutting-edge") |
| Human, not clinical | Passive voice constructions |
| Declarative, not hedging | Rhetorical questions as section openers |
| Named frameworks and methodologies | The word "leverage" |
| Specific outcomes with named clients | Unverifiable claims |
| Active present tense | Hedging language ("help companies explore the possibility of...") |
| Unexpected word pairings | Generic agency-speak |

### Signature Language

These terms are proprietary to Signet Science — use consistently across all copy:
- **Human-in-the-Loop (HITL)** — always spell out on first use per page
- **Human-Centered** — use in section titles and service names
- **Brand Ecosystem** — preferred over "campaign" or "marketing"
- **Resonant** — preferred adjective for experiences that work
- **System Synthesis** — use in positioning and methodology copy
- **Platform Innovation** — use in context of technology client work

### Tone by Section

| Section | Tone |
|---|---|
| Hero | Bold, declarative, minimal |
| Approach / Methodology | Authoritative, explanatory, confident |
| Services | Clear, direct, outcome-focused |
| Case Studies | Specific, results-oriented, brief |
| Community | Collegial, technical-credible |
| Team | Warm, expert, accessible |
| Contact | Inviting, action-oriented, not salesy |

---

*End of Specification*  
*Document version: 1.0 — March 2026*  
*Source audit: signetscience.com (live site)*
