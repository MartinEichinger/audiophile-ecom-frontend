import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Card from "../Card/Card";

const ProductLinks = ({ state, actions, className, mediaQuery }) => {
  const debug = false;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/producto/");
  const images = state.source.attachment;
  const products = data.productData;

  //var len = products.length;
  const prodListIDs = [...Array(products.length)].map((u, i) => i);

  if (debug)
    console.log(
      "ProductLinks / before render",
      data,
      products,
      products.length
    );

  const randomCards = () => {
    var rows = [];

    for (let i = 0; i < 3; i++) {
      var j = Math.floor(Math.random() * prodListIDs.length);

      const img_src = getImg(
        images[getMetaData(products[j].meta_data, "img_mobile")]
      );

      rows.push(
        <CardI
          state={state}
          img_src={img_src}
          h6_cont={products[j].name
            .replace("Earphones", "")
            .replace("Headphones", "")}
          subtitle_cont="see product"
          i={i}
          key={i}
          link={"/product/" + products[j].slug}
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

const getMetaData = (obj, key) => {
  var content = obj.filter((data) => {
    var val = Object.values(data);
    var val2 = val.includes(key);
    if (val2) {
      return Object.values(val);
    }
  });

  return Object.values(content)[0].value;
};

// STYLING
const CardI = styled(Card)`
  a .card {
    height: 320px;
    justify-content: start;

    @media only screen and (max-width: 575px) {
      height: 120px;
      margin-bottom: calc(127px + 56px);
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
      margin-bottom: 36px;
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

    @media only screen and (max-width: 575px) {
      margin-bottom: 0px;
    }
  }

  .prodlinks h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 64px;

    @media only screen and (max-width: 575px) {
      margin-bottom: 40px;
    }
  }

  .prodlinks .body {
    padding: 0px 165px 0px;

    @media only screen and (max-width: 1439px) {
      padding-left: calc(18.60119vw - 103px);
      padding-right: calc(18.60119vw - 103px);
    }
  }
`;
