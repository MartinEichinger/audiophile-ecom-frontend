import React from "react";
import { connect, styled } from "frontity";

import Link from "@frontity/components/link";
import Check from "./check.png";
import ModalEntry from "../Modal/ModalEntry";

const ModalCheckout = ({ actions, state }) => {
  const debug = true;

  // 1. Fetch done with beforeSSR / in Home
  // 2. GET
  const data = state.source.get("/producto/");
  const products = data.productData;
  const images = state.source.attachment;
  const items = state.theme.orderFeedback;

  if (debug)
    console.log(
      "ModalCheckout/before render",
      products,
      items,
      Object.values(items),
      Object.values(items).length
      //products[items?.line_items[0].id]
    );

  if (Object.values(items).length > 0)
    var entry = findData(products, items.line_items[0].product_id);

  return (
    <>
      <ModalCheckoutBody state={state}>
        <div
          className="modal fade"
          id="checkoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="checkoutModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex flex-column justify-content-start align-items-start">
                <div className="circle d-flex flex-column align-items-center justify-content-center">
                  <img src={Check} alt="Success" />
                </div>
                <h3>Thank you for your order</h3>
                <p>You will receive an email confirmation shortly.</p>
              </div>

              <div className="modal-body form d-flex flex-column">
                <div className="summary d-flex flex-row">
                  <div className="block d-flex flex-column">
                    <div className="ordItems">
                      {Object.values(items).length > 0 && (
                        <ModalEntry_CO
                          item={items?.line_items[0]}
                          entry={entry}
                          images={images}
                          withCount={false}
                        />
                      )}
                    </div>
                    <p className="para bold">
                      and{" "}
                      {state.theme.orderFeedback?.line_items
                        ? state.theme.orderFeedback?.line_items.length - 1
                        : null}{" "}
                      other items(s)
                    </p>
                  </div>
                  <div className="total d-flex flex-column justify-content-center">
                    <p className="uppercase">Grand total</p>
                    <h6>€ {(state.theme.orderTotal + 10).toFixed(2)}</h6>
                  </div>
                </div>

                <div className="but">
                  <Link link="/">
                    <button
                      className="default"
                      data-bs-dismiss="modal"
                      data-bs-target="#checkoutModal"
                    >
                      Back to home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalCheckoutBody>
    </>
  );
};

export default connect(ModalCheckout);

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
const ModalEntry_CO = styled(ModalEntry)`
  .entry {
    margin-bottom: 8px;
  }
`;

const ModalCheckoutBody = styled.div`
  .modal-dialog {
    margin: 100px auto;
  }

  .modal-content {
    border-radius: 8px;
  }

  .modal-header {
    padding: 32px 32px 16px;
  }

  .modal-header .circle {
    background-color: ${({ state }) => state.theme.brown};
    width: 64px;
    height: 64px;
    border-radius: 32px;
    margin-bottom: 33px;
  }

  .modal-header h3 {
    margin-bottom: 24px;
  }

  .modal-header p {
    opacity: 0.5;
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

  .modal-body .summary {
    margin-bottom: 46px;
    width: 100%;
  }

  .modal-body .summary .block {
    background-color: ${({ state }) => state.theme.lightGrey};
    border-radius: 8px 0px 0px 8px;
    width: 55%;
    padding: 16px;
  }

  .modal-body .summary .block .ordItems {
    border-bottom: 1px solid grey;
  }

  .modal-body .summary .block .para {
    opacity: 0.5;
    font-size: 12px;
    text-align: center;
    padding: 12px;
  }

  .modal-body .summary .total {
    background-color: ${({ state }) => state.theme.black};
    border-radius: 0px 8px 8px 0px;
    width: 45%;
    padding: 16px;
  }

  .modal-body .summary .total p {
    opacity: 0.5;
    color: white;
    margin-bottom: 8px;
  }

  .modal-body .summary .total h6 {
    color: white;
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
