import { connect, styled } from "frontity";

const ProductCardImg = ({ state, mediaQuery }) => {
  const debug = false;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/producto/");
  const products = data.productData;
  const images = state.source.attachment;

  if (debug) console.log("ProductCardText: ", products);

  return (
    <ProductCardImgs state={state}>
      {Object.values(products).map((entry, i) => {
        if (state.router.link.includes(entry.slug)) {
          if (debug) console.log("ProductCardImg: ", entry);

          return (
            <ProdCardItemImg
              state={state}
              products={entry}
              mediaQuery={mediaQuery}
              key={i}
            >
              <div className="crd d-flex flex-column flex-sm-row justify-content-center align-items-stretch">
                <div className="col_1 d-flex flex-column justify-content-between">
                  <img
                    className="d-flex flex-fill"
                    src={getImg(
                      images[getMetaData(entry.meta_data, "img_small_i")]
                    )}
                    alt="Product Image"
                  />
                  <img
                    className="d-flex flex-fill"
                    src={getImg(
                      images[getMetaData(entry.meta_data, "img_small_ii")]
                    )}
                    alt="Product Image"
                  />
                </div>
                <div className="col_2">
                  <img
                    src={getImg(
                      images[getMetaData(entry.meta_data, "img_big")]
                    )}
                    alt="Product Image"
                  />
                </div>
              </div>
            </ProdCardItemImg>
          );
        }
      })}
    </ProductCardImgs>
  );
};

export default connect(ProductCardImg);

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
const ProductCardImgs = styled.div`
  margin-bottom: calc(160px - 32px);

  @media only screen and (max-width: 991px) {
    margin-bottom: 0px;
  }
`;

const ProdCardItemImg = styled.div`
  //margin-bottom: 160px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 120px;
  }

  @media only screen and (max-width: 575px) {
    margin-bottom: calc(120px - 32px);
  }

  .crd {
    border-radius: 8px;
    width: 1110px;
    margin: 0 auto;
    border: none;

    @media only screen and (max-width: 1190px) {
      width: calc(100vw - 80px);
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
    width: 40%;
    height: inherit;
    margin-right: 30px;

    @media only screen and (max-width: 991px) {
      margin-right: 18px;
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
      height: 100%;
      margin-right: 0px;
      //margin-bottom: 24px;
    }
  }

  .crd .col_1 img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 32px;

    @media only screen and (max-width: 991px) {
      margin-bottom: 20px;
    }
  }

  .crd .col_1 img:last-of-type {
    margin-bottom: 0px;

    @media only screen and (max-width: 575px) {
      margin-bottom: 20px;
    }
  }

  .crd .col_2 {
    width: 60%;
    height: inherit;

    @media only screen and (max-width: 767px) {
      width: calc(100vw - (16.66667vw - 48px));
    }

    @media only screen and (max-width: 575px) {
      //padding-left: 24px;
      width: calc(100vw - 48px);
      height: 100%;
      margin-left: 0px;
    }
  }

  .crd .col_2 img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 0px;
  }
`;
