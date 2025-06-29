import Image from "next/image";

export default function LatestEpisode() {
    return (
        <div className="latest-episode" id="latest">
            {/* Decorative podcast icons */}
            <div className="latest-episode__decorative-icons">
                <div className="decorative-icon decorative-icon--1">
                    <Image width={40} height={40} alt="" src="/assets/icons/mic.svg" />
                </div>
                <div className="decorative-icon decorative-icon--2">
                    <Image width={40} height={40} alt="" src="/assets/icons/bitcoin.svg" />
                </div>
                <div className="decorative-icon decorative-icon--3">
                    <Image width={40} height={40} alt="" src="/assets/icons/loud.svg" />
                </div>
                <div className="decorative-icon decorative-icon--4">
                    <Image width={40} height={40} alt="" src="/assets/icons/diamond.svg" />
                </div>
                <div className="decorative-icon decorative-icon--5">
                    <Image width={40} height={40} alt="" src="/assets/icons/applepod.svg" />
                </div>
                <div className="decorative-icon decorative-icon--6">
                    <Image width={40} height={40} alt="" src="/assets/icons/eth.svg" />
                </div>
                <div className="decorative-icon decorative-icon--7">
                    <Image width={35} height={35} alt="" src="/assets/icons/spotify.svg" />
                </div>
                <div className="decorative-icon decorative-icon--8">
                    <Image width={38} height={38} alt="" src="/assets/icons/youtube.svg" />
                </div>
                <div className="decorative-icon decorative-icon--9">
                    <Image width={32} height={32} alt="" src="/assets/icons/headphone.svg" />
                </div>
                <div className="decorative-icon decorative-icon--10">
                    <Image width={36} height={36} alt="" src="/assets/icons/soundwave.svg" />
                </div>
                <div className="decorative-icon decorative-icon--11">
                    <Image width={34} height={34} alt="" src="/assets/icons/eth.svg" />
                </div>
                <div className="decorative-icon decorative-icon--12">
                    <Image width={38} height={38} alt="" src="/assets/icons/play-button.svg" />
                </div>
            </div>

            <div className="latest-episode__subsubtitle">
                <div>Web3</div>
                <Image width={20} height={20} alt="" src="/assets/icons/dot.svg" />
                <div>Podcast</div>
                <Image width={20} height={20} alt="" src="/assets/icons/dot.svg" />
                <div>Innovation</div>
            </div>
            
            <div className="latest-episode__title">
                Inside<span>The Hive</span>
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