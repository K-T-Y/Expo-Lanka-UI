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
  cartClass,
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
              cartClass={cartClass}
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
  designClass,
  cartClass,
  heading,
  noTitle,
  title,
  inner,
  line,
  hrClass,
  backImage,
}) => {
  const [activeTab, setActiveTab] = useState(type);
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: activeTab,
      indexFrom: 0,
      limit: 8,
    },
  });

  const [featuredProduct, setFeaturedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    if (featuredProduct == "") {
      setIsLoading(true);
      getAllFeaturedProducts();
    }
  });

  return (
    <div>
      <section className={designClass}>
        <Container fluid={fluid}>
          {noTitle ? (
            ""
          ) : (
            <div className={title}>
              <h4>exclusive products</h4>
              <h2 className={inner}>special products</h2>
              {line ? (
                <div className="line"></div>
              ) : hrClass ? (
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
                cartClass={cartClass}
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
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={data}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
          </Tabs> */}
          <div className="row mx-0 margin-default">
            {featuredProduct &&
              featuredProduct.map((item, index) => {
                if (index < 4) {
                  return (
                    <div className="col-xl-3 col-lg-4 col-6">
                      {" "}
                      <div class="product-box">
                        <div class="img-wrapper">
                          <div class="front">
                            <a href="product-page(no-sidebar).html">
                              <img
                                src={item.productImages[0].imageUrl}
                                class="img-fluid blur-up lazyload bg-img"
                                alt=""
                              />
                            </a>
                          </div>
                          <div class="back">
                            <a href="product-page(no-sidebar).html">
                              <img
                                src={item.productImages[0].imageUrl}
                                class="img-fluid blur-up lazyload bg-img"
                                alt=""
                              />
                            </a>
                          </div>
                          <div class="cart-info cart-wrap">
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#addtocart"
                              title="Add to cart"
                            >
                              <i class="ti-shopping-cart"></i>
                            </button>
                            <a
                              href="javascript:void(0)"
                              title="Add to Wishlist"
                            >
                              <i class="ti-heart" aria-hidden="true"></i>
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#quick-view"
                              title="Quick View"
                            >
                              <i class="ti-search" aria-hidden="true"></i>
                            </a>
                            <a href="compare.html" title="Compare">
                              <i class="ti-reload" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                        <div class="product-detail">
                          <div class="rating">
                            <i class="fa fa-star"></i>{" "}
                            <i class="fa fa-star"></i>{" "}
                            <i class="fa fa-star"></i>{" "}
                            <i class="fa fa-star"></i>{" "}
                            <i class="fa fa-star"></i>
                          </div>
                          <a href="product-page(no-sidebar).html">
                            <h6>Purple polo tshirt</h6>
                          </a>
                          <h4>$20.00</h4>
                          <ul class="color-variant">
                            <li class="bg-light0"></li>
                            <li class="bg-light1"></li>
                            <li class="bg-light2"></li>
                          </ul>
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
