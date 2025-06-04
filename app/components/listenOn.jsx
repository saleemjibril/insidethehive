import Image from "next/image";

export default function ListenOn() {
  return (
    <div className="listen-on">
        <div className="listen-on__title">
            Listen to us on
        </div>
      <div className="listen-on__cards">
        <div className="listen-on__cards__card">
          <Image width={30} height={30} src="/assets/icons/youtube-white.svg" />
          <div>Youtube</div>
        </div>
        <div className="listen-on__cards__card">
          <Image width={30} height={30} src="/assets/icons/spotify.svg" />
          <div>Spotify</div>
        </div>
        <div className="listen-on__cards__card">
          <Image width={30} height={30} src="/assets/icons/applePodcast.svg" />
          <div>Apple Podcasts</div>
        </div>
        <div className="listen-on__cards__card">
          <Image width={30} height={30} src="/assets/icons/castBox.png" />
          <div>Cast Box</div>
        </div>
      </div>
    </div>
  );
}
