export const emptyOrder = ({ state, actions }) => {
  state.theme.orderFeedback = {};
  state.theme.orderTotal = 0;
  state.theme.orderQuantity = 0;
};
