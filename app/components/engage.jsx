import Image from "next/image";

export default function Engage() {
    return (
        <div className="engage">

            <div className="engage__title">
                Engage <span>With us</span>
            </div>
   <div className="engage__inner">
            <Image src="/assets/engage.jpg" layout="fill" objectFit="cover" alt="Engage with us background" />
            <div>
            {/* <div className="engage__inner__title">
                <div>E</div>
                <div>N</div>
                <div>G</div>
                <div>A</div>
                <div>G</div>
                <div>E</div>
                <div></div>
                <div></div>
                <div>W</div>
                <div>I</div>
                <div>T</div>
                <div>H</div>
                <div></div>
                <div></div>
                <div>U</div>
                <div>S</div>
            </div> */}
            <div className="engage__inner__social-group">
            <Image src="/assets/icons/instagram.svg" width={40} height={40} alt="Instagram" />
            <Image src="/assets/icons/twitter.svg" width={40} height={40} alt="Twitter" />
            <Image src="/assets/icons/tiktok.svg" width={40} height={40} alt="TikTok" />
            <Image src="/assets/icons/linkedin.svg" width={40} height={40} alt="LinkedIn" />
            </div>
           
            </div>
<div>
<div className="engage__inner__subtitle">
                Engage with us through our social media or leave us a comment here
            </div>
           <form action="" className="engage__inner__form">
           <input type="text" placeholder="Leave a comment for use here" />
            <button>
            <Image src="/assets/icons/rightArrow.svg" width={20} height={20} alt="Submit" />
            </button>
           </form>
</div>
        </div>
        </div>
     

    )
}