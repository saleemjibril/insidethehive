
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "About Us",
    description:
      "We are storytellers, gamers, and creators with a mission to inspire Web3 adoption in Africa and beyond.",
  };
}

export default function AboutUs() {
  return (
    <>
      <div className="about-us">
        <div className="about-us__hero">
          <div className="about-us__hero__image-placeholder"></div>
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
