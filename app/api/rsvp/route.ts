import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { getSeats, revalidateSeats } from "@/app/lib/seats";

let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
const FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";
const REPLY_TO = process.env.RESEND_REPLY_TO;
const NOTIFY_TO = process.env.RSVP_NOTIFY_TO;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=5139+Miller+Crossing+Dr+Unit+C+Herriman+UT+84096";

const LOGO_CID = "fnf-wordmark";
let logoBufferCache: Buffer | null = null;
function getLogoBuffer(): Buffer {
  if (!logoBufferCache) {
    logoBufferCache = readFileSync(
      path.join(process.cwd(), "public", "logos", "founders-need-friends-wordmark.png")
    );
  }
  return logoBufferCache;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { firstname, lastname, email, website } = body ?? {};

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const f = typeof firstname === "string" ? firstname.trim().slice(0, 80) : "";
  const l = typeof lastname === "string" ? lastname.trim().slice(0, 80) : "";
  const e = typeof email === "string" ? email.trim().slice(0, 200) : "";

  if (!f || !l || !e) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !NOTIFY_TO) {
    console.error("RSVP route misconfigured: missing RESEND_API_KEY or RSVP_NOTIFY_TO");
    return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
  }

  const seats = await getSeats();
  if (seats.isFull) {
    return NextResponse.json(
      { error: "We're full. Email colds@protagonistcomms.co to land on the waitlist." },
      { status: 409 }
    );
  }

  const fullName = `${f} ${l}`;
  const timestamp = new Date().toISOString();

  const [confSettled, notifSettled] = await Promise.allSettled([
    getResend().emails.send({
      from: FROM,
      to: e,
      subject: "You're in — Founders Need Friends, Friday May 29",
      html: confirmationHtml(f),
      text: confirmationText(f),
      replyTo: REPLY_TO,
      attachments: [
        {
          filename: "founders-need-friends-wordmark.png",
          content: getLogoBuffer(),
          contentType: "image/png",
          contentId: LOGO_CID,
        },
      ],
    }),
    getResend().emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `New RSVP: ${fullName}`,
      html: notificationHtml({ name: fullName, email: e, timestamp }),
      text: notificationText({ name: fullName, email: e, timestamp }),
      replyTo: e,
    }),
  ]);

  const notifError =
    notifSettled.status === "rejected" ? notifSettled.reason : notifSettled.value.error;
  const confError =
    confSettled.status === "rejected" ? confSettled.reason : confSettled.value.error;

  if (notifError) {
    console.error("RSVP notification email failed:", notifError, "(confirmation error:", confError, ")");
    return NextResponse.json(
      { error: "Could not record RSVP. Please try again, or email colds@protagonistcomms.co." },
      { status: 502 }
    );
  }

  if (confError) {
    console.warn("Confirmation email failed (notification succeeded):", confError);
  }

  if (AUDIENCE_ID) {
    try {
      const contactResult = await getResend().contacts.create({
        audienceId: AUDIENCE_ID,
        email: e,
        firstName: f,
        lastName: l,
      });
      if (contactResult.error) {
        const message = String(contactResult.error.message ?? "").toLowerCase();
        const isDuplicate =
          message.includes("already") ||
          message.includes("exists") ||
          message.includes("duplicate");
        if (!isDuplicate) {
          console.error("Failed to add contact to audience:", contactResult.error);
        }
      } else {
        revalidateSeats();
      }
    } catch (err) {
      console.error("contacts.create threw:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function confirmationText(first: string) {
  return [
    `${first},`,
    ``,
    `You're in. Seven other founders, a cold plunge, and a hot sauna. Friday morning, before the day starts.`,
    ``,
    `When:  Friday, May 29 — 6:30 AM`,
    `Where: PLUNJ Herriman`,
    `       5139 Miller Crossing Dr, Unit C`,
    `       Herriman, UT 84096`,
    `Map:   ${MAP_URL}`,
    ``,
    `If you need to cancel, let us know 24 hours before the event.`,
    ``,
    `Reply to this email with anything.`,
    ``,
    `— Colds`,
    `Protagonist`,
  ].join("\n");
}

function confirmationHtml(first: string) {
  const safeFirst = escapeHtml(first);
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>You're in — Founders Need Friends</title></head>
<body style="margin:0;padding:0;background:#f7f5f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e1020;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f5f3;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6dfd8;max-width:560px;">
        <tr><td style="background:#1e1020;padding:36px 40px 32px;text-align:center;">
          <img src="cid:${LOGO_CID}" alt="Founders Need Friends" width="320" style="display:block;width:320px;max-width:100%;height:auto;border:0;outline:none;margin:0 auto;">
        </td></tr>
        <tr><td style="height:4px;background:#c4593b;line-height:4px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:40px 40px 0;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c4593b;">You're in</p>
          <h1 style="margin:12px 0 24px;font-size:26px;line-height:1.25;font-weight:600;color:#1e1020;">${safeFirst}, you're on the list.</h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#1e1020;">Seven other founders, a cold plunge, and a hot sauna. Friday morning, before the day starts.</p>
        </td></tr>
        <tr><td style="padding:0 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbf7f4;border:1px solid #e6dfd8;border-radius:6px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c4593b;">When</p>
              <p style="margin:0 0 16px;font-size:16px;color:#1e1020;">Friday, May 29 &mdash; 6:30 AM</p>
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c4593b;">Where</p>
              <p style="margin:0;font-size:16px;color:#1e1020;line-height:1.5;">PLUNJ Herriman<br><a href="${MAP_URL}" style="color:#c4593b;text-decoration:underline;">5139 Miller Crossing Dr, Unit C<br>Herriman, UT 84096</a></p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 40px 24px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a2a3a;">If you need to cancel, let us know 24 hours before the event.</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#3a2a3a;">Reply to this email with anything.</p>
        </td></tr>
        <tr><td style="padding:24px 40px 40px;border-top:1px solid #e6dfd8;">
          <p style="margin:0;font-size:13px;color:#6b6066;line-height:1.5;">&mdash; Colds<br>Protagonist</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function notificationText({
  name,
  email,
  timestamp,
}: {
  name: string;
  email: string;
  timestamp: string;
}) {
  return `${name}\n${email}\n\n— RSVPed ${timestamp}`;
}

function notificationHtml({
  name,
  email,
  timestamp,
}: {
  name: string;
  email: string;
  timestamp: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTimestamp = escapeHtml(timestamp);
  return `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e1020;padding:24px;">
<p style="margin:0 0 8px;font-size:18px;"><strong>${safeName}</strong></p>
<p style="margin:0 0 16px;"><a href="mailto:${safeEmail}" style="color:#c4593b;">${safeEmail}</a></p>
<p style="margin:0;color:#6b6066;font-size:13px;">— RSVPed ${safeTimestamp}</p>
</body></html>`;
}
