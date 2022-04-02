const settings = {
  name: "audiophile-ecom-frontend",

  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Audiophile",
      description: "WordPress installation for Frontity development",
    },
  },

  packages: [
    {
      name: "audiophile-theme",
    },
    {
      name: "@frontity/wp-source",

      state: {
        source: {
          url: "https://audiophile.edmadd.eu/",

          homepage: "/home",

          postTypes: [
            {
              type: "home-links",
              endpoint: "home-links",
              archive: "/home-links",
            },
            {
              type: "product-bestof",
              endpoint: "product-bestof",
              archive: "/product-bestof",
            },
            {
              type: "products",
              endpoint: "products",
              archive: "/products",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
