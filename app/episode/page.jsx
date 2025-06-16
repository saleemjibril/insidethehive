import Image from "next/image";
import SpotifyComponent from "../components/spotifyComponent";

export default function Episode() {
  return (
    <div className="episode">
      <div className="episode__navigation">
        <div>Season 1 </div>
        <Image
          width={20}
          height={15}
          src="/assets/icons/navigatorSeperator.svg"
          alt=""
        />
        <div>Welcome to InsideTheHive!</div>
      </div>

      <div className="episode__inner">
        <Image
          width={218}
          height={272.5}
          src="/assets/podcast1.jpg"
          className="season__title-group__img"
          alt=""
        />
        <div className="episode__inner__inner">
          <div className="episode__inner__inner__title">
            Inside In <span>The Hive</span>
          </div>
          <div className="episode__inner__inner__subtitle">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries
          </div>

          <div className="episode__inner__inner__listen">
            Available on all streaming platforms <br /> Listen and subscribe!
          </div>
          <div className="latest-episode__icons">
            <Image width={40} height={40} alt="" src="/assets/icons/youtube.svg" />
            <Image width={40} height={40} alt="" src="/assets/icons/spotify.svg" />
            <Image width={35} height={38} alt="" src="/assets/icons/castBox.png" />
            <Image width={45} height={25} alt="" src="/assets/icons/soundclouds.png" />
            <Image
              width={40}
              height={40}
              src="/assets/icons/applePodcast.svg"
            />
          </div>
        </div>
      </div>

      <SpotifyComponent title={false} />
    </div>
  );
}
