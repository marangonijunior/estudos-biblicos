# DESIGN.md — Design System Reference

The design system for the Biblical Studies project. All tokens and base components live in `assets/css/base.css`. This document describes them so you don't have to reverse-engineer the CSS to add a new page.

## Design intent

A reading experience that feels like an old book and a modern editorial site at the same time. Parchment-warm background, deep ink text, gold accents, crimson for danger and emphasis, sea-blue for calm and reflection. Generous spacing, serifs for body and display, monospace for metadata. A subtle paper grain over everything.

The look should feel **earned and quiet** — not flashy. Nothing should pulse, slide, or animate just because it can.

## Color tokens

```
--ink            #1a1512    Primary text. Dark backgrounds.
--parchment      #f4ecdc    Primary background. Light text on dark.
--parchment-deep #e8dcc0    Section alt background. Card on light bg.
--gold           #b8873d    Accents, top borders, eyebrows on light bg.
--gold-light     #d4a962    Eyebrows on dark bg, emphasis spans, key verses.
--crimson        #7a2e2a    "Danger" / strong emphasis. Sermon CTAs.
--sea            #2d4a5c    Calm reflective accent. Application boxes.
--shadow         rgba(26, 21, 18, 0.15)    Card shadows.
```

**Pairing rules:**
- Light surfaces (`--parchment` / `--parchment-deep`) → text in `--ink`, accents in `--gold` or `--crimson`.
- Dark surfaces (`--ink`) → text in `--parchment`, accents in `--gold-light`.
- Sea-blue is for application boxes only — don't use it as a primary brand color.
- Crimson is reserved for emphasis and CTAs that need urgency. Don't use it for ambient text.

## Typography

**Three faces, each with one job.**

```
--display    'Fraunces', serif              Headings, titles, decorative numerals.
--body       'Cormorant Garamond', serif    Body copy, descriptions, prose.
--mono       'JetBrains Mono', monospace    Metadata, eyebrows, navigation, passage refs.
```

Fonts are loaded by the `@import` at the top of `base.css`. Don't add additional font imports.

**Headings** are set in `--display` with `letter-spacing: -0.02em` and tight line-height (1.05). They sit visually heavy and quiet — keep them that way.

**Eyebrows** (`.eyebrow` class) are uppercase mono at 0.75rem with 0.25em letter-spacing, gold on light surfaces / gold-light on dark. They include a trailing horizontal rule via `::after`. Use them as section labels above big titles.

### Type scale (token names)

```
--text-xs     0.75rem
--text-sm     0.875rem
--text-base   1rem        (1.125rem on tablet, 1.25rem on desktop)
--text-lg     1.125rem    (1.25rem on tablet, 1.5rem on desktop)
--text-xl     1.25rem     (1.5rem on tablet, 1.875rem on desktop)
--text-2xl    1.5rem      (2rem on tablet, 2.5rem on desktop)
--text-3xl    1.875rem    (2.5rem on tablet, 3.5rem on desktop)
--text-4xl    2.25rem     (3.5rem on tablet, 5rem on desktop)
```

These auto-scale at the responsive breakpoints. Always use the tokens; don't write fixed `font-size: 1.875rem`.

For hero / display text, `clamp()` is acceptable when you want the type to grow with viewport more aggressively than the tokens do (see `.main-title` in `index.html`).

## Spacing scale

```
--space-xs     0.5rem      (0.75 tablet, 1 desktop)
--space-sm     0.75rem     (1 tablet, 1.25 desktop)
--space-md     1rem        (1.5 tablet, 2 desktop)
--space-lg     1.25rem     (2 tablet, 2.5 desktop)
--space-xl     1.5rem      (2.5 tablet, 3 desktop)
--space-2xl    2rem        (3 tablet, 4 desktop)
--space-3xl    2.5rem      (4 tablet, 6 desktop)
```

Mobile-first. Use the token, not the value.

## Responsive breakpoints

```
Mobile (default)    < 768px
Tablet              ≥ 768px
Desktop             ≥ 1200px
```

The spacing and type tokens are redefined inside `@media` blocks at these breakpoints. Most of the time you don't need to write your own media queries — the tokens do it for you. Only write a custom media query when layout (grid columns, element positions) needs to change beyond what the tokens cover.

## Animation tokens

```
--ease-out          cubic-bezier(.2, .7, .2, 1)
--duration-fast     0.2s
--duration-normal   0.7s
--duration-slow     1.4s
```

Use `--duration-fast` for hover/focus transitions, `--duration-normal` for content entrance, `--duration-slow` for ambient fade-ins.

### Built-in animation utilities

- `.anim-1` through `.anim-6`: staggered "rise" (translateY 30px, fade in) on `.slide.active` children. Apply to elements inside an active slide to make them enter in order.
- `.fade-in`: a slow ambient fade on `.slide.active` children. Use for background words.
- `.fade-up`: a JS-driven scroll animation used on the homepage. Elements with this class start invisible/translated; the IntersectionObserver in `index.html` adds `.visible` when they enter the viewport.

