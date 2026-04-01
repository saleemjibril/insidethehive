/**
 * Per-route Open Graph, Twitter, and canonical URL.
 *
 * When `images` is omitted or empty, uses NEXT_PUBLIC_OG_IMAGE_URL or `/og.png`
 * so page-level metadata does not replace the root layout and drop `og:image`.
 *
 * IMPORTANT: Next.js replaces the whole `twitter` object from the page — it does
 * not merge with `layout.js`. We must repeat `site` / `creator` here or X drops
 * the image card. Twitter image tags omit width/height so crawlers use the real
 * file dimensions (declared wrong sizes can make X skip the image).
 *
 * @param {string} pathname - e.g. "/about-us", "/events/technova"
 * @param {{ title: string, description: string, images?: Array<{ url: string, width?: number, height?: number, alt?: string }> }} opts
 */
function twitterSiteHandle() {
  const raw = process.env.NEXT_PUBLIC_TWITTER_SITE || "@InsideDHive";
  return raw.startsWith("@") ? raw : `@${raw}`;
}

function defaultShareImages(alt) {
  const url = process.env.NEXT_PUBLIC_OG_IMAGE_URL || "/og.png";
  if (!url) return undefined;
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: alt || process.env.NEXT_PUBLIC_SITE_NAME || "Inside The Hive",
    },
  ];
}

/** Twitter/X: only url + alt — no width/height (avoids mismatch with actual asset). */
function toTwitterImages(images) {
  if (!images?.length) return undefined;
  return images.map((img) => {
    if (typeof img === "string") return img;
    const entry = { url: img.url };
    if (img.alt) entry.alt = img.alt;
    return entry;
  });
}

export function socialMetadata(pathname, { title, description, images }) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Inside The Hive";

  const resolvedImages =
    images != null && images.length > 0 ? images : defaultShareImages(title);

  const openGraph = {
    type: "website",
    siteName,
    locale: "en_US",
    title,
    description,
    url: path,
  };

  const site = twitterSiteHandle();
  const creatorRaw = process.env.NEXT_PUBLIC_TWITTER_CREATOR || site.replace(/^@/, "");
  const creator = creatorRaw.startsWith("@") ? creatorRaw : `@${creatorRaw}`;

  const twitter = {
    site,
    creator,
    title,
    description,
  };

  if (resolvedImages?.length) {
    openGraph.images = resolvedImages;
    twitter.card = "summary_large_image";
    twitter.images = toTwitterImages(resolvedImages);
  }

  return {
    openGraph,
    twitter,
    alternates: {
      canonical: path,
    },
  };
}
