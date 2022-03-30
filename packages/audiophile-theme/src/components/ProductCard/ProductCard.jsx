import { styled } from "frontity";
import Circle from "./pattern-circles.svg";

const ProductCard = ({ state, img_src, entries, entry, mediaQuery }) => {
  const debug = false;

  const bigImg = entries[entry.id].acf.big_medium_small[0] === "Big";
  const fullSize = entries[entry.id].acf.fullsize_img[0] === "Fullsize?";
  const textRight = entries[entry.id].acf.text_position[0] === "Right?";

  if (debug) console.log("ProductCard: ", bigImg, mediaQuery);
  return (
    <>
      {bigImg && (
        <ProdCardItemBig
          state={state}
          entries={entries[entry.id]}
          img_src={img_src}
          Circle={Circle}
          bigImg={bigImg}
          fullSize={fullSize}
          textRight={textRight}
          mediaQuery={mediaQuery}
        >
          <div className="crd d-flex justify-content-center align-items-center flex-column flex-lg-row">
            <div className="col_1">
              <div className="pict d-flex justify-content-center">
                {fullSize ? null : <img src={img_src} alt="Product Images" />}
              </div>
            </div>
            <div className="col_2 d-flex justify-content-center">
              <div className="text d-flex flex-column">
                {bigImg ? (
                  <h1>{entries[entry.id].acf.heading}</h1>
                ) : (
                  <h4>{entries[entry.id].acf.heading}</h4>
                )}
                {bigImg ? <p>{entries[entry.id].acf.body}</p> : null}
                <button className={bigImg ? "full" : "empty"}>
                  {entries[entry.id].acf.button}
                </button>
              </div>
            </div>
          </div>
        </ProdCardItemBig>
      )}
      {!bigImg && (
        <ProdCardItemMedium
          state={state}
          entries={entries[entry.id]}
          img_src={img_src}
          Circle={Circle}
          bigImg={bigImg}
          fullSize={fullSize}
          textRight={textRight}
          mediaQuery={mediaQuery}
        >
          <div
            className={
              textRight
                ? fullSize
                  ? "crd d-flex justify-content-center align-items-center flex-row"
                  : "crd d-flex justify-content-center align-items-center flex-column flex-sm-row"
                : fullSize
                ? "crd d-flex justify-content-center align-items-center flex-row-reverse"
                : "crd d-flex justify-content-center align-items-center flex-column-reverse flex-sm-row-reverse"
            }
          >
            <div className="col_1">
              <div className="pict d-flex justify-content-center align-items-center">
                {fullSize ? null : <img src={img_src} />}
              </div>
            </div>
            <div className="col_2 d-flex justify-content-start justify-content-sm-center align-items-center">
              <div className="text d-flex flex-column justify-content-start align-items-start">
                <h4>{entries[entry.id].acf.heading}</h4>
                <button className="empty">
                  {entries[entry.id].acf.button}
                </button>
              </div>
            </div>
          </div>
        </ProdCardItemMedium>
      )}
    </>
  );
};

export default ProductCard;

// STYLING
const ProdCardItemBig = styled.div`
  margin-bottom: 48px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 32px;
  }

  .crd {
    height: 560px;
    background-color: ${({ state }) => state.theme.brown};
    background-image: ${({ img_src, fullSize }) =>
      fullSize ? "url(" + img_src + ")" : "url(" + Circle + ")"};
    background-repeat: no-repeat;
    background-position: -90% 15%;
    border-radius: 8px;
    border: none;

    @media only screen and (max-width: 991px) {
      height: 720px;
      background-position: 50% 125%;
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
      height: 50%;
    }

    @media only screen and (max-width: 575px) {
      width: auto;
    }
  }

  .crd .col_1 .pict {
    height: inherit;
    overflow: hidden;
    align-items: end;

    @media only screen and (max-width: 991px) {
      height: 100%;
      align-items: center;
    }
  }

  .crd .col_2 {
    width: 50%;
    border-radius: 8px;
    overflow: hidden;
    height: inherit;
    ${({ textRight }) =>
      !textRight ? `margin-right: 15px;` : `margin-left: 15px;`}
    align-items: center;

    @media only screen and (max-width: 991px) {
      height: 50%;
      align-items: start;
      width: 100%;
      padding: 0 24px;
      margin-left: 0px;
      margin-right: 0px;
    }
  }

  .crd .col_1 img {
    height: 448px;
    margin-bottom: -7px;
    margin-left: 100px;

    @media only screen and (max-width: 991px) {
      height: 65%;
      margin-bottom: 0px;
      margin-left: 0px;
    }
  }

  .crd .col_2 .text {
    width: 350px;
    align-items: start;

    @media only screen and (max-width: 1439px) {
      //width: calc(14.88095vw + 136px);
    }

    @media only screen and (max-width: 991px) {
      align-items: center;
      justify-content: start;
      text-align: center;
    }

    @media only screen and (max-width: 575px) {
      width: auto;
    }
  }

  .crd .col_2 h1 {
    color: ${({ state }) => state.theme.white};
    margin-bottom: 24px;
  }

  .crd .col_2 h4 {
    margin-bottom: 32px;
  }

  .crd .col_2 p {
    color: ${({ state }) => state.theme.white};
    opacity: 0.75;
    margin-bottom: 40px;
  }
`;

