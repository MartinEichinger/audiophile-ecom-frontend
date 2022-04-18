import { fetch } from "frontity";

const CONSUMER_KEY = `ck_af892c216c195b5a061017ec7ba0d2663d87ba64`;
const CONSUMER_SECRET = `cs_f1ef32caf0dd7799659545ab50d6c7021dfe3abd`;

export const processOrder = async ({ state, actions }) => {
  console.log("Start process order");
  const fields = state.theme.checkout;

  state.theme.processingOrder = true;
  let orderData = JSON.stringify({
    payment_method: "woocommerce_payments",
    payment_method_title: "Credit card / debit card",
    set_paid: true,

    billing: {
      first_name: fields.name.split(" ")[0],
      last_name: fields.name.split(" ")[1],
      address_1: fields.address,
      postcode: fields.zipcode,
      email: fields.email,
    },

    shipping: {
      first_name: fields.name.split(" ")[0],
      last_name: fields.name.split(" ")[1],
      address_1: fields.address,
      postcode: fields.zipcode,
    },

    line_items: state.theme.cart.items,

    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  });

  console.log("Order Data", orderData);

  const res = await fetch(
    `${state.source.url}/wp-json/wc/v3/orders?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
    {
      method: "POST",
      body: orderData,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await res.json();

  const orderId = body.id;
  console.log("body", body);
  console.log("id", body.id);
  console.log("id", body[1]);

  state.theme.processingOrder = false;

  state.theme.cart.items = [];
  //state.theme.cart.cartTotal = 0;
  //fields.map((field) => (field.value = ""));
};
