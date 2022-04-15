import React, { useState } from "react";
import { connect, styled, keyframes } from "frontity";

import Counter from "../Counter/Counter";

const ModalEntry = ({ actions, state, item, entry, images }) => {
  const debug = true;

  //const [count, setCount] = useState(item.quantity);
  const count = item.quantity;

  if (debug) console.log("ModalEntry/before render", item, entry, images);

  const updCart = (newCount) => {
    let updCount = newCount - count;
    actions.theme.addToCart(item.productId, updCount);
  };

  return (
    <div className="entry d-flex flex-row justify-content-between align-items-center">
      <div className="image d-flex flex-row">
        <img src={getImg(images[entry.images[0].id])} alt="" />
        <div className="d-flex flex-column justify-content-center">
          <p className="bold">{entry.name}</p>
          <p className="bold">{entry.price}</p>
        </div>
      </div>
      <Counter count={item.quantity} setCount={updCart} />
    </div>
  );
};

export default connect(ModalEntry);

// METHOD

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};
