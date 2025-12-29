# Web Personal Website Revamp (Sahar Mor)

## Current context (what exists today)

### Tech / architecture
- **Type**: Single-page static site (`index.html`) deployed via GitHub Pages.
- **Domain**: Custom domain via `CNAME` → `saharmor.me`.
- **Template base**: HTML5 UP “Strata” (CSS + JS are largely template code).
- **Styling**: `assets/css/main.css` (compiled) + `assets/sass/` source present.
- **JS behavior**: jQuery + template utilities (`assets/js/main.js`, `assets/js/util.js`, `assets/js/breakpoints.min.js`, `assets/js/browser.min.js`).
- **Analytics**: Google Analytics tag present in `<head>` (`gtag.js`).
- **3rd-party embed**: GitHub Sponsors button iframe in the header.

### Layout model
- **Desktop**: Fixed left sidebar header (`#header`, ~35% width) + scrollable main content column (`#main`, remaining width).
- **Mobile (<= 980px)**: Header becomes top block; main becomes full-width below.

### Content inventory (sections)
- **Header / “hero”**:
  - Avatar image
  - “Hey! I’m Sahar” headline
  - One-line positioning statement (“Bringing the latest in AI…”)
  - GitHub Sponsors button
  - Social links: Twitter/X, LinkedIn, GitHub, Medium (Substack is commented out)
- **Main column** (card grid layout, “work-item” tiles):
  - **Featured work**: AI Tidbits, Anima, Whisper Playground
  - **Projects**: ThisImageDoesnotExist.com
  - **Github**: DALL‑E Playground, Realtime transcription playground, React Super Command
  - **Writeups on AI**: several external articles (Mixed, VentureBeat, RTInsights, Analytics India, Medium)
  - **My thoughts on entrepreneurship**: Medium essays (O1 visa, co-founder, On Deck)
  - **Talks**: two talk titles with thumbnails (no links currently)

### Notable implementation details / quirks
- **Repeated section IDs**: multiple `<section id="articles-ai">` exist (HTML IDs should be unique).
- **Template JS references unused elements**:
  - `assets/js/main.js` configures a lightbox for `#two` and a footer `#footer`, but `index.html` doesn’t include those IDs.
  - Parallax background is enabled by default (disabled on mobile / IE).
- **Theme customization**: The header background is overridden to a gradient in `assets/css/main.css`.

---

## Revamp planning doc (we will iterate on this)

### New requirements you want to add (captured)
- **More GitHub repositories** displayed on-site.
- **Clear, separate sections** (more structured than today).
- **Writing split into two sections**:
  - **Articles**: longer-form articles you wrote (external links).
  - **AI Tidbits posts**: highlights/posts from AI Tidbits (separate from “Articles”).
- **Repo cards should show**: thumbnail/preview image + **GitHub stars** + **repo description** (and link).
- **Talks section**: talk entries with **links** (YouTube/video or slides) + thumbnail (YouTube thumbnail or screenshot).
- **Personal projects section**: thumbnail + short description + link.
- **Communities** to include somewhere:
  - **O1/EB1 visa community**
  - **Bond AI** (AI events community across major cities)
- **Social links**: include at least LinkedIn, X, Instagram (plus existing ones as desired).
- **“Now” / status**: a place that says what you’re doing now + what you’re excited about.

### Goals (draft; confirm with you)
- **Primary goal**: Update personal website to reflect current work, interests, and credibility in AI.
- **Secondary goals**: Better storytelling, clearer navigation/structure, improved design polish, and easier future updates.

### Constraints / decisions to confirm
- **Hosting**: Keep GitHub Pages + custom domain (`saharmor.me`)?
- **Stack preference**:
  - Stay “pure static” (single HTML/CSS/JS), OR
  - Move to a static site generator (e.g., Astro/Next static export) for easier content updates?
- **Content source-of-truth**: Hand-edited markdown/JSON? Pull from external feeds (GitHub/Medium/Substack) or keep curated?

