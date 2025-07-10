import Image from "next/image";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer__inner">
                <div className="footer__inner__title-group">
                    <Image src="/assets/icons/logo-trans.svg" width={150} height={150} />

                    <div className="footer__inner__title-group__social-group">
                        <Image src="/assets/icons/email.svg" width={32} height={32} />
                        <Image src="/assets/icons/linkedin-footer.svg" width={32} height={32} />
                        <Image src="/assets/icons/twitter-footer.svg" width={32} height={32} />
                        <Image src="/assets/icons/tiktok-footer.svg" width={32} height={32} />
                        <Image src="/assets/icons/instagram-footer.svg" width={32} height={32} />

                    </div>
                </div>

                <div className="footer__inner__group">
                    <div>
                        <div className="footer__inner__group__title">
                            Inside The Hive
                        </div>

                        <button className="footer__inner__group__button">
                            Watch more

                            <Image src={"/assets/icons/rightArrow.svg"} width={18} height={18} />
                        </button>
                    </div>

                    <div className="footer__inner__group__links">
                    <a href="#latest">Latest Episode</a>
          <a href="#popular">Popular Episodes</a>
          <a href="#all">All Episodes</a>
          <a href="#articles">Articles</a>
                    </div>
                </div>

            {/* <Image className="footer__inner__bg" src={"/assets/footer-bg.svg"} width={1440} height={224} /> */}
            </div>


        </div>
    )
}