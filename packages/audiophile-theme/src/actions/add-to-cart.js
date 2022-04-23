export const addToCart =
  ({ state, actions }) =>
  (product_id, count, entry_price) => {
    //event.preventDefault();

    const productInCart = state.theme.cart.items.findIndex(
      (product) => product.product_id === product_id
    );

    //UPDATE CART
    if (-1 === productInCart) {
      // New product
      state.theme.cart.items.push({ product_id, quantity: count });
    } else {
      // Product already in cart
      let quantity = state.theme.cart.items[productInCart].quantity;
      if (quantity + count === 0) {
        state.theme.cart.items.splice(productInCart, 1);
      } else {
        state.theme.cart.items[productInCart].quantity = quantity + count;
      }
    }

    // UPDATE TOTAL
    var value = count * entry_price;
    state.theme.orderTotal += value;
    state.theme.orderQuantity += count;

    console.log(
      "Cart update: ",
      state.theme.cart,
      state.theme.orderTotal,
      state.theme.orderQuantity
    );
    //const productName = state.source.product[productId].title.rendered;

    //actions.theme.openNotifications({
    //  content: `${productName} has been added to your cart.`,
    //});

    //actions.theme.calculateCartTotal();

    //state.theme.cantToAddToCart = 1;
  };
