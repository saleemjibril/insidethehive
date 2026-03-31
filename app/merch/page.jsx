import Image from "next/image";
import Footer from "../components/footer";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "Merch";
  const description =
    "Our merch carries more than a logo, it carries identity. It’s a way to represent your place in the Hive, to show pride in belonging, and to stand with a culture that values innovation and community.";
  const images = [
    {
      url: "/assets/Merch.png",
      width: 500,
      height: 500,
      alt: title,
    },
  ];
  return {
    title,
    description,
    ...socialMetadata("/merch", { title, description, images }),
  };
}

export default function Merch() {
  return (
    <>
      <div className="merch">
        <div className="merch__hero">
          <Image className="merch__hero__image" src="/assets/Merch.png" width={500} height={500} alt="Merch - Community engagement background" />
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
