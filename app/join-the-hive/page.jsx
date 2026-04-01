import Footer from "../components/footer";
import JoinTheHiveForm from "../components/joinTheHiveForm";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "Join The Hive";
  const description =
    "Apply to join the Inside The Hive team—design, social, community, content, and more.";
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
            Tell us who you are and which roles fit you. We review every application
            and reply by email.
          </p>
          <JoinTheHiveForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
