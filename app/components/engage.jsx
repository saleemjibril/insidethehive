"use client";
import Image from "next/image";
import { useState } from "react";
import { sendEmail } from "../utils/emailService";
import { toast } from "react-toastify";

export default function Engage() {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        console.log("got hit");
        
        e.preventDefault();
        console.log(comment);
        setLoading(true);
        try {
            const response = await sendEmail({
                from_name: "An anoymous listener",
                message: comment,
                reply_to: "insidethehivepod@gmail.com",
                email: "insidethehivepod@gmail.com",
              });
            setComment(""); 
            toast.success("Thank you for reaching out! We'll be in touch soon.", {
                style: {
                  background: '#FFD700',
                  accentColor: '#FFD700',
                  color: '#000' // text color for contrast
                }
              });
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Oops! Something went wrong. Let's try that again 🙂");
        } finally {
            setLoading(false);
        }
    }
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
            <a href="https://instagram.com/insidedhive" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/instagram.svg" width={40} height={40} alt="Instagram" />
            </a>
            <a href="https://twitter.com/insidedhive" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/twitter.svg" width={40} height={40} alt="Twitter" />
            </a>
            {/* <a href="https://tiktok.com/@insidedhive" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/tiktok.svg" width={40} height={40} alt="TikTok" />
            </a> */}
            {/* <a href="https://linkedin.com/company/insidedhive" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/linkedin.svg" width={40} height={40} alt="LinkedIn" />
            </a> */}
            <a href="https://t.me/insidethehive" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icons/telegram.svg" width={40} height={40} alt="LinkedIn" />
            </a>
            </div>
           
            </div>
<div>
<div className="engage__inner__subtitle">
                Engage with us through our social media or leave us a comment here
            </div>
           <form action="" className="engage__inner__form" onSubmit={handleSubmit}>
           <input type="text" placeholder="Leave a comment for use here" value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button type="submit" disabled={loading}>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <Image src="/assets/icons/rightArrow.svg" width={20} height={20} alt="Submit" />
            )}
            </button>
           </form>
</div>
        </div>
        </div>
     

    )
}