import Image from "next/image";
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Causes",
    description:
      "Inside the Hive is built on inclusion and impact. We support education, gaming culture, and financial empowerment by amplifying voices and stories that deserve to be heard.",
  };
}

export default function Causes() {
  return (
    <>
      <div className="causes">
        <div className="causes__hero">
          <Image className="causes__hero__image" src="/assets/About Us.png" width={500} height={500} alt="Causes - Community engagement background" />
          <div className="causes__hero__inner">
            <h1 className="causes__hero__inner__title">Causes</h1>
            <p className="causes__hero__inner__subtitle">
              Inside the Hive is built on inclusion and impact. We support education, gaming culture, and financial empowerment by amplifying voices and stories that deserve to be heard. 
            </p>
            <p className="causes__hero__inner__subtitle">
              Our work is rooted in the belief that there's a space for everyone in the ecosystem and that web3 should be open and accessible to everyone.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
