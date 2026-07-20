"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { kontaktSkema } from "@/lib/kontakt-skema";
import { byggEmail } from "@/lib/mailto";
import { virksomhed } from "@/content/virksomhed";

export type FormTilstand = {
  ok: boolean;
  besked?: string;
  fejl?: Record<string, string>;
};

// Simpel in-memory rate limit (pr. IP). Nulstilles ved genstart —
// tilstrækkeligt som første værn mod misbrug sammen med honeypot.
const kald = new Map<string, { antal: number; nulstil: number }>();
const VINDUE_MS = 60_000;
const MAKS = 5;

function rateLimit(ip: string): boolean {
  const nu = Date.now();
  const post = kald.get(ip);
  if (!post || nu > post.nulstil) {
    kald.set(ip, { antal: 1, nulstil: nu + VINDUE_MS });
    return true;
  }
  if (post.antal >= MAKS) return false;
  post.antal += 1;
  return true;
}

export async function sendKontakt(
  _forrige: FormTilstand,
  formData: FormData
): Promise<FormTilstand> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "ukendt";

  if (!rateLimit(ip)) {
    return {
      ok: false,
      besked:
        "Du har sendt for mange henvendelser. Vent et øjeblik, og prøv igen.",
    };
  }

  const raa = Object.fromEntries(formData.entries());
  const resultat = kontaktSkema.safeParse(raa);

  if (!resultat.success) {
    const fejl: Record<string, string> = {};
    for (const i of resultat.error.issues) {
      const felt = String(i.path[0] ?? "form");
      if (!fejl[felt]) fejl[felt] = i.message;
    }
    // Honeypot udfyldt → lad som om alt er ok (skjul for robotten).
    if (fejl.website) return { ok: true, besked: "Tak for din henvendelse." };
    return { ok: false, fejl, besked: "Ret venligst felterne markeret nedenfor." };
  }

  const d = resultat.data;
  const modtager = process.env.KONTAKT_MODTAGER || byggEmail();
  const emne = `Ny henvendelse: ${d.opgavetype} — ${d.navn}`;
  const tekst = [
    `Navn: ${d.navn}`,
    `Firma: ${d.firma || "-"}`,
    `Telefon: ${d.telefon}`,
    `E-mail: ${d.email}`,
    `Opgavetype: ${d.opgavetype}`,
    `Lokation: ${d.lokation || "-"}`,
    `Startdato: ${d.startdato || "-"}`,
    "",
    "Besked:",
    d.besked,
  ].join("\n");

  const felter = {
    Navn: d.navn,
    Firma: d.firma || "-",
    Telefon: d.telefon,
    "E-mail": d.email,
    Opgavetype: d.opgavetype,
    Lokation: d.lokation || "-",
    Startdato: d.startdato || "-",
    Besked: d.besked,
  };

  try {
    if (process.env.RESEND_API_KEY) {
      // Foretrukken: Resend (kræver API-nøgle + verificeret domæne).
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.KONTAKT_AFSENDER || "MT Vagt <info@mtvagt.dk>",
        to: modtager,
        replyTo: d.email,
        subject: emne,
        text: tekst,
      });
      if (error) throw new Error(`Resend: ${JSON.stringify(error)}`);
    } else if (process.env.WEB3FORMS_KEY) {
      // Robust server-side afsendelse (ingen domæneverificering nødvendig).
      const svar = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY,
          subject: emne,
          from_name: "MT Vagt – kontaktformular",
          replyto: d.email,
          ...felter,
        }),
      });
      const j = (await svar.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;
      if (!svar.ok || !j?.success) {
        throw new Error(`Web3Forms: ${svar.status} ${j?.message ?? ""}`);
      }
    } else {
      // Sidste udvej uden opsætning: FormSubmit (kan blokere server-kald).
      const svar = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(modtager)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; MTVagt/1.0)",
          },
          body: JSON.stringify({
            _subject: emne,
            _replyto: d.email,
            _captcha: "false",
            _template: "table",
            ...felter,
          }),
        }
      );
      const j = (await svar.json().catch(() => null)) as
        | { success?: string | boolean }
        | null;
      if (!svar.ok || (j && String(j.success) === "false")) {
        throw new Error(`FormSubmit svarede ${svar.status}`);
      }
    }
  } catch (e) {
    console.error("KONTAKTFORMULAR: fejl ved afsendelse:", e);
    return {
      ok: false,
      besked: `Der opstod en fejl. Ring venligst til os på ${virksomhed.telefon.visning} eller skriv til ${byggEmail()}.`,
    };
  }

  return {
    ok: true,
    besked:
      "Tak for din henvendelse! Vi vender tilbage hurtigst muligt. Haster det, så ring til os.",
  };
}
