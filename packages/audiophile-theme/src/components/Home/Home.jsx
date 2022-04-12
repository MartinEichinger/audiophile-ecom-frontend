import React, { useEffect, useState } from "react";

import { connect } from "frontity";

import HomeEntry from "../HomeEntry/HomeEntry";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeBestof from "../HomeBestof/HomeBestof";

const Home = ({ state, actions, mediaQuery }) => {
  const debug = true;

  // MEDIA DATA
  const [mediaData, setData] = useState({
    isReady: false,
    items: [],
  });

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch("/");
    //getMedia(libraries, state, setData);
    if (debug)
      console.log("Home/useEffect: ", state.source, state.source["data"]);
  }, []);

  // 2. GET
  const data = state.source.get("/");

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];

  console.log("Home / before render: ");

  return (
    <>
      <HomeEntry entry={entry} mediaQuery={mediaQuery} />
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

  const status = { imgIsLoaded: true };

  await libraries.source.populate({ status, state });

  await setData({
    isReady: true,
    items: entitiesAdded,
  });
};
