import Image from "next/image";

export default function LatestEpisode() {
    return (
        <div className="latest-episode">
        <div className="latest-episode__title">
            Watch Our <span>Latest Episode</span>
        </div>
        <div className="latest-episode__subtitle">
        Available on all streaming platforms. Listen and subscribe!
        </div>

<div className="latest-episode__icons">
    <Image width={40} height={40} src="/assets/icons/youtube.svg" />
    <Image width={40} height={40} src="/assets/icons/spotify.svg" />
    <Image width={35} height={38} src="/assets/icons/castBox.png" />
    <Image width={45} height={25} src="/assets/icons/soundclouds.png" />
    <Image width={40} height={40} src="/assets/icons/applePodcast.svg" />
</div>
        <div className="latest-episode__card">
            
                        <div className="latest-episode__card__image">
                        <Image objectFit="cover" layout="fill" src="/assets/podcast2.jpg" alt="" />
                        </div>
            
                        <div className="latest-episode__card__group">
                          <div>Podcast title</div>
                          <div>S1 . E3</div>
                        </div>
        </div>
    </div>
    )
}