const ProdCardItemMedium = styled.div`
  margin-bottom: 48px;

  @media only screen and (max-width: 991px) {
    margin-bottom: 32px;
  }

  .crd {
    background-image: ${({ img_src, fullSize }) =>
      fullSize ? "url(" + img_src + ")" : "url(" + Circle + ")"};
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 8px;
    height: 320px;
    border: none;

    @media only screen and (max-width: 575px) {
      ${({ fullSize }) => !fullSize && "height: auto;"}
    }
  }

  .crd .col_1 {
    width: 50%;
    height: inherit;
    border: ${({ fullSize, state }) =>
      !fullSize ? `1px solid ${state.theme.grey}` : null};
    border-radius: 8px;
    overflow: hidden;
    ${({ textRight }) =>
      textRight ? `margin-right: 15px;` : `margin-left: 15px;`}

    ${({ fullSize }) =>
      !fullSize &&
      `@media only screen and (max-width: 575px) {
      width: 100%;
      height: 200px;
      margin-right: 0px;
      margin-bottom: 24px;
    }`}
  }

  .crd .col_1 .pict {
    height: inherit;
    overflow: hidden;
  }

  .crd .col_2 {
    width: 50%;
    border: ${({ fullSize, state }) =>
      !fullSize ? `1px solid ${state.theme.lightGrey}` : null};
    border-radius: 8px;
    overflow: hidden;
    height: inherit;
    ${({ textRight }) =>
      !textRight ? `margin-right: 15px;` : `margin-left: 15px;`}
    ${({ fullSize, state }) =>
      !fullSize ? `background-color: ${state.theme.lightGrey}` : null};

    @media only screen and (max-width: 575px) {
      ${({ fullSize }) => fullSize && "margin-left: 24px;"}
      ${({ fullSize }) => !fullSize && "padding-left: 24px;"}
      ${({ fullSize }) => fullSize && "width: 100%;"} 
      ${({ fullSize }) => fullSize && "text-align: left;"}
      ${({ fullSize }) => !fullSize && "width: 100%;"}
      ${({ fullSize }) => !fullSize && "height: 200px;"}
      ${({ fullSize }) => !fullSize && "margin-left: 0px;"}
    }
  }

  .crd .col_1 img {
    height: inherit;
    width: 100%;
    object-fit: cover;
    margin-bottom: 0px;
    margin-left: 0px;
  }

  .crd .col_2 .text {
    width: 350px;

    @media only screen and (max-width: 1439px) {
      width: calc(14.88095vw + 136px);
    }

    @media only screen and (max-width: 991px) {
      text-align: center;
    }

    @media only screen and (max-width: 575px) {
      ${({ fullSize }) => fullSize && "width: auto;"}
      width: auto;
    }
  }

  .crd .col_2 h1 {
    color: ${({ state }) => state.theme.white};
    margin-bottom: 24px;
  }

  .crd .col_2 h4 {
    margin-bottom: 32px;

    @media only screen and (max-width: 575px) {
      ${({ fullSize }) => fullSize && "text-align: left;"}
    }
  }

  .crd .col_2 p {
    color: ${({ state }) => state.theme.white};
    opacity: 0.75;
    margin-bottom: 40px;
  }
`;
