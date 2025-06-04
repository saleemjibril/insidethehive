"use client";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Image src={"/assets/icons/logo-trans.svg"} width={100} height={100} />
          <div>
          {/* Inside<span>TheHive</span> */}
          </div>
        </div>

        <nav>
          <a href="#how">Latest Episodes</a>
          <a href="#how">About</a>
          <a href="#how">Events</a>
        </nav>

        <div className="header__buttons">
          <button className="header__buttons__login">Contact us</button>
          <button className="header__buttons__signup">NewsLetter</button>
        </div>
        <Image
          className="header__hamburger"
          src="/assets/icons/hamburger.svg"
          width={40}
          height={40}
          onClick={() => setOpen(true)}
          alt=""
        />
      </header>
      {open && (
        <div className="header__sidebar">
          <div className="header__sidebar__close">
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
              href="#how"
              onClick={() => setOpen(false)}
            >
              What we do
            </a>
            <a
              className="header__sidebar__link"
              href="#how"
              onClick={() => setOpen(false)}
            >
              How it works
            </a>
            <a
              className="header__sidebar__link"
              href=""
              onClick={() => setOpen(false)}
            >
              Start for free
            </a>
          </div>
          <div className="header__sidebar__buttons">
            <button className="header__sidebar__buttons__login">Log in</button>
            <button className="header__sidebar__buttons__signup">
              Sign up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
