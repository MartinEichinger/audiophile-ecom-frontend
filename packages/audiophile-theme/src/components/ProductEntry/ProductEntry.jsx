import React from "react";
import { connect, styled } from "frontity";

const ProductEntry = ({ state, id, entry }) => {
  const debug = false;

  // 1. Fetch done in Home
  // 2. GET
  const data = state.source;

  const img_url = state.source?.attachment[id]?.source_url; //guid.rendered;

  if (debug)
    console.log(
      "Product/data: ",
      id,
      state.source,
      state.source.attachment[id]
    );

  return (
    <Background img_url={img_url} state={state}>
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
  }

  h2 {
    text-align: center;
    color: ${({ state }) => state.theme.white};
  }
`;
