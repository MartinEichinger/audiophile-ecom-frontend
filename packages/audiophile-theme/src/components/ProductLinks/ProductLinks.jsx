import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Card from "../Card/Card";

const ProductLinks = ({ state, actions, className, mediaQuery }) => {
  const debug = true;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/products/");
  const images = state.source.attachment;
  const products = state.source["products"];

  const prodListIDs = Object.values(data.items).map((entry) => {
    return entry.id;
  });

  if (debug)
    console.log("ProductLinks / before render", data, prodListIDs, products);

  const randomCards = () => {
    var rows = [];

    for (let i = 0; i < 3; i++) {
      var j = Math.floor(Math.random() * prodListIDs.length);

      const img_src = getImg(images[products[prodListIDs[j]].acf.img_mobile]);
      console.log("RandomCards", prodListIDs);

      rows.push(
        <CardI
          state={state}
          img_src={img_src}
          h6_cont={products[prodListIDs[j]].acf.heading
            .replace("Earphones", "")
            .replace("Headphones", "")}
          subtitle_cont="see product"
          i={i}
          key={i}
          link={"/product/" + products[prodListIDs[j]].slug}
          button="true"
        />
      );

      prodListIDs.splice(j, 1);
    }

    return rows;
  };

  return (
    <ProdLinks state={state} className={className}>
      <div className="prodlinks">
        <h3>You may also like</h3>
        <div className="body d-flex flex-column flex-sm-row">
          {randomCards()}
        </div>
      </div>
    </ProdLinks>
  );
};

export default connect(ProductLinks);

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};

// STYLING
const CardI = styled(Card)`
  a .card {
    height: 320px;
    justify-content: start;

    @media only screen and (max-width: 575px) {
      height: 120px;
      margin-bottom: 250px;
    }
  }

  a .card img {
    margin-top: 0px;
    padding-top: 10px;
    height: 300px;
    margin-bottom: 75px;
    //min-height: 300px;
    width: 100%;
    object-fit: contain;

    @media only screen and (max-width: 575px) {
      height: 110px;
      min-height: auto;
    }
  }

  a .card h6 {
    margin-bottom: 32px;
  }
`;

const ProdLinks = styled.div`
  .prodlinks {
    max-width: 1440px;
    margin: 0 auto 168px;
    background-color: rgba(0, 0, 0, 0);

    @media only screen and (max-width: 1439px) {
      margin-bottom: calc(10.11905vw + 22px);
    }
  }

  .prodlinks h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 64px;
  }

  .prodlinks .body {
    padding: 0px 165px 0px;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }
  }
`;
