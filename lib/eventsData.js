/**
 * Event imagery: replace `src` URLs with your own assets under /public/assets/events/…
 * Preview collage: three images in the top row + one wide featured image below, inside one card.
 * Gallery items may be images or videos (Cloudinary `/video/upload/` or common video extensions).
 */

const VIDEO_EXT_RE = /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i;

export function isEventMediaVideo(media) {
  const src = typeof media === "string" ? media : media?.src;
  if (!src) return false;
  if (media?.type === "video") return true;
  if (src.includes("/video/upload/")) return true;
  return VIDEO_EXT_RE.test(src);
}

/** Cloudinary frame poster for video URLs; otherwise undefined. */
export function getEventMediaPoster(media) {
  if (!isEventMediaVideo(media)) return undefined;
  if (media?.poster) return media.poster;
  const src = typeof media === "string" ? media : media?.src;
  if (!src?.includes("cloudinary.com") || !src.includes("/upload/")) return undefined;
  const withFrame = src.includes("/upload/so_")
    ? src
    : src.replace("/upload/", "/upload/so_0/");
  return withFrame.replace(VIDEO_EXT_RE, ".jpg$2");
}

export function getEventImageForShare(event) {
  return (event?.galleryImages || []).find((item) => !isEventMediaVideo(item));
}

export const EVENTS = [
  {
    slug: "technova",
    title: "Technova",
    description:
      "Highlights from the Technova event—builders, panels, and community on the ground.",
    previewCollage: {
      topRow: [
        { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994241/H35A9435_1_bmq2ue.jpg", alt: "Technova event photo 1" },
        { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995543/H35A9794_1_knnzl2.jpg", alt: "Technova event photo 2" },
        { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994242/H35A9576_1_npormb.jpg", alt: "Technova event photo 3" },
      ],
      featured: {
        src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994242/H35A9662_1_ric3kl.jpg",
        alt: "Technova event featured photo",
      },
    },
    galleryImages: [
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995543/H35A9794_1_knnzl2.jpg", alt: "Technova event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994242/H35A9662_1_ric3kl.jpg", alt: "Technova event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995543/H35A9790_1_zorqcu.jpg", alt: "Technova event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995543/H35A9826_1_oh7fxg.jpg", alt: "Technova event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995543/H35A9784_1_cqajon.jpg", alt: "Technova event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994241/H35A9435_1_bmq2ue.jpg", alt: "Technova event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995542/H35A9753_1_eja8pr.jpg", alt: "Technova event photo 3" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994242/H35A9434_1_h3l7kq.jpg", alt: "Technova event photo 3" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994242/H35A9576_1_npormb.jpg", alt: "Technova event photo 4" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995543/H35A9646_1_xplfhx.jpg", alt: "Technova event photo 5" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995544/H35A9660_1_mqwj61.jpg", alt: "Technova event photo 5" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995544/H35A9638_1_k2zexb.jpg", alt: "Technova event photo 5" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774995544/H35A9513_1_c4dwgx.jpg", alt: "Technova event photo 5" },
    ],
  },
  {
    slug: "redotspay",
    title: "Redotspay",
    description:
      "We had the privilege of anchoring and covering another RedotsClub event for RedotPay in Lagos and the room told us everything we needed to know.",
    previewCollage: {
      topRow: [
        { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994667/Screenshot_2026-03-31_at_23.03.14_ek3e2k.png", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541380/H35A7280_jaxwxt.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541364/H35A7134_usjkps.jpg", alt: "Redotspay event photo 3" },
      ],
      featured: {
        src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541374/H35A3519_x7gec3.jpg",
        alt: "Redotspay event featured photo",
      },
    },
    galleryImages: [
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1774994667/Screenshot_2026-03-31_at_23.03.14_ek3e2k.png", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541380/H35A7280_jaxwxt.jpg", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541364/H35A7134_usjkps.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541382/H35A7314_yukx4x.jpg", alt: "Redotspay event photo 3" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541373/H35A3445_b9oz34.jpg", alt: "Redotspay event photo 4" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1778541374/H35A3519_x7gec3.jpg", alt: "Redotspay event photo 5" }
      
    ],
  },
  {
    slug: "redotsmovienight",
    title: "Redots Club Movie Night",
    // description:
      // "We had the privilege of anchoring and covering another RedotsClub event for RedotPay in Lagos and the room told us everything we needed to know.",
    previewCollage: {
      topRow: [
        { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447698/BEN_7590_tlvdmk.jpg", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447705/BEN_7734_hukfd4.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447708/BEN_7518_qyfzlf.jpg", alt: "Redotspay event photo 3" },
      ],
      featured: {
        src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447700/BEN_7779_cjocly.jpg",
        alt: "Redotspay event featured photo",
      },
    },
    galleryImages: [
      { type: "video", src: "https://res.cloudinary.com/thewebplug/video/upload/v1785447749/WE_IN_GO_YOUTUBE_aidj8t.mov", alt: "Redots Club Movie Night highlight video" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447700/BEN_7779_cjocly.jpg", alt: "Redotspay event photo 3" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447698/BEN_7590_tlvdmk.jpg", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447705/BEN_7734_hukfd4.jpg", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447708/BEN_7518_qyfzlf.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447708/BEN_7698_sqmyuf.jpg", alt: "Redotspay event photo 4" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785447706/BEN_7449_prngks.jpg", alt: "Redotspay event photo 5" }
      
    ],
  },
  {
    slug: "redotsdinner",
    title: "Redots Club Dinner",
    // description:
      // "We had the privilege of anchoring and covering another RedotsClub event for RedotPay in Lagos and the room told us everything we needed to know.",
    previewCollage: {
      topRow: [
        { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448131/photo_4_2026-07-23_13-12-28_dzkxe4.jpg", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448130/photo_2_2026-07-23_13-12-28_lb2jwa.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448130/photo_1_2026-07-23_13-12-28_vqgchw.jpg", alt: "Redotspay event photo 3" },
      ],
      featured: {
        src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448131/photo_7_2026-07-23_13-12-28_lpbdly.jpg",
        alt: "Redotspay event featured photo",
      },
    },
    galleryImages: [
      { type: "video", src: "https://res.cloudinary.com/thewebplug/video/upload/v1785448188/IMG_8130_g16b0j.mp4", alt: "Redots Club Dinner highlight video 1" },
      { type: "video", src: "https://res.cloudinary.com/thewebplug/video/upload/v1785448193/IMG_7962_yl53fx.mp4", alt: "Redots Club Dinner highlight video 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448131/photo_4_2026-07-23_13-12-28_dzkxe4.jpg", alt: "Redotspay event photo 1" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448130/photo_2_2026-07-23_13-12-28_lb2jwa.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448130/photo_1_2026-07-23_13-12-28_vqgchw.jpg", alt: "Redotspay event photo 3" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448131/photo_6_2026-07-23_13-12-28_hzgtjz.jpg", alt: "Redotspay event photo 2" },
      { src: "https://res.cloudinary.com/thewebplug/image/upload/v1785448130/photo_3_2026-07-23_13-12-28_gyvkvf.jpg", alt: "Redotspay event photo 1" },
      
    ],
  },
];

export function getEventBySlug(slug) {
  return EVENTS.find((e) => e.slug === slug);
}
