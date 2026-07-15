import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Sidehoved } from "@/components/Sidehoved";
import { Sidefod } from "@/components/Sidefod";
import { RulleFremgang } from "@/components/RulleFremgang";
import { MobilRingBjaelke } from "@/components/MobilRingBjaelke";
import { GlatRul } from "@/components/GlatRul";
import { MuseLys } from "@/components/MuseLys";

// Grotesk til overskrifter
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Læsevenlig sans til brødtekst
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mtvagt.dk"),
  title: {
    default: "MT Vagt — Autoriseret vagtselskab i Fredericia & trekantsområdet",
    template: "%s | MT Vagt",
  },
  description:
    "MT Vagt & Vikarservice ApS er et autoriseret vagtselskab i Fredericia med ekspertise i hele Danmark — hovedfokus på trekantsområdet. Byggepladsvagt, runderingsvagt, portvagt og mere. Døgnvagt.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "MT Vagt & Vikarservice ApS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="da"
      className={`${archivo.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-krom">
        <GlatRul />
        <MuseLys />
        <RulleFremgang />
        <Sidehoved />
        <main className="flex-1">{children}</main>
        <Sidefod />
        <MobilRingBjaelke />
      </body>
    </html>
  );
}
