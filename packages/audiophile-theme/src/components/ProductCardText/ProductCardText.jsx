import { connect, styled } from "frontity";

const ProductCardText = ({ state, mediaQuery }) => {
  const debug = true;
  console.log("txt: ", state);
  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/products/");
  const products = state.source["products"];
  const textRight = true;

  return (
    <ProductCards state={state}>
      {Object.values(products).map((entry, i) => {
        console.log("txt: ", entry);

        if (state.router.link.includes(entry.slug)) {
          return (
            <ProdCardItemText
              state={state}
              products={products[entry.id]}
              textRight={textRight}
              mediaQuery={mediaQuery}
              key={i}
            >
              <div className="crd d-flex justify-content-center align-items-center flex-column flex-lg-row">
                <div className="col_1">
                  <div className="text d-flex flex-column justify-content-center justify-content-lg-start align-items-center align-items-lg-start">
                    <h3>Features</h3>
                    <p>{products[entry.id].acf.body}</p>
                  </div>
                </div>
                <div className="col_2 d-flex justify-content-start justify-content-sm-center align-items-center">
                  <div className="text d-flex flex-column justify-content-center justify-content-lg-start align-items-center align-items-lg-start">
                    <h3>In the box</h3>
                    <p>{products[entry.id].acf.body}</p>
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

// STYLING
const ProductCards = styled.div`
  padding-top: 200px;
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
`;
