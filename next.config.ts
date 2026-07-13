import type { NextConfig } from "next";
import { ydelser } from "./content/ydelser";

// 301-redirects fra de gamle Joomla-stier til de nye slugs.
const gamleYdelser = ydelser
  .filter((y) => y.gammelSlug)
  .map((y) => ({
    source: `/vi-tilbyder/${y.gammelSlug}`,
    destination: `/vi-tilbyder/${y.slug}`,
    permanent: true,
  }));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...gamleYdelser,
      // Gamle Joomla-menupunkter → nye stier
      { source: "/om-mtvagt.html", destination: "/om-mtvagt", permanent: true },
      { source: "/kontakt.html", destination: "/kontakt", permanent: true },
      {
        source: "/ledige-stillinger.html",
        destination: "/ledige-stillinger",
        permanent: true,
      },
      {
        source: "/privatlivs-politik.html",
        destination: "/privatlivs-politik",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
