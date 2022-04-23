import React, { useState } from "react";
import { connect, styled, keyframes } from "frontity";
import { stringToNum } from "../../helpers/stringToNum";
import Counter from "../Counter/Counter";

const ModalEntry = ({
  actions,
  state,
  item,
  entry,
  images,
  className,
  withCount = true,
}) => {
  const debug = false;

  //const [count, setCount] = useState(item.quantity);
  const count = item?.quantity;

  if (debug) console.log("ModalEntry/before render", item, entry, images);

  const updCart = (newCount) => {
    let updCount = newCount - count;
    actions.theme.addToCart(
      item?.product_id,
      updCount,
      stringToNum(entry.sale_price)
    );
  };

  return (
    <ModalEntryBody className={className}>
      <div className="entry d-flex flex-row justify-content-between align-items-center">
        <div className="image d-flex flex-row">
          <img src={getImg(images[entry?.images[0].id])} alt="" />
          <div className="d-flex flex-column justify-content-center">
            <p className="bold">
              {entry?.name.replace("Earphones", "").replace("Headphones", "")}
            </p>
            <p className="bold">{entry?.price}</p>
          </div>
        </div>
        {withCount ? (
          <Counter count={item?.quantity} setCount={updCart} />
        ) : (
          <p>{item?.quantity}x</p>
        )}
      </div>
    </ModalEntryBody>
  );
};

export default connect(ModalEntry);

// METHOD

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};

// STYLING

const ModalEntryBody = styled.div`
  .entry {
    margin-bottom: 24px;
  }

  .entry .image img {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    margin-right: 16px;
  }

  .entry .bold {
    font-weight: 600;
  }

  .entry p {
    margin-bottom: 0px;
  }
`;
