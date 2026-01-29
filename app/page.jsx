import AllEpisodes from "./components/allEpisodes";
import Categories from "./components/catgories";
import CryptoPriceTicker from "./components/cryptoPrices";
import Engage from "./components/engage";
import Footer from "./components/footer";
import LatestEpisode from "./components/latestEpisode";
import ListenOn from "./components/listenOn";
import MediumArticles from "./components/mediumArticles";
import NewEpisodeBanner from "./components/newEpisodeBanner";
import NewEpisodeMarquee from "./components/newEpisodeMarquee";
import Player from "./components/player";
import PopularEpisodes from "./components/popularEpisodes";
import SpotifyPodcast from "./components/spotify";
import SpotifyComponent from "./components/spotifyComponent";
import Testimonials from "./components/testimonials";
import TheTeam from "./components/theTeam";
import WorkTogether from "./components/workTogether";


export async function generateMetadata() {
  return {
    title: "Home",
    description:
      "A weekly podcast journey presenting innovative, motivating tales with creates, startups and individuals inform listener about blockchain technology and the Web3 space.",
  };
}


export default function Home() {
  return (
    <>
    {/* <MediumArticles /> */}
    {/* <SpotifyPodcast 
    clientId={"34a81146217d4ccaa855f8e53f8163ac"}
    clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
    showId={"0wOOX8mdQUoRP1adnxV9VD"}
    /> */}
    <LatestEpisode
     clientId={"34a81146217d4ccaa855f8e53f8163ac"}
     clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
     showId={"0wOOX8mdQUoRP1adnxV9VD"}
    />

    <NewEpisodeMarquee />
    <PopularEpisodes
    clientId={"34a81146217d4ccaa855f8e53f8163ac"}
    clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
    showId={"0wOOX8mdQUoRP1adnxV9VD"}
    />
    <WorkTogether />
    <Categories />
    <Engage />
    <SpotifyComponent /> 




    {/* <Player /> */}
    <ListenOn />
    {/* <Testimonials 
      clientId={"34a81146217d4ccaa855f8e53f8163ac"}
      clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
      showId={"0wOOX8mdQUoRP1adnxV9VD"}
    /> */}
    <TheTeam />
    {/* <NewEpisodeBanner /> */}
    
  <AllEpisodes
     clientId={"34a81146217d4ccaa855f8e53f8163ac"}
    clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
    showId={"0wOOX8mdQUoRP1adnxV9VD"}
    />

    <Footer /> 

    </>
  );
}
