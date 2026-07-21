"use client";

import { useState } from "react";
import { OPGAVETYPER } from "@/lib/kontakt-skema";

// Web3Forms access key (offentlig form-nøgle — trygt at ligge i klienten).
// Kan overstyres med NEXT_PUBLIC_WEB3FORMS_KEY.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "ffd8ba99-a00c-4535-9932-b7fc191a3c79";

const inputKlasse =
  "w-full rounded-xl border border-linje bg-ink px-4 py-3 text-krom placeholder:text-staal focus:border-staal-lys";

type Status = "idle" | "sender" | "ok" | "fejl";

export function KontaktFormular() {
  const [status, setStatus] = useState<Status>("idle");
  const [fejlBesked, setFejlBesked] = useState("");

  async function haandterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — udfyldt = robot. Lad som om alt er ok.
    if (fd.get("website")) {
      setStatus("ok");
      return;
    }

    setStatus("sender");
    setFejlBesked("");

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `Ny henvendelse: ${fd.get("opgavetype")} — ${fd.get("navn")}`,
      from_name: "MT Vagt – kontaktformular",
      replyto: String(fd.get("email") || ""),
      Navn: fd.get("navn"),
      Firma: fd.get("firma") || "-",
      Telefon: fd.get("telefon"),
      "E-mail": fd.get("email"),
      Opgavetype: fd.get("opgavetype"),
      Lokation: fd.get("lokation") || "-",
      Startdato: fd.get("startdato") || "-",
      Besked: fd.get("besked"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        form.reset();
        setStatus("ok");
      } else {
        setStatus("fejl");
        setFejlBesked(
          data?.message ? String(data.message) : `Fejl (${res.status})`
        );
      }
    } catch {
      setStatus("fejl");
      setFejlBesked("Netværksfejl — prøv igen, eller ring til os.");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent-dyb/60 bg-accent/10 p-8 text-center"
      >
        <div className="text-3xl" aria-hidden>
          ✓
        </div>
        <h3 className="mt-3 text-xl font-bold text-krom">
          Tak for din henvendelse
        </h3>
        <p className="mt-2 text-staal-lys">
          Vi vender tilbage hurtigst muligt. Haster det, så ring til os på +45
          3131 4428.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={haandterSubmit} className="space-y-5">
      {status === "fejl" && (
        <p className="rounded-xl border border-accent-dyb/60 bg-accent/10 px-4 py-3 text-sm text-accent-klar">
          Der opstod en fejl. Ring venligst til os på +45 3131 4428 eller skriv
          til info@mtvagt.dk.
          {fejlBesked ? ` [${fejlBesked}]` : ""}
        </p>
      )}

      {/* Honeypot — skjult for mennesker */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="navn" className="mb-1.5 block text-sm text-staal-lys">
            Navn *
          </label>
          <input id="navn" name="navn" required className={inputKlasse} />
        </div>
        <div>
          <label htmlFor="firma" className="mb-1.5 block text-sm text-staal-lys">
            Firma
          </label>
          <input id="firma" name="firma" className={inputKlasse} />
        </div>
        <div>
          <label htmlFor="telefon" className="mb-1.5 block text-sm text-staal-lys">
            Telefon *
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            className={inputKlasse}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-staal-lys">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputKlasse}
          />
        </div>
        <div>
          <label
            htmlFor="opgavetype"
            className="mb-1.5 block text-sm text-staal-lys"
          >
            Opgavetype *
          </label>
          <select
            id="opgavetype"
            name="opgavetype"
            required
            defaultValue=""
            className={inputKlasse}
          >
            <option value="" disabled>
              Vælg opgavetype
            </option>
            {OPGAVETYPER.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lokation" className="mb-1.5 block text-sm text-staal-lys">
            Lokation
          </label>
          <input
            id="lokation"
            name="lokation"
            placeholder="F.eks. Fredericia"
            className={inputKlasse}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="startdato" className="mb-1.5 block text-sm text-staal-lys">
            Ønsket startdato
          </label>
          <input
            id="startdato"
            name="startdato"
            type="text"
            placeholder="F.eks. hurtigst muligt eller en dato"
            className={inputKlasse}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="besked" className="mb-1.5 block text-sm text-staal-lys">
            Besked *
          </label>
          <textarea
            id="besked"
            name="besked"
            rows={5}
            required
            className={inputKlasse}
            placeholder="Fortæl kort om opgaven — hvad, hvor og hvornår."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sender"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-klar disabled:opacity-60"
        >
          {status === "sender" ? "Sender…" : "Send henvendelse"}
        </button>
        <p className="text-xs text-staal">
          Ved at sende accepterer du vores{" "}
          <a href="/privatlivs-politik" className="underline hover:text-krom">
            privatlivspolitik
          </a>
          .
        </p>
      </div>
    </form>
  );
}
