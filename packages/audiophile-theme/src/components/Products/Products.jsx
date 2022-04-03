import React, { useEffect, useState } from "react";

import { connect } from "frontity";

import ProductEntry from "../ProductEntry/ProductEntry";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import ProductCardII from "../ProductCardII/ProductCardII";

const Products = ({ state, actions, libraries, mediaQuery }) => {
  const debug = false;

  // MEDIA DATA
  const [mediaData, setData] = useState({
    isReady: false,
    items: [],
  });

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch(state.router.link);
    getMedia(libraries, state, setData);
    if (debug) console.log("product/useEffect: ", data);
  }, []);

  // 2. GET
  const data = state.source.get(state.router.link);
  const data_prod = state.source.get("/products/");

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];
  const products = state.source["products"];

  if (debug)
    console.log("product/entries: ", data, entry, mediaQuery, products);

  return (
    <>
      <ProductEntry entry={entry} mediaQuery={mediaQuery} />
      <ProductCardII products={products} mediaQuery={mediaQuery} />
      <HomeLinks />
      <HomeAbout entry={entry} mediaQuery={mediaQuery} />
    </>
  );
};

export default connect(Products);

const getMedia = async (libraries, state, setData) => {
  // Get other images
  const response = await libraries.source.api.get({
    endpoint: `media/?per_page=100`,
  });

  const entitiesAdded = await libraries.source.populate({ response, state });

  await setData({
    isReady: true,
    items: entitiesAdded,
  });
};
