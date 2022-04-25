import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import ProductCardIII from "../ProductCardIII/ProductCardIII";
import ProductCardText from "../ProductCardText/ProductCardText";
import ProductCardImg from "../ProductCardImg/ProductCardImg";
import ProductLinks from "../ProductLinks/ProductLinks";

const ProductDetail = ({ state, actions, mediaQuery, link }) => {
  const debug = false;

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch(state.router.link);
    if (debug) console.log("ProductDetail/useEffect: ", data);
  }, []);

  // 2. GET
  const data = state.source.get(state.router.link);

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];

  if (debug) console.log("productdetail/entries: ", mediaQuery, link);

  return (
    <>
      <ProductCardIII mediaQuery={mediaQuery} />
      <ProductCardText mediaQuery={mediaQuery} />
      <ProductCardImg mediaQuery={mediaQuery} />
      <ProductLinks />
      <HomeLinksI />
      <HomeAbout entry={entry} mediaQuery={mediaQuery} />
    </>
  );
};

export default connect(ProductDetail);

const HomeLinksI = styled(HomeLinks)`
  .body {
    padding-top: 220px;

    @media only screen and (max-width: 575px) {
      padding-top: 120px;
    }
  }
`;
