import React, { useState, useContext, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ProductItem from "../product-box/ProductBox1";
import CartContext from "../../../helpers/cart/index";

import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import emptySearch from "../../../public/assets/images/empty-search.jpg";
import axios from "axios";
import { ApiUrl } from "../../../config/api-config";
import { Button, Card, CardBody, Col, Container, Row, Media } from "reactstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        stock
        sale
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const TabContent = ({
  data,
  loading,
  startIndex,
  endIndex,
  cartclassName,
  backImage,
  product,
}) => {
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  return (
    <Row className="no-slider">
      {!data ||
      !data.products ||
      !data.products.items ||
      data.products.items.length === 0 ||
      loading ? (
        data &&
        data.products &&
        data.products.items &&
        data.products.items.length === 0 ? (
          <Col xs="12">
            <div>
              <div className="col-sm-12 empty-cart-cls text-center">
                <Media
                  src={emptySearch}
                  className="img-fluid mb-4 mx-auto"
                  alt=""
                />
                <h3>
                  <strong>Your Cart is Empty</strong>
                </h3>
                <h4>Explore more shortlist some items.</h4>
              </div>
            </div>
          </Col>
        ) : (
          <div className="row mx-0 margin-default">
            <div className="col-xl-3 col-lg-4 col-6">
              <div className="card">
                <div className="card-body">
                  {/* <img src={product[0].productCategory.imageUrl} /> */}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-6"></div>
            <div className="col-xl-3 col-lg-4 col-6"></div>
            <div className="col-xl-3 col-lg-4 col-6"></div>
          </div>
        )
      ) : (
        data &&
        data.products.items
          .slice(startIndex, endIndex)
          .map((product, i) => (
            <ProductItem
              key={i}
              product={product}
              symbol={currency.symbol}
              addCompare={() => compareContext.addToCompare(product)}
              addCart={() => context.addToCart(product, quantity)}
              addWishlist={() => wishListContext.addToWish(product)}
              cartclassName={cartclassName}
              backImage={backImage}
            />
          ))
      )}
    </Row>
  );
};

const SpecialProducts = ({
  type,
  fluid,
  designclassName,
  cartclassName,
  heading,
  noTitle,
  title,
  inner,
  line,
  hrclassName,
  backImage,
}) => {
  const [activeTab, setActiveTab] = useState(type);
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;
  const [buttonDisable, setButtonDisable] = useState(false);
  // var { loading, data } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: activeTab,
  //     indexFrom: 0,
  //     limit: 8,
  //   },
  // });

  const [featuredProduct, setFeaturedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSession = () => {
    axios
      .get(
        ApiUrl +
          "/shopping-session/get/session/" +
          JSON.parse(localStorage.getItem("User")).id
      )
      .then((sessionresponse) => {
        if (sessionresponse.status == 200) {
          console.log("SHOPPING_SESSION", sessionresponse);
          localStorage.setItem(
            "ShoppingSession",
            JSON.stringify(sessionresponse.data)
          );
        }
      })
      .catch((error) => {
        console.log("SESSION_ERROR", error);
      });
  };
  const getAllFeaturedProducts = () => {
    axios.get(ApiUrl + "/product/most-popular").then((response) => {
      console.log("FEATURED_PRODUCTS_API==>", response);
      console.log(response.data.data);
      setFeaturedProduct(response.data.data);
      setIsLoading(false);
    });
    if (isLoading == true) {
      console.log("FEATURED", featuredProduct);
    } else {
      console.log("Loading", featuredProduct);
    }
  };
  const addtoCart = (itemId) => {
    if (localStorage.getItem("User") == "") {
      router.push("page/account/login");
    } else {
      setButtonDisable(true);
      const model = {
        id: JSON.parse(localStorage.getItem("User")).id,
        productId: itemId,
        qty: 1,
      };
      axios
        .post(
          ApiUrl +
            "/shopping-session/add/cart-item/" +
            JSON.parse(localStorage.getItem("ShoppingSession")).data.id,
          model
        )
        .then((response) => {
          setTimeout(function () {}, 2000);
          if (response.status == 200) {
            toast.success("Item Added To Cart !!");
            getSession();
            setButtonDisable(false);
          }
        })
        .then((error) => {
          console.log("ERROR_ADDING_CART==>", error);
        });
      console.log(
        "APIURL",
        ApiUrl +
          "/shopping-session/add/cart-item/" +
          JSON.parse(localStorage.getItem("ShoppingSession")).data.id
      );
    }
  };
  const router = useRouter();
  const selectProduct = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    router.push("/page/product-detail");
  };
  useEffect(() => {
    if (featuredProduct == "") {
      setIsLoading(true);
      getAllFeaturedProducts();
    }
  });

  return (
    <div>
      <section className={designclassName}>
        <Container fluid={fluid}>
          {noTitle ? (
            ""
          ) : (
            <div className={title}>
              <h4>exclusive products</h4>
              <h2 className={inner}>special products</h2>
              {line ? (
                <div className="line"></div>
              ) : hrclassName ? (
                <hr role="tournament6"></hr>
              ) : (
                ""
              )}
            </div>
          )}
          {/* 
          <Tabs className="theme-tab">
            <TabList className="tabs tab-title">
              <Tab
                className={activeTab == type ? "active" : ""}
                onClick={() => setActiveTab(type)}
              >
                NEW ARRIVAL
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                FEATURED{" "}
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                SPECIAL
              </Tab>
            </TabList>

            <TabPanel>
              <TabContent
                data={data}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartclassName={cartclassName}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>

              <TabContent
                product={featuredProduct}
                data={data}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartclassName={cartclassName}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={data}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartclassName={cartclassName}
                backImage={backImage}
              />
            </TabPanel>
          </Tabs> */}
          <div className="row mx-0 margin-default">
            {featuredProduct &&
              featuredProduct.map((item, index) => {
                if (index < 4) {
                  return (
                    <div className="col-xl-3 col-lg-4 col-6" key={index}>
                      <div className="product-box">
                        <div
                          className="img-wrapper"
                          onClick={() => {
                            selectProduct(item);
                          }}
                        >
                          <div className="front">
                            <a>
                              <img
                                src={item.productImages[0].imageUrl}
                                className="img-fluid blur-up lazyload bg-img"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="back">
                            <a>
                              <img
                                src={item.productImages[0].imageUrl}
                                className="img-fluid blur-up lazyload bg-img"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="cart-info cart-wrap">
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#addtocart"
                              title="Add to cart"
                            >
                              <i className="ti-shopping-cart"></i>
                            </button>
                            <a title="Add to Wishlist">
                              <i className="ti-heart" aria-hidden="true"></i>
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#quick-view"
                              title="Quick View"
                            >
                              <i className="ti-search" aria-hidden="true"></i>
                            </a>
                            <a href="compare.html" title="Compare">
                              <i className="ti-reload" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                        <br></br>
                        <div className="product-buttons">
                          <button
                            onClick={() => {
                              addtoCart(item.id);
                            }}
                            disabled={buttonDisable}
                            id="cartEffect"
                            className="btn btn-solid hover-solid btn-animation"
                          >
                            <i
                              className="fa fa-shopping-cart me-1"
                              aria-hidden="true"
                            ></i>
                            Add to cart
                          </button>
                        </div>

                        <div className="product-detail">
                          {item.overallRating && item.overallRating == "" ? (
                            <h4>Ratings Not Available.</h4>
                          ) : (
                            <>
                              {item.overallRating == 0.5 ? (
                                <div className="rating">
                                  <i className="fa fa-star-half-o text-warning"></i>
                                </div>
                              ) : (
                                <>
                                  {item.overallRating == 1 ? (
                                    <div className="rating">
                                      <i className="fa fa-star"></i>
                                    </div>
                                  ) : (
                                    <>
                                      {item.overallRating == 1.5 ? (
                                        <div className="rating">
                                          <i className="fa fa-star"></i>

                                          <i className="fa fa-star-half-o text-warning"></i>
                                        </div>
                                      ) : (
                                        <>
                                          {item.overallRating == 2 ? (
                                            <div className="rating">
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                            </div>
                                          ) : (
                                            <>
                                              {item.overallRating == 2.5 ? (
                                                <div className="rating">
                                                  <i className="fa fa-star"></i>

                                                  <i className="fa fa-star"></i>
                                                  <i className="fa fa-star-half-o text-warning"></i>
                                                </div>
                                              ) : (
                                                <>
                                                  {item.overallRating == 3 ? (
                                                    <div className="rating">
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                    </div>
                                                  ) : (
                                                    <>
                                                      {item.overallRating ==
                                                      3.5 ? (
                                                        <div className="rating">
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>

                                                          <i className="fa fa-star-half-o text-warning"></i>
                                                        </div>
                                                      ) : (
                                                        <>
                                                          {item.overallRating ==
                                                          4 ? (
                                                            <div className="rating">
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star"></i>
                                                            </div>
                                                          ) : (
                                                            <>
                                                              {item.overallRating ==
                                                              4.5 ? (
                                                                <div className="rating">
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star-half-o text-warning"></i>
                                                                </div>
                                                              ) : (
                                                                <>
                                                                  {item.overallRating ==
                                                                  5 ? (
                                                                    <div className="rating">
                                                                      <i className="fa fa-star"></i>
                                                                      <i className="fa fa-star"></i>
                                                                      <i className="fa fa-star"></i>
                                                                      <i className="fa fa-star"></i>
                                                                      <i className="fa fa-star"></i>
                                                                    </div>
                                                                  ) : (
                                                                    <h4
                                                                      style={{
                                                                        fontWeight:
                                                                          "normal",
                                                                      }}
                                                                    >
                                                                      {/* Ratings
                                                                                Not
                                                                                Available. */}
                                                                    </h4>
                                                                  )}
                                                                </>
                                                              )}
                                                            </>
                                                          )}
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          <br></br>
                          <a>
                            <h6>{item.productName}</h6>
                          </a>
                          <h4>€{item.sellingPrice}</h4>
                          {/* <ul className="color-variant">
                            <li className="bg-light0"></li>
                            <li className="bg-light1"></li>
                            <li className="bg-light2"></li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SpecialProducts;
