export const addToCart =
  ({ state, actions }) =>
  (product_id, count) => {
    //event.preventDefault();

    const productInCart = state.theme.cart.items.findIndex(
      (product) => product.product_id === product_id
    );

    //let cantToAdd = state.theme.cantToAddToCart;

    if (-1 === productInCart) {
      state.theme.cart.items.push({ product_id, quantity: count });
    } else {
      let quantity = state.theme.cart.items[productInCart].quantity;
      state.theme.cart.items[productInCart].quantity = quantity + count;
    }

    //const productName = state.source.product[productId].title.rendered;

    //actions.theme.openNotifications({
    //  content: `${productName} has been added to your cart.`,
    //});

    //actions.theme.calculateCartTotal();

    //state.theme.cantToAddToCart = 1;
  };
