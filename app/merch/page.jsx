
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Merch",
    description:
      "Our merch carries more than a logo, it carries identity. It’s a way to represent your place in the Hive, to show pride in belonging, and to stand with a culture that values innovation and community.",
  };
}

export default function Merch() {
  return (
    <>
      <div className="merch">
        <div className="merch__hero">
          <div className="merch__hero__image-placeholder"></div>
          <div className="merch__hero__inner">
            <h1 className="merch__hero__inner__title">Merch</h1>
            <p className="merch__hero__inner__subtitle">
              Our merch carries more than a logo, it carries identity. It’s a way to represent your place in the Hive, to show pride in belonging, and to stand with a culture that values innovation and community.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
