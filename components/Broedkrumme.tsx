import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

// Brødkrummesti med tilhørende BreadcrumbList JSON-LD.
export function Broedkrumme({
  dele,
}: {
  dele: { navn: string; sti: string }[];
}) {
  return (
    <>
      <JsonLd data={breadcrumbLd(dele)} />
      <nav aria-label="Brødkrumme" className="text-sm text-staal">
        <ol className="flex flex-wrap items-center gap-2">
          {dele.map((d, i) => {
            const sidste = i === dele.length - 1;
            return (
              <li key={d.sti} className="flex items-center gap-2">
                {sidste ? (
                  <span className="text-staal-lys" aria-current="page">
                    {d.navn}
                  </span>
                ) : (
                  <Link href={d.sti} className="hover:text-krom">
                    {d.navn}
                  </Link>
                )}
                {!sidste && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
