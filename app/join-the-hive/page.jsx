import Footer from "../components/footer";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "Join The Hive";
  const description =
    "Join The Hive applications are currently closed. Check back soon for the next opening.";
  return {
    title,
    description,
    ...socialMetadata("/join-the-hive", { title, description }),
  };
}

export default function JoinTheHivePage() {
  return (
    <>
      <div className="join-hive">
        <div className="join-hive__inner">
          <h1 className="join-hive__title">
            Join <span>The Hive</span>
          </h1>
          <p className="join-hive__intro">
            Applications are currently <strong>closed</strong>.
          </p>
          <div className="join-hive__status" role="status" aria-live="polite">
            <p>
              We open new spots periodically. Please check back soon for the next
              opportunity to apply.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
