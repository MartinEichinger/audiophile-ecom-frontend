import React, { useEffect, useState } from "react";

import { connect } from "frontity";

import HomeEntry from "../HomeEntry/HomeEntry";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeBestof from "../HomeBestof/HomeBestof";

const Home = ({ state, actions, libraries, mediaQuery }) => {
  const debug = true;

  // MEDIA DATA
  const [mediaData, setData] = useState({
    isReady: false,
    items: [],
  });

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch("/");
    getMedia(libraries, state, setData);
    if (debug) console.log("Home/useEffect: ", state.source);
  }, []);

  // 2. GET
  const data = state.source.get("/");

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];

  // Responsive Image
  var entry_img;

  if (mediaQuery.isLg) {
    entry_img = entry?.acf.home_entry_img_desktop;
  } else if (mediaQuery.isSm) {
    entry_img = entry?.acf.home_entry_img_tablet;
  } else if (mediaQuery.isXS) {
    entry_img = entry?.acf.home_entry_img_mobile;
  }

  return (
    <>
      <HomeEntry id={entry_img} entry={entry} mediaQuery={mediaQuery} />
      <HomeLinks />
      <HomeBestof mediaQuery={mediaQuery} />
      <HomeAbout mediaQuery={mediaQuery} />
    </>
  );
};

export default connect(Home);
const getMedia = async (libraries, state, setData) => {
  // Get other images
  const response = await libraries.source.api.get({
    endpoint: `media/?per_page=100`,
    //endpoint: "media",
    //params: {
    //  parent: id,
    //},
  });

  const entitiesAdded = await libraries.source.populate({ response, state });

  await setData({
    isReady: true,
    items: entitiesAdded,
  });
};
