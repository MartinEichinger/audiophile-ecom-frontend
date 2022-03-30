import { connect, styled } from "frontity";

import Pointer from "../pointer.png";

const Card = ({ state, img_src, h6_cont, subtitle_cont, i }) => {
  return (
    <CrdItem state={state}>
      <div
        className="card d-flex flex-column justify-content-center align-items-center"
        key={i}
      >
        <img src={img_src} alt="Navigation Items" />
        <h6>{h6_cont}</h6>
        <subtitle>
          {subtitle_cont}
          <i className="fa-solid fa-angle-right"></i>
        </subtitle>
      </div>
    </CrdItem>
  );
};

export default connect(Card);

// STYLING
const CrdItem = styled.div`
  .card {
    background-color: ${({ state }) => state.theme.lightGrey};
    border-radius: 8px;
    width: 350px;
    height: 204px;
    margin-right: 30px;
    cursor: url(${Pointer}), pointer;

    @media only screen and (max-width: 1439px) {
      height: calc(5.803571vw + 120px);
      width: calc(18.89881vw + 78px);
      margin-right: calc(2.97619vw - 13px);
    }

    @media only screen and (max-width: 575px) {
      height: 165px;
      width: auto;
      margin: 0 24px 68px;
    }
  }

  .card img {
    height: 215px;
    margin-top: -107px;

    @media only screen and (max-width: 1439px) {
      height: calc(11.16071vw + 54px);
      min-height: 140px;
      margin-top: calc(-1 / 2 * (11.16071vw + 54px));
    }

    @media only screen and (max-width: 575px) {
      height: 140px;
      margin-top: -70px;
    }
  }

  .card h6 {
    margin-top: -25px;
    margin-bottom: 15px;

    @media only screen and (max-width: 1439px) {
      margin-top: calc(7px - 2.23214vw);
    }
  }

  .card subtitle {
    opacity: 0.5;
  }

  .card:hover subtitle {
    color: ${({ state }) => state.theme.brown};
  }

  i {
    color: ${({ state }) => state.theme.brown};
    margin-left: 13px;
    position: inline;
  }
`;
