import Link from "next/link";
import { virksomhed } from "@/content/virksomhed";
import { ydelser } from "@/content/ydelser";
import { Logo } from "@/components/Logo";
import { EmailLink } from "@/components/EmailLink";
import { PopupLink } from "@/components/PopupLink";

export function Sidefod() {
  const aar = new Date().getFullYear();
  return (
    <footer className="border-t border-linje bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-staal-lys">
            {virksomhed.slogan}. Autoriseret vagtselskab med base i{" "}
            {virksomhed.base}, der dækker {virksomhed.daekningBred} — med hovedfokus
            på {virksomhed.region}.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-krom">
            Ydelser
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {ydelser.map((y) => (
              <li key={y.slug}>
                <Link
                  href={`/vi-tilbyder/${y.slug}`}
                  className="text-staal-lys transition-colors hover:text-krom"
                >
                  {y.titel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-krom">
            Selskab
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "/om-mtvagt", t: "Om MT Vagt" },
              { href: "/referencer", t: "Referencer" },
              { href: "/blog", t: "Blog" },
              { href: "/ledige-stillinger", t: "Ledige stillinger" },
              { href: "/kontakt", t: "Kontakt" },
              { href: "/privatlivs-politik", t: "Privatlivspolitik" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-staal-lys transition-colors hover:text-krom"
                >
                  {l.t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-krom">
            Kontakt
          </h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-staal-lys">
            <p>
              {virksomhed.adresse.gade}
              <br />
              {virksomhed.adresse.postnr} {virksomhed.adresse.by}
            </p>
            <p>CVR: {virksomhed.cvr}</p>
            <p>
              <a
                href={`tel:${virksomhed.telefon.kald}`}
                className="text-krom hover:text-accent"
              >
                {virksomhed.telefon.visning}
              </a>
            </p>
            <p>
              <EmailLink className="text-krom hover:text-accent" />
            </p>
          </address>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-staal">
            <PopupLink
              href={virksomhed.autorisation.isoCertifikat}
              className="rounded-full border border-linje px-3 py-1 hover:text-krom"
              ariaLabel="Åbn ISO-certifikat i nyt vindue"
            >
              ISO-certifikat
            </PopupLink>
            <PopupLink
              href={virksomhed.autorisation.vslUrl}
              className="rounded-full border border-linje px-3 py-1 hover:text-krom"
              ariaLabel="Åbn vsl.dk i nyt vindue"
            >
              Medlem af VSL
            </PopupLink>
          </div>
        </div>
      </div>

      <div className="border-t border-linje">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-staal sm:flex-row lg:px-8">
          <p>
            © {aar} {virksomhed.navn}. Alle rettigheder forbeholdes.
          </p>
          <p>Autoriseret vagtselskab · Døgnvagt · Tillid · Tryghed</p>
        </div>
      </div>
    </footer>
  );
}
