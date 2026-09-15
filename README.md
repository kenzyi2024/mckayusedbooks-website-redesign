# McKay Used Books — website redesign prototype

An interactive, responsive prototype for **McKay Used Books** (8345 Sudley Road, Manassas, VA — the used‑media store, est. 1983). It implements the strategy from the redesign brief as a **cozy, warm, inviting** neighborhood‑bookshop site — honest to how the store actually works (visit‑and‑trade, no fake online catalog), using McKay's real logo and store photography.

**Live prototype (artifact):** published from this code — see the link shared in the session.

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The whole prototype — 7 client‑side‑routed destinations in one page. |
| `styles.css` | The design system + every component. |
| `app.js` | Hash routing, the mobile nav, and the live "Open now" clock. |
| `images/` | McKay's real logo + store photography (from mckayusedbooks.com). |
| `.claude/launch.json` | Local static‑server config for previewing. |

The seven destinations: **Home · Visit · Sell & Trade · What We Sell · Events · About · FAQ**.

## Run it locally

No build step — any static server works. From this folder:

```bash
python3 -m http.server 4599
```

Then open <http://localhost:4599>. (Opening `index.html` via `file://` won't load the relative CSS/JS/images or Google Fonts — use a server.)

## Design system

- **Feel** — a cozy, light, professional used bookshop. The site **commits to one warm light theme** (no cold dark mode) so it always feels homey.
- **Color** — warm ivory `#FAF4E8` ground, airy `#FFFDF7` cards, warm espresso `#2C2620` text. The brand accent is **McKay's own recycle‑green** `#35663F` (straight off the logo), with a honey `#C08329` highlight and a warm clay for the rare alert. Real photography carries most of the warmth.
- **Type** — Fraunces (display), Newsreader (reading body), Mulish (friendly UI labels/nav/buttons — replaced the old monospace "card‑catalog" look, which read as too techy).
- **Imagery** — the real McKay logo (cat + recycle arrows) in the header, hero and footer; the color‑sorted‑shelves photo as the hero; the Check‑In counter on Sell & Trade; store aisles on the cozy bands.
- **Map** — the Visit page embeds a **real Google Map** to 8345 Sudley Rd, with an address + "Open in Google Maps" fallback behind it (in case a sandbox blocks the iframe).

## Verified facts baked in

- Hours: **shop 9 AM–8 PM, trade 9 AM–7 PM, daily** (the "Open now" pill computes this live in `America/New_York`).
- Address: **8345 Sudley Road, Manassas, VA 20109** — the only location.
- Departments: books, movies (DVD/Blu‑ray/VHS), music (CD/vinyl), video games **and consoles**, tabletop & RPG, plus puzzles, Legos, action figures, Funko Pops.
- Trade model: **blue trade** (from books & VHS → buys books) and **white trade** (from DVDs/CDs/audiobooks → buys anything). No online sales; Bookshop.org affiliate is for *new* books only.

## Still to confirm with the store (marked `to confirm` in the UI)

- Holiday hours exceptions (daily hours already compute live).
- Parking specifics, phone number.
- Exact trade payout rates / bin limits / whether cash is offered alongside credit; the full do‑not‑take list; large‑order handling.
- Real event dates & details (the Events cards show the *format*; copy is illustrative).
- Real founding story & milestones for About, and real Featured‑Find photos (currently clearly‑labeled samples).
- Real off‑site URLs for Gift Cards (Square), Shirts (Bonfire), Bookshop.org, and the social accounts.

## Image credits

`images/` contains McKay's own logo and store photographs, downloaded from mckayusedbooks.com for this prototype. Replace or expand them with the store's preferred assets before any public launch.

## Extending it

Dependency‑free static HTML/CSS/JS, so it drops into any host or ports into a CMS. Natural next steps: split each routed `<section>` into its own template/partial, wire the newsletter form + Featured Finds to whatever the store maintains, and (optionally) reintroduce a warm espresso dark mode by redefining the CSS tokens under `@media (prefers-color-scheme: dark)`.
