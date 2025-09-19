import Image from "next/image";
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Enter the Hive",
    description:
      "Inside the Hive is a Web3 podcast and media brand building a strong community of Web3 and gaming enthusiasts across Africa, yet its reach goes far beyond one continent.",
  };
}

export default function EnterTheHive() {
  return (
    <>
      <div className="enter-the-hive">
        <div className="enter-the-hive__hero">
          <Image
            className="enter-the-hive__hero__image"
            src="/assets/enter_the_hive.jpeg"
            alt="Enter the Hive"
            width={500}
            height={500}
          />
          <div className="enter-the-hive__hero__inner">
            <h1 className="enter-the-hive__hero__inner__title">
              Enter the <span>Hive</span>
            </h1>
            <p className="enter-the-hive__hero__inner__subtitle">
              Inside the Hive is a Web3 podcast and media brand building a
              strong community of Web3 and gaming enthusiasts across Africa, yet
              its reach goes far beyond one continent.
            </p>
            <p className="enter-the-hive__hero__inner__subtitle">
              We create stories, conversations, and experiences that bring
              people closer to top builders, projects, and innovators. The Hive
              is where knowledge becomes connection, and connection becomes
              opportunity.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
