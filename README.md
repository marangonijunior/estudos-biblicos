# Biblical Studies

A collection of online sermon series, built as immersive slide-deck presentations.

## Purpose

Each series walks through a biblical character or theme, one sermon at a time. Sermons are designed as slide decks (not articles) — keyboard, touch, and dot navigation; deep-link hashes; animated transitions — so reading feels like sitting through a presentation rather than scrolling a page.

## Structure

- **[Series](series/)** — overview pages that introduce a series and list its sermons.
- **[Sermons](sermons/)** — individual sermon slide decks.

The homepage `index.html` lists all series. Sermons are reached through their parent series page.

## Available Series

- **[Five Crossings — Moses](series/five-crossings.html)** · 5-part series
  Five thresholds Moses had to cross — bush, sea, mountain, calf, giants — and the question each one still asks of us. The first sermon ([The Call and Our Denial](sermons/moses-1-the-call.html)) is live; the rest are placeholders.

More series coming: David's Heart, Paul's Letters, Blessed Are (Sermon on the Mount), Stories That Transform (Parables), They Changed History (Women of the Bible), Raw Prayers (Psalms), Practical Wisdom (Proverbs).

## File Structure

```
/
├── index.html                 Homepage — series listing
├── CLAUDE.md                  Authoring guide for new sermons / series
├── DESIGN.md                  Design system reference
├── assets/
│   ├── css/base.css          Shared design tokens + components
│   └── js/slides.js          Slide deck navigation
├── series/                   Series overview pages
│   └── five-crossings.html
└── sermons/                  Individual sermon slide decks
    ├── moses-1-the-call.html
    ├── moses-2-red-sea.html
    ├── moses-3-the-wait.html
    ├── moses-4-golden-calf.html
    └── moses-5-giants.html
```

(There is also a `studies/` folder with a legacy slide deck. It's not linked from the homepage and is considered archived.)

## Authoring New Content

See **[CLAUDE.md](CLAUDE.md)** for the authoring guide (file naming, slide structure, how to wire a new sermon into a series).

See **[DESIGN.md](DESIGN.md)** for the design system (colors, type scale, spacing, components, slide types).

## Running Locally

No build step. Open `index.html` in any browser.

## Stack

- HTML5, CSS3 custom properties, vanilla JS (ES6+)
- Fonts: Fraunces (display), Cormorant Garamond (body), JetBrains Mono (mono)
- Mobile-first responsive — works on all screen sizes

## Deployment

GitHub Pages, Vercel, Netlify, or any static host. No build required.

---

*"All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness."* — 2 Timothy 3:16

Built by [@marangonijunior](https://github.com/marangonijunior)
