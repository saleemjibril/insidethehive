/**
 * Extract numeric tweet id from an x.com / twitter.com status URL, or pass through a raw id string.
 */
export function tweetIdFromUrl(input) {
  if (input == null || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (/^\d+$/.test(trimmed)) return trimmed;
  const m = trimmed.match(/(?:status|statuses)\/(\d+)/);
  return m ? m[1] : null;
}
