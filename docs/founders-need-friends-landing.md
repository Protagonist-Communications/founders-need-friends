# Founders Need Friends — Landing Page Spec

A single-page marketing site for a small networking event hosted by Protagonist Communications and two Salt Lake City law firms. The page should feel intimate and editorial — not a typical event Eventbrite page. Use the Protagonist brand system (PROTAGONIST_AI_DESIGN_SYSTEM.md) for tokens, type, color, spacing.

## Page intent

Convert founders into RSVPs for a 10-person cold plunge / sauna morning. The audience is Salt Lake City founders who already know what burnout is and are skeptical of "networking events." Tone should be candid, dry, slightly self-aware. Premium-flat aesthetic, no stock event-page tropes (no countdown timers, no glowing CTAs, no "Don't miss out!" copy).

## Event facts

- **Name:** Founders Need Friends
- **Date:** Friday, May 29, 2026
- **Time:** 6:30 AM
- **Venue:** PLUNJ Herriman
- **Address:** 5139 Miller Crossing Dr, Unit C, Herriman, UT 84096
- **Capacity:** 10 total, 7 public seats (3 hosts from Protagonist + 2 partners from each of the two law firms = 7 hosts; double-check this against the actual host count before launch)
- **Hosts:** Protagonist Communications + two Salt Lake City law firms (TBD — placeholder until firm names confirmed)

## Layout structure

Single column, max-width ~600px, centered, generous vertical breathing room.

### 1. Eyebrow tag (top)

Small pill, uppercase, letter-spaced. Flame or fire icon.

> Limited to 10 attendees

### 2. H1

Editorial serif, large (~42px on desktop), tight line-height, period at the end.

> Founders Need Friends.

### 3. H2

Sans-serif, regular weight, secondary text color, ~20px. Acts as the marketing subhead — covers what, where, when in one breath.

> A cold plunge, a hot sauna, and seven other founders who get it. Friday morning at PLUNJ Herriman, before the day starts.

### 4. Meta strip

Horizontal grid of 4 fact blocks separated by hairline rules top and bottom. Each block: tiny uppercase label + value.

| Date | Time | Where | Seats |
|---|---|---|---|
| Friday, May 29 | 6:30 AM | PLUNJ Herriman | 7 open |

### 5. Body copy (3 paragraphs)

Standard prose, 16px, generous line-height (~1.7). No headings between paragraphs.

> Building a company is a strange kind of lonely. Your team can't be your therapist. Your spouse didn't sign up to hear about runway. And LinkedIn is not a friend.
>
> So we're trying something different. Three founders from Protagonist Communications, plus partners from two Salt Lake law firms, are hosting a small, ice-cold morning for the kind of conversations that don't happen over coffee meetings.
>
> Hot sauna. Cold plunge. No pitches, no agenda, no name tags. Just ten people, sweating and shivering and figuring out how to actually be friends with the few other humans who understand what this is like.

### 6. Location card

Subtle filled card (secondary background), pin icon, two lines:

- **PLUNJ Herriman**
- 5139 Miller Crossing Dr, Unit C
- Herriman, UT 84096

Optionally wrap the address in a link to Google Maps: `https://www.google.com/maps/search/?api=1&query=5139+Miller+Crossing+Dr+Unit+C+Herriman+UT+84096`

### 7. RSVP form

Bordered card, white background, padded.

**H3:** RSVP

**Sub-copy:** First seven founders to register get a spot. We'll email logistics within 24 hours.

**Fields (all stacked, full-width):**

1. **Full name** — text input, required
2. **Email** — email input, required
3. **Company** — text input, required, placeholder: "What you're building"
4. **What's on your mind these days?** — textarea, optional, 3 rows, placeholder: "One sentence is fine. Helps us seat the room well."

**Submit button:** "Reserve my spot"

**Success state:** Replace button with a green confirmation block:
> Got it. Confirmation and what-to-bring details coming to your inbox.

### 8. Footer

Centered, small, tertiary text:

> Hosted by Protagonist Communications and friends.

(Replace "and friends" with co-branded firm names once confirmed.)

## Design notes

- Use Protagonist brand tokens — do not invent colors
- Editorial serif for H1 only; everything else sans
- Hairline borders only (0.5px), no shadows, no gradients
- Sentence case throughout
- The body copy is intentionally candid; do not soften it
- Mobile: stack the meta strip 2x2 instead of 1x4

## Form capture — recommended approach

For something this small (one event, ~7 submissions, no ongoing pipeline) you have three good options. Ranked by how well they fit your stack:

### Option 1: Formspree (recommended for this)

- Sign up at formspree.io, get a unique endpoint URL
- Set the form's `action` attribute to that URL, method `POST`
- Submissions arrive in your email + a Formspree dashboard
- Free tier covers 50 submissions/month — more than enough
- Five minutes to set up, zero backend code, no database
- Built-in spam filter and confirmation emails

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- inputs here -->
</form>
```

### Option 2: Tally or Typeform embed

- If you want the form to live in their dashboard rather than your inbox
- Tally has a free tier with no submission cap; Typeform's free tier is limited
- Slightly heavier UX (iframe embed) but gives you a built-in CRM-ish view

### Option 3: Direct to Google Sheets via Apps Script

- If you want submissions to land in a spreadsheet you can sort/filter
- Slightly more setup (Apps Script web app endpoint) but free forever
- Good if you plan to run more of these events and want a running attendee list

**My pick:** Formspree. It's the lowest-friction option for a one-off event with a hard cap of 7 submissions. You'll get an email per RSVP, can manually confirm seats, and you don't need to log into another dashboard. If Founders Need Friends becomes a recurring thing, graduate to Tally or a sheets-backed setup.

## Open items before launch

- Confirm law firm names for footer co-branding
- Confirm exact host count (the spec assumes 3 from Protagonist + partners from each firm)
- Decide whether to include "what to bring" on the public page or only in the confirmation email (currently: confirmation email)
- Add Formspree endpoint to the form action