## Layout primitives

- **`.grain`** — fixed full-screen SVG noise overlay at 0.15 opacity, multiply-blended. Place once near the top of `<body>` for atmospheric texture. Already in homepage and slide deck.
- **`.container`** — `max-width: 1100px`, centered, with horizontal padding from `--space-lg`.
- **`.section-padding`** — vertical padding of `--space-2xl` for major page sections.
- **`.corner-mark`** — small uppercase mono label, anchored to a corner of a positioned ancestor with `.tl` / `.br` modifiers. Used on slide pages and the hero.
- **`.bg-word`** — huge italic display word, opacity 0.04, centered behind content. Decorative only — don't put readable info there.

## Themes (slide / section backgrounds)

- **`.theme-dark`** — `--ink` background, `--parchment` text. For hero and reflection slides.
- **`.theme-opener`** — gradient from `--parchment` to `--parchment-deep`. For chapter / act openers.
- **`.theme-deep`** — solid `--parchment-deep`. For synthesis / break sections.

## Components

### Cards (`.study-card`)

Used in homepage grids. Light parchment background, top border in gold gradient, subtle hover lift. Two states: live (`<a>` with href) and `.coming-soon` (greyed, with a corner pill saying "Coming Soon"). The card has three child elements: `.study-meta` (mono uppercase, gold), `<h3>` (title), `.study-description`, `.study-cta` (mono uppercase, crimson).

The `.coming-soon::after` pseudo creates the "Coming Soon" pill. Don't write your own.

### Series page (`/series/*.html`) — long-form

Three sections stacked: `.series-hero` (gradient ink→crimson, tall), `.series-overview` (parchment, centered text + key verse box), `.sermons-section` (parchment-deep, grid of `.sermon-card`s).

Each `.sermon-card` shows: number watermark (top-right, italic display), passage (mono uppercase, gold), title, description, CTA arrow. Cards are `<a>` tags — the whole card is clickable.

### Sermon page (`/sermons/*.html`) — slide deck

Each sermon is a full-screen slide deck. A `.deck` container holds `.slide` sections; `slides.js` manages the `.active` class on one slide at a time, plus dot navigation (`.progress-dots`), counter (`.nav .counter`), and prev/next buttons (`.nav button`). Keyboard, swipe, and `#N` deep-linking come for free.

A fixed `.back-link` (top-left, pill-shaped) returns the reader to the parent series page.

Slide types (used as additional classes on `.slide`):

- **`.slide-title`** — full dark cover with huge italic title, gold-light emphasis on the second line, tagline at the bottom.
- **`.slide-opener`** — light gradient with a giant Roman numeral, eyebrow, heading, and intro paragraph framed by a gold left border. Used for act / chapter breaks.
- **Story slides** (no extra class) — light parchment with `.story-grid`: character / verse-ref / heading on the left, three `.beat`s on the right. Each beat has a step glyph, mono `<h4>` label, and a body paragraph.
- **`.slide-reflect`** — dark with a giant background quote mark and italic display heading. The `.emphasis` span inside the heading carries the punch. Two `.questions` paragraphs frame the reflection.
- **`.slide-truths`** — dark with a 2-column grid of numbered `.truth-item`s. Each item uses a `data-num` attribute to render the italic numeral.
- **`.slide-consequence`** — synthesis slide with the rotated label and consequence-text columns. (Used in the legacy archived study.)
- **`.slide-closing`** — final dark slide, centered, with ornament, optional `.prayer` block (italic, gold left border), and signature.

The slide-type styles currently live **inside each page's `<style>` block** rather than in `base.css`. When you create a new sermon, copy the entire style block from `sermons/moses-1-the-call.html` and adjust only the slide content (the HTML), not the styles.

## Visual signature checklist

For any page that should feel "on brand," these are the cheap moves that establish the look:

- [ ] `.grain` overlay near the top of `<body>`
- [ ] At least one `.eyebrow` above a major heading
- [ ] `.corner-mark` labels on hero / slide sections
- [ ] Display font for headings, monospace for metadata
- [ ] Parchment as the dominant background; ink for typography
- [ ] Gold gradient top border on any card-like surface
- [ ] No box shadows except the subtle one on cards (`var(--shadow)`)

If a page has none of these, it'll feel like a different site.

## What not to invent

- **Don't add new color tokens** without a real reason. The palette is small on purpose.
- **Don't use sans-serif** for body or display. The serifs are load-bearing for the look.
- **Don't add gradients** beyond the existing ones (parchment→parchment-deep, ink→crimson, sea→ink). Flat fills are the default.
- **Don't add icons** (SVG, emoji, Font Awesome). The design relies on typography and ornament. Use `§`, `·`, `—`, `→` as decorative glyphs.
- **Don't add box shadows** beyond `var(--shadow)`. Lift comes from `translateY(-4px)` on hover, not from heavy shadows.
- **Don't add rounded corners > 12px.** Cards use 8–12px. Pill UI uses `100px` (full pill) — that's fine.
