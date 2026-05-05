# CLAUDE.md — Authoring Guide

Guide for adding new sermons and series to this project. Read this first whenever you (Claude or any AI assistant) are asked to write new content for the site. For visual decisions, also read [DESIGN.md](DESIGN.md).

## Project at a glance

Static site, no build step. The site is a **collection of online sermon series** — nothing else. Two content layers:

| Layer | Folder | Format | Use it for |
|---|---|---|---|
| **Series** | `series/` | One overview page per series (long-form HTML) | Multi-sermon journey landing page. Lists all sermons in the series with passages and CTAs. |
| **Sermons** | `sermons/` | One slide deck per sermon (full-screen HTML deck) | Individual sermon as an immersive, slide-based presentation. |

The homepage `index.html` lists series only. Sermons are reached through their parent series page.

There is also an unused `studies/` folder with a legacy slide deck (`what-if-it-were-you.html`). Do not link to it from the homepage. Do not put new content there. Treat it as historical / archived; if asked to remove it, confirm with the user first.

## Hard rules

1. **Language: English.** Page text, file names, comments, alt text, meta tags — all English. The folder is named `estudos-biblicos` for legacy reasons; do not translate folder names back. Everything user-facing is English.
2. **File names: kebab-case.** `moses-1-the-call.html`, `davids-heart.html`. No spaces, no underscores, no capitals.
3. **Sermons are slide decks**, not articles. They use the `.deck` / `.slide` system with `assets/js/slides.js` for keyboard, touch, and dot navigation. The reference implementation is [`sermons/moses-1-the-call.html`](sermons/moses-1-the-call.html).
4. **Series overview pages are long-form HTML** (sections, cards, hero gradient). They are *not* slide decks. The reference is [`series/five-crossings.html`](series/five-crossings.html).
5. **Never edit `assets/css/base.css` to style one page.** Use a `<style>` block in the page itself for page-specific rules. Touch `base.css` only when adding a token or component that genuinely belongs to the design system.
6. **Always link to `../assets/css/base.css`** from pages inside `series/` or `sermons/`. The homepage uses `assets/css/base.css` (no `../`).
7. **Use design tokens, not hard-coded values.** Use `var(--ink)`, `var(--space-md)`, `var(--text-2xl)` — not hex codes or pixel values. See [DESIGN.md](DESIGN.md).
8. **No new dependencies.** Vanilla HTML / CSS / JS only. Fonts come from the Google Fonts `@import` already in `base.css`.

## Adding a new sermon to an existing series

1. **Create the file** at `sermons/<series-slug>-<n>-<short-title>.html` (e.g. `sermons/moses-3-the-wait.html`). Copy [`sermons/moses-1-the-call.html`](sermons/moses-1-the-call.html) as the template — it has the canonical slide-deck structure.
2. **Update the head:**
   - `<title>` — sermon title em-dash series name (e.g. `The Wait — God's Timing — Five Crossings`).
   - `<meta name="description">` — one sentence, ~150 chars.
   - Open Graph tags — match title and description.
3. **Update the back link** — the `.back-link` `<a>` near the top of `<body>` should point to the parent series page.
4. **Build the slides** in this order (each `<section class="slide">` is one slide):
   1. **Cover** (`slide-title theme-dark active`) — title, sermon meta, passage, tagline. **Must have `active` class.**
   2. **Introduction** (`slide-opener theme-opener`) — context paragraph and key verse.
   3. **Act I opener** (`slide-opener theme-opener`) — Roman numeral, act title, framing paragraph.
   4. **Story slides** for Act I — use `.story-grid` with character / verse-ref / heading on the left and three `.beat`s on the right.
   5. **Reflection slide** (`slide-reflect theme-dark`) — italic display heading with a `.emphasis` span, two `.questions` paragraphs.
   6. Repeat for Act II, Act III…
   7. **Truths slide** (optional, `slide-truths theme-dark`) — numbered grid of takeaways.
   8. **Closing** (`slide-closing theme-dark`) — final question, ornament, prayer, signature.
5. **Animation classes** `anim-1` through `anim-6` stagger element entry inside the active slide. Apply them in reading order. Don't use them on every element — use them where the eye should land in sequence.
6. **The slide counter and dots populate automatically** from `slides.js`. You don't need to count slides or build the navigation.
7. **Wire up the floating sermon video.** Every slide-deck sermon ships with an `aside.float-video` block (right after `<div class="grain"></div>`) and the matching `.float-video*` styles in the page's `<style>` block. The video stays fixed while the user navigates slides, so they can watch and read in parallel. Copy both pieces from `sermons/moses-1-the-call.html`, then paste your YouTube video ID into the iframe `src` (replacing the `VIDEO_ID` placeholder). The video sits top-right on desktop and top-center on mobile; the `.progress-dots` are auto-shifted below it on tablet+. Users can dismiss it with the × button.
8. **Update the parent series page** at `series/<series-slug>.html`: confirm that sermon's card description and passage match what's actually in the new sermon. If the card was a placeholder, update it.

