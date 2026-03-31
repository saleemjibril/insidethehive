import Footer from "../components/footer";
import EventsPreview from "../components/eventsPreview";

export async function generateMetadata() {
  return {
    title: "Events",
    description:
      "Photo galleries from Inside The Hive events—Technova, Redotspay, and more.",
  };
}

export default function EventsPage() {
  return (
    <>
      <div className="events-page">
        <div className="events-page__hero">
          <h1 className="events-page__hero__title">Events</h1>
          <p className="events-page__hero__subtitle">
            Relive the energy from our gatherings. Each column is a snapshot of one event—open
            a gallery to see the full set of photos.
          </p>
        </div>
        <EventsPreview
          // heading="Galleries"
          intro={null}
          showViewAll={false}
        />
      </div>
      <Footer />
    </>
  );
}
