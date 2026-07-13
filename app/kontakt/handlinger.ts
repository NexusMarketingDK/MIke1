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

  // Send kun mail hvis Resend er konfigureret; ellers accepter pænt.
  const apiNoegle = process.env.RESEND_API_KEY;
  if (apiNoegle) {
    try {
      const resend = new Resend(apiNoegle);
      const modtager = process.env.KONTAKT_MODTAGER || byggEmail();
      await resend.emails.send({
        from: process.env.KONTAKT_AFSENDER || "MT Vagt <kontakt@mtvagt.dk>",
        to: modtager,
        replyTo: d.email,
        subject: `Ny henvendelse: ${d.opgavetype} — ${d.navn}`,
        text: [
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
        ].join("\n"),
      });
    } catch {
      return {
        ok: false,
        besked: `Der opstod en fejl. Ring venligst til os på ${virksomhed.telefon.visning}.`,
      };
    }
  }

  return {
    ok: true,
    besked:
      "Tak for din henvendelse! Vi vender tilbage hurtigst muligt. Haster det, så ring til os.",
  };
}
