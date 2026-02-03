"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const teamMembers = [
  {
    name: "Feezy",
    title:
      "Founder, InsideDHive andOperations Manager for Team1 Avalanche Nigeria",
    image: "/assets/feezy.jpg",
  },
  {
    name: "AnyaTheBrand",
    title: "Visual Design Lead",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.45.58.jpeg",
  },
  {
    name: "Cee_ynthia",
    title: "Content Lead",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.46.18.jpeg",
  },
  {
    name: "Divine",
    title: "Social Media Manager",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.46.41.jpeg",
  },
  {
    name: "Seun The Maker",
    title: "Visual Designer",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.47.52.jpeg",
  },
  {
    name: "Teexah",
    title: "Content Writer",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.48.31.jpeg",
  },
  {
    name: "Sparkles",
    title: "Content Writer",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.49.28.jpeg",
  },
  {
    name: "TizzedTizzy",
    title: "Content Writer",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.50.13.jpeg",
  },
  {
    name: "Wonder Cruise",
    title: "Video Creative",
    image: "/assets/WhatsApp Image 2025-10-08 at 02.50.36.jpeg",
  },
];
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

    if (!container || !title || !cards.length) return;

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Check if container is already in view (standalone page scenario)
      const rect = container.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.8;

      // Create a timeline
      const tl = gsap.timeline({
        scrollTrigger: isInView
          ? null // No scroll trigger if already in view - will play immediately
          : {
              trigger: container,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
      });

    // Animate the title
    tl.fromTo(
      title,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Animate cards with stagger
    tl.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotateX: 15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
      },
      "-=0.4" // Start slightly before title animation ends
    );
    }); // End requestAnimationFrame

    // Add hover animations for cards
    cards.forEach((card, index) => {
      if (card) {
        const icon = card.querySelector("img");
        const title = card.querySelector(
          ".home__design-tools__inner__card2__card__title"
        );
        const subtitle = card.querySelector(
          ".home__design-tools__inner__card2__card__subtitle"
        );

        gsap.set(card, { transformOrigin: "center center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to([title, subtitle], {
            // color: "#007bff", // Change to your preferred accent color
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to([title, subtitle], {
            // color: "initial",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
        <div className="home__design-tools__inner__card1" ref={titleRef}>
          Meet <span>The Hive </span>Team
        </div>
        <div className="home__design-tools__inner__card2">
          {teamMembers?.map((member) => (
            <div
              className="home__design-tools__inner__card2__card"
              ref={addToRefs}
            >
              <Image
                src={member?.image}
                width={64}
                height={64}
                alt="Team Member"
              />
              <div>
                <div className="home__design-tools__inner__card2__card__title">
                  {member?.name}
                </div>
                <div className="home__design-tools__inner__card2__card__subtitle">
                  {member?.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
