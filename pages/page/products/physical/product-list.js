import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
// import Breadcrumb from "../../common/breadcrumb";

import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonLayout from "../../../../components/shop/common-layout";
import { ApiUrl } from "../../../../config/api-config";

const Product_list = () => {
  const [allProducts, setAllProducts] = useState("");

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
  useEffect(() => {
    if (allProducts == "") {
      getAllProducts(0, 10);
    }
  });
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
  return (
    <Fragment>
      <>
        <CommonLayout parent="home" title="Products">
          <div className="row mx-0 margin-default">
            {allProducts &&
              allProducts.map((item, index) => {
                if (index < 9) {
                  return (
                    <div className="col-xl-3 col-lg-4 col-6" key={index}>
                      <div class="product-box">
                        <div class="img-wrapper">
                          <div class="front">
                            <a href="product-page(no-sidebar).html">
                              {item.productImages != "" && (
                                <img
                                  src={item.productImages[0].imageUrl}
                                  class="img-fluid blur-up lazyload bg-img"
                                  alt=""
                                />
                              )}
                            </a>
                          </div>
                          <div class="back">
                            <a href="product-page(no-sidebar).html">
                              {item.productImages != "" && (
                                <img
                                  src={item.productImages[0].imageUrl}
                                  class="img-fluid blur-up lazyload bg-img"
                                  alt=""
                                />
                              )}
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
                          {item.overallRating && item.overallRating == "" ? (
                            <h4>Ratings Not Available Yet !!</h4>
                          ) : (
                            <>
                              {item.overallRating == 0.5 ? (
                                <div class="rating">
                                  <i class="fa fa-star-half-o text-warning"></i>
                                </div>
                              ) : (
                                <>
                                  {item.overallRating == 1 ? (
                                    <div class="rating">
                                      <i class="fa fa-star"></i>
                                    </div>
                                  ) : (
                                    <>
                                      {item.overallRating == 1.5 ? (
                                        <div class="rating">
                                          <i class="fa fa-star"></i>

                                          <i class="fa fa-star-half-o text-warning"></i>
                                        </div>
                                      ) : (
                                        <>
                                          {item.overallRating == 2 ? (
                                            <div class="rating">
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                            </div>
                                          ) : (
                                            <>
                                              {item.overallRating == 2.5 ? (
                                                <div class="rating">
                                                  <i class="fa fa-star"></i>

                                                  <i class="fa fa-star"></i>
                                                  <i class="fa fa-star-half-o text-warning"></i>
                                                </div>
                                              ) : (
                                                <>
                                                  {item.overallRating == 3 ? (
                                                    <div class="rating">
                                                      <i class="fa fa-star"></i>
                                                      <i class="fa fa-star"></i>
                                                      <i class="fa fa-star"></i>
                                                    </div>
                                                  ) : (
                                                    <>
                                                      {item.overallRating ==
                                                      3.5 ? (
                                                        <div class="rating">
                                                          <i class="fa fa-star"></i>
                                                          <i class="fa fa-star"></i>
                                                          <i class="fa fa-star"></i>

                                                          <i class="fa fa-star-half-o text-warning"></i>
                                                        </div>
                                                      ) : (
                                                        <>
                                                          {item.overallRating ==
                                                          4 ? (
                                                            <div class="rating">
                                                              <i class="fa fa-star"></i>
                                                              <i class="fa fa-star"></i>
                                                              <i class="fa fa-star"></i>
                                                              <i class="fa fa-star"></i>
                                                            </div>
                                                          ) : (
                                                            <>
                                                              {item.overallRating ==
                                                              4.5 ? (
                                                                <div class="rating">
                                                                  <i class="fa fa-star"></i>
                                                                  <i class="fa fa-star"></i>
                                                                  <i class="fa fa-star"></i>
                                                                  <i class="fa fa-star"></i>
                                                                  <i class="fa fa-star-half-o text-warning"></i>
                                                                </div>
                                                              ) : (
                                                                <>
                                                                  {item.overallRating ==
                                                                  5 ? (
                                                                    <div class="rating">
                                                                      <i class="fa fa-star"></i>
                                                                      <i class="fa fa-star"></i>
                                                                      <i class="fa fa-star"></i>
                                                                      <i class="fa fa-star"></i>
                                                                      <i class="fa fa-star"></i>
                                                                    </div>
                                                                  ) : (
                                                                    <h4
                                                                      style={{
                                                                        fontWeight:
                                                                          "normal",
                                                                      }}
                                                                    >
                                                                      Ratings
                                                                      Not
                                                                      Available
                                                                      Yet !!
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

                          <a href="product-page(no-sidebar).html">
                            <h6>{item.productName}</h6>
                          </a>
                          <h4>€{item.sellingPrice}</h4>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </CommonLayout>
      </>
    </Fragment>
  );
};

export default Product_list;
