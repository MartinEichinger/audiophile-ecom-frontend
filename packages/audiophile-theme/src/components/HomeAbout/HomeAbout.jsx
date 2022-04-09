import React, { useEffect } from "react";
import { connect, styled } from "frontity";

const HomeAbout = ({ state, actions, libraries, mediaQuery }) => {
  const debug = false;

  // 1. Fetch done with beforeSSR / in Home
  useEffect(() => {
    actions.source.fetch("/about/");
    if (debug) console.log("HomeAbout/useEffect: ", state.source);
  }, []);

  // 2. GET
  const data = state.source.get("/about/");

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];
  const images = state.source.attachment;

  const Html2React = libraries.html2react.Component;

  if (debug) console.log("HomeAbout / before render", entry?.acf.about_body);

  return (
    <About state={state}>
      <div className="body d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center">
        <div className="text d-flex flex-column">
          {entry?.acf && <Html2React html={entry?.acf.about_h2} />}
          <p>
            {entry?.acf.about_body}
            {/* <Html2React html={entry?.acf.about_body} /> */}
          </p>
        </div>
        <div className="img">
          <img
            src={getImg(
              images[
                mediaQuery.isLg
                  ? entry?.acf.about_img_desktop
                  : mediaQuery.isSm
                  ? entry?.acf.about_img_tablet
                  : entry?.acf.about_img_mobile
              ]
            )}
            alt="About Audiophile"
          />
        </div>
      </div>
    </About>
  );
};

export default connect(HomeAbout);

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};

// STYLING
const About = styled.div`
  .body {
    max-width: ${({ state }) => state.theme.maxWidth};
    margin: 0 auto 200px;
    padding: 0px 165px;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
      margin-bottom: calc(15.47619vw - 23px);
    }

    @media only screen and (max-width: 682px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  .text {
    width: 445px;

    @media only screen and (max-width: 1439px) {
      width: 100%;
      padding-right: calc(18.60119vw - 103px);
      margin-right: 48px;
    }

    @media only screen and (max-width: 991px) {
      padding-left: calc(18.60119vw - 103px);
      margin-left: 48px;
    }
  }

  .text h2 {
    margin-top: 24px;
    margin-bottom: 32px;

    @media only screen and (max-width: 991px) {
      text-align: center;
    }
  }

  .text h2 code {
    color: ${({ state }) => state.theme.brown};
    font-size: inherit;
    font-family: inherit;
    word-wrap: inherit;
  }

  .text p {
    margin-bottom: 24px;
    opacity: 0.75;
    width: 445px;

    @media only screen and (max-width: 1439px) {
      width: 100%;
    }

    @media only screen and (max-width: 991px) {
      text-align: center;
    }

    @media only screen and (max-width: 575px) {
      margin-bottom: 85px;
    }
  }

  .img img {
    width: 540px;
    border-radius: 8px;

    @media only screen and (max-width: 1439px) {
      width: calc(35.71429vw + 26px);
    }

    @media only screen and (max-width: 991px) {
      margin-bottom: 38px;
      width: 100%;
    }

    @media only screen and (max-width: 575px) {
      margin-bottom: 16px;
    }
  }
`;
