import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
// import Breadcrumb from "../../common/breadcrumb";

import { Edit, Search, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonLayout from "../../../../components/shop/common-layout";
import { ApiUrl } from "../../../../config/api-config";
import FilterPage from "../../../shop/common/filter";

const Product_list = () => {
  const [allProducts, setAllProducts] = useState("");

  const router = new useRouter();

  const getAllProducts = (page, size) => {
    axios
      .post(ApiUrl + "/product/search?page=" + page + "&size=" + size, {})
      .then((response) => {
        console.log("GET_ALL_PRODUCT_RESPONSE", response);
        setAllProducts(response.data.data.content);
      })
      .catch((error) => {
        console.log("GET_ALL_PRODUCT_ERROR", error);
      });
  };

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

  const selectProduct = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    router.push("/page/product-detail");
  };

  const addtoCart = (itemId) => {
    if (localStorage.getItem("User") == "") {
      router.push("/page/account/login");
    } else {
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
          if (response.status == 200) {
            toast.success("Item Added To Cart !!");
            getSession();
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

  const data = [
    {
      //image: IMG34,
      title: "Slim Fit Cotton Shirt",
      price: "$500.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
    {
      // image: IMG1,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
    {
      //image: IMG4,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "new",
      discount: "on sale",
    },
    {
      //image: IMG17,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
    {
      //image: IMG3,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
    {
      //image: IMG001,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
    {
      //image: IMG10,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
    {
      // image: IMG04,
      title: "Slim Fit Cotton Shirt",
      price: "$400.00",
      discount_price: "$600.00",
      tag: "old",
      discount: "not on sale",
    },
  ];
  const [sidebarView, setSidebarView] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  const [categoryList, setCategoryList] = useState("");

  const getAllCategories = () => {
    axios
      .post(ApiUrl + "/product/category/findAll", {})
      .then((response) => {
        console.log("GET_CATEGORY_LIST", response);
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.log("GET_CATEGORY-ERROR", error);
      });
  };

  useEffect(() => {
    if (allProducts == "") {
      getAllProducts(0, 10);
    }
    if (categoryList == "") {
      getAllCategories();
    }
    if (localStorage.getItem("Category_Item") != "") {
      setAllProducts(JSON.parse(localStorage.getItem("Category_Item")));
      localStorage.setItem("Category_Item", "");
    } else if (
      localStorage.getItem("Category_Item") == "" ||
      !localStorage.getItem("Category_Item") ||
      localStorage.getItem("Category_Item") == []
    ) {
      // toast.warn("No Products In Selected Category !!");
    }
    if (
      localStorage.getItem("Search") &&
      localStorage.getItem("Search") != ""
    ) {
      setAllProducts(JSON.parse(localStorage.getItem("Search")));
    }
  }, []);

  return (
    <Fragment>
      <>
        <CommonLayout parent="home" title="Products">
          <section className="section-b-space ratio_asos">
            <div className="collection-wrapper">
              <Container>
                <Row>
                  <Col sm="3">
                    <FilterPage
                      sm="12"
                      categoryList={categoryList}
                      sidebarView={sidebarView}
                      allProducts={allProducts}
                      setAllProducts={setAllProducts}
                      // closeSidebar={openCloseSidebar(sidebarView)}
                    />
                  </Col>
                  <Col sm="9">
                    <div className="row ">
                      {allProducts &&
                        allProducts.map((item, index) => {
                          if (index < 9) {
                            return (
                              <div
                                className="col-xl-3 col-lg-4 col-6"
                                key={index}
                              >
                                <div className="product-box">
                                  <div
                                    className="img-wrapper"
                                    onClick={() => {
                                      selectProduct(item);
                                    }}
                                  >
                                    <div className="front">
                                      <a>
                                        {item.productImages != "" && (
                                          <img
                                            src={item.productImages[0].imageUrl}
                                            className="img-fluid blur-up lazyload bg-img"
                                            alt=""
                                          />
                                        )}
                                      </a>
                                    </div>
                                    <div className="back">
                                      <a>
                                        {item.productImages != "" && (
                                          <img
                                            src={item.productImages[0].imageUrl}
                                            className="img-fluid blur-up lazyload bg-img"
                                            alt=""
                                          />
                                        )}
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
                                        <i
                                          className="ti-heart"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                      <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quick-view"
                                        title="Quick View"
                                      >
                                        <i
                                          className="ti-search"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                      <a href="compare.html" title="Compare">
                                        <i
                                          className="ti-reload"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </div>
                                  </div>
                                  <br></br>
                                  {/* fa fa-shopping-cart */}
                                  {/* <Button
                                    className="btn btn-solid"
                                    type="submit"
                                  >
                                    Add to cart
                                  </Button> */}
                                  <div class="product-buttons">
                                    <a
                                      onClick={() => {
                                        addtoCart(item.id);
                                      }}
                                      id="cartEffect"
                                      class="btn btn-solid hover-solid btn-animation"
                                    >
                                      <i
                                        class="fa fa-shopping-cart me-1"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      add to cart
                                    </a>{" "}
                                  </div>

                                  <div className="product-detail">
                                    {item.overallRating &&
                                    item.overallRating == "" ? (
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
                                                        {item.overallRating ==
                                                        2.5 ? (
                                                          <div className="rating">
                                                            <i className="fa fa-star"></i>

                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-half-o text-warning"></i>
                                                          </div>
                                                        ) : (
                                                          <>
                                                            {item.overallRating ==
                                                            3 ? (
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

                                                                    <i class="fa fa-star-half-o text-warning"></i>
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
                                    <a href="product-page(no-sidebar).html">
                                      <h6>{item.productName}</h6>
                                    </a>
                                    <br></br>
                                    <h4>€{item.sellingPrice}</h4>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        </CommonLayout>
      </>
    </Fragment>
  );
};

export default Product_list;
