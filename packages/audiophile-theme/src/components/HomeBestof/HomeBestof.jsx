import { connect, styled } from "frontity";
import ProductCard from "../ProductCard/ProductCard";

const HomeBestof = ({ state, mediaQuery }) => {
  const debug = false;

  // 1. Fetch done with beforeSSR / in Home

  // 2. GET
  const data = state.source.get("/product-bestof/");

  const images = state.source.attachment;

  const entries = state.source["product-bestof"];

  // LOGGING
  if (debug) console.log("home-bestof/data: ", data);
  if (debug) console.log("home-bestof/entries: ", entries);
  if (debug) console.log("home-bestof/images: ", images);

  return (
    <Bestof state={state}>
      <div className="body d-flex flex-column">
        {Object.values(data.items).map((entry, i) => {
          const img_src = getImg(
            mediaQuery.isLg
              ? images[entries[entry.id].acf.img_desktop]
              : mediaQuery.isSm
              ? images[entries[entry.id].acf.img_tablet]
              : images[entries[entry.id].acf.img_mobile]
          );

          return (
            <ProductCard
              state={state}
              entries={entries}
              entry={entry}
              img_src={img_src}
              mediaQuery={mediaQuery}
              key={i}
            />
          );
        })}
      </div>
    </Bestof>
  );
};

export default connect(HomeBestof);

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};

// STYLING
const Bestof = styled.div`
  max-width: 1440px;
  margin: 0 auto 152px;

  @media only screen and (max-width: 1439px) {
    margin-bottom: calc(10.11905vw + 22px - 16px);
  }

  .body {
    padding: 0px 165px;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }

    @media only screen and (max-width: 682px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
`;
