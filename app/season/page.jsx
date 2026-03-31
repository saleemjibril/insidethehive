import Image from "next/image";
import AllEpisodes from "../components/allEpisodes";
import { socialMetadata } from "../../lib/socialMetadata";

export async function generateMetadata() {
  const title = "Season 1";
  const description =
    "Inside The Hive Season 1—episodes on Web3, gaming, and builders across the ecosystem.";
  const images = [
    {
      url: "/assets/podcast1.jpg",
      width: 800,
      height: 1000,
      alt: "Inside The Hive Season 1",
    },
  ];
  return {
    title,
    description,
    ...socialMetadata("/season", { title, description, images }),
  };
}

export default function Season() {
    return (
        <div className="season">
            <div className="season__title-group">
                
                <Image width={218} height={272.5} src="/assets/podcast1.jpg" className="season__title-group__img" alt="" />
                <div className="season__title-group__title">
                    Inside The Hive <br />
                    <span>Season 1</span>
                </div>
            </div>

            <AllEpisodes />
        </div>
    )
}