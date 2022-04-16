import { connect, styled } from "frontity";
import { useState } from "react";
import Pointer from "../pointer.png";

const Counter = ({ state, className, count = 0, setCount }) => {
  //const [number, setNumber] = useState(count);

  const setNum = (key) => {
    console.log("hier: ", key);

    if (key === "plus") {
      //setNumber(number + 1);
      setCount(count + 1);
    } else if (key === "minus" && count > 0) {
      //setNumber(number - 1);
      setCount(count - 1);
    }
  };

  return (
    <Count
      state={state}
      className={
        className + " d-flex flex-row justify-content-around align-items-center"
      }
    >
      <p className="subtitle grey" onClick={() => setNum("minus")}>
        -
      </p>
      <p className="subtitle">{count}</p>
      <p className="subtitle grey" onClick={() => setNum("plus")}>
        +
      </p>
    </Count>
  );
};

export default connect(Counter);

const Count = styled.div`
  width: 120px;
  height: 48px;
  background-color: ${({ state }) => state.theme.lightGrey};

  .subtitle {
    margin: 0 !important;
  }
  .subtitle.grey {
    width: 25px;
    height: 25px;
    cursor: url(${Pointer}), pointer;
    color: ${({ state }) => state.theme.black};
    opacity: 0.25;
    font-weight: 800;
    text-align: center;
  }

  .subtitle.grey:hover {
    color: ${({ state }) => state.theme.brown};
    opacity: 1;
  }
`;
