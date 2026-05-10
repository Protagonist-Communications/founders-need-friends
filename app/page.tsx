import RsvpForm from "./RsvpForm";
import { getSeats } from "./lib/seats";

export const metadata = {
  title: "Founders Need Friends — May 29 at PLUNJ Herriman",
  description:
    "A cold plunge, a hot sauna, and seven other founders who get it. Friday morning at PLUNJ Herriman, before the day starts.",
};

export default async function Page() {
  const seats = await getSeats();
  const seatsLabel = seats.isFull ? "Full" : `${seats.open} open`;

  return (
    <main>
      {/* Eyebrow tag */}
      <div data-component="eyebrow">Limited to 7 spots</div>

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
          <span data-value>{seatsLabel}</span>
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

      <section data-component="rsvp-form">
        <h3>RSVP</h3>
        {seats.isFull ? (
          <p data-subcopy>
            We&apos;re full. If you want to land on the waitlist in case
            someone cancels, email{" "}
            <a href="mailto:colds@protagonistcomms.co">
              colds@protagonistcomms.co
            </a>
            .
          </p>
        ) : (
          <>
            <p data-subcopy>
              First seven founders to register get a spot. We&apos;ll email
              logistics within 24 hours.
            </p>
            <RsvpForm />
          </>
        )}
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
