import React, { useEffect, useState } from "react";

import { connect } from "frontity";

import HomeEntry from "../HomeEntry/HomeEntry";
import HomeLinks from "../HomeLinks/HomeLinks";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeBestof from "../HomeBestof/HomeBestof";

const Home = ({ state, actions, libraries, mediaQuery }) => {
  const debug = false;

  // MEDIA DATA
  const [mediaData, setData] = useState({
    isReady: false,
    items: [],
  });

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch("/");
    getMedia(libraries, state, setData);
    if (debug) console.log("home.js/useEffect: ", data);
  }, []);

  // 2. GET
  const data = state.source.get("/");

  // 3. GET ENTITIES
  const entry = state.source.page[data.id];

  if (debug) console.log("home.js/entries: ", entry);

  return (
    <>
      <HomeEntry
        id={
          mediaQuery.isLg
            ? entry?.acf.home_entry_img_desktop
            : entry?.acf.home_entry_img_tablet
        }
        entry={entry}
        mediaQuery={mediaQuery}
      />
      <HomeLinks />
      <HomeBestof mediaQuery={mediaQuery} />
      <HomeAbout entry={entry} mediaQuery={mediaQuery} />
    </>
  );
};

export default connect(Home);

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
