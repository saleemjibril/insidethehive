
import Image from "next/image";
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Disclosures",
    description:
      "Trust is the foundation of everything we do. Our commitment is to remain transparent, credible, and community-driven through all of our activities and in every piece of content we share.",
  };
}

export default function Disclosures() {
  return (
    <>
      <div className="disclosures">
        <div className="disclosures__hero">
          <Image className="disclosures__hero__image" src="/assets/About Us.png" width={500} height={500} alt="Disclosures - Community engagement background" />
          <div className="disclosures__hero__inner">
            <h1 className="disclosures__hero__inner__title">Disclosures</h1>
            <p className="disclosures__hero__inner__subtitle">
              Trust is the foundation of everything we do. Our commitment is to remain transparent, credible, and community-driven through all of our activities and in every piece of content we share.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
