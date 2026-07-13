import type { MetadataRoute } from "next";
import { ydelser } from "@/content/ydelser";
import { alleIndlaeg } from "@/content/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const nu = new Date();
  const statiske = [
    "",
    "/om-mtvagt",
    "/vi-tilbyder",
    "/referencer",
    "/blog",
    "/kontakt",
    "/ledige-stillinger",
    "/privatlivs-politik",
  ].map((sti) => ({
    url: `${SITE.url}${sti}`,
    lastModified: nu,
    changeFrequency: "monthly" as const,
    priority: sti === "" ? 1 : 0.7,
  }));

  const ydelseSider = ydelser.map((y) => ({
    url: `${SITE.url}/vi-tilbyder/${y.slug}`,
    lastModified: nu,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogSider = alleIndlaeg().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.dato),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...statiske, ...ydelseSider, ...blogSider];
}
