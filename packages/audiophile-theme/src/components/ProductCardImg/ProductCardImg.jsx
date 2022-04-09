import { connect, styled } from "frontity";

const ProductCardImg = ({ state, mediaQuery }) => {
  const debug = true;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/products/");
  const products = state.source["products"];
  const images = state.source.attachment;

  if (debug) console.log("ProductCardText: ", products);

  return (
    <ProductCardImgs state={state}>
      {Object.values(products).map((entry, i) => {
        if (state.router.link.includes(entry.slug)) {
          if (debug) console.log("ProductCardImg: ", products[entry.id]);

          return (
            <ProdCardItemImg
              state={state}
              products={products[entry.id]}
              mediaQuery={mediaQuery}
              key={i}
            >
              <div className="crd d-flex flex-column flex-lg-row justify-content-center align-items-start">
                <div className="col_1">
                  <img
                    src={getImg(images[products[entry.id].acf.img_small_i])}
                    alt="Product Image"
                  />
                  <img
                    src={getImg(images[products[entry.id].acf.img_small_ii])}
                    alt="Product Image"
                  />
                </div>
                <div className="col_2">
                  <img
                    src={getImg(images[products[entry.id].acf.img_big])}
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

// STYLING
const ProductCardImgs = styled.div`
  margin-bottom: 0px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 0px;
  }
`;

const ProdCardItemImg = styled.div`
  margin-bottom: 160px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 120px;
  }

  @media only screen and (max-width: 575px) {
    //margin-bottom: 24px;
  }

  .crd {
    border-radius: 8px;
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
    width: 40%;
    height: inherit;
    margin-right: 30px;

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

  .crd .col_1 img {
    border-radius: 8px;
    margin-bottom: 32px;
  }

  .crd .col_2 {
    width: 60%;
    height: inherit;

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

  .crd .col_2 img {
    border-radius: 8px;
    margin-bottom: 32px;
  }
`;