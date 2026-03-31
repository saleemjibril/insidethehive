import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/footer";
import EventGalleryLightbox from "../../components/eventGalleryLightbox";
import { EVENTS, getEventBySlug } from "../../../lib/eventsData";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event" };
  return {
    title: `${event.title} — Events`,
    description: event.description,
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
