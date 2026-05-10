"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "submitting" | "success" | "error";

export default function RsvpForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("website")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const payload = {
      firstname: String(data.get("firstname") ?? ""),
      lastname: String(data.get("lastname") ?? ""),
      email: String(data.get("email") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      setStatus("success");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again, or email colds@protagonistcomms.co."
      );
    }
  }

  if (status === "success") {
    return (
      <p data-success role="status">
        You&apos;re in. We&apos;ll email logistics within 24 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="RSVP form" noValidate>
      <div data-field>
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          autoComplete="given-name"
          required
        />
      </div>

      <div data-field>
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          autoComplete="family-name"
          required
        />
      </div>

      <div data-field>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />
      </div>

      <div data-honeypot aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && errorMessage && (
        <p data-error role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Reserve my spot"}
      </button>
    </form>
  );
}
