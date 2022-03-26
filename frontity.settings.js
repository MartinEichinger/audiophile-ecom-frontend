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
          url: "http://localhost/audiophile-ecom-backend",

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
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
