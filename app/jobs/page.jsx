import Image from "next/image";
import Footer from "../components/footer";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "Jobs";
  const description =
    "We don’t just talk about opportunities in Web3; we help our community step into them. From ecosystem projects to creative collaborations, the Hive is a launchpad for builders, dreamers, and innovators ready to take the next step.";
  const images = [
    {
      url: "/assets/Jobs.png",
      width: 500,
      height: 500,
      alt: title,
    },
  ];
  return {
    title,
    description,
    ...socialMetadata("/jobs", { title, description, images }),
  };
}

export default function Jobs() {
  return (
    <>
      <div className="jobs">
        <div className="jobs__hero">
          <Image className="jobs__hero__image" src="/assets/Jobs.png" width={500} height={500} alt="Jobs - Community engagement background" />
          <div className="jobs__hero__inner">
            <h1 className="jobs__hero__inner__title">Jobs</h1>
            <p className="jobs__hero__inner__subtitle">
              We don’t just talk about opportunities in Web3; we help our community step into them. From ecosystem projects to creative collaborations, the Hive is a launchpad for builders, dreamers, and innovators ready to take the next step.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
