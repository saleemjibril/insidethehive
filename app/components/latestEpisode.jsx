import Image from "next/image";

export default function LatestEpisode() {
    return (
        <div className="latest-episode" id="latest">
        <div className="latest-episode__title">
            Watch Our <span>Latest Episode</span>
        </div>
        <div className="latest-episode__subtitle">
        Available on all streaming platforms. Listen and subscribe!
        </div>

<div className="latest-episode__icons">
    <Image width={40} height={40} alt="" src="/assets/icons/youtube.svg" />
    <Image width={40} height={40} alt="" src="/assets/icons/spotify.svg" />
    <Image width={35} height={38} alt="" src="/assets/icons/castBox.png" />
    <Image width={45} height={25} alt="" src="/assets/icons/soundclouds.png" />
    <Image width={40} height={40} alt="" src="/assets/icons/applePodcast.svg" />
</div>
        <div className="latest-episode__card">
            
                        <div className="latest-episode__card__image">
                        <Image width={1400} height={400} src="https://i.scdn.co/image/ab6765630000ba8a27354e81d74b3dba7b846e03" alt="" />
                        </div>
            
                        <div className="latest-episode__card__group">
                          <div>Podcast title</div>
                          <div>S1 . E3</div>
                        </div>
        </div>
    </div>
    )
}