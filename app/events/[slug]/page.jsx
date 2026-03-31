import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/footer";
import EventGalleryLightbox from "../../components/eventGalleryLightbox";
import { EVENTS, getEventBySlug } from "../../../lib/eventsData";
import { socialMetadata } from "../../../lib/socialMetadata";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event" };
  const title = `${event.title} — Events`;
  const description = event.description;
  const first = event.galleryImages?.[0];
  const images = first
    ? [{ url: first.src, width: 1200, height: 630, alt: first.alt || title }]
    : undefined;
  return {
    title,
    description,
    ...socialMetadata(`/events/${slug}`, {
      title,
      description,
      ...(images ? { images } : {}),
    }),
  };
}

export default async function EventGalleryPage({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <article className="events-detail">
        <div className="events-detail__inner">
          <Link href="/events" className="events-detail__back">
            ← All events
          </Link>
          <h1 className="events-detail__title">{event.title}</h1>
          <p className="events-detail__description">{event.description}</p>

          <EventGalleryLightbox images={event.galleryImages} />
        </div>
      </article>
      <Footer />
    </>
  );
}