If a sermon isn't written yet, use the **placeholder template** — see [`sermons/moses-2-red-sea.html`](sermons/moses-2-red-sea.html). It's a single full-screen "Coming Soon" panel that links back to the series. Use this for every unwritten sermon so the series links never break.

## Adding a new series

1. **Create the overview page** at `series/<series-slug>.html`. Copy [`series/five-crossings.html`](series/five-crossings.html) as the template.
2. **Update:**
   - Page `<title>` and meta tags.
   - `.series-hero` — series number/length, title, subtitle, optional `bg-word` decoration.
   - `.series-overview` — overview paragraph, key verse box, central question paragraph.
   - `.sermons-grid` — one `.sermon-card` per sermon. Each card needs: number, passage, title, description, CTA. The `href` must match the sermon file you'll create.
   - `.back-button` — the back link goes to `../index.html`.
3. **Create placeholder sermon files** for every sermon in the series (`sermons/<series>-N-<slug>.html`) using the placeholder template from `sermons/moses-2-red-sea.html`. This avoids broken links from day one.
4. **Add a card to the homepage** in the Sermon Series grid (`index.html`):
   ```html
   <a href="series/<slug>.html" class="study-card fade-up">
     <div class="study-meta">N-Part Series · Subject</div>
     <h3>Series Title</h3>
     <p class="study-description">One-paragraph hook (3-4 sentences max).</p>
     <span class="study-cta">Explore Series →</span>
   </a>
   ```
   If you're replacing a `.coming-soon` placeholder, remove the `coming-soon` class and convert the wrapping `<div>` to `<a href="...">`. Update the CTA from `In development` to `Explore Series →`.

## Updating the homepage when shipping content

After shipping new content, the homepage card must transition from placeholder to live:
- Remove the `coming-soon` class from the card.
- Convert the `<div class="study-card coming-soon">` wrapper to `<a class="study-card" href="...">`.
- Update the `.study-cta` span text from `In development` to `Explore Series →`.
- Make sure the description still matches what's actually published.

If you don't have a placeholder to replace, add a fresh card. Keep the grid balanced — odd cards trailing at the end look like leftovers.

## Writing the sermon itself

Each sermon is a slide deck of ~12–18 slides. Aim for that range. Fewer feels rushed; more loses the audience.

**Standard sermon shape:**
1. Cover
2. Introduction + key verse
3. Three acts, each with: act opener → 1–3 story slides (beats) → 1 reflection slide
4. (Optional) Truths slide summarizing takeaways
5. Closing with prayer

**Per-slide rules:**
- One idea per slide. If a slide is doing two jobs, split it.
- Story slides use the `.beats` pattern (3 beats per slide is the sweet spot — Before / After / Consequences, or Problem / God's Answer / The Truth).
- Reflection slides ask **questions, not statements**. Two questions per reflection. The first echoes the story, the second confronts the reader.
- The `.emphasis` span on reflection headings is where the punch lands. Put the most disruptive phrase there.

## Style and tone

The voice across the site is direct, second-person, and challenges the reader. Avoid sermon-cliché throat-clearing ("Beloved, today we want to share..."). Prefer:

- Short, punchy openings.
- Concrete imagery (the sea, the calf, the cave) over abstract theology.
- Questions that make the reader uncomfortable in a useful way ("Would you have stayed? Or kept negotiating one more day?").
- Application that names a real, modern situation, not a generic moral.

Match the existing pages' register — read `sermons/moses-1-the-call.html` before writing. Don't drift into formal devotional cadence.

## Things you should NOT do

- Don't add JavaScript frameworks. The site is intentionally static.
- Don't introduce a build step (Webpack, Vite, Tailwind, etc.).
- Don't translate the site or add a language switcher unless explicitly asked. Just write in English.
- Don't write sermons as long-form articles. Sermons are slide decks.
- Don't add new content to `studies/`. That folder is archived.
- Don't move files between `series/` and `sermons/` — they have distinct purposes.
- Don't rename `assets/`, `series/`, `sermons/`, or root files without updating every relative link in the project.
- Don't add tracking, analytics, or third-party embeds without being asked.
- Don't generate filler "lorem ipsum" text in shipped pages. Use the placeholder template for unwritten sermons.

## When in doubt

The Moses series is the reference implementation:
- Series overview: [`series/five-crossings.html`](series/five-crossings.html)
- Real sermon (slide deck): [`sermons/moses-1-the-call.html`](sermons/moses-1-the-call.html)
- Placeholder sermon: [`sermons/moses-2-red-sea.html`](sermons/moses-2-red-sea.html)

Match their structure exactly unless you have a specific reason to diverge.
