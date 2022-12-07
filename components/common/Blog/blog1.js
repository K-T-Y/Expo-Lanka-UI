import React, { Fragment } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Slider3 } from "../../../services/script";

import {
  Media,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../../config/api-config";
import { useEffect } from "react";

const GET_PRODUCTS = gql`
  query blog($type: String!) {
    blog(type: $type) {
      img
      link
      title
      desc
      date
    }
  }
`;

const BlogSection = ({ type, sectionClass, title, inner, hrClass }) => {
  var { data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: type,
    },
  });
  const [promotionDetails, setPromotionDetails] = useState("");
  const getAllActive = () => {
    axios
      .get(ApiUrl + "/promotion/getAll/active")
      .then((response) => {
        console.log("PROMOTION_ALL_ACTIVE==>", response.data);
        setPromotionDetails(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR_GETTING_PROMOTIONS", error);
      });
  };

  useEffect(() => {
    if (promotionDetails == "") {
      getAllActive();
    }
  });
  return (
    <Fragment>
      <section className={sectionClass}>
        <Container>
          <Row>
            <Col md="12">
              <div className={title}>
                <h4>offers</h4>
                <h2 className={inner}>special promotions</h2>
                {hrClass ? (
                  <hr role="tournament6"></hr>
                ) : (
                  <div className="line">
                    <span></span>
                  </div>
                )}
              </div>
              <section className="p-0">
                <Slider className="slide-1 home-slider">
                  {promotionDetails &&
                    promotionDetails.map((item) => {
                      if (item.promotionDetails.length > 0) {
                        return (
                          <>
                            <Card>
                              <CardHeader
                                style={{
                                  textAlign: "center",
                                  fontSize: "20px",
                                  fontWeight: "bolder",
                                }}
                              >
                                {item.promotionName}
                              </CardHeader>
                              <CardBody>
                                <div className="row mx-0 margin-default">
                                  {item.promotionDetails.map((subitem) => {
                                    return (
                                      <>
                                        {subitem.product.productImages &&
                                          subitem.product.productImages.map(
                                            (imagrItem, index) => {
                                              return (
                                                <div
                                                  className="col-xl-3 col-lg-4 col-6"
                                                  key={index}
                                                >
                                                  <div className="product-box">
                                                    <div
                                                      className="img-wrapper"
                                                      // onClick={() => {
                                                      //   selectProduct(item);
                                                      // }}
                                                    >
                                                      <div className="front">
                                                        <a>
                                                          <img
                                                            src={
                                                              imagrItem.imageUrl
                                                            }
                                                            className="img-fluid blur-up lazyload bg-img"
                                                            alt=""
                                                          />
                                                        </a>
                                                      </div>
                                                      <div className="back">
                                                        <a>
                                                          <img
                                                            src={
                                                              imagrItem.imageUrl
                                                            }
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
                                                        <a
                                                          href="compare.html"
                                                          title="Compare"
                                                        >
                                                          <i
                                                            className="ti-reload"
                                                            aria-hidden="true"
                                                          ></i>
                                                        </a>
                                                      </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="product-buttons"></div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </>
                                    );
                                  })}
                                </div>
                              </CardBody>
                              <CardFooter>
                                <Row>
                                  <Col sm="5">Discounted Price :$100</Col>
                                  <Col>
                                    <a
                                      // onClick={() => {
                                      //   addtoCart(item.id);
                                      // }}
                                      id="cartEffect"
                                      className="btn btn-solid hover-solid btn-animation"
                                    >
                                      <i
                                        className="fa fa-shopping-cart me-1"
                                        aria-hidden="true"
                                      ></i>
                                      Add to cart
                                    </a>
                                  </Col>
                                </Row>
                              </CardFooter>
                            </Card>
                            <br></br>
                            <br></br>
                          </>
                        );
                      }
                    })}
                </Slider>
              </section>
              {/* <Slider {...Slider3} className="slide-3 no-arrow ">
                {data &&
                  data.blog.map((item, index) => (
                    <Col md="12" key={index}>
                      <Link href={`/blogs/blog_detail`}>
                        <div className="classic-effect">
                          <Media src={item.img} className="img-fluid" alt="" />
                          <span></span>
                        </div>
                      </Link>
                      <div className="blog-details">
                        <h4>{item.title}</h4>
                        <Link href={`/blogs/blog_detail`}>
                          <p>{item.desc} </p>
                        </Link>
                        <hr className="style1" />
                        <h6>by: {item.date}</h6>
                      </div>
                    </Col>
                  ))}
              </Slider> */}
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};
export default BlogSection;
