import Image from "next/image";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer__inner">
                <div className="footer__inner__title-group">
                    <Image src="/assets/inside_the_hive.png" width={150} height={150} alt="Inside The Hive Logo" />

                    <div className="footer__inner__title-group__social-group">
                        <a href="mailto:contact@insidedhive.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/icons/email.svg" width={32} height={32} alt="Email" />
                        </a>
                        {/* <a href="https://linkedin.com/company/insidedhive" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/icons/linkedin-footer.svg" width={32} height={32} alt="LinkedIn" />
                        </a> */}
                        <a href="https://twitter.com/insidedhive" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/icons/twitter-footer.svg" width={32} height={32} alt="Twitter" />
                        </a>
                        {/* <a href="https://tiktok.com/@insidedhive" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/icons/tiktok-footer.svg" width={32} height={32} alt="TikTok" />
                        </a> */}
                        <a href="https://instagram.com/insidedhive" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/icons/instagram-footer.svg" width={32} height={32} alt="Instagram" />
                        </a>
                        <a href="https://t.me/insidethehive" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/icons/telegram.svg" width={32} height={32} alt="LinkedIn" />
                        </a>

                    </div>
                </div>

                <div className="footer__inner__group">
                    <div>
                        <div className="footer__inner__group__title">
                            Inside The Hive
                        </div>

                        <a href="/#popular" className="footer__inner__group__button">
                            Watch more

                            <Image src={"/assets/icons/rightArrow.svg"} width={18} height={18} alt="Right Arrow" />
                        </a>
                    </div>
<div className="footer__inner__group__links-group">
<div className="footer__inner__group__links">
                    {/* <div href="#" className="footer__inner__group__links__title">Bankless</div> */}
          <a href="/enter-the-hive">Enter the Hive</a>
          <a href="/become-a-bee">Become a Bee</a>
          <a href="/about-us">About Us</a>
          <a href="/the-team">The Team</a>
          <a href="/events">Events</a>
          <a href="/causes">Causes</a>
          <a href="/merch">Merch</a>
          <a href="/jobs">Jobs</a>
          <a href="/advertise-with-us">Advertise With Us</a>
          <a href="/disclosures">Disclosures</a>
                    </div>

                    <div className="footer__inner__group__links">
                    <a href="/#latest">Latest Episode</a>
          <a href="/#popular">Popular Episodes</a>
          <a href="/#all">All Episodes</a>
          <a href="/#articles">Articles</a>
          <a href="https://drive.google.com/drive/folders/10Fhr7YT0zCkxYTNOEG3ZOcL_9IohWmEN?usp=drive_link" target="_blank" rel="noopener noreferrer">Branding Kit</a>
                    </div>
                   
</div>
                </div>

            {/* <Image className="footer__inner__bg" src={"/assets/footer-bg.svg"} width={1440} height={224} /> */}
            </div>


        </div>
    )
}