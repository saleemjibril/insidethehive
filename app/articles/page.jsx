import MediumArticles from "../components/mediumArticles";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "Articles";
  const description =
    "Articles and stories from Inside The Hive—Web3, gaming, and the African ecosystem.";
  return {
    title,
    description,
    ...socialMetadata("/articles", { title, description }),
  };
}

export default function Home() {
  return (
    <>
    <MediumArticles />
  
    </>
  );
}
