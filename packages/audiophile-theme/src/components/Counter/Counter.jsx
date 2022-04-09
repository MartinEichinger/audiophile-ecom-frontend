import { connect, styled } from "frontity";
import { useState } from "react";
import Pointer from "../pointer.png";

const Counter = ({ state, className }) => {
  const [number, setNumber] = useState(1);

  const setNum = (key) => {
    console.log("hier: ", key);

    if (key === "plus") {
      setNumber(number + 1);
    } else if (key === "minus" && number > 0) {
      setNumber(number - 1);
    }
  };

  return (
    <Count
      state={state}
      className={
        className + " d-flex flex-row justify-content-around align-items-center"
      }
    >
      <subtitle onClick={() => setNum("minus")} className="grey">
        -
      </subtitle>
      <subtitle>{number}</subtitle>
      <subtitle onClick={() => setNum("plus")} className="grey">
        +
      </subtitle>
    </Count>
  );
};

export default connect(Counter);

const Count = styled.div`
  width: 120px;
  height: 48px;
  background-color: ${({ state }) => state.theme.lightGrey};

  subtitle.grey {
    width: 25px;
    height: 25px;
    cursor: url(${Pointer}), pointer;
    color: ${({ state }) => state.theme.black};
    opacity: 0.25;
    font-weight: 800;
    text-align: center;
  }

  subtitle.grey:hover {
    color: ${({ state }) => state.theme.brown};
    opacity: 1;
  }
`;
