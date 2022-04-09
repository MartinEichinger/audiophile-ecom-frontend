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
      <h3>You may also like</h3>
      <div className="body d-flex flex-column flex-sm-row">{randomCards()}</div>
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
  .card {
    height: 320px;
    justify-content: start;
  }

  .card img {
    margin-top: 0px;
    padding-top: 10px;
    height: 300px;
    margin-bottom: 75px;
  }

  .card h6 {
    margin-bottom: 32px;
  }
`;

const ProdLinks = styled.div`
  max-width: 1440px;
  margin: 0 auto 168px;
  background-color: rgba(0, 0, 0, 0);

  @media only screen and (max-width: 1439px) {
    margin-bottom: calc(10.11905vw + 22px);
  }

  h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 64px;
  }

  .body {
    padding: 0px 165px 0px;

    @media only screen and (max-width: 1439px) {
      padding-top: calc(7.738095vw + 89px);
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }
  }
`;
