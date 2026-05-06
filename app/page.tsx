// Founders Need Friends — landing page
//
// This is a SCAFFOLD. The structure, copy, and content are final.
// What's intentionally left undone:
//   1. Styling — pull from PROTAGONIST_AI_DESIGN_SYSTEM.md and apply real brand tokens.
//      This file uses inline placeholder styles that should be replaced by
//      either CSS modules, Tailwind, or styled components per Protagonist conventions.
//   2. Form submission — wire up to Formspree (see /* TODO: form */ block below).
//
// See /docs/founders-need-friends-landing.md for the full spec, design intent,
// and form-capture recommendations.

export const metadata = {
  title: "Founders Need Friends — May 29 at PLUNJ Herriman",
  description:
    "A cold plunge, a hot sauna, and seven other founders who get it. Friday morning at PLUNJ Herriman, before the day starts.",
};

export default function Page() {
  return (
    <main>
      {/* Eyebrow tag */}
      <div data-component="eyebrow">Limited to 10 attendees</div>

      {/* H1 */}
      <h1>Founders Need Friends.</h1>

      {/* H2 — marketing subhead */}
      <h2>
        A cold plunge, a hot sauna, and seven other founders who get it. Friday
        morning at PLUNJ Herriman, before the day starts.
      </h2>

      {/* Meta strip */}
      <section data-component="meta-strip" aria-label="Event details">
        <div>
          <span data-label>Date</span>
          <span data-value>Friday, May 29</span>
        </div>
        <div>
          <span data-label>Time</span>
          <span data-value>6:30 AM</span>
        </div>
        <div>
          <span data-label>Where</span>
          <span data-value>PLUNJ Herriman</span>
        </div>
        <div>
          <span data-label>Seats</span>
          <span data-value>7 open</span>
        </div>
      </section>

      {/* Location card */}
      <aside data-component="location-card">
        <strong>PLUNJ Herriman</strong>
        <a
          href="https://www.google.com/maps/search/?api=1&query=5139+Miller+Crossing+Dr+Unit+C+Herriman+UT+84096"
          target="_blank"
          rel="noopener noreferrer"
        >
          5139 Miller Crossing Dr, Unit C
          <br />
          Herriman, UT 84096
        </a>
      </aside>

      {/*
        TODO: form
        --------------------------------------------------------------------
        Wire this form up to Formspree before launch.

        1. Go to https://formspree.io and create a new form.
        2. Replace YOUR_FORM_ID below with your actual Formspree endpoint.
        3. Test a submission and confirm it lands in your inbox.
        4. Optionally enable Formspree's spam filter and auto-reply.

        For a slightly nicer UX, swap the bare <form action> for a fetch()
        handler that prevents default, submits to Formspree's JSON endpoint,
        and toggles a success state without a page reload. Keep the bare
        action as a no-JS fallback.
      */}
      <section data-component="rsvp-form">
        <h3>RSVP</h3>
        <p data-subcopy>
          First seven founders to register get a spot. We&apos;ll email logistics
          within 24 hours.
        </p>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          aria-label="RSVP form"
        >
          <div data-field>
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Founder"
              required
            />
          </div>

          <div data-field>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jane@company.com"
              required
            />
          </div>

          <div data-field>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="What you're building"
              required
            />
          </div>

          <div data-field>
            <label htmlFor="why">
              What&apos;s on your mind these days? <span data-optional>(optional)</span>
            </label>
            <textarea
              id="why"
              name="why"
              rows={3}
              placeholder="One sentence is fine. Helps us seat the room well."
            />
          </div>

          <button type="submit">Reserve my spot</button>
        </form>
      </section>

      {/* Footer */}
      <footer data-component="footer">
        <span data-label>Hosted by</span>
        <span data-divider aria-hidden="true" />
        <img
          src="/logos/protagonist.svg"
          alt="Protagonist"
          data-logo="protagonist"
        />
        <span data-divider aria-hidden="true" />
        <img
          src="/logos/holland-hart.svg"
          alt="Holland & Hart LLP"
          data-logo="holland-hart"
        />
        <span data-divider aria-hidden="true" />
        <img
          src="/logos/fabian-vancott.svg"
          alt="Fabian VanCott"
          data-logo="fabian-vancott"
        />
      </footer>
    </main>
  );
}
