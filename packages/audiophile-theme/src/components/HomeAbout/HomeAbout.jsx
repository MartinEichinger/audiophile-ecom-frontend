import React from "react";
import { connect, styled } from "frontity";

const HomeAbout = ({ state, id, entry, mediaQuery }) => {
  const debug = false;

  // 1. Fetch done in Home

  // 2. GET
  const data = state.source;

  const images = state.source.attachment;

  // LOGGING
  if (debug) console.log("home-about/data: ", data);
  if (debug) console.log("home-about/images: ", images);

  return (
    <About state={state}>
      <div className="body d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center">
        <div className="text d-flex flex-column">
          <h2>{entry.acf.home_about_h2}</h2>
          <p>{entry.acf.home_about_body}</p>
        </div>
        <div className="img">
          <img
            src={getImg(
              images[
                mediaQuery.isLg
                  ? entry.acf.home_about_img_desktop
                  : mediaQuery.isSm
                  ? entry.acf.home_about_img_tablet
                  : entry.acf.home_about_img_mobile
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
