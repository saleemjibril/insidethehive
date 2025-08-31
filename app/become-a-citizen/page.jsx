
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Become a Citizen",
    description:
      "Being part of the Hive means stepping into a space where curiosity is celebrated and opportunities are shared.",
  };
}

export default function BecomeACitizen() {
  return (
    <>
      <div className="become-a-citizen">
        <div className="become-a-citizen__hero">
          <div className="become-a-citizen__hero__image-placeholder"></div>
          <div className="become-a-citizen__hero__inner">
            <h1 className="become-a-citizen__hero__inner__title">Become a <span>Citizen</span></h1>
            <p className="become-a-citizen__hero__inner__subtitle">
              Being part of the Hive means stepping into a space where curiosity is celebrated and opportunities are shared. 
            </p>
            <p className="become-a-citizen__hero__inner__subtitle">
              Citizens gain access to exclusive content, events, gaming sessions, and the chance to grow alongside others who share the same passion and drive.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
