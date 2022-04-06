import React, { useEffect, useState } from "react";

import { connect } from "frontity";

import ProductEntry from "../ProductEntry/ProductEntry";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import ProductCardIII from "../ProductCardIII/ProductCardIII";

const ProductDetail = ({ state, actions, libraries, mediaQuery, link }) => {
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
      <HomeLinks />
      <HomeAbout entry={entry} mediaQuery={mediaQuery} />
    </>
  );
};

export default connect(ProductDetail);
