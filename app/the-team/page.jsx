import TheTeam from "../components/theTeam";
import Footer from "../components/footer";

export async function generateMetadata() {
  return {
    title: "The Team",
    description:
      "Meet The Hive Team - A talented group of creators, designers, and content specialists dedicated to inspiring Web3 adoption in Africa and beyond.",
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

