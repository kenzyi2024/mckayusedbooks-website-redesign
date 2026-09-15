# McKay Used Books — website redesign

An interactive, responsive prototype for **McKay Used Books** (8345 Sudley Road, Manassas, VA — the used-media store, est. 1983). It reimagines the site as an **editorial, print-inspired identity** — a used bookshop set like a literary review — honest to how the store actually works (visit-and-trade; no fake online catalog), using McKay's real logo and store photography.

**Live site:** https://kenzyi2024.github.io/mckayusedbooks-website-redesign/ (deployed from `main` by GitHub Actions)

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The whole site — 7 client-side-routed destinations in one page. |
| `styles.css` | The design system + every component. |
| `app.js` | Hash routing, the mobile nav, the live "Open now" clock, and the form guard. |
| `images/` | Real logo + store photography, favicons, and the 1200×630 social-share card. |
| `.github/workflows/deploy-pages.yml` | Builds & deploys to GitHub Pages on every push to `main`. |
| `.claude/launch.json` | Local static-server config for previewing. |

Destinations: **Home · Visit · Sell & Trade · What We Sell · Events · About · FAQ**.

## Design system

An editorial identity — *not* a component-library dashboard. No cards-for-everything, no decorative icons, no rounded corners, no shadows or gradients.

- **Type** — **Libre Caslon Display** (masthead & display numerals), **EB Garamond** (headings + body), **Archivo** (small-caps labels, navigation, metadata). Hierarchy is carried by type and spacing, not boxes.
- **Color** — ink `#1D1B16` on warm paper `#F4F0E6`; McKay's recycle-**green** `#2E5A39` used sparingly as the single accent (a hairline, a numeral, a link, the "open" dot). No tinted card fills.
- **Structure** — hairline rules and a deliberate spacing scale instead of cards; an asymmetric photo-forward hero; an editorial **contents index** (not icon tiles); a **catalogue** list for finds; a numbered **sequence** for trading; ruled **rosters**, **agenda**, and **ledger** blocks; **underline-style** form fields. Square corners throughout.
- **Photography** — the real color-sorted shelves (hero), the Check-In counter (Sell & Trade), and store aisles (full-bleed bands) do the heavy lifting.
- **Single warm, light theme** — committed on purpose (no cold dark mode).

## Run it locally

No build step. From this folder:

```bash
python3 -m http.server 4599
```

Open <http://localhost:4599>. (Opening `index.html` via `file://` won't load the relative assets or Google Fonts — use a server.)

## Forms

The newsletter and the Events "Request an event" form POST to **Formspree**. They ship with a placeholder action `https://formspree.io/f/YOUR_FORM_ID`:

1. Create a (free) form at formspree.io and copy its form ID.
2. Replace `YOUR_FORM_ID` in `index.html` (two places).

Until then, `app.js` intercepts the placeholder so the demo confirms instead of erroring. (Prefer email or a Google Form? Swap the `action`/`method` — the field names are standard.)

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` enables and deploys Pages automatically on push to `main` (repo is public). The live URL is the one at the top. Because it's a project site served from a sub-path, all asset paths are relative and routing is hash-based, so it works as-is. The Open Graph / Twitter image meta already point at the absolute Pages URL.

## Verified facts baked in

- Hours: **shop 9 AM–8 PM, trade 9 AM–7 PM, daily** (the "Open now" status computes this live in `America/New_York`).
- Address: **8345 Sudley Road, Manassas, VA 20109** — the only location.
- Departments: books, movies (DVD/Blu-ray/VHS), music (CD/vinyl), video games **and consoles**, tabletop & RPG, plus puzzles, Legos, action figures, Funko Pops.
- Trade model: **blue trade** (books & VHS → buys books) and **white trade** (DVDs/CDs/audiobooks → buys anything). No online sales; Bookshop.org affiliate is for *new* books only.
- Featured Finds are **real titles read from McKay's own shelf photo**, framed as a shelf snapshot, not live stock.

## Still to confirm with the store (marked `to confirm` in the UI)

- Holiday hours; parking specifics; phone number.
- Exact trade payout rates / bin limits / whether cash is offered; the do-not-take list; large-order handling.
- Real event dates & details; real founding story & milestones.
- The Formspree form ID (or preferred form destination) for the newsletter and event requests.
- Real off-site URLs for Gift Cards (Square), Shirts (Bonfire), Bookshop.org.

## Image credits

`images/` holds McKay's own logo and store photographs (from mckayusedbooks.com), plus generated favicons and a composed share card. Replace with the store's preferred assets before a public launch.
