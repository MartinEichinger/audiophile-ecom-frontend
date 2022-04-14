import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Card from "../Card/Card";

const HomeLinks = ({ state, actions, className }) => {
  const debug = false;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/home-links/");
  const images = state.source.attachment;
  const entries = state.source["home-links"];

  if (debug) console.log("HomeLinks / before render");

  return (
    <Links state={state} className={className}>
      <div className="body d-flex flex-column flex-sm-row">
        {Object.values(data.items).map((entry, i) => {
          const img_src = getImg(images[entries[entry.id].acf.img]);

          return (
            <Card
              state={state}
              img_src={img_src}
              h6_cont={entries[entry.id].acf.h6}
              subtitle_cont={entries[entry.id].acf.subtitle}
              i={i}
              key={i}
              link={"/" + entries[entry.id].slug}
            />
          );
        })}
      </div>
    </Links>
  );
};

export default connect(HomeLinks);

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};

// STYLING
const Links = styled.div`
  max-width: 1440px;
  margin: 0 auto 168px;
  background-color: rgba(0, 0, 0, 0);

  @media only screen and (max-width: 1439px) {
    margin-bottom: calc(10.11905vw + 22px);
  }

  .body {
    padding: 200px 165px 0px;

    @media only screen and (max-width: 1439px) {
      padding-top: calc(7.738095vw + 89px);
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }
  }
`;
