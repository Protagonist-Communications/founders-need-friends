import "server-only";
import { revalidateTag } from "next/cache";

export const SEATS_TAG = "rsvp-seats";

export type Seats = {
  totalSeats: number;
  taken: number;
  open: number;
  isFull: boolean;
};

const TOTAL_SEATS = Number.parseInt(process.env.RSVP_TOTAL_SEATS ?? "7", 10);

export async function getSeats(): Promise<Seats> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const apiKey = process.env.RESEND_API_KEY;

  const fallback: Seats = {
    totalSeats: TOTAL_SEATS,
    taken: 0,
    open: TOTAL_SEATS,
    isFull: false,
  };

  if (!audienceId || !apiKey) {
    console.warn("getSeats: missing RESEND_AUDIENCE_ID or RESEND_API_KEY");
    return fallback;
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { tags: [SEATS_TAG], revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("getSeats: Resend returned", res.status, await res.text());
      return fallback;
    }

    const body = (await res.json()) as { data?: unknown[] };
    const taken = Array.isArray(body?.data) ? body.data.length : 0;
    const open = Math.max(0, TOTAL_SEATS - taken);
    return {
      totalSeats: TOTAL_SEATS,
      taken,
      open,
      isFull: open === 0,
    };
  } catch (err) {
    console.error("getSeats: fetch failed", err);
    return fallback;
  }
}

export function revalidateSeats() {
  revalidateTag(SEATS_TAG);
}