### Information architecture (IA) — candidate sections (placeholders)
- **Home / Hero**
- **Now** (what you’re doing + what you’re excited about)
- **Featured** (top highlights across categories)
- **Open Source (GitHub repos)** (repo cards w/ stars + description)
- **Personal Projects** (non-OSS or productized projects)
- **Writing: Articles** (your longer-form pieces)
- **Writing: AI Tidbits** (newsletter posts / highlights)
- **Talks** (with links + thumbnails)
- **Communities** (O1/EB1 + Bond AI)
- **About**
- **Contact**

### Design direction (placeholders; we’ll pick one)
- **Direction A**: Modern editorial (big typography, strong hierarchy, minimal cards)
- **Direction B**: Portfolio grid (cards + filters + quick highlights)
- **Direction C**: “Now / Notes” (personal, narrative, frequent updates)

### Content work (to-do list we’ll refine)
- **Rewrite**: Headline + positioning statement
- **Curate**: Top 3–6 “featured” items (with outcomes + credibility signals)
- **Normalize**: Projects/writing metadata (title, year, one-line value, links, thumbnail)
- **Add**: Talks links (slides/video), press/podcasts (if applicable), “Now” or “Bio” section
- **Expand**: GitHub repo list + decide which repos are “Featured” vs “All repos”
- **Add**: Communities section content + CTAs (join/learn more/contact)

### Content model + sourcing (decision needed)
To show **repo stars + descriptions**, we should pick one approach:
- **Option A — Manual (simple, most reliable)**: Maintain a single data file (JSON/YAML) with repo metadata (name, url, description, stars, thumbnail). You update stars occasionally (or we add a small script later to refresh).
- **Option B — Live GitHub API (automatic, more moving parts)**: Fetch repo metadata client-side from GitHub’s API and render it (requires handling rate limits, caching, and “no JS” fallbacks).
- **Option C — Build-time fetch (best of both, but needs a build step)**: Use a static site generator (or a small script) to fetch GitHub data at build time and commit the generated static HTML/JSON.

For **AI Tidbits posts**, options depend on where the canonical content lives:
- **RSS-based** (Substack RSS or custom feed) — may require build-time fetching to avoid browser CORS issues.
- **Manual highlights list** — curated “best posts” with thumbnails and excerpts.

### Quality checklist (we’ll enforce as we implement)
- **Accessibility**: semantic headings, unique IDs, image alt text, keyboard focus
- **SEO**: meta description, OpenGraph/Twitter cards, canonical URL, sitemap (if multi-page), structured data (optional)
- **Performance**: image sizing/compression, lazy-loading, avoid unused JS, good Lighthouse scores
- **Maintainability**: single source of truth for lists (projects/writing), easy to add new items

### Open questions for you (next inputs)
- **Audience**: Who is the #1 target visitor (recruiters, founders, readers, collaborators)?
- **Primary CTA**: What do you want them to do (subscribe, contact, sponsor, hire, read)?
- **Tone**: More “builder/engineer”, “writer/analyst”, “founder”, or a blend?
- **Inspiration**: Send 3–8 example sites you love + what you like about each (layout, typography, content, motion).
- **Must-keep**: What content/sections are non-negotiable?
- **Must-remove**: Anything you want to de-emphasize or delete?
- **Automation level**: For GitHub stars/descriptions and AI Tidbits posts, do you want **manual**, **build-time**, or **live** updates?
- **Repo scope**: Which repos should show? (Top N pinned? specific list? “recent” repos?)
- **AI Tidbits source**: Are these Substack posts, a custom blog, or something else? If Substack, do you want “latest N” or curated “best of”?
- **Talks**: Do you want each talk to have (title, event, date, location) + (YouTube link) + (slides) + (thumbnail)?
- **Communities CTA**: What should the CTAs be (join waitlist, RSVP page, newsletter, email)?
