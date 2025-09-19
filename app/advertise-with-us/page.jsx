
import Image from "next/image";
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Advertise With Us",
    description:
      "We provide brands, builders, and projects with a trusted platform to connect with an audience that is curious, informed, and ready to engage with Web3.",
  };
}

export default function AdvertiseWithUs() {
  return (
    <>
      <div className="advertise-with-us">
        <div className="advertise-with-us__hero">
          <Image className="advertise-with-us__hero__image" src="/assets/About Us.png" width={500} height={500} alt="Advertise With Us - Community engagement background" />
          <div className="advertise-with-us__hero__inner">
            <h1 className="advertise-with-us__hero__inner__title">Advertise <span>With Us</span></h1>
            <p className="advertise-with-us__hero__inner__subtitle">
              We provide brands, builders, and projects with a trusted platform to connect with an audience that is curious, informed, and ready to engage with Web3.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
