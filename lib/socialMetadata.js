/**
 * Per-route Open Graph, Twitter, and canonical URL.
 *
 * When `images` is omitted or empty, uses NEXT_PUBLIC_OG_IMAGE_URL or `/og.png`
 * so page-level metadata does not replace the root layout and drop `og:image`.
 *
 * @param {string} pathname - e.g. "/about-us", "/events/technova"
 * @param {{ title: string, description: string, images?: Array<{ url: string, width?: number, height?: number, alt?: string }> }} opts
 */
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

  const twitter = {
    title,
    description,
  };

  if (resolvedImages?.length) {
    openGraph.images = resolvedImages;
    twitter.images = resolvedImages;
    twitter.card = "summary_large_image";
  }

  return {
    openGraph,
    twitter,
    alternates: {
      canonical: path,
    },
  };
}
