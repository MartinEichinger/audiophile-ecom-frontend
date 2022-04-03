import React, { useState } from "react";
import { connect, styled, keyframes } from "frontity";
import Link from "@frontity/components/link";

import Logo from "./logo.svg";
import Kart from "./icon-cart.svg";
import Hamburger from "./icon-hamburger.svg";

import HomeLinks from "../HomeLinks/HomeLinks";

const Nav = ({ state }) => {
  const debug = true;

  const [visible, setVisible] = useState(2);

  if (debug) console.log("Nav: ", state.router.link, state.router.link === "/");

  return (
    <>
      <NavBar state={state}>
        <div className="nav-items d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <a
              className="hamburger d-flex d-lg-none"
              onClick={() =>
                visible === 0 || visible === 2 ? setVisible(1) : setVisible(0)
              }
            >
              <img
                src={Hamburger}
                alt="Mobile navigation for Audiophile best speakers"
                className={
                  visible === 0
                    ? "rotate-270-ccw"
                    : visible === 1
                    ? "rotate-270-cw"
                    : "collapsed"
                }
              />
            </a>
            <a href="/">
              <img src={Logo} alt="Audiophile best speakers" />
            </a>
          </div>
          <ul className="nav d-none d-lg-flex justify-content-end flex-row">
            <li
              className={
                state.router.link === "/" ? "nav-link active" : "nav-link"
              }
            >
              <Link link="/">Home</Link>
            </li>
            <li
              className={
                state.router.link === "/headphones/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <Link link="/headphones">Headphones</Link>
            </li>
            <li
              className={
                state.router.link === "/speakers/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <Link link="/speakers">Speakers</Link>
            </li>
            <li
              className={
                state.router.link === "/earphones/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <Link link="/earphones">Earphones</Link>
            </li>
          </ul>
          <div>
            <img src={Kart} alt="Put into cart" />
          </div>
        </div>
        <div
          className={
            visible === 0
              ? "nav-menu d-flex d-lg-none flex-column align-items-center slide-out-top"
              : visible === 1
              ? "nav-menu d-flex d-lg-none flex-column align-items-center slide-in-top"
              : "nav-menu d-flex d-lg-none flex-column align-items-center invisible"
          }
        >
          <NavLinks />
        </div>
      </NavBar>
    </>
  );
};

export default connect(Nav);

// STYLING
const NavLinks = styled(HomeLinks)`
  background: white;
`;

// animation slide-in-top
const slide_in_top = keyframes`
    from {
      transform: translateY(-1000px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
`;

// animation slide-out-top
const slide_out_top = keyframes`
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-1000px);
      opacity: 0;
    }
`;

// animation rotate-270-cw
const rotate_270_cw = keyframes`
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(270deg);
    }
`;

// animation rotate-270-ccw
const rotate_270_ccw = keyframes`
    from {
      transform: rotate(-270deg);
    }
    to {
      transform: rotate(0deg);
    }
`;

const NavBar = styled.div`
  //background-color: ${({ state }) => state.theme.lightBlack};
  //border-radius: 8px 8px 0px 0px;
  position: fixed;
  width: calc(100vw);

  .nav-items {
    background-color: ${({ state }) => state.theme.lightBlack};
    max-width: ${({ state }) => state.theme.maxWidth};
    margin: 0 auto;
    padding: 32px 165px;
    position: relative;
    z-index: 1000;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }

    @media only screen and (max-width: 682px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  .nav-items .nav {
    height: 28px;
  }

  .nav-items .nav .nav-link {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .nav-items .nav .nav-link.active a {
    color: ${({ state }) => state.theme.brown};
  }

  .hamburger img {
    width: 15px;
    height: 15px;
    margin-right: 42px;

    @media only screen and (max-width: 575px) {
      margin-right: calc((100vw - 228px) / 2);
    }
  }

  .nav-items:after {
    content: "";
    background: ${({ state }) => state.theme.grey};
    position: absolute;
    bottom: 0;
    left: 165px;
    height: 1px;
    width: calc(1440px - 330px);

    @media only screen and (max-width: 1439px) {
      left: calc(18.60119vw - 103px);
      width: calc(100vw - 2 * (18.60119vw - 103px));
    }

    @media only screen and (max-width: 575px) {
      left: 0px;
      width: calc(100vw - 4px);
    }
  }

  .nav {
    margin-right: 125px;
  }

  .nav li,
  .nav li a {
    color: ${({ state }) => state.theme.white};
  }

  .nav li a:hover {
    color: ${({ state }) => state.theme.lightBrown};
  }

  .nav-menu.invisible {
    transform: translateY(-1000px);
    opacity: 0;
  }

  .slide-in-top {
    -webkit-animation: ${slide_in_top} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: ${slide_in_top} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .slide-out-top {
    -webkit-animation: ${slide_out_top} 0.5s
      cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation: ${slide_out_top} 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  .rotate-270-cw {
    -webkit-animation: ${rotate_270_cw} 0.4s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: ${rotate_270_cw} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .rotate-270-ccw {
    -webkit-animation: ${rotate_270_ccw} 0.4s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: ${rotate_270_ccw} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;
