"use client"
import Image from "next/image";

export default function ListenOn() {
  return (
    <div className="listen-on">
        <div className="listen-on__title">
            Listen to us on
        </div>
      <div className="listen-on__cards">
        <div className="listen-on__cards__card">
          <Image width={30} alt="" height={30} src="/assets/icons/youtube-white.svg" />
          <div>Youtube</div>
        </div>
        <div className="listen-on__cards__card"
          onClick={() => {
              window.open("https://open.spotify.com/show/0wOOX8mdQUoRP1adnxV9VD?si=69aa0fcb14ce4e88", "_blank", "noopener,noreferrer");
            }}
        >
          <Image width={30} alt="" height={30} src="/assets/icons/spotify.svg" />
          <div>Spotify</div>
        </div>
        <div className="listen-on__cards__card">
          <Image width={30} alt="" height={30} src="/assets/icons/applePodcast.svg" />
          <div>Apple Podcasts</div>
        </div>
        <div className="listen-on__cards__card">
          <Image width={30} alt="" height={30} src="/assets/icons/castBox.png" />
          <div>Cast Box</div>
        </div>
      </div>
    </div>
  );
}
