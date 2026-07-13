"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendKontakt, type FormTilstand } from "@/app/kontakt/handlinger";
import { OPGAVETYPER } from "@/lib/kontakt-skema";

const start: FormTilstand = { ok: false };

function SendKnap() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-klar disabled:opacity-60"
    >
      {pending ? "Sender…" : "Send henvendelse"}
    </button>
  );
}

function Fejl({ tekst }: { tekst?: string }) {
  if (!tekst) return null;
  return <p className="mt-1 text-sm text-accent-klar">{tekst}</p>;
}

const inputKlasse =
  "w-full rounded-xl border border-linje bg-ink px-4 py-3 text-krom placeholder:text-staal focus:border-staal-lys";

export function KontaktFormular() {
  const [tilstand, action] = useActionState(sendKontakt, start);

  if (tilstand.ok) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent-dyb/60 bg-accent/10 p-8 text-center"
      >
        <div className="text-3xl" aria-hidden>
          ✓
        </div>
        <h3 className="mt-3 text-xl font-bold text-krom">Tak for din henvendelse</h3>
        <p className="mt-2 text-staal-lys">{tilstand.besked}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {tilstand.besked && !tilstand.ok && (
        <p className="rounded-xl border border-accent-dyb/60 bg-accent/10 px-4 py-3 text-sm text-accent-klar">
          {tilstand.besked}
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
          <Fejl tekst={tilstand.fejl?.navn} />
        </div>
        <div>
          <label htmlFor="firma" className="mb-1.5 block text-sm text-staal-lys">
            Firma
          </label>
          <input id="firma" name="firma" className={inputKlasse} />
          <Fejl tekst={tilstand.fejl?.firma} />
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
          <Fejl tekst={tilstand.fejl?.telefon} />
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
          <Fejl tekst={tilstand.fejl?.email} />
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
          <Fejl tekst={tilstand.fejl?.opgavetype} />
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
          <Fejl tekst={tilstand.fejl?.lokation} />
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
          <Fejl tekst={tilstand.fejl?.startdato} />
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
          <Fejl tekst={tilstand.fejl?.besked} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SendKnap />
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
