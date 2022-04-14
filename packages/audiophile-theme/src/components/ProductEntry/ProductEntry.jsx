import React from "react";
import { connect, styled } from "frontity";

const ProductEntry = ({ state, id, entry }) => {
  const debug = true;

  if (debug) console.log("Product/data: ", entry);

  return (
    <Background state={state}>
      <div className="body d-flex align-items-center justify-content-center">
        <h2>{entry.title.rendered}</h2>
      </div>
    </Background>
  );
};

export default connect(ProductEntry);

// STYLING
const Background = styled.div`
  background-color: ${({ state }) => state.theme.lightBlack};

  .body {
    max-width: ${({ state }) => state.theme.maxWidth};
    margin: 0px auto 160px;
    height: 332px;
    padding-top: 92px;

    @media only screen and (max-width: 575px) {
      height: 195px;
      margin-bottom: 64px;
    }
  }

  h2 {
    text-align: center;
    color: ${({ state }) => state.theme.white};
  }
`;
