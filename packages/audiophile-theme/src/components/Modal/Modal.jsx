import React from "react";
import { connect, styled } from "frontity";

import Link from "@frontity/components/link";
import ModalEntry from "./ModalEntry";
import NumberFormat from "react-number-format";
import { stringToNum } from "../../helpers/stringToNum";

const Modal = ({ actions, state }) => {
  const debug = true;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/producto/");
  const products = data.productData;
  const images = state.source.attachment;
  const items = state.theme.cart.items;

  let total = 0;

  if (debug) console.log("Modal/before render", products, items);

  return (
    <>
      <ModalBody>
        <div
          className="modal"
          id="createPlanModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="createPlanModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex flex-row">
                <h6>Cart</h6>
                <button
                  className="w-o"
                  onClick={() => {
                    actions.theme.emptyCart();
                    actions.theme.emptyOrder();
                  }}
                >
                  Remove all
                </button>
              </div>
              <div className="modal-body form d-flex flex-column">
                {items.map((item, i) => {
                  var entry = findData(products, item.product_id);
                  total += stringToNum(entry.sale_price) * item.quantity;

                  return (
                    <ModalEntry
                      item={item}
                      entry={entry}
                      images={images}
                      key={i}
                    />
                  );
                })}
                <div className="total d-flex flex-row justify-content-between">
                  <p>Total</p>
                  <h6>
                    <NumberFormat
                      value={total}
                      decimalScale={2}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"€"}
                    />
                  </h6>
                </div>
                <div className="but">
                  <Link link="checkout">
                    <button
                      className="default"
                      data-bs-dismiss="modal"
                      data-bs-target="#createPlanModal"
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  );
};

export default connect(Modal);

// METHOD
const updCart = ({ actions }, prodId, count) => {
  actions.theme.addToCart(prodId, count);
};

const getImg = (img) => {
  if (!img) return null;
  return img.source_url;
};

const findData = (obj, value) => {
  var content = obj.filter((data) => {
    var keyz = Object.keys(data);
    var valz = Object.values(data);
    var val = keyz.findIndex((key) => {
      return key === "id";
    });
    return valz[val] === value;
  });

  return Object.values(content)[0];
};

// STYLING
const ModalBody = styled.div`
  .modal-dialog {
    margin: 100px auto;
  }

  .modal-content {
    border-radius: 8px;
  }

  .modal-header {
    padding: 32px 32px 16px;
  }

  .modal-header h6 {
    margin: 0;
  }

  .modal-body {
    padding: 16px 32px 32px;
  }

  .modal-body .bold {
    font-weight: 600;
  }

  .modal-body p {
    margin-bottom: 0px;
  }

  .modal-body .total {
    margin-bottom: 24px;
  }

  .modal-body .total p {
    opacity: 0.5;
  }

  button.w-o {
    width: 100px;
    opacity: 0.5;
    text-decoration: underline;
  }

  button.default {
    width: 100%;
  }
`;
