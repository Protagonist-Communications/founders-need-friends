# Claude Code Context — Founders Need Friends

## What this is

A Next.js landing page for a one-time networking event. Single page, no routing, no CMS. The structure and copy are final; the styling is the open work.

## Where to find what you need

- **Design source of truth:** Figma file `QNPN9eNhe0CiedgBrTUdnB` ("Month 11 Design — PRO"). Reference frames: `853:1933` (cocktail menu), `900:1985` (1:1 social), `714:2170` (16:9 LinkedIn banner). Pull these via the Figma MCP when working on visuals.
- **Copy spec (still useful for prose, not visuals):** `docs/founders-need-friends-landing.md`
- **Page structure:** `app/page.tsx` — already has semantic `[data-component]` hooks
- **Empty stylesheet:** `app/globals.css` — fill this in

## Design intent (from Figma — don't drift)

The aesthetic is a moody, warm, speakeasy/cocktail-bar feel. Dark and saturated, not editorial or flat. Treat the Figma frames above as the source of truth; the bullets below summarize the system.

### Color tokens

- `--bg`: `#1e1020` (deep aubergine, near-black with purple cast)
- `--panel`: `#6b2815` (dark rust panel for cards / meta strip / footer)
- `--accent-rust`: `#c4593b` (also seen as `#c4593a` — treat as one token; used for eyebrow text/border, top stripe, label color)
- `--accent-bright`: `#ea5d1c` (brighter orange — bottom stripe accent only)
- `--text-primary`: `#ffffff`
- `--text-secondary`: `rgba(196, 188, 180, 0.75)` (warm off-white, used for the italic subhead and ingredient lines)
- `--label-accent`: `rgba(196, 89, 58, 0.9)` (rust used for tracked-out section labels like LOCATION / DATE / TIME)
- `--divider-light`: `rgba(196, 188, 180, 0.25–0.4)` (in-panel hairlines)
- `--divider-vertical`: `rgba(255, 255, 255, 0.4–0.5)` (vertical separators in the meta strip)
- Eyebrow badge: bg `rgba(196, 89, 59, 0.15)` + 1px border `rgba(196, 89, 59, 0.4)`

### Typography

- **H1 — `Founders Need Friends`:** Lobster (script/cursive), ~148px desktop, line-height 132px. Rendered with a stacked multi-layer offset shadow in `#6b2815` (~10 layers, each offset ~2.4px right / 1.8px down, alternating 0.9 and 0.65 opacity in the latter half) to produce a chunky retro letterpress shadow. The white top layer sits on top of the stack.
- **Subhead — `(and lawyers)` / `(all non-alcoholic)`:** Cormorant Garamond Medium Italic, large (~38–54px), color `--text-secondary`, parenthesized aside.
- **Everything else:** Space Grotesk
  - Eyebrow / section labels: Space Grotesk Bold, 10–12px, UPPERCASE, letter-spacing 3–4px
  - Meta-strip values, drink names, RSVP heading: Space Grotesk Medium, 30–40px, white
  - Body / ingredient lines / form labels: Space Grotesk Regular, 12–13px, `--text-secondary` for muted lines

### Decorative elements

- **Top stripe:** 4px solid `--accent-rust`, full-bleed across the top of the page
- **Bottom stripe:** 3px solid `--accent-bright`, full-bleed across the bottom
- **Background pattern:** subtle crosshatch / diamond grid overlay on top of `--bg`. Asset lives in Figma as "BG Crosshatch Pattern" — export and drop into `public/`
- **Panels:** filled with `--panel`, border-radius 7px, internal padding ~25–30px, in-panel dividers use `--divider-light`
- **Eyebrow badge:** small rectangle, 2px radius, 1px border in `--accent-rust` at 0.4 alpha, tinted fill at 0.15 alpha, padding 7px / 16px, text in `--accent-rust` with 4px tracking

### Hard rules

- The H1 is Lobster with a layered shadow — do **not** swap it for an editorial serif and do **not** flatten the shadow
- Section labels (LOCATION, DATE, TIME, PRESENTED BY, eyebrow) are UPPERCASE with heavy letter-spacing — do **not** convert these to sentence case. Body prose and headings outside of labels can stay sentence case.
- Use the dark theme — never render this on a light background
- The body copy is intentionally candid; do not soften it
- Generous vertical whitespace between sections
- Mobile: the meta strip should stack vertically (or 2×2) rather than squeezing the 3-up row

## Before shipping

- Wire form to Formspree (see TODO comment in `app/page.tsx`)
- Confirm the event facts on the page match what's running. The Figma frames describe a "non-alcoholic cocktail night" at 222 S Main St SLC, April 10, 5:30 PM MST, presented by Holland & Hart + Protagonist — but `app/page.tsx` and `docs/founders-need-friends-landing.md` describe a cold-plunge/sauna morning at PLUNJ Herriman on May 29, 6:30 AM. Reconcile before launch.
- Replace footer "and friends" with confirmed co-host (Figma shows Holland & Hart)
- Export the crosshatch background pattern from Figma to `public/`
- Add OG image at `public/og.png` (the 1:1 social frame `900:1985` is a strong starting point)
