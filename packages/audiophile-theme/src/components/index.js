import React, { useEffect } from "react";

import { useMediaQuery } from "react-responsive";

import { Global, Head, css, connect, styled } from "frontity";
import { loadable } from "frontity";

import Switch from "@frontity/components/switch";

import Pointer from "./pointer.png";

import Nav from "./Nav/Nav";
import Home from "./Home/Home";

//const Products = loadable(() => import("./Products/Products"));
import Products from "./Products/Products";
//const ProductDetail = loadable(() => import("./ProductDetail/ProductDetail"));
import ProductDetail from "./ProductDetail/ProductDetail";
import Footer from "./Footer/Footer";

const Root = ({ state, actions }) => {
  const debug = true;

  // 1. Fetch
  useEffect(() => {
    actions.source.fetch("/");
    actions.source.fetch("/speakers/");
    actions.source.fetch("/headphones/");
    actions.source.fetch("/earphones/");
    //actions.source.fetch("/products/");
    if (debug) console.log("index/useEffect: ", state.source);
  }, []);

  // 2. GET
  const data = state.source.get(state.router.link);
  if (debug) console.log("index.js/before render:", data);

  // 3. MEDIA QUERY
  const mediaQuery = {
    isXXL: useMediaQuery({ query: "(min-width: 1440px)" }),
    isXL: useMediaQuery({ query: "(min-width: 1280px)" }),
    isLg: useMediaQuery({ query: "(min-width: 992px)" }),
    isMd: useMediaQuery({ query: "(min-width: 768px)" }),
    isSm: useMediaQuery({ query: "(min-width: 576px)" }),
    isXS: useMediaQuery({ query: "(max-width: 575px)" }),
  };

  return (
    <>
      <Head>
        <title>{state.frontity.title}</title>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />

        {/*         <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        /> */}

        <link
          href="//use.fontawesome.com/releases/v6.1.0/css/fontawesome.css"
          rel="stylesheet"
        />
        <link
          href="//use.fontawesome.com/releases/v6.1.0/css/brands.css"
          rel="stylesheet"
        />
        <link
          href="//use.fontawesome.com/releases/v6.1.0/css/solid.css"
          rel="stylesheet"
        />
      </Head>

      <Global styles={globalStyles} />

      <MyBody>
        <Nav />

        <main>
          <Switch>
            <Home when={data.link === "/"} mediaQuery={mediaQuery} />
            <Products
              when={data.link === "/headphones/"}
              mediaQuery={mediaQuery}
            >
              Headphones
            </Products>
            <Products when={data.link === "/speakers/"} mediaQuery={mediaQuery}>
              Speakers
            </Products>
            <Products
              when={data.link === "/earphones/"}
              mediaQuery={mediaQuery}
            >
              Earphones
            </Products>
            <ProductDetail
              when={data.link.includes("product")}
              link={data.link}
              mediaQuery={mediaQuery}
            />
          </Switch>
        </main>
        <Footer />
      </MyBody>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
        async
      ></script>
      <script
        src="https://kit.fontawesome.com/cea30e219f.js"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default connect(Root);

const MyBody = styled.div`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: no-preference) {
    :root {
      scroll-behavior: smooth;
    }
  }

  img,
  svg {
    vertical-align: middle;
  }

  button {
    border-radius: 0;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  select {
    text-transform: none;
  }

  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }

  [type="button"]:not(:disabled),
  [type="reset"]:not(:disabled),
  [type="submit"]:not(:disabled),
  button:not(:disabled) {
    cursor: pointer;
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
    color: #0d6efd;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
  }

  .nav-link:focus,
  .nav-link:hover {
    color: #0a58ca;
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }

  .d-flex {
    display: flex !important;
  }

  .d-none {
    display: none !important;
  }

  .flex-row {
    flex-direction: row !important;
  }

  .flex-column {
    flex-direction: column !important;
  }

  .flex-row-reverse {
    flex-direction: row-reverse !important;
  }

  .flex-column-reverse {
    flex-direction: column-reverse !important;
  }

  .justify-content-start {
    justify-content: flex-start !important;
  }

  .justify-content-end {
    justify-content: flex-end !important;
  }

  .justify-content-center {
    justify-content: center !important;
  }

  .justify-content-between {
    justify-content: space-between !important;
  }

  .align-items-start {
    align-items: flex-start !important;
  }

  .align-items-end {
    align-items: flex-end !important;
  }

  .align-items-center {
    align-items: center !important;
  }

  .invisible {
    visibility: hidden !important;
  }

  .flex-sm-row {
    flex-direction: row !important;
  }

  .justify-content-sm-center {
    justify-content: center !important;
  }

  .align-items-sm-start {
    align-items: flex-start !important;
  }

  .d-lg-flex {
    display: flex !important;
  }

  .d-lg-none {
    display: none !important;
  }

  .flex-lg-row {
    flex-direction: row !important;
  }

  .justify-content-lg-between {
    justify-content: space-between !important;
  }

  .align-items-lg-start {
    align-items: flex-start !important;
  }

  .align-items-lg-center {
    align-items: center !important;
  }
`;

const globalStyles = css`
  body {
    font-family: "Manrope", sans-serif;
    margin: 0px;
  }

  main {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 56px;
    font-weight: bold;
    line-height: 58px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0px;

    @media only screen and (max-width: 767px) {
      font-size: calc(5.089059vw + 17px);
      line-height: calc(4.580153vw + 23px);
    }
  }

  h2 {
    font-size: 40px;
    font-weight: bold;
    line-height: 44px;
    letter-spacing: 1.43px;
    text-transform: uppercase;

    @media only screen and (max-width: 767px) {
      font-size: calc(3.053435vw + 16.5px);
      line-height: auto;
    }
  }

  h3 {
    font-size: 32px;
    font-weight: bold;
    line-height: 36px;
    letter-spacing: 1.14px;
    text-transform: uppercase;
  }

  h4 {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h5 {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1.71px;
    text-transform: uppercase;
  }

  h6 {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.29px;
    text-transform: uppercase;
  }

  p {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.67;
  }

  overline {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 10px;
    text-transform: uppercase;
  }

  subtitle,
  li {
    font-size: 13px;
    font-weight: bold;
    line-height: 25px;
    letter-spacing: 0.93px;
    text-transform: uppercase;
  }

  a,
  a:visited,
  a:focus,
  .nav-link {
    //color: inherit;
    text-decoration: none;
    cursor: url(${Pointer}), pointer;
  }

  a:hover,
  .nav-link:hover {
    color: rgba(216, 125, 74, 1);
  }

  button {
    cursor: url(${Pointer}), pointer;
  }

  button.default {
    width: 160px;
    height: 48px;
    border: 1px solid rgba(216, 125, 74, 1);
    background-color: rgba(216, 125, 74, 1);
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    padding: 15px 20px;
    cursor: url(${Pointer}), pointer;
    text-align: center;

    a {
      color: white;
    }
  }

  button.default:hover {
    background-color: rgba(251, 175, 133, 1);
  }

  button.empty {
    width: 160px;
    height: 48px;
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0);
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: black;
    padding: 15px 20px;
    cursor: url(${Pointer}), pointer;
    text-align: center;

    a {
      color: black;
    }
  }

  button.empty:hover {
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);

    a {
      color: rgba(255, 255, 255, 1);
    }
  }

  button.full {
    width: 160px;
    height: 48px;
    border: 1px solid black;
    background-color: black;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    padding: 15px 28px;
    cursor: url(${Pointer}), pointer;

    a {
      color: white;
    }
  }

  button.full:hover {
    background-color: rgba(76, 76, 76, 1);
  }
`;
