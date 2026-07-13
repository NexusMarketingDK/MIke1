import { z } from "zod";
import { ydelser } from "@/content/ydelser";

const opgavetyper = ydelser.map((y) => y.titel);

// Zod-skema med danske fejlbeskeder.
export const kontaktSkema = z.object({
  navn: z
    .string()
    .trim()
    .min(2, "Skriv venligst dit navn.")
    .max(80, "Navnet er for langt."),
  firma: z.string().trim().max(120, "Firmanavnet er for langt.").optional(),
  telefon: z
    .string()
    .trim()
    .min(6, "Skriv venligst et gyldigt telefonnummer.")
    .max(30, "Telefonnummeret er for langt."),
  email: z.string().trim().email("Skriv venligst en gyldig e-mailadresse."),
  opgavetype: z
    .string()
    .refine((v) => opgavetyper.includes(v) || v === "Andet", {
      message: "Vælg venligst en opgavetype.",
    }),
  lokation: z.string().trim().max(120, "Lokationen er for lang.").optional(),
  startdato: z.string().trim().max(40).optional(),
  besked: z
    .string()
    .trim()
    .min(10, "Skriv venligst lidt om din opgave (mindst 10 tegn).")
    .max(3000, "Beskeden er for lang."),
  // Honeypot — skal være tom (usynligt felt for spam-robotter).
  website: z.string().max(0).optional(),
});

export type KontaktData = z.infer<typeof kontaktSkema>;
export const OPGAVETYPER = [...opgavetyper, "Andet"];
