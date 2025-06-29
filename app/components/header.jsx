"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const buttonsRef = useRef(null);
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarLinksRef = useRef([]);
  const sidebarCloseRef = useRef(null);

  // Initialize header animations on mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set(headerRef.current, { y: -100, opacity: 0 });
    gsap.set([logoRef.current, navRef.current, buttonsRef.current, hamburgerRef.current], { 
      opacity: 0, 
      y: 20 
    });

    // Animate header entrance
    tl.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to([buttonsRef.current, hamburgerRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.4");

    // Add hover animations for nav links
    const navLinks = navRef.current?.querySelectorAll('a');
    navLinks?.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.05,
          color: "#fbbf24", // secondary color
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          color: "#ffffff",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Add hover animation for logo
    const logo = logoRef.current;
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // Add button hover animations
    const buttons = buttonsRef.current?.querySelectorAll('button');
    buttons?.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Hamburger animation
    const hamburger = hamburgerRef.current;
    if (hamburger) {
      hamburger.addEventListener('mouseenter', () => {
        gsap.to(hamburger, {
          rotation: 90,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      hamburger.addEventListener('mouseleave', () => {
        gsap.to(hamburger, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

  }, []);

  // Sidebar animation effect
  useEffect(() => {
    if (open) {
      // Set initial states for sidebar elements
      gsap.set(sidebarRef.current, { x: "100%", opacity: 0 });
      gsap.set(sidebarCloseRef.current, { opacity: 0, y: -20 });
      gsap.set(sidebarLinksRef.current, { opacity: 0, x: 50 });

      const tl = gsap.timeline();
      
      // Animate sidebar entrance
      tl.to(sidebarRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      })
      .to(sidebarCloseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      .to(sidebarLinksRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

    } else if (sidebarRef.current) {
      // Animate sidebar exit
      const tl = gsap.timeline();
      
      tl.to(sidebarLinksRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in"
      })
      .to(sidebarCloseRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.1")
      .to(sidebarRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      }, "-=0.2");
    }
  }, [open]);

  const handleSidebarLinkClick = () => {
    // Animate before closing
    gsap.to(sidebarLinksRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => setOpen(false)
    });
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <Link href="/" prefetch={true} className="header__logo" ref={logoRef}>
          <Image alt="" src={"/assets/icons/logo-trans.svg"} width={80} height={80} />
          <div>
          {/* Inside<span>TheHive</span> */}
          </div>
        </Link>

        <nav ref={navRef}>
          <a href="#latest">Latest Episode</a>
          <a href="#popular">Popular Episodes</a>
          <a href="#all">All Episodes</a>
          <a href="/articles">Articles</a>
        </nav>

        <div className="header__buttons" ref={buttonsRef}>
          <button className="header__buttons__login"></button>
          <button className="header__buttons__signup">NewsLetter</button>
        </div>
        <Image
          className="header__hamburger"
          src="/assets/icons/hamburger.svg"
          width={40}
          height={40}
          onClick={() => setOpen(true)}
          alt=""
          ref={hamburgerRef}
        />
      </header>
      
      {open && (
        <div className="header__sidebar" ref={sidebarRef}>
          <div className="header__sidebar__close" ref={sidebarCloseRef}>
             <Link href="/" prefetch={true} className="header__logo">
          <Image alt="" src={"/assets/icons/logo-trans.svg"} width={100} height={100} />
          <div>
          {/* Inside<span>TheHive</span> */}
          </div>
        </Link>
        
            <Image
              src="/assets/icons/close.svg"
              width={40}
              height={40}
              onClick={() => setOpen(false)}
              alt=""
            />
          </div>

          <div className="header__sidebar__links">
            <a
              className="header__sidebar__link"
              href="#latest"
              onClick={handleSidebarLinkClick}
              ref={el => sidebarLinksRef.current[0] = el}
            >
              Latest Episode
            </a>
            <a
              className="header__sidebar__link"
              href="#popular"
              onClick={handleSidebarLinkClick}
              ref={el => sidebarLinksRef.current[1] = el}
            >
              Popular Episodes
            </a>
            <a
              className="header__sidebar__link"
              href="#all"
              onClick={handleSidebarLinkClick}
              ref={el => sidebarLinksRef.current[2] = el}
            >
             All Episodes
            </a>
            <a
              className="header__sidebar__link"
              href="/articles"
              onClick={handleSidebarLinkClick}
              ref={el => sidebarLinksRef.current[3] = el}
            >
             Articles
            </a>
          </div>
        </div>
      )}

     
    </>
  );
}