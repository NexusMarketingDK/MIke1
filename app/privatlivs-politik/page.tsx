import type { Metadata } from "next";
import { virksomhed } from "@/content/virksomhed";
import { Broedkrumme } from "@/components/Broedkrumme";
import { EmailLink } from "@/components/EmailLink";

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description:
    "Læs MT Vagts privatlivspolitik: hvordan vi behandler og beskytter dine personoplysninger, når du kontakter os eller bruger mtvagt.dk.",
  alternates: { canonical: "/privatlivs-politik" },
  robots: { index: true, follow: true },
};

export default function PrivatlivSide() {
  return (
    <article className="bg-ink pt-28">
      <div className="mx-auto max-w-3xl px-5 pb-24 lg:px-8">
        <Broedkrumme
          dele={[
            { navn: "Forside", sti: "/" },
            { navn: "Privatlivspolitik", sti: "/privatlivs-politik" },
          ]}
        />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-krom sm:text-5xl">
          Privatlivspolitik
        </h1>
        <p className="mt-4 text-staal-lys">
          Denne politik beskriver, hvordan {virksomhed.navn} behandler dine
          personoplysninger, når du kontakter os eller bruger vores hjemmeside.
        </p>

        <div className="mt-10 space-y-8 text-staal-lys">
          <section>
            <h2 className="text-xl font-bold text-krom">Dataansvarlig</h2>
            <p className="mt-3">
              {virksomhed.navn}
              <br />
              {virksomhed.adresse.gade}, {virksomhed.adresse.postnr}{" "}
              {virksomhed.adresse.by}
              <br />
              CVR: {virksomhed.cvr}
              <br />
              Telefon: {virksomhed.telefon.visning}
              <br />
              E-mail: <EmailLink className="text-krom hover:text-accent" />
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">
              Hvilke oplysninger vi indsamler
            </h2>
            <p className="mt-3">
              Når du udfylder vores kontaktformular, indsamler vi de oplysninger,
              du selv opgiver: navn, eventuelt firma, telefonnummer, e-mailadresse,
              opgavetype, lokation, ønsket startdato og din besked. Vi indsamler kun
              de oplysninger, der er nødvendige for at kunne besvare din henvendelse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">
              Formål og retsgrundlag
            </h2>
            <p className="mt-3">
              Vi behandler dine oplysninger for at kunne besvare din henvendelse og
              give dig et tilbud på vores ydelser. Behandlingen sker på baggrund af
              vores legitime interesse i at kommunikere med potentielle og
              eksisterende kunder samt for at kunne indgå og opfylde en aftale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">Opbevaring</h2>
            <p className="mt-3">
              Vi opbevarer kun dine oplysninger, så længe det er nødvendigt for at
              opfylde formålet, eller så længe vi er forpligtet til det i henhold til
              gældende lovgivning. Herefter slettes eller anonymiseres oplysningerne.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">Videregivelse</h2>
            <p className="mt-3">
              Vi videregiver ikke dine personoplysninger til tredjeparter til
              markedsføring. Oplysninger kan blive behandlet af vores databehandlere,
              for eksempel udbydere af e-mail- og hostingtjenester, der handler efter
              vores instruks og er underlagt fortrolighed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">Cookies</h2>
            <p className="mt-3">
              Hjemmesiden anvender kun de cookies og teknologier, der er nødvendige
              for, at siden fungerer. Bruger vi kort eller indlejret indhold fra
              tredjepart (for eksempel et kort på kontaktsiden), kan disse sætte egne
              cookies efter deres egne vilkår.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">Dine rettigheder</h2>
            <p className="mt-3">
              Du har efter databeskyttelsesforordningen ret til at få indsigt i,
              berigtiget eller slettet dine oplysninger samt til at gøre indsigelse
              mod eller begrænse behandlingen. Kontakt os, hvis du vil gøre brug af
              dine rettigheder. Du har også ret til at klage til Datatilsynet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-krom">Ændringer</h2>
            <p className="mt-3">
              Vi kan opdatere denne privatlivspolitik. Den til enhver tid gældende
              version findes på denne side.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
