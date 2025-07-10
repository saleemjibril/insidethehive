"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function TheTeam() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current;

        // Create a timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate the title
        tl.fromTo(title, 
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );

        // Animate cards with stagger
        tl.fromTo(cards,
            {
                opacity: 0,
                y: 60,
                scale: 0.8,
                rotateX: 15
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.15
            },
            "-=0.4" // Start slightly before title animation ends
        );

        // Add hover animations for cards
        cards.forEach((card, index) => {
            if (card) {
                const icon = card.querySelector('img');
                const title = card.querySelector('.home__design-tools__inner__card2__card__title');
                const subtitle = card.querySelector('.home__design-tools__inner__card2__card__subtitle');

                gsap.set(card, { transformOrigin: "center center" });

                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.05,
                        y: -10,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    gsap.to([title, subtitle], {
                        // color: "#007bff", // Change to your preferred accent color
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    gsap.to([title, subtitle], {
                        // color: "initial",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <div className="home__design-tools" ref={containerRef}>
            <div className="home__design-tools__inner">
                <div 
                    className="home__design-tools__inner__card1"
                    ref={titleRef}
                >
                    Meet <span>The Hive </span>Team
                </div>
                <div className="home__design-tools__inner__card2">
                    <div 
                        className="home__design-tools__inner__card2__card"
                        ref={addToRefs}
                    >
                        <Image src={"/assets/feezy.jpg"} width={64} height={64} />
                        <div>
                            <div className="home__design-tools__inner__card2__card__title">
                                Feezy
                            </div>
                            <div className="home__design-tools__inner__card2__card__subtitle">
                            Lorem ipsum is a dummy or placeholder text commonly
                            </div>
                        </div>
                    </div>
                    <div 
                        className="home__design-tools__inner__card2__card"
                        ref={addToRefs}
                    >
                        <Image src={"/assets/feezy.jpg"} width={64} height={64} />
                        <div>
                            <div className="home__design-tools__inner__card2__card__title">
                            Feezy
                            </div>
                            <div className="home__design-tools__inner__card2__card__subtitle">
                            Lorem ipsum is a dummy or placeholder text commonly
                            </div>
                        </div>
                    </div>
                    <div 
                        className="home__design-tools__inner__card2__card"
                        ref={addToRefs}
                    >
                        <Image src={"/assets/feezy.jpg"} width={64} height={64} />
                        <div>
                            <div className="home__design-tools__inner__card2__card__title">
                            Feezy
                            </div>
                            <div className="home__design-tools__inner__card2__card__subtitle">
                            Lorem ipsum is a dummy or placeholder text commonly
                            </div>
                        </div>
                    </div>
                    <div 
                        className="home__design-tools__inner__card2__card"
                        ref={addToRefs}
                    >
                        <Image src={"/assets/feezy.jpg"} width={64} height={64} />
                        <div>
                            <div className="home__design-tools__inner__card2__card__title">
                            Feezy
                            </div>
                            <div className="home__design-tools__inner__card2__card__subtitle">
                            Lorem ipsum is a dummy or placeholder text commonly
                            </div>
                        </div>
                    </div>
                    <div 
                        className="home__design-tools__inner__card2__card"
                        ref={addToRefs}
                    >
                        <Image src={"/assets/feezy.jpg"} width={64} height={64} />
                        <div>
                            <div className="home__design-tools__inner__card2__card__title">
                            Feezy
                            </div>
                            <div className="home__design-tools__inner__card2__card__subtitle">
                            Lorem ipsum is a dummy or placeholder text commonly
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}