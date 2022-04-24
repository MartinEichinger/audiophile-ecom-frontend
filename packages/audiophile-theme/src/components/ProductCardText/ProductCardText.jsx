import { connect, styled } from "frontity";

const ProductCardText = ({ state, libraries, mediaQuery }) => {
  const debug = false;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/producto/");
  const products = data.productData;

  const Html2React = libraries.html2react.Component;

  if (debug) console.log("ProductCardText: ", products);

  return (
    <ProductCards state={state}>
      {Object.values(products).map((entry, i) => {
        if (state.router.link.includes(entry.slug)) {
          if (debug) console.log("ProductCardText", entry);

          return (
            <ProdCardItemText
              state={state}
              products={entry}
              mediaQuery={mediaQuery}
              key={i}
            >
              <div className="crd d-flex flex-column flex-lg-row justify-content-center align-items-start">
                <div className="col_1">
                  <div className="text d-flex flex-column justify-content-center justify-content-lg-start align-items-start">
                    <h3>Features</h3>
                    <p>
                      <Html2React
                        html={getMetaData(entry.meta_data, "features")}
                      />
                    </p>
                  </div>
                </div>
                <div className="col_2">
                  <div className="text d-flex flex-column flex-sm-row flex-lg-column justify-content-start align-items-start">
                    <h3>In the box</h3>
                    <Html2React
                      html={getMetaData(entry.meta_data, "in_the_box")}
                    />
                  </div>
                </div>
              </div>
            </ProdCardItemText>
          );
        }
      })}
    </ProductCards>
  );
};

export default connect(ProductCardText);

// METHODS
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
const ProductCards = styled.div`
  margin-bottom: 0px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 0px;
  }
`;

const ProdCardItemText = styled.div`
  margin-bottom: 160px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 120px;
  }

  @media only screen and (max-width: 575px) {
    margin-bottom: 88px;
  }

  .crd {
    border-radius: 8px;
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
    }
  }

  .crd .col_1 {
    width: 60%;
    height: inherit;
    margin-right: 125px;

    @media only screen and (max-width: 991px) {
      width: calc(100vw - 78px);
      height: 100%;
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: 120px;
    }

    @media only screen and (max-width: 767px) {
      width: calc(100vw - (16.66667vw - 48px));
    }

    @media only screen and (max-width: 575px) {
      width: calc(100vw - 48px);
      height: 100%;
      margin-right: 0px;
      margin-bottom: 88px;
    }
  }

  .crd .col_1 h3 {
    margin-bottom: 32px;

    @media only screen and (max-width: 575px) {
      margin-bottom: 24px;
    }
  }

  .crd .col_1 p {
    opacity: 0.5;
  }

  .crd .col_2 {
    width: 40%;
    height: inherit;

    @media only screen and (max-width: 991px) {
      width: calc(100vw - 78px);
      height: 100%;
      margin: 0px;
    }

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

  .crd .col_2 h3 {
    margin-bottom: 32px;

    @media only screen and (max-width: 991px) {
      width: 50%;
    }
  }

  .crd .col_2 ul,
  .crd .col_2 li {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .crd .col_2 li {
    margin-bottom: 8px;
    color: ${({ state }) => state.theme.grey};
  }

  .crd .col_2 li code {
    margin-right: 24px;
    color: ${({ state }) => state.theme.brown};
    text-transform: none;
    font-size: inherit;
    font-family: inherit;
    word-wrap: inherit;
  }
`;
