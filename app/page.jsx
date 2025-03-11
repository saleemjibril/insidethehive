import AllEpisodes from "./components/allEpisodes";
import LatestEpisode from "./components/latestEpisode";
import Player from "./components/player";
import PopularEpisodes from "./components/popularEpisodes";
import SpotifyComponent from "./components/spotifyComponent";
import Testimonials from "./components/testimonials";


export async function generateMetadata() {
  return {
    title: "Home",
    description:
      "Project Management, Engineering Construction & Design, Supply of Integrated Services, Supervision, Environmental Consultancy",
  };
}


export default function Home() {
  return (
    <>
    <LatestEpisode />
    <PopularEpisodes />
    <SpotifyComponent />
    <Player />
    <Testimonials />
    <AllEpisodes />
    </>
  );
}
