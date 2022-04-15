//const CONSUMER_KEY = `ck_af892c216c195b5a061017ec7ba0d2663d87ba64`;
//const CONSUMER_SECRET = `cs_f1ef32caf0dd7799659545ab50d6c7021dfe3abd`;

//const WC_API_SERVER = `https://audiophile.edmadd.eu/wp-json/wc/v2`;
//const WC_URL_PRODUCTS = `${WC_API_SERVER}/products`;

export const wooCommerceHandler = {
  name: "producto",
  priority: 10,
  pattern: "/producto/",
  func: async ({ route, params, state, libraries }) => {
    // 1. get product data
    const response = await libraries.source.api.get({
      endpoint: "/cocart/v1/products",
      params: { slug: params.slug },
    });

    // 2. add product to state
    const productData = await response.json();

    // 3. add route to data
    Object.assign(state.source.data[route], {
      productData,
      isProduct: true,
    });
  },
};
