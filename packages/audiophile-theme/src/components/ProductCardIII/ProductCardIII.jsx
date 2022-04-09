import { connect, styled } from "frontity";
import NumberFormat from "react-number-format";
import Counter from "../Counter/Counter";

const ProductCardIII = ({ state, mediaQuery }) => {
  const debug = true;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/products/");

  const images = state.source.attachment;

  const products = state.source["products"];
  const links = state.source["home-links"];

  const entry = { id: 10 };
  const textRight = true;

  if (debug)
    console.log(
      "ProductCardIII: ",
      data,
      images,
      products,
      mediaQuery,
      state.router.link,
      links
    );

  return (
    <ProductCards state={state}>
      {Object.values(products).map((entry, i) => {
        if (state.router.link.includes(entry.slug)) {
          const img_src = getImg(
            mediaQuery.isLg
              ? images[products[entry.id].acf.img_desktop]
              : mediaQuery.isSm
              ? images[products[entry.id].acf.img_tablet]
              : images[products[entry.id].acf.img_mobile]
          );

          console.log("Prod: ", state.router.link, entry.slug);

          return (
            <ProdCardItemIII
              state={state}
              products={products[entry.id]}
              textRight={textRight}
              mediaQuery={mediaQuery}
              key={i}
            >
              <div className="back">
                <a href="javascript:history.back();">Go Back</a>
              </div>
              <div className="crd d-flex justify-content-center align-items-center flex-column flex-lg-row">
                <div className="col_1">
                  <div className="pict d-flex justify-content-center align-items-center">
                    <img src={img_src} />
                  </div>
                </div>
                <div className="col_2 d-flex justify-content-start justify-content-sm-center align-items-center">
                  <div className="text d-flex flex-column justify-content-center justify-content-lg-start align-items-center align-items-lg-start">
                    <overline>{products[entry.id].acf.subheading}</overline>
                    <h2>{products[entry.id].acf.heading}</h2>
                    <p>{products[entry.id].acf.body}</p>
                    <h6>
                      <NumberFormat
                        value={products[entry.id].acf.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </h6>
                    <div className="d-flex flex-row">
                      <CounterI />
                      <button className="default">Add to cart</button>
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

// STYLING
const CounterI = styled(Counter)`
  margin-right: 16px;
`;

const ProductCards = styled.div`
  padding-top: 200px;
  margin-bottom: 0px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 0px;
  }
`;

const ProdCardItemIII = styled.div`
  margin-bottom: 160px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 120px;
  }

  @media only screen and (max-width: 575px) {
    //margin-bottom: 24px;
  }

  .back {
    width: 1110px;
    margin: 0 auto 56px;
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

    @media only screen and (max-width: 1110px) {
      width: 100vw;
    }

    @media only screen and (max-width: 991px) {
      width: calc(100vw - 78px);
      height: auto;
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
    ${({ textRight }) =>
      textRight ? `margin-right: 15px;` : `margin-left: 15px;`}

    @media only screen and (max-width: 991px) {
      width: calc(100vw - 78px);
      height: 100%;
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: 52px;
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
      height: 100%;
      margin-right: 0px;
      margin-bottom: 24px;
    }
  }

  .crd .col_1 .pict,
  .crd .col_1 .pict img {
    height: inherit;
    width: 100%;
    overflow: hidden;

    @media only screen and (max-width: 991px) {
      width: calc(100vw - 78px);
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
    }
  }

  .crd .col_2 {
    width: 50%;
    overflow: hidden;
    height: inherit;
    ${({ textRight }) =>
      !textRight ? `margin-right: 15px;` : `margin-left: 15px;`}

    @media only screen and (max-width: 991px) {
      width: calc(100vw - 78px);
      height: 100%;
      margin: 0px;
    }

    @media only screen and (max-width: 575px) {
      //padding-left: 24px;
      width: calc(100vw - 48px);
      height: 100%;
      margin-left: 0px;
    }
  }

  .crd .col_2 .text {
    width: 445px;

    @media only screen and (max-width: 1439px) {
      width: calc(14.88095vw + 136px);
    }

    @media only screen and (max-width: 991px) {
      text-align: center;
      width: 572px;
    }

    @media only screen and (max-width: 575px) {
      width: auto;
    }
  }

  .crd .col_2 overline {
    margin-bottom: 16px;
    color: ${({ state }) => state.theme.brown};
  }

  .crd .col_2 h2 {
    margin-bottom: 24px;

    @media only screen and (max-width: 991px) {
      width: 75%;
      margin-bottom: 32px;
    }
  }

  .crd .col_2 p {
    margin-bottom: 40px;
    opacity: 0.5;

    @media only screen and (max-width: 991px) {
      margin-bottom: 24px;
    }
  }

  .crd .col_2 h6 {
    margin-bottom: 45px;
  }
`;
