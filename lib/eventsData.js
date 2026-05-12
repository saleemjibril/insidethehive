/**
 * Event imagery: replace `src` URLs with your own assets under /public/assets/events/…
 * Preview collage: three images in the top row + one wide featured image below, inside one card.
 */
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
];

export function getEventBySlug(slug) {
  return EVENTS.find((e) => e.slug === slug);
}
