export const addToCart =
  ({ state, actions }) =>
  (product_id, count, entry_price) => {
    //event.preventDefault();

    const productInCart = state.theme.cart.items.findIndex(
      (product) => product.product_id === product_id
    );

    //UPDATE CART
    if (-1 === productInCart) {
      state.theme.cart.items.push({ product_id, quantity: count });
    } else {
      let quantity = state.theme.cart.items[productInCart].quantity;
      state.theme.cart.items[productInCart].quantity = quantity + count;
    }

    // UPDATE TOTAL
    state.theme.orderTotal += count * entry_price;
    state.theme.orderQuantity += count;

    //const productName = state.source.product[productId].title.rendered;

    //actions.theme.openNotifications({
    //  content: `${productName} has been added to your cart.`,
    //});

    //actions.theme.calculateCartTotal();

    //state.theme.cantToAddToCart = 1;
  };
