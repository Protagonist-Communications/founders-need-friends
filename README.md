# Founders Need Friends

Landing page for the Founders Need Friends networking event — a 10-person cold plunge / sauna morning hosted by Protagonist Communications and two Salt Lake City law firms.

**Event:** Friday, May 29, 2026 · 6:30 AM
**Venue:** PLUNJ Herriman — 5139 Miller Crossing Dr, Unit C, Herriman, UT 84096

---

## What's in this repo

```
founders-need-friends/
├── app/
│   ├── layout.tsx        # Root layout (apply brand fonts here)
│   ├── page.tsx          # The landing page (structure + copy, styling TODO)
│   └── globals.css       # Empty — fill with Protagonist tokens
├── docs/
│   └── founders-need-friends-landing.md  # Full design + copy spec
├── public/               # Static assets (logos, og image, etc.)
├── package.json
├── next.config.js
├── tsconfig.json
└── .gitignore
```

## What's done

- Project scaffold (Next.js 15, TypeScript, App Router)
- Final copy locked in `app/page.tsx`
- Semantic structure with `data-component` hooks for styling
- Design + copy spec in `docs/founders-need-friends-landing.md`

## What's TODO before launch

1. **Styling** — Pull from `PROTAGONIST_AI_DESIGN_SYSTEM.md` and apply brand tokens. Target the `[data-component="..."]` selectors in `page.tsx`.
2. **Form endpoint** — Sign up at [formspree.io](https://formspree.io), replace `YOUR_FORM_ID` in `app/page.tsx`. See the inline TODO comment in that file.
3. **Footer co-branding** — Replace "and friends" with the two law firm names once confirmed.
4. **Host count check** — Spec assumes 7 public seats; verify this matches the actual host count (3 Protagonist + how many partners per firm?).
5. **OG image** — Drop a 1200x630 social share image at `public/og.png` and reference it in `app/layout.tsx` metadata.

## Local development

```bash
npm install
npm run dev
```

Opens at [localhost:3000](http://localhost:3000).

## Deploy to Vercel

The fastest path:

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the GitHub repo.
3. Vercel auto-detects Next.js — accept defaults, hit Deploy.
4. Add a custom domain in Vercel dashboard if needed (e.g. `foundersneedfriends.com` or a subdomain off Protagonist).

Or, from this directory:

```bash
npx vercel
```

Follow the prompts. First deploy creates the project; subsequent `vercel --prod` deploys promote to production.

## Form capture

Currently scaffolded for **Formspree**. See the inline TODO comment in `app/page.tsx` for setup. Free tier covers 50 submissions/month — far more than this event needs.

If Founders Need Friends becomes recurring, consider migrating to Tally with a Google Sheets sync for a running attendee list across events.
