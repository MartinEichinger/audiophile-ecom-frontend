import Root from "./components";

export default {
  name: "audiophile-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {
      brown: "rgba(216, 125, 74, 1)",
      lightBrown: "rgba(251, 175, 133, 1)",
      black: "rgba(0, 0, 0, 1)",
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
      beforeSSR: async ({ actions, state, libraries }) => {
        await actions.source.fetch("/product-bestof/");
        await actions.source.fetch("/home-links/");
      },
    },
  },
};
