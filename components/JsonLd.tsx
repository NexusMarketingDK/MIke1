import { virksomhed } from "@/content/virksomhed";
import { SITE, absolutUrl } from "@/lib/site";

// Generisk JSON-LD-udskriver.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// LocalBusiness + SecurityService for hele sitet.
export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SecurityService", "Organization"],
    "@id": `${SITE.url}/#organisation`,
    name: virksomhed.navn,
    alternateName: virksomhed.kortNavn,
    url: SITE.url,
    telephone: virksomhed.telefon.kald,
    vatID: `DK${virksomhed.cvr}`,
    taxID: virksomhed.cvr,
    areaServed: virksomhed.daekning.map((by) => ({
      "@type": "City",
      name: by,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: virksomhed.adresse.gade,
      postalCode: virksomhed.adresse.postnr,
      addressLocality: virksomhed.adresse.by,
      addressCountry: "DK",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    slogan: virksomhed.slogan,
    memberOf: { "@type": "Organization", name: "VSL", url: virksomhed.autorisation.vslUrl },
  };
}

export function breadcrumbLd(dele: { navn: string; sti: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: dele.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.navn,
      item: absolutUrl(d.sti),
    })),
  };
}

export function faqLd(faq: { spoergsmaal: string; svar: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.spoergsmaal,
      acceptedAnswer: { "@type": "Answer", text: f.svar },
    })),
  };
}
