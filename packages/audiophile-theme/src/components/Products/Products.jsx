import React, { useEffect, useState } from "react";

import { connect } from "frontity";

import ProductEntry from "../ProductEntry/ProductEntry";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import ProductCardII from "../ProductCardII/ProductCardII";

const Products = ({ state, actions, libraries, mediaQuery }) => {
  const debug = true;

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch(state.router.link);
    if (debug) console.log("Products/useEffect: ", data);
  }, []);

  // 2. GET
  const data = state.source.get(state.router.link);

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];

  if (debug) console.log("Products/before render: ", entry);

  return (
    <>
      <ProductEntry entry={entry} mediaQuery={mediaQuery} />
      <ProductCardII mediaQuery={mediaQuery} />
      <HomeLinks />
      <HomeAbout entry={entry} mediaQuery={mediaQuery} />
    </>
  );
};

export default connect(Products);
