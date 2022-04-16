import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import HomeLinks from "../HomeLinks/HomeLinks";
import FormTextField from "../FormTextField/FormTextField";
import ModalEntry from "../Modal/ModalEntry";
import NumberFormat from "react-number-format";
import Link from "@frontity/components/link";

const Checkout = ({ state, actions, mediaQuery, link }) => {
  const debug = true;
  let total = 0;
  let weight = 0;
  let shipping = 0;

  // 1. Fetch
  useEffect(() => {
    //actions.source.fetch(state.router.link);
    if (debug) console.log("Checkout/useEffect: ");
  }, []);

  // 2. GET
  const data = state.source.get("/producto/");
  const products = data.productData;
  const images = state.source.attachment;
  const items = state.theme.cart.items;

  if (debug) console.log("Checkout/before render: ", data, products);

  return (
    <CheckoutBody state={state}>
      <div className="body-co d-flex flex-column flex-sm-row">
        <CkCol1 state={state}>
          <h3>Checkout</h3>
          <p className="subtitle">Billing details</p>
          <div className="billing d-flex flex-row flex-wrap">
            <FormTextField_CO_I form_title="Name" placeholder="Alexei Ward" />
            <FormTextField_CO_I
              type="email"
              form_title="Email Address"
              placeholder="alexei@mail.com"
            />
            <FormTextField_CO_I
              form_title="Phone Number"
              placeholder="+1 202-555-0136"
            />
          </div>
          <p className="subtitle">Shipping info</p>
          <div className="shipping d-flex flex-row flex-wrap">
            <FormTextField_CO_II
              form_title="Address"
              placeholder="1137 Williams Avenue"
            />
            <FormTextField_CO_I
              type="number"
              form_title="ZIP Code"
              placeholder="10001"
            />
            <FormTextField_CO_I form_title="City" placeholder="New York" />
            <FormTextField_CO_I form_title="Country" placeholder="Germany" />
          </div>
          <p className="subtitle">Payment details</p>
          <div className="shipping d-flex flex-row flex-wrap">
            <FormTextField_CO_I
              type="number"
              form_title="e-Money Number"
              placeholder="238521993"
            />
            <FormTextField_CO_I
              type="number"
              form_title="e-Money PIN"
              placeholder="6891"
            />
          </div>
        </CkCol1>
        <CkCol2 state={state}>
          <h6>Summary</h6>
          <div className="modal-body form d-flex flex-column">
            {items.map((item, i) => {
              var entry = findData(products, item.productId);
              let num = entry.sale_price
                .replace("€", "")
                .replace(" ", "")
                .replace(",", ".");
              total += parseFloat(num) * item.quantity;
              weight += entry.weight.value * item.quantity;
              shipping = weight < 1 ? 5 : weight < 5 ? 20 : 50;

              return (
                <ModalEntry_CO
                  item={item}
                  entry={entry}
                  images={images}
                  withCount={false}
                  key={i}
                />
              );
            })}
            <div className="total d-flex flex-row justify-content-between">
              <p className="uppercase op50">Total</p>
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
            <div className="total d-flex flex-row justify-content-between">
              <p className="uppercase op50">Shipping</p>
              <h6>
                <NumberFormat
                  value={shipping}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€"}
                />
              </h6>
            </div>
            <div className="total d-flex flex-row justify-content-between">
              <p className="uppercase op50">VAT (Included)</p>
              <h6>
                <NumberFormat
                  value={0.2 * total}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€"}
                />
              </h6>
            </div>
            <div className="grandtotal d-flex flex-row justify-content-between">
              <p className="uppercase op50">Grand Total</p>
              <h6 className="brown">
                <NumberFormat
                  value={total + shipping}
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
                  className="default w-100"
                  data-dismiss="modal"
                  data-bs-target="#createPlanModal"
                >
                  Continue & Pay
                </button>
              </Link>
            </div>
          </div>
        </CkCol2>
      </div>
    </CheckoutBody>
  );
};

export default connect(Checkout);

// METHODS
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
      console.log(key);
      return key === "id";
    });
    return valz[val] === value;
  });

  return Object.values(content)[0];
};

// STYLING
const ModalEntry_CO = styled(ModalEntry)``;

const FormTextField_CO_I = styled(FormTextField)`
  width: 40%;
  margin-right: 16px;
  margin-bottom: 24px;
`;

const FormTextField_CO_II = styled(FormTextField_CO_I)`
  width: calc(80% + 16px);
`;

const CheckoutBody = styled.div`
  background-color: ${({ state }) => state.theme.lightGrey};
  width: 100vw;
  padding-top: 95px;
  padding-bottom: 144px;

  .body-co {
    max-width: 1110px;
    margin: 144px auto 0px;
  }
`;

const CkCol2 = styled.div`
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  width: 33%;

  @media only screen and (max-width: 575px) {
    width: 100%;
  }

  .modal-body {
    padding: 32px 0px;
  }
`;

const CkCol1 = styled.div`
  padding: 50px;
  width: 67%;
  margin-right: 30px;
  background-color: white;
  border-radius: 8px;

  @media only screen and (max-width: 575px) {
    width: 100%;
  }

  h3,
  .subtitle {
    margin-bottom: 40px;
  }

  .subtitle {
    color: ${({ state }) => state.theme.brown};
  }

  .billing,
  .shipping {
    margin-bottom: 50px;
  }
`;
