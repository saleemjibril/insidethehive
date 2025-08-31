
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "Jobs",
    description:
      "We don’t just talk about opportunities in Web3; we help our community step into them. From ecosystem projects to creative collaborations, the Hive is a launchpad for builders, dreamers, and innovators ready to take the next step.",
  };
}

export default function Jobs() {
  return (
    <>
      <div className="jobs">
        <div className="jobs__hero">
          <div className="jobs__hero__image-placeholder"></div>
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
