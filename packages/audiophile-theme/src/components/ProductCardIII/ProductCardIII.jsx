import { useState } from "react";
import { connect, styled } from "frontity";
import NumberFormat from "react-number-format";
import Counter from "../Counter/Counter";
import Link from "@frontity/components/link";

const ProductCardIII = ({ actions, state, libraries, mediaQuery }) => {
  const debug = false;

  const [count, setCount] = useState(1);

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/producto/");
  const products = data.productData;
  const images = state.source.attachment;

  const Html2React = libraries.html2react.Component;

  if (debug) console.log("ProductCardIII: Data ", data);
  if (debug) console.log("ProductCardIII: Product", products);
  //if (debug) console.log("ProductCardIII: Products", products);

  return (
    <ProductCards state={state}>
      {Object.values(products).map((entry, i) => {
        if (debug) console.log("ProductCardIII: entry ", entry);
        if (state.router.link.includes(entry.slug)) {
          //var imgDesk = getMetaData(entry.meta_data, "img_prod_desktop");
          const img_src_desktop = getImg(
            images[getMetaData(entry.meta_data, "img_prod_desktop")]
          );
          const img_src_tablet = getImg(
            images[getMetaData(entry.meta_data, "img_prod_tablet")]
          );
          const img_src_mobile = getImg(
            images[getMetaData(entry.meta_data, "img_prod_mobile")]
          );

          const entry_string = entry.price;
          var entry_price = entry_string
            .replace(" ", "")
            .replace("€", "")
            .replace(",", ".");
          entry_price = parseFloat(entry_price);

          return (
            <ProdCardItemIII
              state={state}
              products={entry}
              mediaQuery={mediaQuery}
              key={i}
            >
              <div className="back">
                <a onClick={() => history.back()}>Go Back</a>
              </div>
              <div className="crd d-flex justify-content-center align-items-center flex-column flex-sm-row">
                <div className="col_1 d-flex align-items-center">
                  <img src={img_src_desktop} className="d-none d-lg-block" />
                  <img
                    src={img_src_tablet}
                    className="d-none d-sm-block d-lg-none"
                  />
                  <img src={img_src_mobile} className="d-block d-sm-none" />
                </div>
                <div className="col_2 d-flex justify-content-start justify-content-sm-center align-items-center">
                  <div className="text d-flex flex-column justify-content-center justify-content-lg-start align-items-start">
                    <p className="overline">
                      {getMetaData(entry.meta_data, "subheading")}
                    </p>
                    <h2>{entry?.name}</h2>
                    <p>
                      <Html2React html={entry?.short_description} />
                    </p>
                    <h6>{entry.price}</h6>
                    <div className="d-flex flex-row">
                      <CounterI count={count} setCount={setCount} />
                      <button
                        className="default"
                        data-bs-toggle="modal"
                        data-bs-target="#createPlanModal"
                        onClick={() =>
                          actions.theme.addToCart(entry.id, count, entry_price)
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ProdCardItemIII>
          );
        }
      })}
    </ProductCards>
  );
};

export default connect(ProductCardIII);

// METHODS
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
const CounterI = styled(Counter)`
  margin-right: 16px;
`;

const ProductCards = styled.div`
  padding-top: 200px;
  margin-bottom: 0px;

  @media only screen and (max-width: 991px) {
    padding-top: 122px;
  }
`;

const ProdCardItemIII = styled.div`
  margin-bottom: 160px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 120px;
  }

  .back {
    width: 1110px;
    margin: 0 auto 56px;

    @media only screen and (max-width: 1190px) {
      width: calc(100vw - 80px);
    }

    @media only screen and (max-width: 991px) {
      margin-bottom: 24px;
    }

    @media only screen and (max-width: 767px) {
      width: calc(100vw - (16.66667vw - 48px));
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
    }
  }

  .back a {
    color: ${({ state }) => state.theme.black};
    opacity: 0.5;
  }

  .crd {
    border-radius: 8px;
    height: 560px;
    width: 1110px;
    margin: 0 auto;
    border: none;

    @media only screen and (max-width: 1190px) {
      width: calc(100vw - 80px);
    }

    @media only screen and (max-width: 991px) {
      height: auto;
    }

    @media only screen and (max-width: 767px) {
      width: calc(100vw - (16.66667vw - 48px));
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
      height: auto;
    }
  }

  .crd .col_1 {
    width: 50%;
    height: inherit;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 15px;

    @media only screen and (max-width: 991px) {
      padding-right: 69px;
      height: 480px;
      margin-right: 0px;
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
      height: 100%;
      padding-right: 0px;
      margin-bottom: 24px;
    }
  }

  .crd .col_1 img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;

    @media only screen and (max-width: 991px) {
      height: 480px;
    }
  }

  .crd .col_2 {
    width: 50%;
    overflow: hidden;
    height: inherit;
    margin-right: 15px;

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
      height: 100%;
      margin-right: 0px;
    }
  }

  .crd .col_2 .text {
    width: 445px;

    @media only screen and (max-width: 1439px) {
      //width: calc(14.88095vw + 136px);
    }

    @media only screen and (max-width: 991px) {
      text-align: left;
      width: 100%;
    }

    @media only screen and (max-width: 575px) {
      width: auto;
    }
  }

  .crd .col_2 .overline {
    margin-bottom: 16px;
    color: ${({ state }) => state.theme.brown};
  }

  .crd .col_2 h2 {
    margin-bottom: 24px;

    @media only screen and (max-width: 991px) {
      width: 100%;
      margin-bottom: 32px;
    }
  }

  .crd .col_2 p {
    margin-bottom: 40px;
    opacity: 0.5;

    @media only screen and (max-width: 991px) {
      margin-bottom: 32px;
    }
  }

  .crd .col_2 h6 {
    margin-bottom: 45px;

    @media only screen and (max-width: 991px) {
      width: 100%;
      margin-bottom: 32px;
    }
  }
`;
