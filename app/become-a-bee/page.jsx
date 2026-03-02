import Image from "next/image";
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
            <Image className="become-a-citizen__hero__image" src="/assets/Become a Citizen.png" width={500} height={500} alt="Become a Citizen - Community engagement background" />
          <div className="become-a-citizen__hero__inner">
            <h1 className="become-a-citizen__hero__inner__title">
              Become a <span>Bee</span>
            </h1>
            <p className="become-a-citizen__hero__inner__subtitle">
              Being part of the Hive means stepping into a space where curiosity
              is celebrated and opportunities are shared.
            </p>
            <p className="become-a-citizen__hero__inner__subtitle">
              Citizens gain access to exclusive content, events, gaming
              sessions, and the chance to grow alongside others who share the
              same passion and drive.
            </p>
            <br />
                      <a href="https://linktr.ee/Insidethehivepod" target="__blank" className="become-a-citizen__hero__inner__button">Join us</a>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
