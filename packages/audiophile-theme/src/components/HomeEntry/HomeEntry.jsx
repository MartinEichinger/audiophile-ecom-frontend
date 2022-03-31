import React from "react";
import { connect, styled } from "frontity";

const HomeEntry = ({ state, id, entry }) => {
  const debug = true;

  // 1. Fetch done in Home
  // 2. GET
  const data = state.source;

  const img_url = state.source?.attachment[id]?.source_url; //guid.rendered;

  if (debug)
    console.log(
      "HomeEntry/data: ",
      id,
      state.source,
      state.source.attachment[id]
    );

  return (
    <Background img_url={img_url} state={state}>
      <div className="body">
        <div className="text d-flex flex-column align-items-center align-items-lg-start">
          <overline>{entry.acf.home_entry_overline}</overline>
          <h1>{entry.acf.home_entry_h1}</h1>
          <p>{entry.acf.home_entry_body}</p>
          <button className="default">{entry.acf.home_entry_button}</button>
        </div>
      </div>
    </Background>
  );
};

export default connect(HomeEntry);

// STYLING
const Background = styled.div`
  background-image: url(${({ img_url }) => img_url});
  background-color: ${({ state }) => state.theme.lightBlack};
  background-position: 50% 100%;
  background-repeat: no-repeat;
  background-size: inherit;
  border-radius: 0px 0px 8px 8px;

  @media only screen and (max-width: 1439px) {
    background-size: cover;
  }

  .body {
    max-width: ${({ state }) => state.theme.maxWidth};
    margin: 0 auto;
    padding: 0px 165px;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }
  }

  .text {
    padding-top: 128px;
    width: 398px;

    @media only screen and (max-width: 991px) {
      margin: 0 auto;
    }

    @media only screen and (max-width: 767px) {
      width: inherit;
    }
  }

  overline {
    color: ${({ state }) => state.theme.white};
    opacity: 0.5;
  }

  h1 {
    margin-top: 24px;
    margin-bottom: 24px;
    color: ${({ state }) => state.theme.white};

    @media only screen and (max-width: 767px) {
      text-align: center;
    }
  }

  p {
    margin-bottom: 40px;
    color: ${({ state }) => state.theme.white};
    opacity: 0.75;
    width: 349px;
  }

  button {
    margin-bottom: 158px;
  }

  @media only screen and (max-width: 991px) {
    p {
      text-align: center;
    }
  }
`;
