"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="header">
        <Link href="/" prefetch={true} className="header__logo">
          <Image alt="" src={"/assets/icons/logo-trans.svg"} width={100} height={100} />
          <div>
          {/* Inside<span>TheHive</span> */}
          </div>
        </Link>

        <nav>
          <a href="#latest">Latest Episode</a>
          <a href="#popular">Popular Episodes</a>
          <a href="#all">All Episodes</a>
        </nav>

        <div className="header__buttons">
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
              href="#latest"
              onClick={() => setOpen(false)}
            >
              Latest Episode
            </a>
            <a
              className="header__sidebar__link"
              href="#popular"
              onClick={() => setOpen(false)}
            >
              Popular Episodes
            </a>
            <a
              className="header__sidebar__link"
              href="#all"
              onClick={() => setOpen(false)}
            >
             All Episodes
            </a>
          </div>
          {/* <div className="header__sidebar__buttons">
            <button className="header__sidebar__buttons__login">Log in</button>
            <button className="header__sidebar__buttons__signup">
              Sign up
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}
