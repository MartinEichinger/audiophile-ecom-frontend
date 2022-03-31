import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";

import Logo from "./logo.svg";
import Facebook from "./icon-facebook.svg";
import Twitter from "./icon-twitter.svg";
import Instagram from "./icon-instagram.svg";
import FacebookHover from "./icon-facebook-hover.svg";
import TwitterHover from "./icon-twitter-hover.svg";
import InstagramHover from "./icon-instagram-hover.svg";

const Footer = ({ state, actions }) => {
  const debug = false;

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch("/footer");
    if (debug) console.log("footer/useEffect: ", data);
  }, []);

  // 2. GET
  const data = state.source.get("/footer");

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];

  if (debug) console.log("footer/entries: ", entry);

  const footer_text = getData(entry?.acf.footer_text);
  return (
    <FooterBar state={state}>
      <div className="body d-flex flex-column">
        <div className="nav-items d-flex flex-column flex-lg-row align-items-center align-items-sm-start align-items-lg-center justify-content-between">
          <div className="nav-img">
            <a href="/">
              <img src={Logo} alt="Audiophile best speakers" />
            </a>
          </div>
          <ul className="nav d-flex justify-content-end flex-column flex-sm-row">
            <li className="nav-link">
              <Link link="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link link="/headphones">Headphones</Link>
            </li>
            <li className="nav-link">
              <Link link="/speakers">Speakers</Link>
            </li>
            <li className="nav-link">
              <Link link="/earphones">Earphones</Link>
            </li>
          </ul>
        </div>

        <div className="text d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between align-items-end">
          <p>{entry?.acf.footer_text}</p>
          <div className="logos d-none d-lg-flex flex-row">
            <a href="/">
              <img src={Facebook} alt="Audiophile best speakers" />
              <img src={FacebookHover} alt="Audiophile best speakers" />
            </a>
            <a href="/">
              <img src={Twitter} alt="Audiophile best speakers" />
              <img src={TwitterHover} alt="Audiophile best speakers" />
            </a>
            <a href="/">
              <img src={Instagram} alt="Audiophile best speakers" />
              <img src={InstagramHover} alt="Audiophile best speakers" />
            </a>
          </div>
        </div>

        <div className="copyright d-flex flex-column flex-sm-row justify-content-between align-items-center align-items-sm-start">
          <p>{entry?.acf.footer_copyright}</p>
          <div className="logos d-flex d-lg-none flex-row">
            <a href="/">
              <img src={Facebook} alt="Audiophile best speakers" />
              <img src={FacebookHover} alt="Audiophile best speakers" />
            </a>
            <a href="/">
              <img src={Twitter} alt="Audiophile best speakers" />
              <img src={TwitterHover} alt="Audiophile best speakers" />
            </a>
            <a href="/">
              <img src={Instagram} alt="Audiophile best speakers" />
              <img src={InstagramHover} alt="Audiophile best speakers" />
            </a>
          </div>
        </div>
      </div>
    </FooterBar>
  );
};

export default connect(Footer);

const getData = (data) => {
  if (!data) return null;
  return data;
};

// STYLING

const FooterBar = styled.div`
  background-color: ${({ state }) => state.theme.darkBlack};

  .body {
    max-width: ${({ state }) => state.theme.maxWidth};
    margin: 0 auto;
    padding: 0px 165px;
    position: relative;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }

    @media only screen and (max-width: 682px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  li {
    color: ${({ state }) => state.theme.white};
  }

  li:last-of-type {
    padding-right: 0px;
  }

  @media only screen and (max-width: 991px) {
    li:first-of-type {
      padding-left: 0px;
    }
  }

  @media only screen and (max-width: 575px) {
    li {
      text-align: center;
      padding: 8px 16px;
    }

    li:first-of-type {
      padding-left: 16px;
    }

    li:last-of-type {
      padding-right: 16px;
    }
  }

  .nav-items {
    margin-top: 72px;

    @media only screen and (max-width: 1439px) {
      margin-top: calc(2.232143vw + 43px);
    }
  }

  .nav-items .nav-img,
  .nav-items .nav {
    margin-bottom: 36px;
  }

  .text .logos a,
  .copyright .logos a {
    margin-right: 16px;
    display: inline-block;
  }

  .text .logos a img:last-child,
  .copyright .logos a img:last-child {
    display: none;
  }

  .text .logos a:last-of-type,
  .copyright .logos a:last-of-type {
    margin-right: 0px;
  }

  .text .logos a:hover img:last-child,
  .copyright .logos a:hover img:last-child {
    display: inline-block;
  }

  .text .logos a:hover img:first-of-type,
  .copyright .logos a:hover img:first-of-type {
    display: none;
  }

  .copyright {
    margin-top: 56px;
    margin-bottom: 48px;
  }

  .text p {
    margin-bottom: 0px;
  }

  .text p,
  .copyright p {
    color: ${({ state }) => state.theme.white};
    width: 540px;
    opacity: 0.5;

    @media only screen and (max-width: 991px) {
      width: 100%;
    }

    @media only screen and (max-width: 575px) {
      text-align: center;
    }
  }
`;
