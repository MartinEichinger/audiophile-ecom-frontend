export const emptyCheckout = ({ state, actions }) => {
  for (let x in state.theme.checkout) {
    if (x !== "errors") {
      state.theme.checkout[x] = "";
    } else {
      for (let x in state.theme.checkout.errors) {
        state.theme.checkout.errors[x] = null;
      }
    }
  }
};
