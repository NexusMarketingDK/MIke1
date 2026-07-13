import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type IndlaegMeta = {
  slug: string;
  titel: string;
  beskrivelse: string;
  dato: string;
  kategori: string;
  tags: string[];
  hero: string; // navn på poster/billede
  ydelse?: string; // relateret ydelse-slug
  takeaway: string; // nøgle-pointe
  seoTitel: string;
  seoBeskrivelse: string;
  laesetidMin: number;
  faq: { spoergsmaal: string; svar: string }[];
};

function laesFil(slug: string) {
  const fuld = path.join(BLOG_DIR, `${slug}.mdx`);
  const raa = fs.readFileSync(fuld, "utf8");
  return matter(raa);
}

export function alleSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function hentIndlaeg(slug: string): { meta: IndlaegMeta; indhold: string } {
  const { data, content } = laesFil(slug);
  const meta: IndlaegMeta = {
    slug,
    titel: data.titel,
    beskrivelse: data.beskrivelse,
    dato: data.dato,
    kategori: data.kategori,
    tags: data.tags ?? [],
    hero: data.hero ?? "blog-standard",
    ydelse: data.ydelse,
    takeaway: data.takeaway,
    seoTitel: data.seoTitel ?? data.titel,
    seoBeskrivelse: data.seoBeskrivelse ?? data.beskrivelse,
    laesetidMin: Math.max(1, Math.round(readingTime(content).minutes)),
    faq: data.faq ?? [],
  };
  return { meta, indhold: content };
}

export function alleIndlaeg(): IndlaegMeta[] {
  return alleSlugs()
    .map((slug) => hentIndlaeg(slug).meta)
    .sort((a, b) => (a.dato < b.dato ? 1 : -1));
}

export function alleKategorier(): string[] {
  return Array.from(new Set(alleIndlaeg().map((p) => p.kategori)));
}
