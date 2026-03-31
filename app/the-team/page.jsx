import TheTeam from "../components/theTeam";
import Footer from "../components/footer";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "The Team";
  const description =
    "Meet The Hive Team - A talented group of creators, designers, and content specialists dedicated to inspiring Web3 adoption in Africa and beyond.";
  return {
    title,
    description,
    ...socialMetadata("/the-team", { title, description }),
  };
}

export default function TheTeamPage() {
  return (
    <>
      <TheTeam />
      <Footer />
    </>
  );
}





