import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";

import Logo from "./logo.svg";
import Kart from "./icon-cart.svg";
import Hamburger from "./icon-hamburger.svg";

const Nav = ({ state }) => {
  useEffect(() => {
    //console.log("useEffect: ", state);
  }, []);
  return (
    <React.Fragment>
      <NavBar state={state}>
        <div className="nav-items d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <a className="hamburger d-flex d-lg-none" href="/">
              <img
                src={Hamburger}
                alt="Mobile navigation for Audiophile best speakers"
              />
            </a>
            <a href="/">
              <img src={Logo} alt="Audiophile best speakers" />
            </a>
          </div>
          <ul className="nav d-none d-lg-flex justify-content-end flex-row">
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
          <div>
            <img src={Kart} alt="Put into cart" />
          </div>
        </div>
      </NavBar>
    </React.Fragment>
  );
};

export default connect(Nav);

// STYLING

const NavBar = styled.div`
  background-color: ${({ state }) => state.theme.lightBlack};
  border-radius: 8px 8px 0px 0px;

  .nav-items {
    max-width: ${({ state }) => state.theme.maxWidth};
    margin: 0 auto;
    padding: 32px 165px;
    position: relative;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }
  }

  .hamburger img {
    width: 15px;
    height: 15px;
    margin-right: 42px;
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
  }

  li {
    color: ${({ state }) => state.theme.white};
  }
`;
