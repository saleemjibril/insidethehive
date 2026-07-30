/**
 * Cloudinary delivery URL tuned for HTML5 <video> playback.
 * - Leaves already-playable mp4 sources alone (fastest).
 * - Forces f_mp4 for .mov / other formats so Chrome/Firefox can play them.
 * - Does not use br_auto (rejected by Cloudinary on this account).
 */
export function getOptimizedVideoUrl(url) {
  if (!url?.includes("cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  if (/\.mp4(\?|$)/i.test(url)) {
    return url;
  }

  const [baseUrl, rest] = url.split("/upload/");
  if (!rest) return url;

  // Drop an existing transform segment so we don't nest them
  const path = rest.replace(/^(?:[^/]+\/)?(v\d+\/.+)$/, "$1");
  return `${baseUrl}/upload/f_mp4/${path}`;
}
