import Image from "next/image";
import Link from "next/link";
import { EVENTS } from "../../lib/eventsData";

export default function EventsPreview({
  heading,
  intro = null,
  showViewAll = false,
  viewAllHref = "/events",
}) {
  return (
    <section className="events-preview" id="events">
      <div className="events-preview__inner">
        <div className="events-preview__header">
          {heading ? <h2 className="events-preview__title">{heading}</h2> : null}
          {intro && <p className="events-preview__intro">{intro}</p>}
          {showViewAll ? (
            <Link href={viewAllHref} className="events-preview__view-all">
              View all events
            </Link>
          ) : null}
        </div>

        <div className="events-preview__grid">
          {EVENTS.map((event) => {
            const { topRow, featured } = event.previewCollage;
            return (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="events-preview__card"
              >
                <div className="events-preview__card__label">
                  <span className="events-preview__card__title">{event.title}</span>
                  <span className="events-preview__card__cta">View event</span>
                </div>

                <div className="events-preview__mosaic" aria-hidden>
                  <div className="events-preview__mosaic__top">
                    {topRow.map((img, i) => (
                      <div key={i} className="events-preview__mosaic__cell events-preview__mosaic__cell--top">
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 33vw, 18vw"
                          className="events-preview__mosaic__img"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="events-preview__mosaic__hero">
                    <div className="events-preview__mosaic__cell events-preview__mosaic__cell--hero">
                      <Image
                        src={featured.src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="events-preview__mosaic__img"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
