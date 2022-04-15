import Root from "./components";
import link from "@frontity/html2react/processors/link";
import { wooCommerceHandler } from "./handlers/woocommerce-handler";

import { addToCart } from "./actions/add-to-cart";

export default {
  name: "audiophile-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      cart: {
        items: [],
      },

      brown: "rgba(216, 125, 74, 1)",
      lightBrown: "rgba(251, 175, 133, 1)",
      black: "rgba(0, 0, 0, 1)",
      darkBlack: "rgba(16,16,16,1)",
      lightBlack: "rgba(25, 25, 25, 1)",
      white: "rgba(255, 255, 255, 1)",
      darkGrey: "rgba(76, 76, 76, 1)",
      grey: "rgba(151, 151, 151, 1)",
      lightGrey: "rgba(241, 241, 241, 1)",
      lighterGrey: "rgba(250, 250, 250, 1)",

      maxWidth: "1440px",
    },
  },
  actions: {
    theme: {
      beforeSSR: async ({ actions, libraries, state }) => {
        const response = await libraries.source.api.get({
          endpoint: `media/?per_page=100`,
        });
        await libraries.source.populate({ response, state });

        await actions.source.fetch("/product-bestof/");
        await actions.source.fetch("/producto/");
        await actions.source.fetch("/home-links/");
      },

      beforeCSR: () => {
        import("webfontloader").then((WebFontLoader) => {
          WebFontLoader.load({
            google: {
              families: ["Manrope:200,300,400,500,600,700,800&display=swap"],
            },
          });
        });
      },
      addToCart,
    },
  },
  libraries: {
    html2react: {
      processors: [link],
    },
    source: {
      handlers: [wooCommerceHandler],
    },
  },
};
