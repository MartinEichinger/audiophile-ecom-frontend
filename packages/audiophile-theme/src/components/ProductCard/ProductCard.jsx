import { styled } from "frontity";
import Circle from "./pattern-circles.svg";

const ProductCard = ({ state, img_src, entries, entry, mediaQuery }) => {
  const debug = true;

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
                {fullSize ? null : <img src={img_src} />}
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
              !bigImg && textRight
                ? "crd d-flex justify-content-center align-items-center flex-row"
                : !bigImg
                ? "crd d-flex justify-content-center align-items-center flex-row-reverse"
                : "crd d-flex justify-content-center align-items-center flex-column flex-lg-row"
            }
          >
            <div className="col_1">
              <div
                className={
                  bigImg && mediaQuery.isLg
                    ? "pict d-flex justify-content-center align-items-end"
                    : "pict d-flex justify-content-center align-items-center"
                }
              >
                {fullSize ? null : <img src={img_src} />}
              </div>
            </div>
            <div
              className={
                bigImg && !mediaQuery.isLg
                  ? "col_2 d-flex justify-content-center align-items-start"
                  : "col_2 d-flex justify-content-center align-items-center"
              }
            >
              <div
                className={
                  bigImg && mediaQuery.isLg
                    ? "text d-flex flex-column align-items-start"
                    : "text d-flex flex-column justify-content-start align-items-center"
                }
              >
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
      width: calc(14.88095vw + 136px);
    }

    @media only screen and (max-width: 991px) {
      align-items: center;
      justify-content: start;
      text-align: center;
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
    background-color: ${({ state, bigImg }) =>
      bigImg ? state.theme.brown : null};
    background-image: ${({ img_src, fullSize }) =>
      fullSize ? "url(" + img_src + ")" : "url(" + Circle + ")"};
    background-repeat: no-repeat;
    background-position: ${({ bigImg }) => (bigImg ? `-90% 15%` : "50% 50%")};
    ${({ bigImg }) => (bigImg ? null : "background-size: cover")};
    border-radius: 8px;
    height: 320px;
    border: none;
  }

  .crd .col_1 {
    width: 50%;
    height: ${({ mediaQuery, bigImg }) =>
      bigImg && !mediaQuery.isLg ? `50%` : `inherit`};
    border: ${({ fullSize, bigImg, state }) =>
      !fullSize && !bigImg ? `1px solid ${state.theme.grey}` : null};
    border-radius: 8px;
    overflow: hidden;
    ${({ textRight }) =>
      textRight ? `margin-right: 15px;` : `margin-left: 15px;`}
  }

  .crd .col_1 .pict {
    height: ${({ mediaQuery, bigImg }) =>
      bigImg && !mediaQuery.isLg ? `100%` : `inherit`};
    overflow: hidden;
  }

  .crd .col_2 {
    width: 50%;
    border: ${({ fullSize, bigImg, state }) =>
      !fullSize && !bigImg ? `1px solid ${state.theme.lightGrey}` : null};
    border-radius: 8px;
    overflow: hidden;
    height: ${({ mediaQuery, bigImg }) =>
      bigImg && !mediaQuery.isLg ? `50%` : `inherit`};
    ${({ textRight }) =>
      !textRight ? `margin-right: 15px;` : `margin-left: 15px;`}
    ${({ fullSize, bigImg, state }) =>
      !fullSize && !bigImg
        ? `background-color: ${state.theme.lightGrey}`
        : null};
  }

  .crd .col_1 img {
    height: ${({ bigImg, mediaQuery }) =>
      bigImg ? (mediaQuery.isLg ? `448px` : "65%") : "inherit"};
    ${({ bigImg }) => (bigImg ? null : "width: 100%")};
    ${({ bigImg }) => (bigImg ? null : "object-fit: cover")};
    margin-bottom: ${({ bigImg, mediaQuery }) =>
      bigImg ? (mediaQuery.isLg ? `-7px` : "0px") : "0px"};
    margin-left: ${({ bigImg, mediaQuery }) =>
      bigImg ? (mediaQuery.isLg ? `100px` : "0px") : "0px"};
  }

  .crd .col_2 .text {
    width: 350px;

    @media only screen and (max-width: 1439px) {
      width: calc(14.88095vw + 136px);
    }

    @media only screen and (max-width: 991px) {
      text-align: center;
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
