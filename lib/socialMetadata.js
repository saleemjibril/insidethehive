/**
 * Per-route Open Graph, Twitter, and canonical URL. Merges with root `metadata` in `app/layout.js`.
 *
 * @param {string} pathname - e.g. "/about-us", "/events/technova"
 * @param {{ title: string, description: string, images?: Array<{ url: string, width?: number, height?: number, alt?: string }> }} opts
 */
export function socialMetadata(pathname, { title, description, images }) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  const openGraph = {
    title,
    description,
    url: path,
  };

  const twitter = {
    title,
    description,
  };

  if (images?.length) {
    openGraph.images = images;
    twitter.images = images;
  }

  return {
    openGraph,
    twitter,
    alternates: {
      canonical: path,
    },
  };
}
