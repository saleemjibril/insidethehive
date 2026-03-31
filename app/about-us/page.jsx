import Image from "next/image";
import Footer from "../components/footer";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "About Us";
  const description =
    "We are storytellers, gamers, and creators with a mission to inspire Web3 adoption in Africa and beyond.";
  const images = [
    {
      url: "/assets/About Us.png",
      width: 500,
      height: 500,
      alt: title,
    },
  ];
  return {
    title,
    description,
    ...socialMetadata("/about-us", { title, description, images }),
  };
}

export default function AboutUs() {
  return (
    <>
      <div className="about-us">
        <div className="about-us__hero">
        <Image className="about-us__hero__image" src="/assets/About Us.png" width={500} height={500} alt="About Us - Community engagement background" />
        <div className="about-us__hero__inner">
            <h1 className="about-us__hero__inner__title">About <span>Us</span></h1>
            <p className="about-us__hero__inner__subtitle">
              We are storytellers, gamers, and creators with a mission to inspire Web3 adoption in Africa and beyond. Through our podcast, media platforms, events and community spaces, we highlight the builders shaping the future, share knowledge that empowers, spark conversations that matter and give everyone a reason to be part of this growing ecosystem. 
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
